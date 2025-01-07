import "./globals.css";
import Nav from "@/components/Nav";
export const metadata = {
  title: "Family Hub ",
  description: "Family web to share within family members",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
