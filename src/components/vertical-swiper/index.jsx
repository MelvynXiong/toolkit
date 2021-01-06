import React, { useState, useEffect } from "react";
import "./style.scss";

export default function({
  children,
  viewportClass,
  pauseTime,
  durationTime,
  baseGap,
}) {
  const [offset, setOffset] = useState(0);
  const [hasAnimation, setHasAnimation] = useState(true);

  useEffect(() => {
    function scroll() {
      if (offset + 1 <= children.length - 1) {
        const gap = offset === 0 ? pauseTime : durationTime + pauseTime;
        setTimeout(() => {
          setHasAnimation(true);
          setOffset(offset + 1);
        }, gap);
      } else {
        setTimeout(() => {
          setHasAnimation(false);
          setOffset(0);
        }, durationTime);
      }
    }

    children.length !== 0 && scroll();
  }, [offset, hasAnimation, children]);

  return (
    <div className={`vertical-swiper-view-port ${viewportClass}`}>
      <div
        style={{
          transform: `translateY(${-offset * baseGap}px)`,
          transitionDuration: durationTime,
          transitionProperty: hasAnimation ? "transform" : "none",
        }}
        className="vertical-swiper-content-container"
      >
        {children}
      </div>
    </div>
  );
}
