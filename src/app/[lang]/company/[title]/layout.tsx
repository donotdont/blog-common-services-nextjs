/* MUI Theme */
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

/* i18n */
import { i18n, type Locale } from "../../../../../i18n-config";

/*export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}*/

import { Roboto } from "next/font/google";
import theme from '@/theme';

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

/* Cookie */
import { cookies } from "next/headers";

/* GraphQL */
import { ApolloWrapper } from '@/components/ApolloWrapper';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale, title: string };
}) {
  const cookieStore = cookies();
  const delay = Number(cookieStore.get("apollo-x-custom-delay")?.value ?? 1000);
  return (
    <html lang={params.lang}>
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ApolloWrapper delay={delay}>
              {children}
            </ApolloWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Blog Common-Services",
  description: "Modules, extensions, addons, plugins for Prestashop, Oscommerce, Open Cart, Magento, Shopify.",
};