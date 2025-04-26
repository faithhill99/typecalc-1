// vite.config.ts
import Papa from "file:///D:/New%20folder/node_modules/.pnpm/papaparse@5.5.2/node_modules/papaparse/papaparse.js";
import react from "file:///D:/New%20folder/node_modules/.pnpm/@vitejs+plugin-react@4.4.1__8e25b8dc9361d34c6bede8fd3987d1d5/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/New%20folder/node_modules/.pnpm/vite@5.4.18_@types+node@20._78beab1ec4da2e13c3ae6b6589b3a629/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///D:/New%20folder/node_modules/.pnpm/vite-plugin-pwa@0.19.8_vite_aad064965c778ded10feeb6f7d23ac8c/node_modules/vite-plugin-pwa/dist/index.js";
import * as fs from "fs";
import * as path from "path";
import tailwindcss from "file:///D:/New%20folder/node_modules/.pnpm/@tailwindcss+vite@4.1.4_vit_232b614bfed4eb6f62e0a96024db3e68/node_modules/@tailwindcss/vite/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\New folder";
var iconVersion = 5;
function readJSON(filename) {
  const text = fs.readFileSync(filename, "utf-8");
  const json = JSON.parse(text);
  return json;
}
function getTranslationFilenames() {
  const base = "public/locales";
  return fs.readdirSync(base).map((f) => path.join(base, f));
}
function getLanguageFromFilename(filename) {
  return path.basename(filename, ".json");
}
function* dottedPaths(data) {
  yield* dottedPathsHelper("", data);
}
function dottedPathsJoin(base, path2) {
  if (base) {
    return `${base}.${path2}`;
  }
  return path2;
}
function* dottedPathsHelper(base, data) {
  if (!data) {
    return;
  }
  if (Array.isArray(data)) {
    for (const [i, x] of data.entries()) {
      yield* dottedPathsHelper(dottedPathsJoin(base, String(i)), x);
    }
  }
  if (typeof data === "object") {
    for (const [k, v] of Object.entries(data)) {
      yield* dottedPathsHelper(dottedPathsJoin(base, k), v);
    }
  }
  if (typeof data === "string") {
    yield base;
  }
}
var trans = {};
var pathSets = {};
var names = getTranslationFilenames();
var langs = names.map(getLanguageFromFilename);
for (const name of names) {
  const lang = getLanguageFromFilename(name);
  const json = readJSON(name);
  trans[lang] = json;
  pathSets[lang] = new Set(dottedPaths(json));
}
for (const lang of langs) {
  if (lang === "en") {
    continue;
  }
  for (const transPath of pathSets[lang]) {
    if (!pathSets.en.has(transPath)) {
      console.error(`${lang} has unused translation: ${transPath}`);
    }
  }
}
var completions = {};
for (const lang of langs) {
  completions[lang] = pathSets[lang].size / pathSets.en.size;
  if (pathSets[lang].size !== pathSets.en.size && completions[lang] >= 1) {
    console.error(lang, pathSets[lang].size, "vs", "en", pathSets.en.size);
    completions[lang] = 0.99;
  }
}
function* walk({
  english,
  other,
  ancestors = []
}) {
  if (!(typeof english === "object" && english)) {
    return;
  }
  for (const key of Object.keys(english)) {
    const englishValue = english?.[key] ?? "";
    const otherValue = other?.[key] ?? "";
    if (typeof englishValue === "string") {
      yield [
        [...ancestors, key].join("."),
        englishValue,
        typeof otherValue === "string" ? otherValue : ""
      ];
    } else {
      yield* walk({
        english: englishValue,
        other: otherValue,
        ancestors: [...ancestors, key]
      });
    }
  }
}
function saveMissingTranslationsFor(lang) {
  const english = trans.en;
  const other = trans[lang];
  const data = walk({ english, other });
  const headers = ["Key", "en", lang];
  const csvData = [headers, ...data];
  const csv = Papa.unparse(csvData, { header: true });
  const filename = `./public/translations/${lang}.csv`;
  fs.writeFileSync(filename, csv, "utf-8");
}
for (const lang of langs) {
  saveMissingTranslationsFor(lang);
}
var vite_config_default = defineConfig((env) => {
  const config = {
    define: {
      __TRANSLATION_COMPLETION__: completions
    },
    build: {
      sourcemap: true
    },
    css: {
      modules: {
        // Create a more descriptive name that's easier to map back to the
        // actual source file for easier debugging
        generateScopedName: "[name]__[local]--[hash:base64:5]"
      }
    },
    plugins: [
      tailwindcss(),
      react(),
      VitePWA({
        mode: env.mode !== "development" ? "production" : "development",
        registerType: "prompt",
        manifest: {
          name: "Pok\xE9mon Type Calculator",
          short_name: "pkmn.help",
          lang: "en",
          start_url: "/",
          orientation: "any",
          icons: [
            {
              src: `/favicon-16.png?v=${iconVersion}`,
              sizes: "16x16",
              type: "image/png"
            },
            {
              src: `/favicon-32.png?v=${iconVersion}`,
              sizes: "32x32",
              type: "image/png"
            },
            {
              src: `/app-icon-regular-180.png?v=${iconVersion}`,
              sizes: "180x180",
              type: "image/png"
            },
            {
              src: `/app-icon-regular-192.png?v=${iconVersion}`,
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: `/app-icon-regular-512.png?v=${iconVersion}`,
              sizes: "512x512",
              type: "image/png"
            },
            {
              src: `/app-icon-maskable-180.png?v=${iconVersion}`,
              sizes: "180x180",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: `/app-icon-maskable-192.png?v=${iconVersion}`,
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: `/app-icon-maskable-512.png?v=${iconVersion}`,
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ],
          theme_color: "hsl(0 90% 35%)",
          background_color: "hsl(0 90% 35%)",
          display: "standalone"
        },
        // These files are downloaded in the background automatically and stored
        // in the service worker cache.
        includeAssets: [
          "data-pkmn.json",
          "locales/*.json",
          "manifest.json",
          "favicon-*.png",
          "app-icon-*.png",
          "fonts/*.woff2"
        ],
        workbox: {
          // These files are excluded from the service worker cache. Given there
          // are over 1000 images, we don't want to cache them all, much less
          // force the user to download them on first page load. Translations
          // should be downloaded by very few users, so we don't want to cache
          // them either.
          navigateFallbackDenylist: [
            /^\/translations\//,
            /^\/img\//,
            /^\/cry\//
          ]
        }
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
  return config;
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxOZXcgZm9sZGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxOZXcgZm9sZGVyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9OZXclMjBmb2xkZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgUGFwYSBmcm9tIFwicGFwYXBhcnNlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBVc2VyQ29uZmlnRXhwb3J0IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdGFpbHdpbmRjc3Mvdml0ZVwiXHJcblxyXG5jb25zdCBpY29uVmVyc2lvbiA9IDU7XHJcblxyXG5mdW5jdGlvbiByZWFkSlNPTihmaWxlbmFtZTogc3RyaW5nKTogYW55IHtcclxuICBjb25zdCB0ZXh0ID0gZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCBcInV0Zi04XCIpO1xyXG4gIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKHRleHQpO1xyXG4gIHJldHVybiBqc29uO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUcmFuc2xhdGlvbkZpbGVuYW1lcygpOiBzdHJpbmdbXSB7XHJcbiAgY29uc3QgYmFzZSA9IFwicHVibGljL2xvY2FsZXNcIjtcclxuICByZXR1cm4gZnMucmVhZGRpclN5bmMoYmFzZSkubWFwKChmKSA9PiBwYXRoLmpvaW4oYmFzZSwgZikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMYW5ndWFnZUZyb21GaWxlbmFtZShmaWxlbmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gcGF0aC5iYXNlbmFtZShmaWxlbmFtZSwgXCIuanNvblwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24qIGRvdHRlZFBhdGhzKGRhdGE6IGFueSk6IEdlbmVyYXRvcjxzdHJpbmc+IHtcclxuICB5aWVsZCogZG90dGVkUGF0aHNIZWxwZXIoXCJcIiwgZGF0YSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvdHRlZFBhdGhzSm9pbihiYXNlOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgaWYgKGJhc2UpIHtcclxuICAgIHJldHVybiBgJHtiYXNlfS4ke3BhdGh9YDtcclxuICB9XHJcbiAgcmV0dXJuIHBhdGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uKiBkb3R0ZWRQYXRoc0hlbHBlcihiYXNlOiBzdHJpbmcsIGRhdGE6IGFueSk6IEdlbmVyYXRvcjxzdHJpbmc+IHtcclxuICBpZiAoIWRhdGEpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgIGZvciAoY29uc3QgW2ksIHhdIG9mIGRhdGEuZW50cmllcygpKSB7XHJcbiAgICAgIHlpZWxkKiBkb3R0ZWRQYXRoc0hlbHBlcihkb3R0ZWRQYXRoc0pvaW4oYmFzZSwgU3RyaW5nKGkpKSwgeCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcclxuICAgICAgeWllbGQqIGRvdHRlZFBhdGhzSGVscGVyKGRvdHRlZFBhdGhzSm9pbihiYXNlLCBrKSwgdik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgeWllbGQgYmFzZTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHRyYW5zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbmNvbnN0IHBhdGhTZXRzOiBSZWNvcmQ8c3RyaW5nLCBTZXQ8c3RyaW5nPj4gPSB7fTtcclxuY29uc3QgbmFtZXMgPSBnZXRUcmFuc2xhdGlvbkZpbGVuYW1lcygpO1xyXG5jb25zdCBsYW5ncyA9IG5hbWVzLm1hcChnZXRMYW5ndWFnZUZyb21GaWxlbmFtZSk7XHJcbmZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykge1xyXG4gIGNvbnN0IGxhbmcgPSBnZXRMYW5ndWFnZUZyb21GaWxlbmFtZShuYW1lKTtcclxuICBjb25zdCBqc29uID0gcmVhZEpTT04obmFtZSk7XHJcbiAgdHJhbnNbbGFuZ10gPSBqc29uO1xyXG4gIHBhdGhTZXRzW2xhbmddID0gbmV3IFNldChkb3R0ZWRQYXRocyhqc29uKSk7XHJcbn1cclxuZm9yIChjb25zdCBsYW5nIG9mIGxhbmdzKSB7XHJcbiAgaWYgKGxhbmcgPT09IFwiZW5cIikge1xyXG4gICAgY29udGludWU7XHJcbiAgfVxyXG4gIGZvciAoY29uc3QgdHJhbnNQYXRoIG9mIHBhdGhTZXRzW2xhbmddKSB7XHJcbiAgICBpZiAoIXBhdGhTZXRzLmVuLmhhcyh0cmFuc1BhdGgpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYCR7bGFuZ30gaGFzIHVudXNlZCB0cmFuc2xhdGlvbjogJHt0cmFuc1BhdGh9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbmNvbnN0IGNvbXBsZXRpb25zOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XHJcbmZvciAoY29uc3QgbGFuZyBvZiBsYW5ncykge1xyXG4gIGNvbXBsZXRpb25zW2xhbmddID0gcGF0aFNldHNbbGFuZ10uc2l6ZSAvIHBhdGhTZXRzLmVuLnNpemU7XHJcbiAgLy8gbWFudWFsbHkgcm91bmQgZG93biBmb3Igbm90LXlldC1jb21wbGV0ZSB0cmFuc2xhdGlvbnNcclxuICBpZiAocGF0aFNldHNbbGFuZ10uc2l6ZSAhPT0gcGF0aFNldHMuZW4uc2l6ZSAmJiBjb21wbGV0aW9uc1tsYW5nXSA+PSAxKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGxhbmcsIHBhdGhTZXRzW2xhbmddLnNpemUsIFwidnNcIiwgXCJlblwiLCBwYXRoU2V0cy5lbi5zaXplKTtcclxuICAgIGNvbXBsZXRpb25zW2xhbmddID0gMC45OTtcclxuICB9XHJcbiAgLy8gUHJpbnQgbWlzc2luZyB0cmFuc2xhdGlvbnNcclxuXHJcbiAgLy8gZm9yIChjb25zdCBwYXRoIG9mIHBhdGhTZXRzLmVuKSB7XHJcbiAgLy8gICBmb3IgKGNvbnN0IGxhbmcgb2YgbGFuZ3MpIHtcclxuICAvLyAgICAgaWYgKCFwYXRoU2V0c1tsYW5nXS5oYXMocGF0aCkpIHtcclxuICAvLyAgICAgICBjb25zb2xlLndhcm4oXCJNaXNzaW5nIHRyYW5zbGF0aW9uXCIsIGxhbmcsIHBhdGgpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG59XHJcblxyXG5mdW5jdGlvbiogd2Fsayh7XHJcbiAgZW5nbGlzaCxcclxuICBvdGhlcixcclxuICBhbmNlc3RvcnMgPSBbXSxcclxufToge1xyXG4gIGVuZ2xpc2g6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG4gIG90aGVyOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuICBhbmNlc3RvcnM/OiBzdHJpbmdbXTtcclxufSk6IEdlbmVyYXRvcjxzdHJpbmdbXT4ge1xyXG4gIGlmICghKHR5cGVvZiBlbmdsaXNoID09PSBcIm9iamVjdFwiICYmIGVuZ2xpc2gpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGVuZ2xpc2gpKSB7XHJcbiAgICBjb25zdCBlbmdsaXNoVmFsdWUgPSBlbmdsaXNoPy5ba2V5XSA/PyBcIlwiO1xyXG4gICAgY29uc3Qgb3RoZXJWYWx1ZSA9IG90aGVyPy5ba2V5XSA/PyBcIlwiO1xyXG4gICAgaWYgKHR5cGVvZiBlbmdsaXNoVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgeWllbGQgW1xyXG4gICAgICAgIFsuLi5hbmNlc3RvcnMsIGtleV0uam9pbihcIi5cIiksXHJcbiAgICAgICAgZW5nbGlzaFZhbHVlLFxyXG4gICAgICAgIHR5cGVvZiBvdGhlclZhbHVlID09PSBcInN0cmluZ1wiID8gb3RoZXJWYWx1ZSA6IFwiXCIsXHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB5aWVsZCogd2Fsayh7XHJcbiAgICAgICAgZW5nbGlzaDogZW5nbGlzaFZhbHVlIGFzIGFueSxcclxuICAgICAgICBvdGhlcjogb3RoZXJWYWx1ZSBhcyBhbnksXHJcbiAgICAgICAgYW5jZXN0b3JzOiBbLi4uYW5jZXN0b3JzLCBrZXldLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVNaXNzaW5nVHJhbnNsYXRpb25zRm9yKGxhbmc6IHN0cmluZykge1xyXG4gIGNvbnN0IGVuZ2xpc2ggPSB0cmFucy5lbjtcclxuICBjb25zdCBvdGhlciA9IHRyYW5zW2xhbmddO1xyXG4gIGNvbnN0IGRhdGEgPSB3YWxrKHsgZW5nbGlzaCwgb3RoZXIgfSk7XHJcbiAgY29uc3QgaGVhZGVycyA9IFtcIktleVwiLCBcImVuXCIsIGxhbmddO1xyXG4gIGNvbnN0IGNzdkRhdGEgPSBbaGVhZGVycywgLi4uZGF0YV07XHJcbiAgY29uc3QgY3N2ID0gUGFwYS51bnBhcnNlKGNzdkRhdGEsIHsgaGVhZGVyOiB0cnVlIH0pO1xyXG4gIGNvbnN0IGZpbGVuYW1lID0gYC4vcHVibGljL3RyYW5zbGF0aW9ucy8ke2xhbmd9LmNzdmA7XHJcbiAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwgY3N2LCBcInV0Zi04XCIpO1xyXG59XHJcblxyXG5mb3IgKGNvbnN0IGxhbmcgb2YgbGFuZ3MpIHtcclxuICBzYXZlTWlzc2luZ1RyYW5zbGF0aW9uc0ZvcihsYW5nKTtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKChlbnYpID0+IHtcclxuICBjb25zdCBjb25maWc6IFVzZXJDb25maWdFeHBvcnQgPSB7XHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgX19UUkFOU0xBVElPTl9DT01QTEVUSU9OX186IGNvbXBsZXRpb25zLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgbW9kdWxlczoge1xyXG4gICAgICAgIC8vIENyZWF0ZSBhIG1vcmUgZGVzY3JpcHRpdmUgbmFtZSB0aGF0J3MgZWFzaWVyIHRvIG1hcCBiYWNrIHRvIHRoZVxyXG4gICAgICAgIC8vIGFjdHVhbCBzb3VyY2UgZmlsZSBmb3IgZWFzaWVyIGRlYnVnZ2luZ1xyXG4gICAgICAgIGdlbmVyYXRlU2NvcGVkTmFtZTogXCJbbmFtZV1fX1tsb2NhbF0tLVtoYXNoOmJhc2U2NDo1XVwiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdGFpbHdpbmRjc3MoKSxcclxuICAgICAgcmVhY3QoKSxcclxuICAgICAgVml0ZVBXQSh7XHJcbiAgICAgICAgbW9kZTogZW52Lm1vZGUgIT09IFwiZGV2ZWxvcG1lbnRcIiA/IFwicHJvZHVjdGlvblwiIDogXCJkZXZlbG9wbWVudFwiLFxyXG4gICAgICAgIHJlZ2lzdGVyVHlwZTogXCJwcm9tcHRcIixcclxuICAgICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgICAgbmFtZTogXCJQb2tcdTAwRTltb24gVHlwZSBDYWxjdWxhdG9yXCIsXHJcbiAgICAgICAgICBzaG9ydF9uYW1lOiBcInBrbW4uaGVscFwiLFxyXG4gICAgICAgICAgbGFuZzogXCJlblwiLFxyXG4gICAgICAgICAgc3RhcnRfdXJsOiBcIi9cIixcclxuICAgICAgICAgIG9yaWVudGF0aW9uOiBcImFueVwiLFxyXG4gICAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHNyYzogYC9mYXZpY29uLTE2LnBuZz92PSR7aWNvblZlcnNpb259YCxcclxuICAgICAgICAgICAgICBzaXplczogXCIxNngxNlwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBzcmM6IGAvZmF2aWNvbi0zMi5wbmc/dj0ke2ljb25WZXJzaW9ufWAsXHJcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiMzJ4MzJcIixcclxuICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc3JjOiBgL2FwcC1pY29uLXJlZ3VsYXItMTgwLnBuZz92PSR7aWNvblZlcnNpb259YCxcclxuICAgICAgICAgICAgICBzaXplczogXCIxODB4MTgwXCIsXHJcbiAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHNyYzogYC9hcHAtaWNvbi1yZWd1bGFyLTE5Mi5wbmc/dj0ke2ljb25WZXJzaW9ufWAsXHJcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBzcmM6IGAvYXBwLWljb24tcmVndWxhci01MTIucG5nP3Y9JHtpY29uVmVyc2lvbn1gLFxyXG4gICAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc3JjOiBgL2FwcC1pY29uLW1hc2thYmxlLTE4MC5wbmc/dj0ke2ljb25WZXJzaW9ufWAsXHJcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiMTgweDE4MFwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc3JjOiBgL2FwcC1pY29uLW1hc2thYmxlLTE5Mi5wbmc/dj0ke2ljb25WZXJzaW9ufWAsXHJcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc3JjOiBgL2FwcC1pY29uLW1hc2thYmxlLTUxMi5wbmc/dj0ke2ljb25WZXJzaW9ufWAsXHJcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIHRoZW1lX2NvbG9yOiBcImhzbCgwIDkwJSAzNSUpXCIsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcImhzbCgwIDkwJSAzNSUpXCIsXHJcbiAgICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIFRoZXNlIGZpbGVzIGFyZSBkb3dubG9hZGVkIGluIHRoZSBiYWNrZ3JvdW5kIGF1dG9tYXRpY2FsbHkgYW5kIHN0b3JlZFxyXG4gICAgICAgIC8vIGluIHRoZSBzZXJ2aWNlIHdvcmtlciBjYWNoZS5cclxuICAgICAgICBpbmNsdWRlQXNzZXRzOiBbXHJcbiAgICAgICAgICBcImRhdGEtcGttbi5qc29uXCIsXHJcbiAgICAgICAgICBcImxvY2FsZXMvKi5qc29uXCIsXHJcbiAgICAgICAgICBcIm1hbmlmZXN0Lmpzb25cIixcclxuICAgICAgICAgIFwiZmF2aWNvbi0qLnBuZ1wiLFxyXG4gICAgICAgICAgXCJhcHAtaWNvbi0qLnBuZ1wiLFxyXG4gICAgICAgICAgXCJmb250cy8qLndvZmYyXCIsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgICAvLyBUaGVzZSBmaWxlcyBhcmUgZXhjbHVkZWQgZnJvbSB0aGUgc2VydmljZSB3b3JrZXIgY2FjaGUuIEdpdmVuIHRoZXJlXHJcbiAgICAgICAgICAvLyBhcmUgb3ZlciAxMDAwIGltYWdlcywgd2UgZG9uJ3Qgd2FudCB0byBjYWNoZSB0aGVtIGFsbCwgbXVjaCBsZXNzXHJcbiAgICAgICAgICAvLyBmb3JjZSB0aGUgdXNlciB0byBkb3dubG9hZCB0aGVtIG9uIGZpcnN0IHBhZ2UgbG9hZC4gVHJhbnNsYXRpb25zXHJcbiAgICAgICAgICAvLyBzaG91bGQgYmUgZG93bmxvYWRlZCBieSB2ZXJ5IGZldyB1c2Vycywgc28gd2UgZG9uJ3Qgd2FudCB0byBjYWNoZVxyXG4gICAgICAgICAgLy8gdGhlbSBlaXRoZXIuXHJcbiAgICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrRGVueWxpc3Q6IFtcclxuICAgICAgICAgICAgL15cXC90cmFuc2xhdGlvbnNcXC8vLFxyXG4gICAgICAgICAgICAvXlxcL2ltZ1xcLy8sXHJcbiAgICAgICAgICAgIC9eXFwvY3J5XFwvLyxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gIH07XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK04sT0FBTyxVQUFVO0FBQ2hQLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFzQztBQUMvQyxTQUFTLGVBQWU7QUFDeEIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksVUFBVTtBQUN0QixPQUFPLGlCQUFpQjtBQU54QixJQUFNLG1DQUFtQztBQVF6QyxJQUFNLGNBQWM7QUFFcEIsU0FBUyxTQUFTLFVBQXVCO0FBQ3ZDLFFBQU0sT0FBVSxnQkFBYSxVQUFVLE9BQU87QUFDOUMsUUFBTSxPQUFPLEtBQUssTUFBTSxJQUFJO0FBQzVCLFNBQU87QUFDVDtBQUVBLFNBQVMsMEJBQW9DO0FBQzNDLFFBQU0sT0FBTztBQUNiLFNBQVUsZUFBWSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQVcsVUFBSyxNQUFNLENBQUMsQ0FBQztBQUMzRDtBQUVBLFNBQVMsd0JBQXdCLFVBQTBCO0FBQ3pELFNBQVksY0FBUyxVQUFVLE9BQU87QUFDeEM7QUFFQSxVQUFVLFlBQVksTUFBOEI7QUFDbEQsU0FBTyxrQkFBa0IsSUFBSSxJQUFJO0FBQ25DO0FBRUEsU0FBUyxnQkFBZ0IsTUFBY0EsT0FBc0I7QUFDM0QsTUFBSSxNQUFNO0FBQ1IsV0FBTyxHQUFHLElBQUksSUFBSUEsS0FBSTtBQUFBLEVBQ3hCO0FBQ0EsU0FBT0E7QUFDVDtBQUVBLFVBQVUsa0JBQWtCLE1BQWMsTUFBOEI7QUFDdEUsTUFBSSxDQUFDLE1BQU07QUFDVDtBQUFBLEVBQ0Y7QUFDQSxNQUFJLE1BQU0sUUFBUSxJQUFJLEdBQUc7QUFDdkIsZUFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssUUFBUSxHQUFHO0FBQ25DLGFBQU8sa0JBQWtCLGdCQUFnQixNQUFNLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQzlEO0FBQUEsRUFDRjtBQUNBLE1BQUksT0FBTyxTQUFTLFVBQVU7QUFDNUIsZUFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE9BQU8sUUFBUSxJQUFJLEdBQUc7QUFDekMsYUFBTyxrQkFBa0IsZ0JBQWdCLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDQSxNQUFJLE9BQU8sU0FBUyxVQUFVO0FBQzVCLFVBQU07QUFBQSxFQUNSO0FBQ0Y7QUFFQSxJQUFNLFFBQTZCLENBQUM7QUFDcEMsSUFBTSxXQUF3QyxDQUFDO0FBQy9DLElBQU0sUUFBUSx3QkFBd0I7QUFDdEMsSUFBTSxRQUFRLE1BQU0sSUFBSSx1QkFBdUI7QUFDL0MsV0FBVyxRQUFRLE9BQU87QUFDeEIsUUFBTSxPQUFPLHdCQUF3QixJQUFJO0FBQ3pDLFFBQU0sT0FBTyxTQUFTLElBQUk7QUFDMUIsUUFBTSxJQUFJLElBQUk7QUFDZCxXQUFTLElBQUksSUFBSSxJQUFJLElBQUksWUFBWSxJQUFJLENBQUM7QUFDNUM7QUFDQSxXQUFXLFFBQVEsT0FBTztBQUN4QixNQUFJLFNBQVMsTUFBTTtBQUNqQjtBQUFBLEVBQ0Y7QUFDQSxhQUFXLGFBQWEsU0FBUyxJQUFJLEdBQUc7QUFDdEMsUUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsR0FBRztBQUMvQixjQUFRLE1BQU0sR0FBRyxJQUFJLDRCQUE0QixTQUFTLEVBQUU7QUFBQSxJQUM5RDtBQUFBLEVBQ0Y7QUFDRjtBQUNBLElBQU0sY0FBc0MsQ0FBQztBQUM3QyxXQUFXLFFBQVEsT0FBTztBQUN4QixjQUFZLElBQUksSUFBSSxTQUFTLElBQUksRUFBRSxPQUFPLFNBQVMsR0FBRztBQUV0RCxNQUFJLFNBQVMsSUFBSSxFQUFFLFNBQVMsU0FBUyxHQUFHLFFBQVEsWUFBWSxJQUFJLEtBQUssR0FBRztBQUN0RSxZQUFRLE1BQU0sTUFBTSxTQUFTLElBQUksRUFBRSxNQUFNLE1BQU0sTUFBTSxTQUFTLEdBQUcsSUFBSTtBQUNyRSxnQkFBWSxJQUFJLElBQUk7QUFBQSxFQUN0QjtBQVVGO0FBRUEsVUFBVSxLQUFLO0FBQUEsRUFDYjtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVksQ0FBQztBQUNmLEdBSXdCO0FBQ3RCLE1BQUksRUFBRSxPQUFPLFlBQVksWUFBWSxVQUFVO0FBQzdDO0FBQUEsRUFDRjtBQUNBLGFBQVcsT0FBTyxPQUFPLEtBQUssT0FBTyxHQUFHO0FBQ3RDLFVBQU0sZUFBZSxVQUFVLEdBQUcsS0FBSztBQUN2QyxVQUFNLGFBQWEsUUFBUSxHQUFHLEtBQUs7QUFDbkMsUUFBSSxPQUFPLGlCQUFpQixVQUFVO0FBQ3BDLFlBQU07QUFBQSxRQUNKLENBQUMsR0FBRyxXQUFXLEdBQUcsRUFBRSxLQUFLLEdBQUc7QUFBQSxRQUM1QjtBQUFBLFFBQ0EsT0FBTyxlQUFlLFdBQVcsYUFBYTtBQUFBLE1BQ2hEO0FBQUEsSUFDRixPQUFPO0FBQ0wsYUFBTyxLQUFLO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxXQUFXLENBQUMsR0FBRyxXQUFXLEdBQUc7QUFBQSxNQUMvQixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMsMkJBQTJCLE1BQWM7QUFDaEQsUUFBTSxVQUFVLE1BQU07QUFDdEIsUUFBTSxRQUFRLE1BQU0sSUFBSTtBQUN4QixRQUFNLE9BQU8sS0FBSyxFQUFFLFNBQVMsTUFBTSxDQUFDO0FBQ3BDLFFBQU0sVUFBVSxDQUFDLE9BQU8sTUFBTSxJQUFJO0FBQ2xDLFFBQU0sVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJO0FBQ2pDLFFBQU0sTUFBTSxLQUFLLFFBQVEsU0FBUyxFQUFFLFFBQVEsS0FBSyxDQUFDO0FBQ2xELFFBQU0sV0FBVyx5QkFBeUIsSUFBSTtBQUM5QyxFQUFHLGlCQUFjLFVBQVUsS0FBSyxPQUFPO0FBQ3pDO0FBRUEsV0FBVyxRQUFRLE9BQU87QUFDeEIsNkJBQTJCLElBQUk7QUFDakM7QUFHQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxRQUFRO0FBQ25DLFFBQU0sU0FBMkI7QUFBQSxJQUMvQixRQUFRO0FBQUEsTUFDTiw0QkFBNEI7QUFBQSxJQUM5QjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQTtBQUFBO0FBQUEsUUFHUCxvQkFBb0I7QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFlBQVk7QUFBQSxNQUNaLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNOLE1BQU0sSUFBSSxTQUFTLGdCQUFnQixlQUFlO0FBQUEsUUFDbEQsY0FBYztBQUFBLFFBQ2QsVUFBVTtBQUFBLFVBQ1IsTUFBTTtBQUFBLFVBQ04sWUFBWTtBQUFBLFVBQ1osTUFBTTtBQUFBLFVBQ04sV0FBVztBQUFBLFVBQ1gsYUFBYTtBQUFBLFVBQ2IsT0FBTztBQUFBLFlBQ0w7QUFBQSxjQUNFLEtBQUsscUJBQXFCLFdBQVc7QUFBQSxjQUNyQyxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLEtBQUsscUJBQXFCLFdBQVc7QUFBQSxjQUNyQyxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLEtBQUssK0JBQStCLFdBQVc7QUFBQSxjQUMvQyxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLEtBQUssK0JBQStCLFdBQVc7QUFBQSxjQUMvQyxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLEtBQUssK0JBQStCLFdBQVc7QUFBQSxjQUMvQyxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLEtBQUssZ0NBQWdDLFdBQVc7QUFBQSxjQUNoRCxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsY0FDTixTQUFTO0FBQUEsWUFDWDtBQUFBLFlBQ0E7QUFBQSxjQUNFLEtBQUssZ0NBQWdDLFdBQVc7QUFBQSxjQUNoRCxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsY0FDTixTQUFTO0FBQUEsWUFDWDtBQUFBLFlBQ0E7QUFBQSxjQUNFLEtBQUssZ0NBQWdDLFdBQVc7QUFBQSxjQUNoRCxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsY0FDTixTQUFTO0FBQUEsWUFDWDtBQUFBLFVBQ0Y7QUFBQSxVQUNBLGFBQWE7QUFBQSxVQUNiLGtCQUFrQjtBQUFBLFVBQ2xCLFNBQVM7QUFBQSxRQUNYO0FBQUE7QUFBQTtBQUFBLFFBR0EsZUFBZTtBQUFBLFVBQ2I7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNUCwwQkFBMEI7QUFBQSxZQUN4QjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFVLGFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1QsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
