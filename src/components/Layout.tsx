import React from "react";

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-5xl">{title}</h1>
      {children}
    </div>
  );
}
