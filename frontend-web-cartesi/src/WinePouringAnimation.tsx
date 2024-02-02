// WinePouringAnimation.tsx

import React, { useEffect, useState } from "react";
import "./WinePouringAnimation.css";

const WinePouringAnimation: React.FC = () => {
  const [wineHeight, setWineHeight] = useState<number>(0);

  useEffect(() => {
    const pourAnimation = () => {
      setWineHeight(0);
      setTimeout(() => {
        setWineHeight(150);
      }, 1000);
    };

    pourAnimation();
    const intervalId = setInterval(pourAnimation, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="wine-pouring-container">
      <div className="bottle">
        <div className="wine" style={{ height: wineHeight + "px" }}></div>
      </div>
      <div className="cup"></div>
    </div>
  );
};

export default WinePouringAnimation;
