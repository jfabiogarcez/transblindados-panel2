import React from "react";

export default function WidgetFrame({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}
