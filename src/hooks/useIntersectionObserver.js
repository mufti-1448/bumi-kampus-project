import { useEffect, useRef, useState } from "react";

// Hook untuk deteksi elemen masuk viewport (dipakai untuk trigger animasi scroll)
export default function useIntersectionObserver(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // trigger sekali saja, sesuai kebutuhan animasi fade-in
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}
