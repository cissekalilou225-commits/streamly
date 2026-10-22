
"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage(
          data.session
            ? "Compte créé avec succès !"
            : "Compte créé. Vérifie tes e-mails pour confirmer ton adresse."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Une erreur est survenue."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="streamly-auth-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="streamly-auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="streamly-auth-title"
      >
        <button
          className="streamly-auth-close"
          type="button"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="streamly-auth-brand">STREAMLY</div>
        <h2 id="streamly-auth-title">
          {mode === "login" ? "Bon retour !" : "Créer un compte"}
        </h2>
        <p className="streamly-auth-subtitle">
          {mode === "login"
            ? "Connecte-toi pour continuer."
            : "Rejoins Streamly dès maintenant."}
        </p>

        <form className="streamly-auth-form" onSubmit={handleSubmit}>
          <label htmlFor="streamly-email">Adresse e-mail</label>
          <input
            id="streamly-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="toi@exemple.com"
            required
          />

          <label htmlFor="streamly-password">Mot de passe</label>
          <input
            id="streamly-password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="6 caractères minimum"
            required
          />

          <button
            className="streamly-auth-submit"
            type="submit"
            disabled={busy}
          >
            {busy
              ? "Patiente..."
              : mode === "login"
                ? "Se connecter"
                : "Créer mon compte"}
          </button>
        </form>

        {message && (
          <p className="streamly-auth-message" role="status">
            {message}
          </p>
        )}

        <button
          className="streamly-auth-switch"
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMessage("");
          }}
        >
          {mode === "login"
            ? "Pas encore de compte ? S'inscrire"
            : "Déjà inscrit ? Se connecter"}
        </button>
      </section>
    </div>
  );
}

