import React, { useRef } from 'react';
import './style.scss';

const config = [
  {
    name: '解决方案',
    top: 744,
  },
  {
    name: '场景导购',
    top: 1178,
  },
  {
    name: '热门服务',
    top: 1724,
  },
  {
    name: '商家案例',
    top: 2156,
  },
  {
    name: '课程推荐',
    top: 2565,
  },
  {
    name: '回到顶部',
    top: 0,
  },
];

export default function() {
  const timer = useRef(null);

  function handleClick(val) {
    cancelAnimationFrame(timer.current);
    timer.current = requestAnimationFrame(function fn() {
      const curTop = document.body.scrollTop || document.documentElement.scrollTop;
      const gap = Math.abs(curTop - val);
      const offset = curTop - val > 0 ? -50 : 50;

      if (gap >= 50) {
        document.body.scrollTop = document.documentElement.scrollTop = curTop + offset;
        timer.current = requestAnimationFrame(fn);
      } else if (gap < 50) {
        document.body.scrollTop = document.documentElement.scrollTop = val;
        cancelAnimationFrame(timer.current);
      } else {
        cancelAnimationFrame(timer.current);
      }
    });
  }

  return (
    <div className="quick-nav-bar">
      {config.map((item, index) => (
        <div onClick={() => handleClick(item.top)} className="quick-nav-item" key={index}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
