import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import NavBar from "../components/NavBar.tsx";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-tr overflow-x-hidden min-w-screen from-zinc-950 via-stone-900 to-neutral-950 flex min-h-screen flex-col items-center justify-between">
        <main className="p-4 py-10 gap-6 w-full lg:w-[70%]">
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
