import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";
import { Layout } from "@/components/Layout";

function NotFoundComponent() {
  return (
    <I18nProvider>
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md text-center">
            <p className="font-display text-7xl text-primary">404</p>
            <h1 className="mt-4 font-display text-2xl text-foreground">Page not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-burgundy-deep"
            >
              Go home
            </Link>
          </div>
        </div>
      </Layout>
    </I18nProvider>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "yGnU3qNkJnrStuMwriQCtNJLSJfwBT0VVCUpcOtncaU" },
      { name: "theme-color", content: "#5b1612" },
      { name: "author", content: "Sultan Grill House" },
      { property: "og:type", content: "restaurant" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Sultan Grill House | Halal Restaurant in Sultanahmet Istanbul" },
      { property: "og:title", content: "Sultan Grill House | Halal Restaurant in Sultanahmet Istanbul" },
      { name: "twitter:title", content: "Sultan Grill House | Halal Restaurant in Sultanahmet Istanbul" },
      { name: "description", content: "Sultan Grill House — halal Turkish grill on Yerebatan Cd, 2 min from Hagia Sophia. Charcoal kebabs & mixed grills, open until 02:00." },
      { property: "og:description", content: "Sultan Grill House — halal Turkish grill on Yerebatan Cd, 2 min from Hagia Sophia. Charcoal kebabs & mixed grills, open until 02:00." },
      { name: "twitter:description", content: "Sultan Grill House — halal Turkish grill on Yerebatan Cd, 2 min from Hagia Sophia. Charcoal kebabs & mixed grills, open until 02:00." },
      { property: "og:image", content: "https://sultangrillhouse.com/assets/img/hero.jpg" },
      { name: "twitter:image", content: "https://sultangrillhouse.com/assets/img/hero.jpg" },
    ],
    scripts: [
      // Google Analytics 4 (gtag.js) — G-R5692FDPHQ
      { src: "https://www.googletagmanager.com/gtag/js?id=G-R5692FDPHQ", async: true },
      {
        children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-R5692FDPHQ');`,
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Lato:wght@300;400;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr-TR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <Layout>
        <Outlet />
      </Layout>
    </I18nProvider>
  );
}
