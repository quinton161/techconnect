import type { Metadata } from "next"
import ClientLayout from "./layout.client"

export const metadata: Metadata = {
  title: "Tech Connect",
  description: "Connect with tech professionals and mentors",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#0088CC",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>
} 