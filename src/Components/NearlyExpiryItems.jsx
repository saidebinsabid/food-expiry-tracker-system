import { useEffect, useRef, useState } from "react";
import axios from "axios";
import NearlyExpiryItemsCard from "./NearlyExpiryItemsCard";
import LeafAnimation from "./LeafAnimation";
import { useInView } from "framer-motion";
import useScreenSize from "../Hooks/useScreenSize.jsx";

const NearlyExpiryItems = () => {
  const [items, setItems] = useState([]);
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [triggerFall, setTriggerFall] = useState(false);
  const lastScrollY = useRef(0);
  const [mouseShift, setMouseShift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/nearly-expired-foods`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (isInView && currentY > lastScrollY.current && !triggerFall) {
        setTriggerFall(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInView, triggerFall]);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const diffX = e.clientX - centerX;
    const diffY = e.clientY - centerY;

    const cappedX = Math.max(-10, Math.min(10, -diffX / 20));
    const cappedY = Math.max(-10, Math.min(10, -diffY / 20));

    setMouseShift({ x: cappedX, y: cappedY });
  };

  const handleMouseLeave = () => {
    setMouseShift({ x: 0, y: 0 });
  };

  const leafImages = [
    "/l4.png",
    "/l1.png",
    "/l2.png",
    "/l5.png",
    "/l3.png",
    "/l5.png",
    "/l2.png",
  ];
  const screenSize = useScreenSize();
  const leafPositions = {
    desktop: [
      { top: 10, left: -3 }, //1 in 4 left-top
      { top: 90, left: 15 }, //2 in 2 left-bottom
      { top: -20, left: 55 }, //3 in 3 middle-middle
      { top: 15, left: 92 }, //4 in 5 middle-right
      { top: -60, left: 80 }, //5 in 3 right-top
      { top: -73, left: 30 }, //6 in 5 top-middle
      { top: 60, left: 62 }, //7 in 1
    ],
    tablet: [
      { top: 30, left: -5 }, //D
      { top: 100, left: 30 }, //D
      { top: 180, left: 80 }, //D
      { top: 28, left: 85 }, //D
      { top: 130, left: -10 }, //D
      { top: -72, left: 13 }, //D
      { top: -50, left: 80 },
    ],
    mobile: [
      { top: 200, left: 76 }, //D
      { top: 110, left: -3 }, //D
      { top: -20, left: -15 }, //D
      { top: 30, left: 70 }, //D
      { top: 402, left: 65 }, //D
      { top: -80, left: 20 }, //D
      { top: 350, left: -12 }, //D
    ],
  }[screenSize];

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{ height: "600px" }}
      >
        {leafImages.map((src, i) => (
          <LeafAnimation
            key={i}
            src={src}
            top={leafPositions[i].top}
            left={leafPositions[i].left}
            triggerFall={triggerFall}
            size={130}
            mouseShiftX={mouseShift.x}
            mouseShiftY={mouseShift.y}
          />
        ))}
      </div>

      <div
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-11/12 mx-auto py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="col-span-full text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-2">
            Nearly Expiring Soon
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Don’t let good food go to waste. These items are approaching their
            expiry within the next 5 days. Use them first to reduce waste and
            make the most of your pantry.
          </p>
        </div>
        {items.map((item) => (
          <NearlyExpiryItemsCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NearlyExpiryItems;
