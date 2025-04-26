import {
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  lazy, 
  Suspense, 
} from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  NavLink,
  Navigate,
  Outlet,
  RouterProvider,
  createHashRouter,
  useLocation, 
} from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useRegisterSW } from "virtual:pwa-register/react";
import { AppContext, AppContextProvider } from "../hooks/useAppContext";
import { useComputedStyleProperty } from "../hooks/useComputedStyleProperty";
import { useFetchJSON } from "../hooks/useFetchJSON";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

import { CoverageType, Pokemon } from "../misc/data-types";
import { detectLanguage } from "../misc/detectLanguage";
import { formatPokemonName } from "../misc/formatPokemonName";
import { iterCycle, iterNext, iterStutter } from "../misc/iter";

import { publicPath } from "../misc/settings";

import { Header } from "./Header";
import { Footer } from "./Footer"; 
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { ShieldIcon, SwordsIcon } from "lucide-react";


import { Separator } from "./ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";


const LazyScreenDefense = lazy(() => import("@/screens/ScreenDefense"));
const LazyScreenDefenseTeam = lazy(() => import("@/screens/ScreenDefenseTeam"));
const LazyScreenOffense = lazy(() => import("@/screens/ScreenOffense"));
const LazyScreenWeaknessCoverage = lazy(
  () => import("@/screens/ScreenWeaknessCoverage")
);
const LazyScreenCoverageList = lazy(
  () => import("@/screens/ScreenCoverageList")
);
const LazyScreenError = lazy(() => import("@/screens/ScreenError"));
const LazyCrash = lazy(() => import("./Crash"));


const LazyScreenContact = lazy(() => import("@/screens/ScreenContact"));
const LazyScreenPrivacy = lazy(() => import("@/screens/ScreenPrivacy"));
const LazyScreenDisclaimer = lazy(() => import("@/screens/ScreenDisclaimer"));



const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,

    errorElement: (
      <Suspense fallback={<div>Loading Error Screen...</div>}>
        <LazyScreenError />
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate replace to="/defense/" /> },
      {
        path: "offense",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading Offense Calculator...</div>}>
                <LazyScreenOffense />
              </Suspense>
            ),
          },
          {
            path: "coverage",
            children: [
              {
                index: true,
                element: (
                  <Suspense
                    fallback={<div>Loading Weakness Coverage Summary...</div>}
                  >
                    <LazyScreenWeaknessCoverage />
                  </Suspense>
                ),
              },

              {
                path: "weakness",
                element: (
                  <Suspense fallback={<div>Loading Weakness List...</div>}>
                    <LazyScreenCoverageList mode="weakness" />
                  </Suspense>
                ),
              },
              {
                path: "resistance",
                element: (
                  <Suspense fallback={<div>Loading Resistance List...</div>}>
                    <LazyScreenCoverageList mode="resistance" />
                  </Suspense>
                ),
              },
              {
                path: "normal",
                element: (
                  <Suspense fallback={<div>Loading Normal Damage List...</div>}>
                    <LazyScreenCoverageList mode="normal" />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "defense",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading Defense Calculator...</div>}>
                <LazyScreenDefense />
              </Suspense>
            ),
          },
          {
            path: "team",
            element: (
              <Suspense fallback={<div>Loading Defense Team Builder...</div>}>
                <LazyScreenDefenseTeam />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "_error",
        element: (
          <Suspense fallback={<div>Loading Crash Reporter...</div>}>
            <LazyCrash />
          </Suspense>
        ),
      },

      
      {
        path: "contact",
        element: (
          <Suspense fallback={<div>Loading Contact Page...</div>}>
            <LazyScreenContact />
          </Suspense>
        ),
      },
      {
        path: "privacy",
        element: (
          <Suspense fallback={<div>Loading Privacy Page...</div>}>
            <LazyScreenPrivacy />
          </Suspense>
        ),
      },
      {
        path: "disclaimer",
        element: (
          <Suspense fallback={<div>Loading Disclaimer Page...</div>}>
            <LazyScreenDisclaimer />
          </Suspense>
        ),
      },
      

      { path: "*", element: <Navigate replace to="/defense/" /> }, 
    ],
  },
]);

function getFallback(key: string): string {
  if (key === "title") {
    return "Pokémon Type Calculator";
  }
  return "…";
}

function useTranslationsWithBlankFallback() {
  const { t: translation, ready } = useTranslation(undefined, {
    useSuspense: false,
  });
  return ready ? translation : getFallback;
}

const pokeballThemes = ["premier", "regular"] as const;
type PokeballTheme = (typeof pokeballThemes)[number];

const pokeballThemeCycle = iterStutter(iterCycle(pokeballThemes), 2);

export function Layout(): ReactNode {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  async function updateApp() {
    setNeedRefresh(false);
    await updateServiceWorker(true);
  }

  
  const t = useTranslationsWithBlankFallback();
  const { i18n } = useTranslation(undefined, { useSuspense: false });

  const [isLoading, setIsLoading] = useState(true);
  const [coverageTypes, setCoverageTypes] = useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = useState<Pokemon[]>([]);

  const [easterEgg, setEasterEgg] = useState<Pokemon>();
  const [easterEggLoadedID, setEasterEggLoadedID] = useState("");
  const [pokeballTheme, setPokeballTheme] = useState<PokeballTheme>("premier");

  useEffect(() => {
    setPokeballTheme(iterNext(pokeballThemeCycle));
  }, []);

  const [language] = useLanguage();

  useEffect(() => {
    async function load() {
      await i18n.changeLanguage(language || detectLanguage());
      document.documentElement.lang = i18n.language;
    }

    if (i18n.isInitialized) {
      load();
    }
  }, [language, i18n, i18n.isInitialized]);

  const [theme] = useTheme();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDark = theme === "dark" || (theme === "auto" && isDarkMode);
  let dataTheme = theme;
  if (theme === "auto") {
    dataTheme = isDark ? "dark" : "light";
  }

  const h1Ref = useRef<HTMLHeadingElement>(null);
  const themeColor = useComputedStyleProperty(h1Ref.current, "backgroundColor");

  const location = useLocation();

  const [currentTab, setCurrentTab] = useState<"offense" | "defense">(() =>
    location.pathname.startsWith("/defense") ? "defense" : "offense"
  );

  useEffect(
    () =>
      setCurrentTab(() =>
        location.pathname.startsWith("/defense") ? "defense" : "offense"
      ),
    [location.pathname]
  );

  const jsonURL = new URL("data-pkmn.json", publicPath).href;
  const allPokemonResponse = useFetchJSON<Pokemon[]>(jsonURL);

  useEffect(() => {
    if (allPokemonResponse.type !== "done") {
      return;
    }
    const allPokemon = allPokemonResponse.data;
    const fallbackCoverageTypes = allPokemon.map<CoverageType>((pkmn) => {
      const currentLang = i18n.language;
      const name = formatPokemonName({
        speciesName: pkmn.speciesNames[currentLang] || pkmn.speciesNames.en,
        formName: pkmn.formNames[currentLang] || pkmn.formNames.en,
      });
      const number = String(pkmn.number);
      const types = pkmn.types;
      return { number, name, types };
    });

    setIsLoading(false);
    setCoverageTypes(fallbackCoverageTypes);
    setFallbackCoverageTypes(fallbackCoverageTypes);
    setAllPokemon(allPokemon);
  }, [allPokemonResponse, i18n.language]);

  const appContext = useMemo<AppContext>(
    () => ({
      allPokemon: AllPokemon,
      coverageTypes,
      easterEggLoadedID,
      easterEggPokemon: easterEgg,
      fallbackCoverageTypes,

      isLoading: isLoading || !i18n.isInitialized,
      needsAppUpdate: needRefresh,
      pokeballTheme,
      setCoverageTypes,
      updateApp,
    }),
    [
      AllPokemon,
      coverageTypes,
      easterEgg,
      easterEggLoadedID,
      fallbackCoverageTypes,
      isLoading,
      i18n.isInitialized,
      needRefresh,
      pokeballTheme,
      setCoverageTypes,
      updateApp,
    ]
  );

  return (
    <AppContextProvider value={appContext}>
      <HelmetProvider>
        <Helmet>
          <html data-theme={dataTheme} />
          {/* Use the hook's translation function for the title */}
          <title>{t("title")}</title>
          {/* Add theme color meta tag if needed */}
          {/* <meta name="theme-color" content={themeColor} /> */}
        </Helmet>

        {/* The main layout structure stays in the initial bundle */}
        {/* Use min-h-screen and flex flex-col to ensure footer is at the bottom */}
        <div className="min-h-screen flex flex-col">
          <Header />

          {/* Navigation Tabs */}
          {/* Conditionally render tabs only on calculator pages, maybe? Or always show? Keeping it always for now */}
          <nav className="w-full flex justify-center items-center py-4">
            <div className="bg-muted rounded-full p-1 shadow-lg">
              {/* Use currentTab state to control which tab is visually active */}
              <Tabs value={currentTab}>
                <TabsList className="w-full gap-1">
                  <TabsTrigger value="offense" className="p-4 m-2" asChild>
                    <NavLink
                      to="/offense/"
                      className={({ isActive }) =>
                        cn(
                          "px-4 py-2 text-center transition-all duration-200 rounded-full",
                          "flex items-center justify-center",
                          isActive
                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        )
                      }
                    >
                      <SwordsIcon className="mr-1 h-4 w-4" />
                      {/* Using hardcoded string here per request for specific elements */}
                      Offense
                    </NavLink>
                  </TabsTrigger>
                  <TabsTrigger value="defense" className="p-4 m-2" asChild>
                    <NavLink
                      to="/defense/"
                      className={({ isActive }) =>
                        cn(
                          "px-4 py-2 text-center transition-all duration-200 rounded-full",
                          "flex items-center justify-center",
                          isActive
                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        )
                      }
                    >
                      <ShieldIcon className="mr-1 h-4 w-4" />
                      {/* Using hardcoded string here per request for specific elements */}
                      Defense
                    </NavLink>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </nav>

          {/* Main content area - flex-1 makes it grow and push footer down */}
          <main className="flex-1 p-2 sm:p-4">
            {/*
              The Outlet is where the route components (calculators or static pages) are rendered.
              Suspense fallbacks are handled by the router configuration.
            */}
            <Outlet />

           {(location.pathname.includes("offense") || location.pathname.includes("defense")) && (
            <>
            <Separator />
              <div className="space-y-6 mt-20">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Pokémon Type Calculator</CardTitle>
                  <CardDescription>
                    Quickly find type weaknesses and resistances for strategic
                    battles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Welcome! This tool helps you understand how Pokémon types
                    interact in battle. Every Pokémon and attack has a type
                    (like Fire, Water, Grass, etc.), and these types decide how
                    much damage attacks deal. Knowing type matchups is key to
                    winning!
                  </p>
                  <p>
                    Use this calculator to see what types are strong or weak
                    against others. It's useful for building your team, planning
                    your moves, and predicting what attacks your Pokémon can
                    handle.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                 <CardTitle className="text-2xl">How to Use the Calculator</CardTitle>
                  <CardDescription>
                    Learn about Offense and Defense modes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground">
                    Offense Mode
                  </h3>
                  <p>
                    Want to know what your attacks are good against? Choose
                    "Offense". Select the type of your attack or your Pokémon's
                    type. The calculator shows which types take more damage
                    (Super Effective) and which take less or no damage (Not Very
                    Effective, No Effect). Use this to pick the best moves for a
                    fight.
                  </p>

                  <h3 className="text-lg font-semibold text-foreground">
                    Defense Mode
                  </h3>
                  <p>
                    Want to know what your Pokémon is weak to? Choose "Defense".
                    Select your Pokémon's type(s). The calculator shows types
                    that hit it for extra damage (Weaknesses), types it takes
                    less damage from (Resistances), and types that do no damage
                    (Immunities). This helps you avoid big hits.
                  </p>
                  <p>
                    Special moves and abilities can change these rules. Check
                    options for effects like "Freeze-Dry" or "Scrappy".
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                 <CardTitle className="text-2xl">Type Matchups Explained</CardTitle>
                  <CardDescription>
                    Damage multipliers at a glance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>Here's how type effectiveness changes damage:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>2x (Super Effective):</strong> Attack hits hard!
                    </li>
                    <li>
                      <strong>1x (Normal):</strong> Standard damage.
                    </li>
                    <li>
                      <strong>0.5x (Not Very Effective):</strong> Attack doesn't
                      do much.
                    </li>
                    <li>
                      <strong>0x (Immune):</strong> Attack does nothing.
                    </li>
                  </ul>
                  <p>
                    If a Pokémon has two types, the effects from both types are
                    combined. For example, a Pokémon weak to Water (2x) and weak
                    to Ground (2x) takes 4x damage from a Water attack! This
                    tool does the math for you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                 <CardTitle className="text-2xl">Game Generations</CardTitle>
                  <CardDescription>
                    Type charts can change between games.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    The type chart changed when new types (Steel, Dark, Fairy)
                    were added in later games. Select the generation that
                    matches your game for correct results.
                  </p>
                </CardContent>
              </Card>
            </div>
            </>
           )}
          </main>

          {/* Footer - placed after main content, mt-auto on footer pushes it down */}
          <Footer />
        </div>
      </HelmetProvider>
    </AppContextProvider>
  );
}

export function App(): ReactNode {
  return <RouterProvider router={router} />;
}