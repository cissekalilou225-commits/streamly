```tsx
import type { Metadata } from "next";
import "./globals.css";
import "../composants/auth-styles.css";

export const metadata: Metadata = {
  title: "Streamly — Films et séries",
  description: "Votre prochaine histoire commence ici."
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
```
