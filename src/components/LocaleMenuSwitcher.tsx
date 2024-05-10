'use client';

import React, { startTransition } from 'react';

//import { useLocale, useTranslations } from 'next-intl';
//import LocaleSwitcherSelect from './LocaleSwitcherSelect';
//import { locales } from '@/config';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

/*import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { useRouter, usePathname } from '@/navigation';*/

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "../../i18n-config";

interface Props {
    handleCloseUserMenu: React.MouseEventHandler<HTMLButtonElement>;
    dictionary: string;
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

    const pathName = usePathname();
    const redirectedPathName = (locale: Locale) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    //console.log('i18n', i18n);

    return (
        <>
            {i18n && i18n.locales.map((locale) => {

                return (
                    <Link key={locale} href={redirectedPathName(locale)}>
                        <MenuItem key={locale} data-value={locale}>
                            <Typography textAlign="center">
                                {t['locale'][locale]}
                            </Typography>
                        </MenuItem>
                    </Link>
                )
            })
            }
        </>
    )
}