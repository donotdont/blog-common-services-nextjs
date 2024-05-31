'use client';

import React, { startTransition, Suspense } from 'react';

//import { useLocale, useTranslations } from 'next-intl';
//import LocaleSwitcherSelect from './LocaleSwitcherSelect';
//import { locales } from '@/config';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

/*import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { useRouter, usePathname } from '@/navigation';*/

import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "../../i18n-config";

/* GraphQL */
import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

interface Props {
    handleCloseUserMenu: React.MouseEventHandler<HTMLButtonElement>;
    dictionary: any;
}

export default function LocaleMenuSwitcher({ dictionary, handleCloseUserMenu }: Props) {
    //const t = useTranslations('LocaleSwitcher');
    //const locale = useLocale();

    /*const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(event: MouseEvent) {
        //console.log(event.currentTarget.getAttribute('data-value'));
        const nextLocale = event.currentTarget.getAttribute('data-value');
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
        handleCloseUserMenu();
    }*/
    const t = dictionary;
    const currentLang = t['language-selected'].toLowerCase();
    const postTranslateQuery: any = gql`
        query Translations($slugurl: String) {
            translation_en: translations(where: { post_en: { slugurl: $slugurl } }) {
              post_en {
                slugurl
              }
              post_fr {
                slugurl
              }
            }
          
            translation_fr: translations(where: { post_fr: { slugurl: $slugurl } }) {
              post_en {
                slugurl
              }
              post_fr {
                slugurl
              }
            }
          }
    `;

    const pathName = usePathname();
    const redirectedPathName = (locale: Locale) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    const redirectedPathNamePost = (locale: Locale, path: string) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        segments[2] = path
        return segments.join("/");
    };
    //console.log('i18n', i18n);

    function removePostUnderscore(name: any) {
        return name.replace(/post_/g, '');
    }

    function Result({ source, data }: { source: string; data: any }) {
        //console.log(data);
        const segments = pathName.split("/");
        if (segments[1] && segments[1] == 'en' && data && data.translation_en && data.translation_en.length > 0 && data.translation_en[0]["post_" + segments[1]].slugurl != segments[2]) {
            //console.log(data["translation_"+currentLang] && data["translation_"+currentLang][0]["post_" + segments[1]].slugurl+" != "+segments[2]);
            return redirect(`/${segments[1]}/${data.translation_en && data.translation_en[0]["post_fr"].slugurl}`);
        }
        if (segments[1] && segments[1] == 'fr' && data && data.translation_fr && data.translation_fr.length > 0 && data.translation_fr[0]["post_" + segments[1]].slugurl != segments[2]) {
            //console.log(data["translation_"+currentLang] && data["translation_"+currentLang][0]["post_" + segments[1]].slugurl+" != "+segments[2]);
            return redirect(`/${segments[1]}/${data.translation_fr && data.translation_fr[0]["post_en"].slugurl}`);
        }
        return (
            <>
                {data && data["translation_" + currentLang] && data["translation_" + currentLang].length > 0 ?
                    Object.keys(data["translation_" + currentLang][0]).map((keyTranslation: any) =>
                    (keyTranslation != "__typename" && <Link key={keyTranslation} href={data["translation_" + currentLang][0][keyTranslation] ? redirectedPathNamePost(removePostUnderscore(keyTranslation), data["translation_" + currentLang][0][keyTranslation].slugurl) : '#'}>
                        <MenuItem disabled={data["translation_" + currentLang][0][keyTranslation] == null}>
                            <Typography textAlign="center">
                                {t['locale'][removePostUnderscore(keyTranslation)]}
                            </Typography>
                        </MenuItem>
                    </Link>
                    )) : i18n && i18n.locales.map((locale: Locale, keyLocale: number) => (
                        <Link key={keyLocale} href={redirectedPathName(locale)}>
                            <MenuItem>
                                <Typography textAlign="center">
                                    {t['locale'][locale]}
                                </Typography>
                            </MenuItem>
                        </Link>
                    ))}
                {/*i18n && i18n.locales.map((locale) => {

                    return (
                        <React.Fragment key={locale}>
                            {data && data["translation_"+currentLang] && data["translation_"+currentLang].length > 0 ? <Link key={locale} href={redirectedPathNamePost(locale, data.translation_en.length > 0 && data.translation_en[0]["post_" + locale] ? data.translation_en[0]["post_" + locale].slugurl:data.translation_fr[0]["post_" + locale].slugurl)}>
                                <MenuItem data-value={locale}>
                                    <Typography textAlign="center">
                                        {t['locale'][locale]}
                                    </Typography>
                                </MenuItem>
                            </Link> : <Link key={locale} href={redirectedPathName(locale)}>
                                <MenuItem data-value={locale}>
                                    <Typography textAlign="center">
                                        {t['locale'][locale]}
                                    </Typography>
                                </MenuItem>
                            </Link>
                            }
                        </React.Fragment>
                    )
                })
            */}
            </>
        )
    }

    function SuspenseQueryPostTranslate() {
        let result = useSuspenseQuery(postTranslateQuery, {
            fetchPolicy: "no-cache",
            variables: { slugurl: pathName.split("/")[2] ?? null },
        }); //no-cache cache-first // fetchPolicy: "cache-first",
        return (
            <>
                <Result key="result-post" source="useSuspenseQuery(postTranslateQuery)" data={result.data} />
            </>
        );
    }

    return (
        <Suspense>
            <SuspenseQueryPostTranslate />
        </Suspense>
    );

}