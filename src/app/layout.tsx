import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Xecute Labs — Learning workspace",
  description:
    "Understand, experiment, implement, and demonstrate what you learn.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
