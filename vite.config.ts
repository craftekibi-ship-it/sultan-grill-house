// Production config — Lovable sarmalayıcısı yerine standart TanStack Start kurulumu.
// (lovable-tagger yalnızca Lovable editöründe gerekli; sunucu build'inde ERR_REQUIRE_ESM veriyordu.)
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tsConfigPaths(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
});
