import React, { useState, useEffect, useRef } from "react";

const projects = [
  {
    title: { tr: "Chatterly", en: "Chatterly" },
    desc: {
      tr: "Kullanıcıların gerçek zamanlı ve uçtan uca şifreli olarak mesajlaşabildiği sohbet uygulaması.",
      en: "A real-time, end-to-end encrypted chat application.",
    },
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "RSA", "AES"],
    images: ["/giris.png", "/kaydol.png", "/ana.png",  "/ara.png", "/mesaj.png", "/grupOlustur.png", "/grup.png", "/duzenle.png", "/buton.png", "/profil.png", "/sifre.png"],
    live: "https://chatterly-lrhs.onrender.com/",
    github: "https://github.com/sedefcabuk/chat-app",
  },
  {
    title: { tr: "Cooklio", en: "Cooklio" },
    desc: {
      tr: "Kullanıcı dostu yemek tarifi uygulaması.",
      en: "A user-friendly recipe application.",
    },
    tech: ["React Native", "Expo", "Node.js", "Express.js", "PostgreSQL"],
    images: ["/cooklio1.jpeg", "/cooklio2.jpeg", "/cooklio6.jpeg", "/cooklioo3.jpeg", "/cooklio4.jpeg", "/cooklio5.jpeg", "/cooklio3.jpeg"],
    github: "https://github.com/sedefcabuk/cooklio",
  },
  {
    title: { tr: "Askence", en: "Askence" },
    desc: {
      tr: "Web arama sonuçlarını analiz ederek kaynak gösterimli yapay zeka yanıtları üreten sohbet uygulaması.",
      en: "A chat application that analyzes web search results and generates AI responses with source citations.",
    },
    tech: ["Flutter", "FastAPI", "Python", "Web Socket", "Google Gemini API"],
    images: ["/askence1.png", "/askence2.png"],
    github: "https://github.com/sedefcabuk/askence",
  },
  
];

const translations = {
  tr: {
    role: "Yazılım Geliştirici",
    bio: "Bilgisayar Mühendisliği mezunuyum. Mobil ve web teknolojilerine ağırlık vererek yazılım geliştirme alanında çalışıyorum.",
    projects: "PROJELER",
    liveDemo: "🌐 Canlı Demo",
    github: "💻 GitHub Linki",
    contact: "İletişim",
    email: "✉️ sedefcabuk@gmail.com",
    linkedin: "💼 LinkedIn",
    githubFooter: "💻 GitHub",
  },
  en: {
    role: "Software Developer",
    bio: "Computer Engineering graduate. I work in software development with a focus on mobile and web technologies.",
    projects: "PROJECTS",
    liveDemo: "🌐 Live Demo",
    github: "💻 GitHub",
    contact: "Contact",
    email: "✉️ sedefcabuk@gmail.com",
    linkedin: "💼 LinkedIn",
    githubFooter: "💻 GitHub",
  },
};

function Lightbox({ src, title, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        cursor: "zoom-out",
        padding: 20,
      }}
    >
      <img
        src={src}
        alt={title}
        style={{
          maxWidth: "92vw",
          maxHeight: "92vh",
          borderRadius: 12,
          boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
        }}
      />
    </div>
  );
}

function ProjectImages({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Swipe (dokunma) takibi için ref'ler
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const check = () =>
      setIsTouchDevice(
        typeof window !== "undefined" &&
          (("ontouchstart" in window) || navigator.maxTouchPoints > 0) &&
          window.innerWidth <= 768
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (index) => setCurrentIndex(index);
  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length, isPaused]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const threshold = 40; // px, kaydırmanın algılanması için minimum mesafe
    if (touchDeltaX.current > threshold) {
      prev();
    } else if (touchDeltaX.current < -threshold) {
      next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setIsPaused(false);
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          position: "relative",
          borderRadius: 12,
          overflow: "hidden",
          background: "#1A1A1A",
          border: "1px solid #2A2A2A",
          maxHeight: "480px",
          touchAction: "pan-y", // dikey scroll'u engellemeden yatay swipe'a izin ver
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((src, i) => (
            <div 
              key={i} 
              style={{ 
                minWidth: "100%", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                background: "#111",
                padding: "12px 0",
              }}
            >
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                onClick={() => setLightbox(src)}
                draggable={false}
                style={{
                  maxWidth: "100%",
                  maxHeight: "460px",
                  objectFit: "contain",   // ← Kırpılmadan tam görünüyor
                  display: "block",
                  cursor: "zoom-in",
                  userSelect: "none",
                  WebkitUserDrag: "none",
                }}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && !isTouchDevice && (
          <>
            <button
              onClick={prev}
              style={{
                position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)", color: "rgba(255,255,255,0.85)", border: "none",
                width: 30, height: 30, borderRadius: "50%", cursor: "pointer",
                fontSize: 14, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(2px)",
              }}
            >
              ←
            </button>
            <button
              onClick={next}
              style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)", color: "rgba(255,255,255,0.85)", border: "none",
                width: 30, height: 30, borderRadius: "50%", cursor: "pointer",
                fontSize: 14, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(2px)",
              }}
            >
              →
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "none",
                background: i === currentIndex ? "#6B6EF0" : "#555",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}

      {lightbox && <Lightbox src={lightbox} title={title} onClose={() => setLightbox(null)} />}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage || "en";
    setLang(browserLang.toLowerCase().startsWith("tr") ? "tr" : "en");
  }, []);

  const t = translations[lang];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0F0F0F", color: "#E8E6E1", minHeight: "100vh" }}>
      {/* Dil Seçici */}
      <div style={{ position: "fixed", top: 24, right: 48, zIndex: 100, display: "flex", gap: 8 }}>
        <button
          onClick={() => setLang("tr")}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: lang === "tr" ? "1px solid #6B6EF0" : "1px solid #333",
            background: lang === "tr" ? "rgba(107,110,240,0.15)" : "transparent",
            color: lang === "tr" ? "#6B6EF0" : "#888",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          TR
        </button>
        <button
          onClick={() => setLang("en")}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: lang === "en" ? "1px solid #6B6EF0" : "1px solid #333",
            background: lang === "en" ? "rgba(107,110,240,0.15)" : "transparent",
            color: lang === "en" ? "#6B6EF0" : "#888",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          EN
        </button>
      </div>

      {/* Hero Section */}
      <section style={{ padding: "100px 48px 80px", borderBottom: "0.5px solid #222" }}>
        <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#F0EDE8", margin: 0 }}>
          Sedef Çabuk
        </h1>
        <p style={{ fontSize: 52, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#444", margin: 0 }}>
          {t.role}
        </p>
        <p style={{ marginTop: 32, fontSize: 16, color: "#AAA", maxWidth: 460, lineHeight: 1.7 }}>
          {t.bio}
        </p>
      </section>

      {/* Projects Section */}
      <section style={{ padding: "48px" }}>
        <p style={{ fontSize: 21, letterSpacing: "0.2em", color: "#FFF", textTransform: "uppercase", marginBottom: 48 }}>
          {t.projects}
        </p>

        {projects.map((p, idx) => (
          <div
            key={p.title.en}
            style={{
              padding: "48px 0",
              borderTop: "0.5px solid #1E1E1E",
              borderBottom: idx === projects.length - 1 ? "0.5px solid #1E1E1E" : "none",
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#F0EDE8", marginBottom: 12 }}>
              {p.title[lang]}
            </h2>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.7, marginBottom: 28, maxWidth: 580 }}>
              {p.desc[lang]}
            </p>

            <ProjectImages images={p.images} title={p.title[lang]} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "24px 0" }}>
              {p.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: 12,
                    color: "#F0F0F1",
                    background: "rgba(107,110,240,0.08)",
                    border: "0.5px solid rgba(107,110,240,0.25)",
                    borderRadius: 6,
                    padding: "4px 10px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#6B6EF0", textDecoration: "none", fontSize: 15 }}
                >
                  {t.liveDemo}
                </a>
              )}
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#6B6EF0", textDecoration: "none", fontSize: 15 }}
              >
                {t.github}
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ padding: "60px 48px", borderTop: "0.5px solid #222" }}>
        <p style={{ margin: "10px 0", fontSize: 15 }}>{t.email}</p>
        <p style={{ margin: "10px 0" }}>
          <a href="https://www.linkedin.com/in/sedef-cabuk-b5776a234/" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6EF0", textDecoration: "none" }}>
            {t.linkedin}
          </a>
        </p>
        <p style={{ margin: "10px 0" }}>
          <a href="https://github.com/sedefcabuk" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6EF0", textDecoration: "none" }}>
            {t.githubFooter}
          </a>
        </p>
      </footer>
    </div>
  );
}