import localFont from "next/font/local";
import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContect";
import Head from "./head";
import Logout from "@/components/Logout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
const opensans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Broodl",
  description: "Track you daily mood every day of the year",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4 ">
      <Link href={"/"}>
        <h1 className={"text-base sm:text-lg textGradient " + fugaz.className}>
          Broodl
        </h1>
      </Link>
      <div>
        <Logout />
      </div>
    </header>
  );
  const footer = (
    <footer className="p-4 sm:p-8">
      <p className={"text-indigo-500 text-center "}>
        Created using Next.js, Tailwind CSS
      </p>
    </footer>
  );

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          // className={`${"w-full max-w-[1000px] max-auto test-sm sm:text-base min-h-screen flex flex-col text-slate-800 "}
          className={`${"w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col justify-center text-slate-800"}

        ${opensans.className} `}
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
