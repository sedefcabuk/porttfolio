import React, { useState } from "react";

const projects = [
  {
    title: "Chatterly",
    desc: "Kullanıcıların gerçek zamanlı ve uçtan uca şifreli olarak mesajlaşabildiği sohbet uygulaması.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "RSA", "AES"],
    images: ["/giris.png", "/kaydol.png", "/mesaj.png", "/grup.png", "/profil.png", "/sifre.png"],
    live: "https://chatterly-lrhs.onrender.com/",
    github: "https://github.com/sedefcabuk/chat-app",
  },
  {
    title: "Askence",
    desc: "Web arama sonuçlarını analiz ederek kaynak gösterimli yapay zeka yanıtları üreten sohbet uygulaması.",
    tech: ["Flutter", "FastAPI", "Python", "Web Socket", "Google Gemini API"],
    images: ["/askence1.png",],
    github: "https://github.com/sedefcabuk/askence",
  },
  {
    title: "Cooklio",
    desc: "Kullanıcı dostu yemek tarifi uygulaması.",
    tech: ["React Native", "Expo", "Node.js", "Express.js", "PostgreSQL"],
    images: ["/cooklio1.jpeg", "/cooklio2.jpeg", "/cooklioo3.jpeg", "/cooklio4.jpeg", "/cooklio5.jpeg", "/cooklio3.jpeg"],
    github: "https://github.com/sedefcabuk/cooklio",
  },
];

function Lightbox(props) {
  return (
    <div
      onClick={props.onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(86, 82, 82, 0.37)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        cursor: "zoom-out",
        padding: 24,
      }}
    >
      <img
        src={props.src}
        alt={props.title}
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: 10,
          display: "block",
        }}
      />
    </div>
  );
}

function ProjectImages(props) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 8,
        }}
      >
        {props.images.map((src, i) => (
          <div
            key={i}
            onClick={() => setLightbox(src)}
            style={{
              borderRadius: 8,
              overflow: "hidden",
              border: "0.5px solid #2A2A2A",
              background: "#1A1A1A",
              cursor: "zoom-in",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#444")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2A2A2A")}
          >
            <img
              src={src}
              alt={props.title}
              style={{ width: "100%", height: "auto", display: "block" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            />
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox 
          src={lightbox} 
          title={props.title} 
          onClose={() => setLightbox(null)} 
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0F0F0F", color: "#E8E6E1", minHeight: "100vh" }}>

      <section style={{ padding: "80px 48px 72px", borderBottom: "0.5px solid #222" }}>
        <h1 style={{ fontSize: 52, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#F0EDE8", margin: 0 }}>
          Sedef Çabuk
        </h1>
        <p style={{ fontSize: 52, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#444", margin: 0 }}>
          Yazılım Geliştirici
        </p>
        <p style={{ marginTop: 28, fontSize: 15, color: "#777", maxWidth: 380, lineHeight: 1.6 }}>
          Bilgisayar Mühendisliği mezunuyum. Mobil ve web teknolojilerine ağırlık vererek yazılım geliştirme alanında çalışıyorum.
        </p>
      </section>

      <section style={{ padding: "48px" }}>
        <p style={{ fontSize: 20, letterSpacing: "0.15em", color: "#FFF", textTransform: "uppercase", marginBottom: 48 }}>
          PROJELER
        </p>

        {projects.map((p, idx) => (
          <div
            key={p.title}
            style={{
              padding: "36px 0",
              borderTop: "0.5px solid #1E1E1E",
              borderBottom: idx === projects.length - 1 ? "0.5px solid #1E1E1E" : "none",
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 500, color: "#F0EDE8", letterSpacing: "-0.02em", marginBottom: 8 }}>
              {p.title}
            </h2>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65, marginBottom: 20, maxWidth: 520 }}>
              {p.desc}
            </p>

            <ProjectImages title={p.title} images={p.images} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 11,
                    color: "#6B6EF0",
                    background: "rgba(107,110,240,0.08)",
                    border: "0.5px solid rgba(107,110,240,0.2)",
                    borderRadius: 4,
                    padding: "3px 8px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Proje Linkleri - Yeni Stil */}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {p.live && (
                <p style={{ margin: 0 }}>
                  🌐{" "}
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#6B6EF0",
                      textDecoration: "none",
                      fontSize: 14,
                    }}
                  >
                    Canlı Demo
                  </a>
                </p>
              )}
              <p style={{ margin: 0 }}>
                {" "}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#6B6EF0",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  GitHub Linki
                </a>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer - Yeni Stil */}
      <footer style={{ padding: "48px", borderTop: "0.5px solid #222" }}>
        <p style={{ margin: "8px 0" }}>
          ✉️{" "}
          <span style={{ color: "#777", fontSize: 14 }}>
            sedefcabuk@gmail.com
          </span>
        </p>
        <p style={{ margin: "8px 0" }}>
          💼{" "}
          <a
            href="https://www.linkedin.com/in/sedef-cabuk-b5776a234/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#E8E6E1", textDecoration: "none", fontSize: 14 }}
          >
            LinkedIn
          </a>
        </p>
        <p style={{ margin: "8px 0" }}>
          💻{" "}
          <a
            href="https://github.com/sedefcabuk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#E8E6E1", textDecoration: "none", fontSize: 14 }}
          >
            GitHub
          </a>
        </p>
      </footer>

    </div>
  );
}