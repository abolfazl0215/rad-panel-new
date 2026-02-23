import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const playfair = Playfair_Display({
  subsets:  ["latin"],
  variable: "--font-display",
  weight:   ["400", "600", "700"],
  display:  "swap",
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  variable: "--font-body",
  weight:   ["300", "400", "500", "600"],
  display:  "swap",
});

export const metadata = {
  title:       { default: "Estate Admin", template: "%s | Estate Admin" },
  description: "Professional real estate management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-ink-950 text-white antialiased">
        {children}
        <Toaster
          position="bottom-right"
          gutter={8}
          toastOptions={{
            style: {
              background:  "#1a1a26",
              color:       "#fff",
              border:      "1px solid #2e2e42",
              borderRadius:"12px",
              fontFamily:  "var(--font-body)",
              fontSize:    "13.5px",
              padding:     "10px 14px",
            },
            success: { duration: 3000, iconTheme: { primary: "#e8aa30", secondary: "#1a1a26" } },
            error:   { duration: 4500, iconTheme: { primary: "#f87171", secondary: "#1a1a26" } },
          }}
        />
      </body>
    </html>
  );
}
