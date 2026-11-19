import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { Resume } from "@/components/resume";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Resume />
        <Portfolio />
      </main>
      <SiteFooter />
    </>
  );
}
