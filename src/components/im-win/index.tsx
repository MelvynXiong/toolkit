import React from "react";
import "./style.scss";

export default function({ hideWin }) {
  return (
    <div className="im-win-wrapper">
      im 窗口
      <div onClick={hideWin}>关闭</div>
    </div>
  );
}
