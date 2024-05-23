"use client";
import * as React from 'react';
import { useState, Suspense, startTransition, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";

/* MUI */
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AccountBox, Event } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

/* GraphQL */
import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

/* Time */
import Moment from 'react-moment';
import 'moment/locale/fr';

/* HTML */
//import { Markup } from "react-render-markup";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import BlogPagePaperSkeleton from './BlogPostPaperSkeleton';

type Props = {
    dictionary: string;
    title: string;
}

interface PageProps {
    children: React.ReactNode;
    title: string;
}

export default function BlogPagePaper({ dictionary, title }: Props) {
    const t = dictionary;
    //const lang = t['language-selected'].toLowerCase();
    const [slug, setSlug] = React.useState<string>(title);

    const pageQuery: TypedDocumentNode<Variables> = gql`query getPage($slug: String){
        pages(where: {slug:$slug,active:true},limit:1){
            title_${t['language-selected'].toLowerCase()}
			body_${t['language-selected'].toLowerCase()}
			slug
        }
      }
    `;

    function Result({ source, data }: { source: string; data: unknown }) {
        /*return (
          <div>
            <span>Source: {source}</span>
            <span>
              Data:
              {JSON.stringify(data)}
            </span>
          </div>
        );*/
        const page = data ? data.pages[0] : null;

        function dateFormat(_post: unknown) {
            return (<Moment format="D MMMM YYYY" titleFormat="DD MMMM YYYY" locale={t['language-selected'].toLowerCase()} withTitle>{_post.published}</Moment>)
        }

        function removeAtENFR(name) {
            return (t['language-selected'] == "FR") ? name.replace(/ @fr/g, '') : name.replace(/ @en/g, '');
        }

        function transformImageUri(_uri: string) {
            return process.env.NEXT_PUBLIC_HOST + _uri;
        }

        function endPointUri() {
            return process.env.NEXT_PUBLIC_HOST;
        }

        return (
            <React.Fragment>
                {(page) ?
                    (<Paper elevation={2}>
                        <Card elevation={0}>
                            <CardHeader
                                title={<Typography variant="h5" component="h1">{page[`title_${t['language-selected'].toLowerCase()}`]}</Typography>}
                            />

                            <CardActions>
                                <CardContent>
                                    <Typography component={'span'} variant={'body2'}>
                                        <ReactMarkdown className={'doc-markdown'} children={page[`body_${t['language-selected'].toLowerCase()}`]} rehypePlugins={[rehypeRaw] as any} urlTransform={(value: string) => { return (!value.includes('https://')) ? process.env.NEXT_PUBLIC_STRAPI + value : value }} />
                                    </Typography>
                                </CardContent>
                            </CardActions>

                        </Card>
                    </Paper>) : (<>Not Found</>)}
            </React.Fragment>)
    }

    function SuspenseQueryPage({ children, title }: PageProps) {
        let result = useSuspenseQuery(pageQuery, {
            fetchPolicy: "no-cache",
            variables: { slug },
        }); //no-cache cache-first // fetchPolicy: "cache-first",
        return (
            <>
                <Result key="result-post" source="useSuspenseQuery(pageQuery)" data={result.data} />
                <React.Fragment key="children">{children}</React.Fragment>
            </>
        );
    }

    return (
        <Suspense fallback={<BlogPagePaperSkeleton />}>
            <SuspenseQueryPage />
        </Suspense>
    );
}