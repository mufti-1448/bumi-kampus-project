// ============================================
// KOMPONEN: DocumentationMap
// ============================================
// Section wajib kompetisi: dokumentasi kegiatan (masonry asimetris) +
// peta hotspot interaktif

import { useState, useEffect, useRef } from "react";
import { Camera, MapPin, X } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import hotspotsData from "../data/hotspotsData";

// Komponen helper untuk mengontrol peta (flyTo zoom)
function MapController({ activeHotspot }) {
  const map = useMap();
  
  useEffect(() => {
    if (activeHotspot) {
      // Offset slightly to center the popup above the marker
      map.flyTo([activeHotspot.lat - 0.0003, activeHotspot.lng], 18, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [activeHotspot, map]);
  
  return null;
}

// Komponen Marker kustom dengan dukungan dinamis untuk zoom
function HotspotMarker({ spot, isActive, onActive }) {
  const markerRef = useRef(null);
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  
  useMapEvents({
    zoom: () => {
      setZoom(map.getZoom());
    }
  });

  useEffect(() => {
    // Paksa popup terbuka jika spot ini aktif
    if (isActive && markerRef.current) {
      markerRef.current.openPopup();
    } else if (!isActive && markerRef.current) {
      markerRef.current.closePopup();
    }
  }, [isActive]);

  // Skala ukuran marker: Saat zoom out (level zoom kecil), ukuran marker membesar
  // Standard zoom = 16.
  const zoomDiff = 16 - zoom;
  const scale = Math.max(0.5, 1 + (zoomDiff * 0.25)); 
  const currentSize = 32 * scale;

  const icon = L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div style="width: ${currentSize}px; height: ${currentSize}px;" class="relative flex items-center justify-center rounded-full border-2 transition-all duration-300 shadow-2xl ${isActive ? 'bg-accent-glow border-white scale-125 shadow-accent-glow/60' : 'bg-accent-glow/95 border-white hover:bg-accent-glow hover:scale-110'}">
        <svg class="text-bg-base drop-shadow-sm" width="${currentSize/2.2}" height="${currentSize/2.2}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        ${!isActive ? `<span class="absolute rounded-full border-2 border-accent-glow animate-ping opacity-75" style="width: ${currentSize * 1.5}px; height: ${currentSize * 1.5}px; animation-duration: 2.5s;"></span>` : ''}
      </div>
    `,
    iconSize: [currentSize, currentSize],
    iconAnchor: [currentSize/2, currentSize/2],
    popupAnchor: [0, -currentSize/2 - 4]
  });

  return (
    <Marker 
      ref={markerRef}
      position={[spot.lat, spot.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onActive(isActive ? null : spot),
        popupclose: () => {
          if (isActive) onActive(null);
        }
      }}
    >
      <Popup closeButton={false} autoPan={false}>
        {/* Desain Bubble Chat persis seperti sebelumnya */}
        <div className="w-56 sm:w-64 bg-bg-surface/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in duration-300 mb-2 origin-bottom">
          {/* Panah (Tail Bubble) */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-bg-surface/95 border-b border-r border-white/10 rotate-45" />
          
          <div className="relative z-10 bg-bg-base/80 rounded-xl overflow-hidden border border-white/5">
            {/* Gambar Lokasi */}
            <div className="relative h-28 sm:h-32 group">
              <img 
                src={spot.image} 
                alt={spot.nama}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-base/90 to-transparent pointer-events-none" />
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onActive(null);
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors cursor-pointer pointer-events-auto"
              >
                <X size={14} />
              </button>
            </div>
            
            {/* Teks Informasi */}
            <div className="p-3 pt-1">
              <p className="text-sm font-bold text-accent-glow tracking-wide m-0 leading-tight">
                {spot.nama}
              </p>
              <p className="text-[11px] text-text-secondary mt-1 leading-relaxed m-0 whitespace-normal">
                {spot.deskripsi}
              </p>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default function DocumentationMap() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const setError = (key) => setImgErrors((prev) => ({ ...prev, [key]: true }));

  const Photo = ({ src, keyName, className }) => (
    <div className={`rounded-2xl bg-white/5 border border-white/10 overflow-hidden ${className}`}>
      {!imgErrors[keyName] ? (
        <img
          src={src}
          alt="Dokumentasi kegiatan BUMI KAMPUS"
          className="w-full h-full object-cover"
          onError={() => setError(keyName)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Camera size={24} strokeWidth={1.2} className="text-accent-primary/40" />
        </div>
      )}
    </div>
  );

  return (
    <section id="dokumentasi" className="py-24 px-4 sm:px-6 lg:px-8">
      {/* Overrides CSS Leaflet agar popup transparan & fit dengan tema kita */}
      <style>{`
        .leaflet-popup-content-wrapper { background: transparent !important; box-shadow: none !important; padding: 0 !important; border-radius: 1rem !important; }
        .leaflet-popup-tip-container { display: none !important; }
        .leaflet-popup-content { margin: 0 !important; width: auto !important; }
        .custom-leaflet-icon { background: transparent; border: none; }
        .leaflet-container { font-family: inherit; z-index: 10; background: #000; }
        .leaflet-control-attribution a { color: #7A9B5C !important; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div data-aos="fade-up">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-4">
            06 — Dokumentasi
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-10">
            <span className="text-text-primary">Jejak Aksi </span>
            <span className="text-accent-glow">Kami</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Kiri: masonry foto dokumentasi */}
          <div className="space-y-3" data-aos="fade-right" data-aos-delay="200">
            <Photo src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop" keyName="docs1" className="aspect-[16/9]" />
            <div className="grid grid-cols-2 gap-4">
              <Photo src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop" keyName="docs2" className="aspect-square" />
              <Photo src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" keyName="docs3" className="aspect-square" />
            </div>
            <Photo src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800&auto=format&fit=crop" keyName="docs4" className="aspect-[16/9]" />
          </div>

          {/* Kanan: peta interaktif 3D/Satelit */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 relative flex flex-col" data-aos="fade-left" data-aos-delay="400">
            <h3 className="font-semibold text-text-primary mb-1">Peta Kampus (Live)</h3>
            <p className="text-sm text-text-secondary mb-4">
              Tap titik untuk zoom dan melihat detail aksi
            </p>

            <div className="relative flex-1 min-h-[400px] rounded-2xl overflow-hidden border border-white/10 ring-1 ring-white/5 z-0">
              <MapContainer 
                center={[-6.973007, 107.630713]} 
                zoom={16} 
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  maxZoom={19}
                />
                
                <MapController activeHotspot={activeHotspot} />

                {hotspotsData.map((spot) => (
                  <HotspotMarker 
                    key={spot.id} 
                    spot={spot} 
                    isActive={activeHotspot?.id === spot.id}
                    onActive={(s) => setActiveHotspot(s)}
                  />
                ))}
              </MapContainer>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {hotspotsData.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  className={`text-[10px] px-3 py-1.5 rounded-full border transition-colors ${
                    activeHotspot?.id === spot.id 
                      ? 'bg-accent-glow text-bg-base border-accent-glow font-bold' 
                      : 'text-text-secondary bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {spot.nama}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-text-secondary/60 mt-6 italic">
          *Lokasi satelit area Telkom University dan titik koordinat ilustratif.
        </p>
      </div>
    </section>
  );
}
