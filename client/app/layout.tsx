import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Renter | Your Premier Rental Hub",
  description:
    "Explore a seamless rental experience with Rentify, your go-to destination for high-quality rentals. From homes to equipment, discover a wide range of options, easy booking, and exceptional service. Your premier choice for hassle-free rentals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
