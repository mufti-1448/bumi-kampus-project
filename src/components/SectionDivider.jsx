// Reusable divider antar section — transisi warna halus, bukan wave SVG
export default function SectionDivider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  );
}
