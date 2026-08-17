import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver({
  threshold = 0.2,
  root = null,
  rootMargin = "0px",
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin]);

  return [ref, isVisible];
}
