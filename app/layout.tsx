import type React from "react"
import { Inter } from "next/font/google";
import { Instrument_Serif } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${instrumentSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

export const metadata = {
  title: "TFPS X Photography",
  description: "A collective of passionate photographers capturing compelling visual stories",
  generator: "TFPS",
}
