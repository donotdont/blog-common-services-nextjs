export const i18n = {
    defaultLocale: "en",
    locales: ["en", "fr"],
    localeDetection: true,
  } as const;
  
  export type Locale = (typeof i18n)["locales"][number];