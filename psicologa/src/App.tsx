import { useEffect, useState } from "react";

/* =========================================================
   HOOK DE ANIMAÇÃO
   ========================================================= */

function useInView<T extends HTMLElement>() {
  const [visible, setVisible] = useState(false);
  const [element, setElement] = useState<T | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return {
    visible,
    setElement,
  };
}

/* =========================================================
   COMPONENTE DE ANIMAÇÃO
   ========================================================= */

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { visible, setElement } = useInView<HTMLDivElement>();

  return (
    <div
      ref={setElement}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   ÍCONE WHATSAPP
   ========================================================= */

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.78 11.78 0 0012.08 0C5.56 0 .25 5.3.25 11.82c0 2.08.54 4.1 1.57 5.88L.15 24l6.45-1.63a11.8 11.8 0 005.48 1.35h.01c6.51 0 11.82-5.3 11.82-11.82 0-3.16-1.23-6.13-3.39-8.42zM12.09 21.7h-.01a9.84 9.84 0 01-5.01-1.37l-.36-.21-3.83.97 1.02-3.73-.23-.38a9.82 9.82 0 01-1.51-5.16c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 012.88 6.96c0 5.43-4.42 9.85-9.75 9.85zm5.39-7.37c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.91 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.12-.23-.56-.47-.49-.64-.5h-.55c-.19 0-.5.07-.76.36-.26.29-.99.97-.99 2.36s1.01 2.74 1.15 2.93c.14.19 1.99 3.04 4.83 4.26.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z" />
    </svg>
  );
}

/* =========================================================
   ÍCONE MENU
   ========================================================= */

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-100 bg-white/95 py-2 shadow-sm backdrop-blur-md"
            : "bg-white/80 py-4 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

          <a
            href="#inicio"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <span className="font-display text-2xl text-blue-700">
                Ψ
              </span>
            </div>

            <div>
              <p className="font-display text-lg leading-none text-slate-800">
                Dra. Marina Rodrigues
              </p>

              <p className="mt-1 text-[10px] font-semibold tracking-[0.12em] text-slate-400">
                PSICÓLOGA • CRP 06/123456
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">

            <a
              href="#inicio"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              Início
            </a>

            <a
              href="#sobre"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              Sobre
            </a>

            <a
              href="#especialidades"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              Especialidades
            </a>

            <a
              href="#localizacao"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              Localização
            </a>

            <a
              href="#contato"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              Contato
            </a>

            <a
              href="#contato"
              className="rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Agendar
            </a>

          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-700 md:hidden"
            aria-label="Abrir menu"
          >
            <MenuIcon open={menuOpen} />
          </button>

        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-5 md:hidden">

            <div className="flex flex-col gap-5">

              <a
                href="#inicio"
                onClick={closeMenu}
                className="text-sm font-medium text-slate-600"
              >
                Início
              </a>

              <a
                href="#sobre"
                onClick={closeMenu}
                className="text-sm font-medium text-slate-600"
              >
                Sobre
              </a>

              <a
                href="#especialidades"
                onClick={closeMenu}
                className="text-sm font-medium text-slate-600"
              >
                Especialidades
              </a>

              <a
                href="#localizacao"
                onClick={closeMenu}
                className="text-sm font-medium text-slate-600"
              >
                Localização
              </a>

              <a
                href="#contato"
                onClick={closeMenu}
                className="text-sm font-medium text-slate-600"
              >
                Contato
              </a>

              <a
                href="#contato"
                onClick={closeMenu}
                className="rounded-full bg-blue-700 px-6 py-3 text-center text-sm font-semibold text-white"
              >
                Agendar consulta
              </a>

            </div>

          </div>
        )}
      </nav>

      {/* =====================================================
          HERO
          ===================================================== */}

      <main
        id="inicio"
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white pt-20"
      >
        <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-20">

          <Reveal>

            <div className="max-w-2xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-100">

                <span className="text-lg text-blue-700">
                  Ψ
                </span>

                <span className="text-xs font-semibold tracking-wide text-slate-500">
                  PSICÓLOGA • CRP 06/123456
                </span>

              </div>

              <h1 className="font-display text-5xl leading-tight text-slate-800 sm:text-6xl lg:text-7xl">
                Cuidar da mente é{" "}
                <span className="text-blue-700">
                  cuidar da vida.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
                Um espaço de acolhimento, escuta e cuidado psicológico
                para você compreender melhor suas emoções e construir
                uma relação mais saudável consigo mesmo.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <a
                  href="#contato"
                  className="rounded-full bg-blue-700 px-7 py-4 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 hover:shadow-md"
                >
                  Agendar consulta
                </a>

                <a
                  href="#sobre"
                  className="rounded-full border border-slate-200 bg-white px-7 py-4 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Conheça meu trabalho
                </a>

              </div>

            </div>

          </Reveal>

          {/* =================================================
              FOTO DA PSICÓLOGA EM ATENDIMENTO
              ================================================= */}

          <Reveal delay={150}>

            <div className="relative mx-auto w-full max-w-lg lg:ml-auto">

              <div className="overflow-hidden rounded-[2rem] shadow-xl">

                <img
                  src="https://p3.hippopx.com/preview/803/262/woman-talking-psychologist-therapy-session-supportive-environment-office-setting-therapist-client-mental-health-counseling-professional-consultation.jpg"
                  alt="Psicóloga conversando com paciente durante atendimento"
                  className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105"
                />

              </div>

              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white px-5 py-4 shadow-lg">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Atendimento
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  Online e presencial
                </p>

              </div>

            </div>

          </Reveal>

        </section>
      </main>

      {/* =====================================================
          FRASE
          ===================================================== */}

      <section className="border-t border-slate-100 bg-white px-6 py-20">

        <Reveal>

          <div className="mx-auto max-w-3xl text-center">

            <p className="font-display text-2xl italic leading-relaxed text-slate-700 sm:text-3xl">
              “Olhar para dentro também é uma forma de cuidar de si.”
            </p>

            <div className="mt-6">

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Dra. Marina Rodrigues
              </span>

            </div>

          </div>

        </Reveal>

      </section>

      {/* =====================================================
          SOBRE
          ===================================================== */}

      <section
        id="sobre"
        className="scroll-mt-24 bg-slate-50 px-6 py-24"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          <Reveal>

            <div>

              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Sobre mim
              </p>

              <h2 className="font-display text-4xl leading-tight text-slate-800 sm:text-5xl">
                Um espaço para você ser ouvido.
              </h2>

              <p className="mt-7 text-base leading-8 text-slate-500">
                A psicoterapia pode ser um espaço de pausa, reflexão e
                transformação. Meu trabalho é construir, junto com cada
                pessoa, um ambiente seguro para falar sobre sentimentos,
                dificuldades e experiências.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-500">
                Acredito em uma escuta cuidadosa e individualizada,
                respeitando o momento e a história de cada paciente.
                O processo terapêutico é construído com acolhimento,
                ética e respeito à singularidade.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Formação
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Psicologia
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Experiência
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Atendimento clínico
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Modalidade
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Online e presencial
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Abordagem
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Individualizada
                  </p>
                </div>

              </div>

            </div>

          </Reveal>

          {/* FOTO DA SALA */}

          <Reveal delay={150}>

            <div className="relative mx-auto max-w-md">

              <div className="overflow-hidden rounded-[2rem]">

                <img
                  src="https://www.reyyantekin.com/images/hero-office.png"
                  alt="Sala de atendimento psicológico acolhedora"
                  className="aspect-[3/4] w-full object-cover"
                />

              </div>

            </div>

          </Reveal>

        </div>

      </section>

      {/* =====================================================
          ESPECIALIDADES
          ===================================================== */}

      <section
        id="especialidades"
        className="scroll-mt-24 bg-white px-6 py-24"
      >

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="max-w-2xl">

              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Como posso ajudar
              </p>

              <h2 className="font-display text-4xl text-slate-800 sm:text-5xl">
                Especialidades e áreas de atendimento
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-500">
                Cada processo é planejado considerando as necessidades,
                objetivos e contexto individual de cada pessoa.
              </p>

            </div>

          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-slate-100 md:grid-cols-2 lg:grid-cols-3">

            {[
              {
                title: "Ansiedade",
                text: "Acolhimento e acompanhamento para compreender pensamentos, emoções e situações relacionadas à ansiedade.",
              },
              {
                title: "Autoconhecimento",
                text: "Um espaço para refletir sobre padrões, escolhas, sentimentos e relações consigo mesmo.",
              },
              {
                title: "Autoestima",
                text: "Trabalho voltado à construção de uma relação mais saudável com a própria história e identidade.",
              },
              {
                title: "Relacionamentos",
                text: "Reflexão sobre vínculos, comunicação, limites e diferentes formas de relacionamento.",
              },
              {
                title: "Estresse",
                text: "Acompanhamento para compreender fatores de sobrecarga e desenvolver novas estratégias de enfrentamento.",
              },
              {
                title: "Desenvolvimento pessoal",
                text: "Processo terapêutico voltado para mudanças, objetivos pessoais e qualidade de vida.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>

                <article className="group h-full bg-white p-8 transition duration-300 hover:bg-blue-50">

                  <div className="mb-8 h-1 w-8 rounded-full bg-blue-700 transition-all duration-300 group-hover:w-14" />

                  <h3 className="font-display text-2xl text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {item.text}
                  </p>

                </article>

              </Reveal>
            ))}

          </div>

          <div className="mt-14 grid gap-8 border-t border-slate-100 pt-10 sm:grid-cols-3">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Atendimento
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Individual e personalizado
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Modalidade
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Online e presencial
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Ambiente
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Acolhedor e confidencial
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          GALERIA
          ===================================================== */}

      <section className="bg-slate-50 px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="mb-12 max-w-2xl">

              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                O espaço
              </p>

              <h2 className="font-display text-4xl text-slate-800 sm:text-5xl">
                Um ambiente pensado para acolher
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-500">
                Um espaço tranquilo, confortável e preparado para
                proporcionar uma experiência acolhedora durante o
                processo terapêutico.
              </p>

            </div>

          </Reveal>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            {/* SALA 1 */}

            <div className="overflow-hidden rounded-2xl lg:row-span-2">

              <img
                src="https://www.reyyantekin.com/images/hero-office.png"
                alt="Consultório de psicologia com sofá e poltronas"
                className="h-full min-h-[400px] w-full object-cover transition duration-700 hover:scale-105"
              />

            </div>

            {/* SALA 2 */}

            <div className="overflow-hidden rounded-2xl">

              <img
                src="https://ksanakalpa.com/cdn/shop/articles/blog2-20.jpg?v=1724838878&width=1100"
                alt="Poltrona azul e decoração de consultório"
                className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
              />

            </div>

            {/* SALA 3 */}

            <div className="overflow-hidden rounded-2xl">

              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=90"
                alt="Sala de atendimento com decoração neutra"
                className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
              />

            </div>

            {/* SALA 4 */}

            <div className="overflow-hidden rounded-2xl lg:row-span-2">

              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=90"
                alt="Ambiente profissional e acolhedor"
                className="h-full min-h-[400px] w-full object-cover transition duration-700 hover:scale-105"
              />

            </div>

            {/* SALA 5 */}

            <div className="overflow-hidden rounded-2xl">

              <img
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=90"
                alt="Detalhes de uma sala de atendimento"
                className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
              />

            </div>

            {/* SALA 6 */}

            <div className="overflow-hidden rounded-2xl">

              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=90"
                alt="Interior elegante de consultório"
                className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          LOCALIZAÇÃO
          ===================================================== */}

      <section
        id="localizacao"
        className="scroll-mt-24 bg-white px-6 py-24"
      >

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">

          <Reveal>

            <div>

              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Localização
              </p>

              <h2 className="font-display text-4xl text-slate-800 sm:text-5xl">
                Onde estou
              </h2>

              <div className="mt-10 space-y-8">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Endereço
                  </p>

                  <p className="mt-2 text-base leading-7 text-slate-600">
                    Rua das Flores, 456 — Sala 302
                    <br />
                    Jardins, São Paulo — SP
                    <br />
                    01310-100
                  </p>

                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Horários
                  </p>

                  <p className="mt-2 text-base leading-7 text-slate-600">
                    Segunda a sexta: 8h às 20h
                    <br />
                    Sábado: 9h às 14h
                  </p>

                </div>

              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+das+Flores+456+Sao+Paulo"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Ver no Google Maps
                </a>

                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  <WhatsAppIcon />
                  Falar pelo WhatsApp
                </a>

              </div>

            </div>

          </Reveal>

          <Reveal delay={150}>

            <div className="h-[420px] overflow-hidden rounded-3xl bg-slate-100">

              <iframe
                title="Mapa da localização"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-46.666%2C-23.565%2C-46.650%2C-23.555&layer=mapnik"
                className="h-full w-full border-0"
                loading="lazy"
              />

            </div>

          </Reveal>

        </div>

      </section>

      {/* =====================================================
          CONTATO
          ===================================================== */}

      <section
        id="contato"
        className="scroll-mt-24 bg-slate-50 px-6 py-24"
      >

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="rounded-[2rem] bg-[#25d366] p-8 text-white sm:p-12">

              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

                <div className="max-w-2xl">

                  <div className="mb-4 flex items-center gap-3">

                    <div className="rounded-full bg-white/15 p-3">
                      <WhatsAppIcon />
                    </div>

                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Atendimento
                    </span>

                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl">
                    Vamos conversar?
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/85">
                    Entre em contato para tirar dúvidas sobre o atendimento
                    ou verificar horários disponíveis.
                  </p>

                </div>

                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="whitespace-nowrap rounded-full bg-white px-7 py-4 text-sm font-bold text-green-700 transition hover:bg-slate-50"
                >
                  Chamar no WhatsApp
                </a>

              </div>

            </div>

          </Reveal>

          <Reveal delay={150}>

            <div className="mt-16 grid gap-12 lg:grid-cols-2">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                  Mensagem
                </p>

                <h2 className="mt-4 font-display text-4xl text-slate-800 sm:text-5xl">
                  Entre em contato
                </h2>

                <p className="mt-5 max-w-lg text-base leading-7 text-slate-500">
                  Preencha o formulário e envie sua mensagem.
                  Retornarei assim que possível.
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      Nome
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Seu nome"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      E-mail
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="seu@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                </div>

                <div>

                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    Mensagem
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Como posso ajudar?"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-800 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  Enviar mensagem
                </button>

                {sent && (
                  <p className="text-center text-sm font-medium text-green-700">
                    ✓ Mensagem enviada — em breve entro em contato.
                  </p>
                )}

              </form>

            </div>

          </Reveal>

        </div>

      </section>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="border-t border-slate-100 bg-white px-6 py-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

          <a
            href="#inicio"
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">

              <span className="font-display text-xl text-blue-700">
                Ψ
              </span>

            </div>

            <div>

              <p className="font-display text-base text-slate-800">
                Dra. Marina Rodrigues
              </p>

              <p className="text-[10px] font-semibold tracking-wider text-slate-400">
                PSICÓLOGA • CRP 06/123456
              </p>

            </div>

          </a>

          <div className="flex flex-wrap justify-center gap-6">

            <a
              href="#sobre"
              className="text-sm text-slate-500 transition hover:text-blue-700"
            >
              Sobre
            </a>

            <a
              href="#especialidades"
              className="text-sm text-slate-500 transition hover:text-blue-700"
            >
              Especialidades
            </a>

            <a
              href="#contato"
              className="text-sm text-slate-500 transition hover:text-blue-700"
            >
              Contato
            </a>

          </div>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>

        </div>

      </footer>

      {/* =====================================================
          WHATSAPP FLUTUANTE
          ===================================================== */}

      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noreferrer"
        aria-label="Falar pelo WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
      >
        <WhatsAppIcon />
      </a>

    </div>
  );
}

export default App;