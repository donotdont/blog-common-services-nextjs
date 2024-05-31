import "server-only";
import type { Locale } from "./i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries: any = {
  "en": () => import("./dictionaries/en.json").then((module) => module.default),
  "fr": () => import("./dictionaries/fr.json").then((module) => module.default),
};

/*export const getDictionary = async (locale: Locale) =>
  locale ? (dictionaries[locale.substring(0, 2)]?.() ?? dictionaries.en()) : dictionaries.en();*/
export const getDictionary = async (locale: Locale) => dictionaries[locale ? locale.substring(0, 2) : 'en']();