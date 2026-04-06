import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import HeroLines from "./components/HeroLines";
import appIcon from "@assets/Appicon_1775485315804.png";
import mainImage from "@assets/Main-image_1775488061348.png";
import step01Image from "@assets/Step01_1775487250933.png";
import step02Image from "@assets/Step02_1775487250934.png";
import step03Image from "@assets/Step03_1775487250935.png";

const SURF_SPOTS = [
  { name: "Pipeline", location: "Oahu, Hawaii" },
  { name: "Teahupo'o", location: "Tahiti, French Polynesia" },
  { name: "Jeffreys Bay", location: "Eastern Cape, South Africa" },
  { name: "Bells Beach", location: "Victoria, Australia" },
  { name: "Mundaka", location: "Basque Country, Spain" },
  { name: "Uluwatu", location: "Bali, Indonesia" },
  { name: "Hossegor", location: "Landes, France" },
  { name: "Cloud 9", location: "Siargao, Philippines" },
  { name: "Cloudbreak", location: "Tavarua, Fiji" },
  { name: "Jaws (Pe'ahi)", location: "Maui, Hawaii" },
  { name: "Snapper Rocks", location: "Gold Coast, Australia" },
  { name: "Supertubes", location: "Peniche, Portugal" },
  { name: "Puerto Escondido", location: "Oaxaca, Mexico" },
  { name: "Skeleton Bay", location: "Namibia" },
  { name: "Mavericks", location: "Half Moon Bay, California" },
  { name: "Rincon", location: "Santa Barbara, California" },
  { name: "Raglan", location: "Waikato, New Zealand" },
  { name: "G-Land", location: "East Java, Indonesia" },
  { name: "Lowers (Trestles)", location: "San Clemente, California" },
  { name: "Keramas", location: "Bali, Indonesia" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
});

const SectionLabel = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    {...fadeUp(delay)}
    className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-8"
  >
    {children}
  </motion.div>
);

function App() {
  const heroRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistStatus("submitting");
    setTimeout(() => {
      setWaitlistStatus("success");
    }, 600);
  };

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-[16px] py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-2">
            <img src={appIcon} alt="Wavy" className="w-16 h-16 rounded-xl" />
            <span className="text-2xl font-black tracking-tighter">Wavy</span>
          </div>
          <button
            onClick={scrollToWaitlist}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(200,241,53,0.3)] transition-all duration-200"
          >
            Join waitlist
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Interactive liquid lines background */}
        <HeroLines containerRef={heroRef} />

        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-[800px] h-[800px] rounded-full bg-secondary/20 blur-[100px] absolute"
          />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[52px] md:text-[80px] lg:text-[120px] font-black leading-[0.9] tracking-[-0.03em] mb-6"
          >
            Stop guessing.<br />Go surf.
          </motion.h1>

          <div className="overflow-hidden mb-12">
            <motion.p className="text-xl md:text-2xl text-muted-foreground font-medium flex flex-wrap justify-center gap-2">
              {["The", "right", "spot.", "The", "right", "time.", "For", "your", "level."].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i, ease: "easeOut" }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            onClick={scrollToWaitlist}
            className="bg-primary text-primary-foreground px-10 py-4 rounded-full text-lg font-bold hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,241,53,0.4)] transition-all duration-200"
          >
            Get Early Access
          </motion.button>
        </div>
      </section>

      {/* SURF SPOTS CAROUSEL */}
      <section className="py-24 overflow-hidden border-t border-border/50">
        <div className="mb-12 text-center">
          <motion.div {...fadeUp(0)} className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
            Known spots
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="marquee-track flex gap-4 w-max">
            {[...SURF_SPOTS, ...SURF_SPOTS].map((spot, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[220px] bg-card border border-border rounded-2xl px-6 py-5 flex flex-col gap-2 shadow-[0_0_20px_rgba(61,79,212,0.06)]"
              >
                <span className="text-white font-bold text-[1.15rem] leading-tight">
                  {spot.name}
                </span>
                <span className="text-muted-foreground text-sm">
                  {spot.location}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-32 px-6 md:px-12 bg-background relative z-10">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <SectionLabel>The Problem</SectionLabel>
          <motion.h2
            {...fadeUp(0.1)}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white/90"
          >
            You're checking four different apps, trying to guess if the wind is right, only to show up to a blown-out mess.
          </motion.h2>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative flex justify-center lg:justify-start"
            >
              <img
                src={mainImage}
                alt="Wavy app showing personalized surf forecast"
                className="w-full max-w-[500px] object-contain drop-shadow-2xl"
              />
            </motion.div>

            <div>
              <SectionLabel>The Solution</SectionLabel>
              <motion.h2
                {...fadeUp(0.1)}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
              >
                We tell you exactly where it's good.
              </motion.h2>
              <motion.p
                {...fadeUp(0.2)}
                className="text-xl text-muted-foreground max-w-md"
              >
                No more reading charts or guessing. Wavy analyzes the forecast against your skill level and tells you the best spot to go right now.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 px-6 md:px-12 bg-background border-t border-border/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <SectionLabel>How it works</SectionLabel>
          </div>

          <div className="space-y-32">
            {/* Step 01 */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.88 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="order-2 md:order-1 flex justify-center md:justify-end"
              >
                <img
                  src={step01Image}
                  alt="Tell us your level screen"
                  className="w-full max-w-[400px] object-contain drop-shadow-2xl"
                />
              </motion.div>

              <div className="order-1 md:order-2 md:pl-4">
                <motion.div {...fadeUp(0)} className="text-primary text-6xl font-black mb-4">01</motion.div>
                <motion.h3 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-bold mb-4">Tell us your level</motion.h3>
                <motion.p {...fadeUp(0.2)} className="text-xl text-muted-foreground">Beginner, intermediate, or charging — you pick.</motion.p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="text-right md:pr-4">
                <motion.div {...fadeUp(0)} className="text-primary text-6xl font-black mb-4">02</motion.div>
                <motion.h3 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-bold mb-4">We read the ocean</motion.h3>
                <motion.p {...fadeUp(0.2)} className="text-xl text-muted-foreground">Swell, wind, tide, crowd. All of it.</motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.88 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center md:justify-start"
              >
                <img
                  src={step02Image}
                  alt="We read the ocean screen"
                  className="w-full max-w-[400px] object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>

            {/* Step 03 */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.88 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="order-2 md:order-1 flex justify-center md:justify-end"
              >
                <img
                  src={step03Image}
                  alt="Go where it's firing screen"
                  className="w-full max-w-[400px] object-contain drop-shadow-2xl"
                />
              </motion.div>

              <div className="order-1 md:order-2 md:pl-4">
                <motion.div {...fadeUp(0)} className="text-primary text-6xl font-black mb-4">03</motion.div>
                <motion.h3 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-bold mb-4">Go where it's firing</motion.h3>
                <motion.p {...fadeUp(0.2)} className="text-xl text-muted-foreground">Your spot. Your session. No guessing.</motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="py-24 px-6 border-y border-border/50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8 text-center md:text-left">
            <motion.div {...fadeUp(0)} className="text-xl font-bold text-muted-foreground">
              Built by surfers
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="text-xl font-bold text-muted-foreground">
              7,000+ spots worldwide
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="text-xl font-bold text-muted-foreground">
              Free forever
            </motion.div>
          </div>
        </div>
      </section>

      {/* WAITLIST CTA */}
      <section id="waitlist" className="py-40 px-6 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,241,53,0.1)_0%,transparent_60%)] pointer-events-none" />

        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <SectionLabel>Join the waitlist</SectionLabel>
          <motion.h2
            {...fadeUp(0.1)}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            Be first in the water.
          </motion.h2>
          <motion.p
            {...fadeUp(0.2)}
            className="text-xl text-muted-foreground mb-12"
          >
            Spots are limited. Sign up to get early access.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="max-w-md mx-auto"
          >
            {waitlistStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center gap-4"
              >
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M20 6L9 17l-5-5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </motion.svg>
                </div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold"
                >
                  You're on the list
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="text-muted-foreground"
                >
                  We'll let you know when it's firing.
                </motion.p>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  disabled={waitlistStatus === "submitting"}
                  required
                  className="w-full bg-card border border-border rounded-full px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={waitlistStatus === "submitting"}
                  className="w-full bg-primary text-primary-foreground rounded-full px-6 py-4 text-lg font-bold hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(200,241,53,0.3)] transition-all duration-200 disabled:opacity-50 flex items-center justify-center h-[60px]"
                >
                  {waitlistStatus === "submitting" ? (
                    <div className="h-6 w-6 rounded-full border-4 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-border text-center md:text-left">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            {...fadeUp(0)}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-black">Wavy</span>
            <span className="text-muted-foreground text-sm">by FinFun</span>
          </motion.div>
          <motion.div
            {...fadeUp(0.1)}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} FinFun. All rights reserved.
          </motion.div>
          <motion.div
            {...fadeUp(0.2)}
            className="flex gap-6 text-sm text-muted-foreground font-medium"
          >
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
