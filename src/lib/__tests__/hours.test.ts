import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { CONTACT } from "../contact";
import { dict } from "../i18n";

const EXPECTED_OPEN = "09:00";
const EXPECTED_CLOSE = "02:00";
const EXPECTED_DISPLAY = "09:00 — 02:00";

describe("Opening hours format (09:00–02:00)", () => {
  it("CONTACT.hours uses the canonical display string", () => {
    expect(CONTACT.hours).toBe(EXPECTED_DISPLAY);
  });

  it("hoursByDay covers all 7 days with 09:00 → 02:00", () => {
    expect(CONTACT.hoursByDay).toHaveLength(7);
    const days = CONTACT.hoursByDay.map((h) => h.day).sort();
    expect(days).toEqual([0, 1, 2, 3, 4, 5, 6]);
    for (const entry of CONTACT.hoursByDay) {
      expect(entry.open).toBe(EXPECTED_OPEN);
      expect(entry.close).toBe(EXPECTED_CLOSE);
    }
  });

  it("does not contain legacy times like 23:00 or 22:00", () => {
    const serialized = JSON.stringify(CONTACT);
    expect(serialized).not.toMatch(/23:00/);
    expect(serialized).not.toMatch(/22:00/);
  });

  it("i18n SEO/description copy mentions 02:00 in every supported locale", () => {
    const localeKeys = ["tr", "en", "ru", "es"] as const;
    const copyKeys = ["hero.subtitle", "home.story.body"] as const;
    for (const key of copyKeys) {
      const entry = dict[key as keyof typeof dict] as Record<string, string> | undefined;
      expect(entry, `missing translation: ${key}`).toBeDefined();
      for (const locale of localeKeys) {
        const value = entry?.[locale] ?? "";
        expect(value, `${key}.${locale}`).toMatch(/02:00/);
        expect(value, `${key}.${locale}`).not.toMatch(/23:00/);
      }
    }
  });

  it("public/llms.txt advertises 02:00 closing time", () => {
    const txt = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
    expect(txt).toMatch(/02:00/);
    expect(txt).not.toMatch(/until 23:00/);
  });

  it("home route SEO + JSON-LD use Mo-Su 09:00-02:00", () => {
    const src = readFileSync(
      join(process.cwd(), "src/routes/index.tsx"),
      "utf8",
    );
    expect(src).toMatch(/Mo-Su 09:00-02:00/);
    expect(src).toMatch(/opens:\s*"09:00"/);
    expect(src).toMatch(/closes:\s*"02:00"/);
    expect(src).not.toMatch(/closes:\s*"23:00"/);
  });
});
