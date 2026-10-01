import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: { default: "Julio Herrera Velutini | Banker, Founder of Britannia Financial Group", template: "%s | Julio Herrera Velutini" },
  description: "Profile of Julio Herrera Velutini: biography, career, ventures and news.",
  openGraph: { title: "Julio Herrera Velutini", description: "Banker and founder of Britannia Financial Group.", type: "website" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
