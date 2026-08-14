// ============================================
// KOMPONEN: DocumentationMap
// ============================================
// Custom map dengan gambar AI + koordinat persentase

import { useState, useRef, useEffect } from "react";
import { Camera, MapPin, X, Plus, Minus, Move } from "lucide-react";

const mapImage = "/campus-map.jpg";

// 📍 DATA HOTSPOT — Koordinat sudah benar!
const hotspotsData = [
  {
    id: 1,
    nama: "Titik Daur Ulang",
    x: 57,
    y: 50,
    deskripsi:
      "Fasilitas pengelolaan sampah terpadu dengan sistem pemilahan dan daur ulang sampah organik & anorganik.",
    image:
      "/sampah.jpg",
  },
  {
    id: 2,
    nama: "Stasiun Isi Ulang Air",
    x: 42,
    y: 44,
    deskripsi:
      "Akses air minum gratis untuk mengurangi penggunaan botol plastik sekali pakai di lingkungan kampus.",
    image:
      "/refil-air.jpg",
  },
  {
    id: 3,
    nama: "Area Hijau",
    x: 52,
    y: 58,
    deskripsi:
      "Ruang terbuka hijau dengan pepohonan rindang untuk konservasi keanekaragaman hayati kampus.",
    image:
      "/area-hijau.jpg",
  },
  {
    id: 4,
    nama: "Taman Komunitas",
    x: 44,
    y: 48,
    deskripsi:
      "Ruang kolaborasi mahasiswa untuk kegiatan lingkungan, diskusi, dan aksi sosial berbasis komunitas.",
    image:
      "/taman.jpg",
  },
  {
    id: 5,
    nama: "Area Bersih-Bersih",
    x: 60,
    y: 43,
    deskripsi:
      "Posko gotong royong dengan perlengkapan kebersihan untuk aksi bersih-bersih kampus secara berkala.",
    image:
      "/area-bersih.jpg",
  },
];

export default function DocumentationMap() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: -20, y: 10 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgErrors, setImgErrors] = useState({});
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const imageRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const setError = (key) => setImgErrors((prev) => ({ ...prev, [key]: true }));

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = mapImage;
  }, []);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.5));

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: -20, y: 10 });
    setActiveHotspot(null);
  };

  const clampPosition = (x, y, currentZoom) => {
    if (!containerRef.current || imageDimensions.width === 0) return { x, y };

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const imageWidth = imageDimensions.width * currentZoom;
    const imageHeight = imageDimensions.height * currentZoom;

    const maxX = Math.max(0, (imageWidth - containerWidth) / 2);
    const maxY = Math.max(0, (imageHeight - containerHeight) / 2);

    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    const clamped = clampPosition(newX, newY, zoom);
    setPosition(clamped);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    const clamped = clampPosition(newX, newY, zoom);
    setPosition(clamped);
  };

  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragStart, zoom]);

  useEffect(() => {
    const clamped = clampPosition(position.x, position.y, zoom);
    if (clamped.x !== position.x || clamped.y !== position.y) {
      setPosition(clamped);
    }
  }, [zoom]);

  const Photo = ({ src, keyName, className }) => (
    <div
      className={`rounded-xl bg-white/5 border border-white/10 overflow-hidden ${className}`}
    >
      {!imgErrors[keyName] ? (
        <img
          src={src}
          alt="Dokumentasi kegiatan BUMI KAMPUS"
          className="img-duotone"
          onError={() => setError(keyName)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Camera
            size={20}
            strokeWidth={1.2}
            className="text-accent-primary/40"
          />
        </div>
      )}
    </div>
  );

  return (
    <section id="dokumentasi" className="px-4 sm:px-6 lg:px-8 py-24">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div data-aos="fade-up" className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-4">
            06 — Dokumentasi
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold">
            <span className="text-text-primary">Jejak Aksi </span>
            <span className="text-accent-primary">Kami</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Kiri: foto dokumentasi */}
          <div className="space-y-3" data-aos="fade-right" data-aos-delay="200">
            <div className="grid grid-cols-2 gap-3">
              <Photo
                src="/sampah.jpg"
                keyName="docs1"
                className="aspect-[4/3]"
              />
              <Photo
                src="/refil-air.jpg"
                keyName="docs2"
                className="aspect-[4/3]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Photo
                src="/area-hijau.jpg"
                keyName="docs3"
                className="aspect-[4/3]"
              />
              <Photo
                src="/taman.jpg"
                keyName="docs4"
                className="aspect-[4/3]"
              />
            </div>
          </div>

          {/* Kanan: Custom Map */}
          <div
            className="glass-panel p-4 relative flex flex-col"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <div>
                <h3 className="font-semibold text-text-primary text-sm">
                  Peta Kampus
                </h3>
                <p className="text-xs text-text-secondary">
                  Tap titik untuk melihat detail aksi
                </p>
              </div>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                title="Reset view"
              >
                <Move size={14} className="text-text-secondary" />
              </button>
            </div>

            {/* Map Container */}
            <div
              ref={containerRef}
              className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-bg-base cursor-grab active:cursor-grabbing"
              style={{ height: "330px" }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div
                ref={mapRef}
                className="w-full h-full transition-transform duration-75 flex items-center justify-center"
              >
                <div
                  className="relative"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    ref={imageRef}
                    src={mapImage}
                    alt="Peta Kampus Universitas Nusantara"
                    className="max-w-none"
                    style={{
                      width: imageDimensions.width || "auto",
                      height: imageDimensions.height || "auto",
                      maxWidth: "none",
                    }}
                    draggable={false}
                    onLoad={(e) => {
                      if (imageDimensions.width === 0) {
                        setImageDimensions({
                          width: e.target.naturalWidth,
                          height: e.target.naturalHeight,
                        });
                      }
                    }}
                  />

                  {/* Hotspot Markers */}
                  {hotspotsData.map((spot) => {
                    const isActive = activeHotspot?.id === spot.id;
                    const size = Math.max(18, 30 / Math.max(0.5, zoom));

                    return (
                      <button
                        key={spot.id}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-10`}
                        style={{
                          left: `${spot.x}%`,
                          top: `${spot.y}%`,
                          width: size,
                          height: size,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(isActive ? null : spot);
                        }}
                      >
                        {!isActive && (
                          <span
                            className="absolute inset-0 rounded-full border border-accent-glow animate-ping opacity-75"
                            style={{ animationDuration: "2.5s" }}
                          />
                        )}

                        <div
                          className={`relative w-full h-full rounded-full border-2 transition-all duration-300 shadow-xl flex items-center justify-center ${
                            isActive
                              ? "bg-accent-primary border-white scale-125 shadow-accent-glow/60"
                              : "bg-accent-primary/95 border-white hover:bg-accent-primary hover:scale-110"
                          }`}
                        >
                          <MapPin
                            size={size * 0.4}
                            className="text-bg-base drop-shadow-sm"
                            strokeWidth={2.5}
                          />
                        </div>

                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0.5 px-1 py-0.5 rounded text-[7px] font-medium bg-bg-base/90 backdrop-blur-sm border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {spot.nama}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-2 right-2 flex flex-col gap-0.5 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  className="p-1 rounded-lg bg-bg-base/80 backdrop-blur-md border border-white/10 hover:bg-bg-base transition-colors"
                  title="Perbesar"
                >
                  <Plus size={13} className="text-text-primary" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  className="p-1 rounded-lg bg-bg-base/80 backdrop-blur-md border border-white/10 hover:bg-bg-base transition-colors"
                  title="Perkecil"
                >
                  <Minus size={13} className="text-text-primary" />
                </button>
              </div>

              {/* 🗨️ POP-UP CHAT BOX */}
              {activeHotspot && (
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                  <div
                    className="pointer-events-auto w-64 sm:w-72 bg-bg-surface/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative bg-bg-base/80 rounded-xl overflow-hidden border border-white/5">
                      <div className="relative h-28">
                        <img
                          src={activeHotspot.image}
                          alt={activeHotspot.nama}
                          className="img-duotone"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-base/90 to-transparent" />
                        <button
                          onClick={() => setActiveHotspot(null)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                      <div className="p-2.5 pt-1">
                        <p className="text-xs font-bold text-accent-primary tracking-wide">
                          {activeHotspot.nama}
                        </p>
                        <p className="text-[10px] text-text-secondary mt-0.5 leading-relaxed">
                          {activeHotspot.deskripsi}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hotspot filter buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2 flex-shrink-0">
              {hotspotsData.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() =>
                    setActiveHotspot(
                      activeHotspot?.id === spot.id ? null : spot,
                    )
                  }
                  className={`text-[8px] px-2 py-0.5 rounded-full border transition-colors ${
                    activeHotspot?.id === spot.id
                      ? "bg-accent-primary text-bg-base border-accent-glow font-bold"
                      : "text-text-secondary bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {spot.nama}
                </button>
              ))}
            </div>

            {/* Caption */}
            <p className="text-[8px] text-text-secondary/60 mt-1 italic flex-shrink-0">
              *Peta ilustratif kampus Universitas Nusantara.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
