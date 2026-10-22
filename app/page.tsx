use client";

import { useMemo, useState } from "react";
import {
  Search,
  Play,
  Plus,
  Check,
  Info,
  ChevronRight,
  ChevronLeft,
  Clapperboard,
  Bell,
  UserRound,
  X,
} from "lucide-react";

type Film = {
  id: number;
  title: string;
  genre: string;
  year: number;
  age: string;
  description: string;
  poster: string;
  backdrop: string;
  video: string;
  sourceUrl: string;
  tag?: string;
};

const films: Film[] = [
  {
    id: 1,
    title: "Big Buck Bunny",
    genre: "Comédie",
    year: 2008,
    age: "Tout public",
    tag: "Licence ouverte",
    description:
      "Un lapin géant et pacifique veut profiter d’une belle journée, mais trois petits animaux viennent perturber sa tranquillité. Court métrage d’animation publié sous licence Creative Commons Attribution.",
    poster:
      "https://studio.blender.org/files/5a9a0e5a9a7e3d001a6e6e5f/BigBuckBunny.jpg",
    backdrop:
      "https://studio.blender.org/files/5a9a0e5a9a7e3d001a6e6e5f/BigBuckBunny.jpg",
    video: "",
    sourceUrl: "https://studio.blender.org/projects/big-buck-bunny/",
  },
  {
    id: 2,
    title: "Sintel",
    genre: "Aventure",
    year: 2010,
    age: "13+",
    tag: "Licence ouverte",
    description:
      "Une jeune femme part dans un voyage périlleux pour retrouver un petit dragon qui compte beaucoup pour elle. Film d’animation indépendant publié sous licence Creative Commons Attribution.",
    poster:
      "https://durian.blender.org/wp-content/uploads/2010/05/sintel_poster.jpg",
    backdrop:
      "https://durian.blender.org/wp-content/uploads/2010/05/sintel_poster.jpg",
    video: "",
    sourceUrl: "https://studio.blender.org/projects/sintel/",
  },
  {
    id: 3,
    title: "Tears of Steel",
    genre: "Science-fiction",
    year: 2012,
    age: "13+",
    tag: "Licence ouverte",
    description:
      "Dans une ville futuriste, un groupe de scientifiques tente de sauver le monde grâce à une expérience mêlant technologie et souvenirs. Film publié sous licence Creative Commons Attribution.",
    poster:
      "https://mango.blender.org/wp-content/uploads/2013/05/tears_of_steel.jpg",
    backdrop:
      "https://mango.blender.org/wp-content/uploads/2013/05/tears_of_steel.jpg",
    video: "",
    sourceUrl: "https://studio.blender.org/projects/tears-of-steel/",
  },
  {
    id: 4,
    title: "Elephants Dream",
    genre: "Fantastique",
    year: 2006,
    age: "Tout public",
    description:
      "Deux personnages explorent une étrange machine et un univers surréaliste. Film d’animation expérimental distribué sous licence ouverte.",
    poster:
      "https://orange.blender.org/wp-content/themes/orange/images/ed_header.jpg",
    backdrop:
      "https://orange.blender.org/wp-content/themes/orange/images/ed_header.jpg",
    video: "",
    sourceUrl: "https://studio.blender.org/projects/elephants-dream/",
  },
];

const genres = [
  "Tout",
  "Action",
  "Thriller",
  "Aventure",
  "Drame",
  "Documentaire",
  "Sport",
  "Science-fiction",
  "Comédie",
];

function FilmRow({
  title,
  items,
  onSelect,
  saved,
  toggle,
}: {
  title: string;
  items: Film[];
  onSelect: (f: Film) => void;
  saved: number[];
  toggle: (id: number) => void;
}) {
  const [offset, setOffset] = useState(0);
  const max = Math.max(0, items.length - 3);

  return (
    <section className="film-row">
      <div className="row-heading">
        <h2>{title}</h2>
        <div className="row-controls">
          <button
            disabled={offset === 0}
            aria-label="Défiler à gauche"
            onClick={() => setOffset((v) => Math.max(0, v - 1))}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            disabled={offset >= max}
            aria-label="Défiler à droite"
            onClick={() => setOffset((v) => Math.min(max, v + 1))}
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      <div className="film-window">
        <div
          className="film-track"
          style={{
            transform: `translateX(calc(${offset} * (var(--card-width) + var(--card-gap)) * -1))`,
          }}
        >
          {items.map((f) => (
            <article className="film-card" key={f.id}>
              <button
                className="film-art"
                onClick={() => onSelect(f)}
                style={{
                  backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.86),transparent 65%),url("${f.poster}")`,
                }}
                aria-label={`Détails de ${f.title}`}
              >
                {f.tag && <span className="film-badge">{f.tag}</span>}
                <span className="film-play">
                  <Play size={18} fill="currentColor" />
                </span>
                <span className="film-genre">{f.genre}</span>
              </button>

              <div className="film-card-info">
                <button className="film-name" onClick={() => onSelect(f)}>
                  {f.title}
                </button>
                <button
                  className="icon-button small"
                  aria-label="Ajouter à ma liste"
                  onClick={() => toggle(f.id)}
                >
                  {saved.includes(f.id) ? (
                    <Check size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </button>
              </div>
              <p className="film-meta">
                {f.year} <span>•</span> {f.age}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tout");
  const [saved, setSaved] = useState<number[]>([]);
  const [selected, setSelected] = useState<Film | null>(null);
  const [playing, setPlaying] = useState<Film | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [tab, setTab] = useState("Accueil");

  const hero = films[0];

  const filtered = useMemo(
    () =>
      films.filter(
        (f) =>
          (category === "Tout" || f.genre === category) &&
          f.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  );

  const toggle = (id: number) =>
    setSaved((v) => (v.includes(id) ? v.filter((n) => n !== id) : [...v, id]));

  // Les rangées utilisent uniquement les films réellement présents dans le catalogue.
  // Cela évite les éléments undefined qui provoquaient l'erreur sur f.poster.
  const rows = [
    {
      title: "Tendances du moment",
      items: films.slice(0, 4),
    },
    {
      title: "À découvrir",
      items: [...films].reverse(),
    },
  ];

  return (
    <main className="app-shell">
      <header className="top-nav">
        <a href="#home" className="wordmark">
          <span className="brand-symbol">
            <Clapperboard size={23} />
          </span>{" "}
          STREAMLY
        </a>

        <nav className="main-nav">
          {["Accueil", "Films", "Séries", "Ma liste"].map((t) => (
            <button
              key={t}
              className={tab === t ? "nav-link selected" : "nav-link"}
              onClick={() => {
                setTab(t);
                if (t === "Ma liste") {
                  document
                    .getElementById("ma-liste")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else {
                  document
                    .getElementById("catalogue")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          {searchOpen && (
            <input
              autoFocus
              className="nav-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un titre..."
            />
          )}
          <button
            className="icon-button"
            aria-label="Rechercher"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={20} />
          </button>
          <button
            className="icon-button notification"
            aria-label="Notifications"
            onClick={() =>
              alert(
                "Les notifications seront disponibles après l'ajout des comptes.",
              )
            }
          >
            <Bell size={19} />
          </button>
          <button
            className="profile-button"
            aria-label="Profil"
            onClick={() =>
              alert(
                "Les comptes utilisateurs seront ajoutés dans une prochaine étape.",
              )
            }
          >
            <UserRound size={18} />
          </button>
        </div>
      </header>

      <section
        id="home"
        className="hero-banner"
        style={{
          backgroundImage: `linear-gradient(90deg,#0a0a0b 0%,rgba(10,10,11,.86) 31%,rgba(10,10,11,.12) 78%),linear-gradient(0deg,#0a0a0b 0%,transparent 48%),url("${hero.backdrop}")`,
        }}
      >
        <div className="hero-copy">
          <div className="original-label">
            <span className="original-mark">S</span> UNE SÉLECTION STREAMLY
          </div>
          <p className="hero-kicker">{hero.tag}</p>
          <h1>{hero.title}</h1>
          <div className="hero-meta">
            <span className="match">98 % pour vous</span>
            <span>{hero.year}</span>
            <span className="age-chip">{hero.age}</span>
            <span>2 h 04</span>
            <span className="quality-chip">HD</span>
          </div>
          <p className="hero-description">{hero.description}</p>
          <div className="hero-buttons">
            <button className="button-light" onClick={() => setSelected(hero)}>
              <Play size={20} fill="currentColor" /> Lecture
            </button>
            <button className="button-muted" onClick={() => setSelected(hero)}>
              <Info size={20} /> Plus d'infos
            </button>
            <button
              className="button-round"
              aria-label="Ajouter à ma liste"
              onClick={() => toggle(hero.id)}
            >
              {saved.includes(hero.id) ? (
                <Check size={21} />
              ) : (
                <Plus size={21} />
              )}
            </button>
          </div>
        </div>
        <div className="hero-side-note">APERÇU DU CATALOGUE</div>
        <div className="hero-bottom-fade" />
      </section>

      <section className="catalogue" id="catalogue">
        <div className="catalogue-intro">
          <div>
            <p className="eyebrow">À VOUS DE CHOISIR</p>
            <h2>Un monde d'histoires.</h2>
          </div>
          <p>Découvrez votre prochain coup de cœur.</p>
        </div>

        <div className="category-strip">
          {genres.map((g) => (
            <button
              key={g}
              className={
                category === g ? "category-chip active" : "category-chip"
              }
              onClick={() => setCategory(g)}
            >
              {g}
            </button>
          ))}
        </div>

        {query || category !== "Tout" ? (
          <section className="search-results">
            <div className="row-heading">
              <h2>
                {query ? `Résultats pour « ${query} »` : category}
              </h2>
              <span className="result-total">
                {filtered.length} titre(s)
              </span>
            </div>

            {filtered.length ? (
              <div className="result-grid">
                {filtered.map((f) => (
                  <article className="film-card" key={f.id}>
                    <button
                      className="film-art"
                      onClick={() => setSelected(f)}
                      style={{
                        backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.86),transparent 65%),url("${f.poster}")`,
                      }}
                    >
                      <span className="film-play">
                        <Play size={18} fill="currentColor" />
                      </span>
                      <span className="film-genre">{f.genre}</span>
                    </button>
                    <div className="film-card-info">
                      <button
                        className="film-name"
                        onClick={() => setSelected(f)}
                      >
                        {f.title}
                      </button>
                      <button
                        className="icon-button small"
                        onClick={() => toggle(f.id)}
                      >
                        {saved.includes(f.id) ? (
                          <Check size={16} />
                        ) : (
                          <Plus size={16} />
                        )}
                      </button>
                    </div>
                    <p className="film-meta">
                      {f.year} <span>•</span> {f.age}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                Aucun titre trouvé. Essayez un autre mot ou un autre genre.
              </div>
            )}
          </section>
        ) : (
          <>
            {rows.map((r) => (
              <FilmRow
                key={r.title}
                title={r.title}
                items={r.items}
                onSelect={setSelected}
                saved={saved}
                toggle={toggle}
              />
            ))}

            <div id="ma-liste">
              <FilmRow
                title="Ma liste"
                items={films.filter((f) => saved.includes(f.id))}
                onSelect={setSelected}
                saved={saved}
                toggle={toggle}
              />
              {saved.length === 0 && (
                <p className="list-hint">
                  Utilisez le bouton + sur un titre pour le retrouver ici.
                </p>
              )}
            </div>
          </>
        )}
      </section>

      <section className="membership-banner">
        <div>
          <p className="eyebrow">BIENTÔT SUR STREAMLY</p>
          <h2>
            Vos histoires préférées,
            <br />
            <span>à votre façon.</span>
          </h2>
          <p>
            Un espace pensé pour découvrir, enregistrer et retrouver vos
            contenus.
          </p>
        </div>
        <button
          className="button-light"
          onClick={() =>
            alert(
              "Les offres seront activées après l'intégration du paiement.",
            )
          }
        >
          Découvrir les offres <ChevronRight size={18} />
        </button>
      </section>

      <footer className="site-footer">
        <a href="#home" className="wordmark">
          <span className="brand-symbol">
            <Clapperboard size={20} />
          </span>{" "}
          STREAMLY
        </a>
        <p>Un prototype indépendant de plateforme de streaming.</p>
        <div className="footer-links">
          <a href="#catalogue">Catalogue</a>
          <a href="#ma-liste">Ma liste</a>
          <a href="mailto:contact@example.com">Contact</a>
        </div>
        <small>
          © 2026 Streamly. Remplacez les titres et visuels de démonstration par
          des contenus autorisés.
        </small>
      </footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section
            className="detail-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Détails de ${selected.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="detail-cover"
              style={{
                backgroundImage: `linear-gradient(0deg,#161619 0%,transparent 75%),url("${selected.backdrop}")`,
              }}
            >
              <button
                className="modal-close"
                aria-label="Fermer"
                onClick={() => setSelected(null)}
              >
                <X size={21} />
              </button>
              <span className="detail-brand">STREAMLY</span>
            </div>

            <div className="detail-content">
              <p className="eyebrow">
                {selected.genre.toUpperCase()} · SÉLECTION STREAMLY
              </p>
              <h2>{selected.title}</h2>
              <div className="hero-meta">
                <span className="match">Recommandé</span>
                <span>{selected.year}</span>
                <span className="age-chip">{selected.age}</span>
              </div>
              <p className="detail-description">{selected.description}</p>
              <div className="hero-buttons">
                <button
                  className="button-light"
                  onClick={() => setPlaying(selected)}
                >
                  <Play size={18} fill="currentColor" /> Voir le film
                </button>
                <button
                  className="button-round"
                  aria-label="Ajouter à ma liste"
                  onClick={() => toggle(selected.id)}
                >
                  {saved.includes(selected.id) ? (
                    <Check size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {playing && (
        <div
          className="player-backdrop"
          onClick={() => setPlaying(null)}
        >
          <section
            className="player-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`Lecture de ${playing.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="player-heading">
              <div>
                <span className="player-brand">STREAMLY</span>
                <h2>{playing.title}</h2>
              </div>
              <button
                className="modal-close"
                aria-label="Fermer le lecteur"
                onClick={() => setPlaying(null)}
              >
                <X size={21} />
              </button>
            </div>

            {playing.video ? (
              <video
                key={playing.id}
                className="streamly-video"
                controls
                autoPlay
                playsInline
                src={playing.video}
              >
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
            ) : (
              <div className="player-note">
                <p>Ce film est proposé via sa page officielle. Vérifiez les conditions de licence et les crédits avant toute redistribution sur Streamly.</p>
                <a className="button-light" href={playing.sourceUrl} target="_blank" rel="noreferrer">
                  Ouvrir le film sur Blender Studio <ChevronRight size={18} />
                </a>
              </div>
            )}

            <p className="player-note">
              Les films s’ouvrent sur leur source officielle. Pour les héberger directement sur Streamly, télécharge uniquement une copie dont la licence autorise la redistribution et respecte les obligations d’attribution.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
