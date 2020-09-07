import React from "react";
import ReactDOM from "react-dom";
import ImWin from "../im-win";
import "./style.scss";

export const openImWin = () => {
  let container = document.getElementById("im-container");
  if (container) {
    // im 弹窗已经被初始化
    if (container.classList.contains("hide")) {
      // 关闭 im 窗口后再次打开
      container.classList.toggle("hide");
    } else {
      // 在 im 窗口处于唤起状态下，重复点击
    }
  } else {
    // 第一次点击，初始化 im 窗口
    container = document.createElement("div");
    container.setAttribute("id", "im-container");
    ReactDOM.render(<ImWin hideWin={hideImWin} />, container);
    document.body.appendChild(container);
  }
};

// 隐藏im窗口
export const hideImWin = () => {
  const container = document.getElementById("im-container");
  container.classList.toggle("hide");
};
