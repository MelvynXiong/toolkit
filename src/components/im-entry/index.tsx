import React from "react";
import "./style.scss";

export default function({ children }) {
  function evokeImWin() {
    console.log("校验登录态，唤起im窗口");
  }

  return (
    <div className="im-entry-wrapper" onClick={evokeImWin}>
      {children}
    </div>
  );
}
