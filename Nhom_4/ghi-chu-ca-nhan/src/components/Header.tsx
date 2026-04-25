"use client";

import { useTheme } from "../context/ThemeContext";

export default function Header({ count }: { count: number }) {
  const { toggleTheme, theme } = useTheme();

  return (
    <div className="header">
      <h1>📝 Ghi Chú Cá Nhân</h1>

      <div className="header-right">
        <span className="badge">{count} ghi chú</span>
        <button onClick={toggleTheme} className="theme-btn">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}