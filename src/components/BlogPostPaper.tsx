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

/* GraphQL */
import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

/* Time */
import Moment from 'react-moment';
import 'moment/locale/fr';

/* HTML */
//import { Markup } from "react-render-markup";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

/* JQuery */
import $ from 'jquery';
import GalleryImages from './GalleryImages';
import CardContent from '@mui/material/CardContent';

import SocialMedia from './SocialMedia';
import BlogPostPaperSkeleton from './BlogPostPaperSkeleton';
import PageNotFound from './PageNotFound';
import BlogPostSoNice from './BlogPostSoNice';

type Props = {
    dictionary: any;
    title: string;
}

interface PostProps {
    children: React.ReactNode;
}

declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
    interface Global {
        jQuery: any;
    }
}


export default function BlogPostPaper({ dictionary, title }: Props) {
    const t = dictionary;
    //const lang = t['language-selected'].toLowerCase();
    const [slugurl, setSlugurl] = React.useState<string>(title);

    /*useEffect(() => {
        window.jQuery = $;
        window.$ = $;
        global.jQuery = $;
    });*/

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.jQuery = $;
            window.$ = $;
            global.jQuery = $;
        }
    });

    const postQuery: any = gql`query getPost($slugurl: String){
        posts(where: {slugurl_contains:$slugurl,active:true},limit:1){
          title
          seo_title
          meta_description
          summary
          published
          modified:updated_at
          slugurl
          body
          medialibrary{
            file{
              url
            }
          }
          categories{
            name
            slug
          }
          tag{
            name
            slug
          }
          user{
              first_name
              last_name
              profile_image
              {
                url
              }
          }
        }
      }
    `;

    function Result({ source, data }: { source: string; data: any }) {
        /*return (
          <div>
            <span>Source: {source}</span>
            <span>
              Data:
              {JSON.stringify(data)}
            </span>
          </div>
        );*/
        const post = (data && data.posts && data.posts.length > 0) ? data.posts[0] : null;

        function dateFormat(_post: any) {
            return (<Moment format="D MMMM YYYY" titleFormat="DD MMMM YYYY" locale={t['language-selected'].toLowerCase()} withTitle>{_post.published}</Moment>)
        }

        function removeAtENFR(name: string) {
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
                {(post) ?
                    (<Paper elevation={2}>
                        <Card elevation={0}>
                            <CardHeader
                                avatar={<Avatar sx={{ width: 50, height: 50 }} alt={(post && post.user) ? post.user.first_name + '  ' + post.user.last_name : ""} src={process.env.NEXT_PUBLIC_STRAPI + ((post && post.user && post.user.profile_image && post.user.profile_image.url) ? post.user.profile_image.url : "/uploads/kisspng_avatar_user_449cb96c34.png")} />}
                                title={<Typography variant="h5" component="h1">{post.title}</Typography>}
                                subheader={<Typography color="textSecondary">
                                    <Event style={{ fontSize: 14 }} /> {dateFormat(post)} {t['by']} <AccountBox style={{ fontSize: 14 }} /> {(post && post.user) ? post.user.first_name + '  ' + post.user.last_name : ""}
                                </Typography>}
                            />

                            <CardActions>
                                <CardContent>
                                    <Typography component={'span'} variant={'body2'}>
                                        <ReactMarkdown className={'doc-markdown'} remarkPlugins={[remarkGfm, remarkParse, remarkRehype] as any} rehypePlugins={[rehypeRaw, rehypeStringify] as any} remarkRehypeOptions={{ passThrough: ['link'] }} urlTransform={(value: string) => { return (!value.includes('https://')) ? process.env.NEXT_PUBLIC_STRAPI + value : value }} >
                                            {post.body}
                                        </ReactMarkdown>
                                    </Typography>
                                </CardContent>
                            </CardActions>

                            {post.slugurl === "pourquoi-sonice" && (
                                <BlogPostSoNice dictionary={t} />
                            )}

                            <CardActions>
                                {post.categories.map((category: any, keyCategory: number) => {
                                    return <Chip variant="outlined" label={removeAtENFR(category.name)} key={`chip-${keyCategory}`} component="a" href={`${process.env.NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_HOST}/${t['language-selected'].toLowerCase()}/category/${category.slug}`} clickable sx={{ margin: "8px" }} />;
                                })}
                            </CardActions>

                            <CardActions><SocialMedia dictionary={t} post={post} size={32} /></CardActions>
                            <GalleryImages />

                        </Card>
                    </Paper>) : (<PageNotFound dictionary={t} />)}
            </React.Fragment>)
    }

    function SuspenseQueryPost() {
        let result = useSuspenseQuery(postQuery, {
            fetchPolicy: "network-only",
            variables: { slugurl },
        }); //no-cache cache-first // fetchPolicy: "cache-first",
        return (
            <>
                <Result key="result-post" source="useSuspenseQuery(postQuery)" data={result.data} />
            </>
        );
    }

    return (
        <Suspense fallback={<BlogPostPaperSkeleton />}>
            <SuspenseQueryPost />
        </Suspense>
    );
}