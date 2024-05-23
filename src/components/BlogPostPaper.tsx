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
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';

/* GraphQL */
import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

/* Time */
import Moment from 'react-moment';
import 'moment/locale/fr';

import SocialMedia from './SocialMedia';

/* HTML */
//import { Markup } from "react-render-markup";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/* JQuery */
import $ from 'jquery';
import GalleryImages from './GalleryImages';


type Props = {
    dictionary: string;
    title: string;
}

interface PostProps {
    children: React.ReactNode;
    title: string;
}

export default function BlogPostPaper({ dictionary, title }: Props) {
    const t = dictionary;
    //const lang = t['language-selected'].toLowerCase();
    const [slugurl, setSlugurl] = React.useState<string>(title);

    useEffect(() => {
        window.jQuery = $;
        window.$ = $;
        global.jQuery = $;
    });

    const postQuery: TypedDocumentNode<Variables> = gql`query getPost($slugurl: String){
        posts(where: {slugurl:$slugurl,active:true},limit:1){
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
        const post = data ? data.posts[0] : null;

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
                {(post) ? (<Paper elevation={2} sx={{ padding: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <ButtonBase>
                                <Avatar sx={{ width: 50, height: 50 }} alt={(post && post.user) ? post.user.first_name + '  ' + post.user.last_name : ""} src={process.env.NEXT_PUBLIC_STRAPI + ((post && post.user && post.user.profile_image && post.user.profile_image.url) ? post.user.profile_image.url : "/uploads/kisspng_avatar_user_449cb96c34.png")} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs container>
                            <Grid item xs container direction="column" spacing={16}>
                                <Grid item xs>
                                    <Typography variant="h5" component="h1">
                                        {post.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        <Event style={{ fontSize: 14 }} /> {dateFormat(post)} {t['by']} <AccountBox style={{ fontSize: 14 }} /> {(post && post.user) ? post.user.first_name + '  ' + post.user.last_name : ""}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <CardActions>
                        <Typography component={'span'} variant={'body2'}>
                            <ReactMarkdown className={'doc-markdown'} children={post.body} rehypePlugins={[rehypeRaw] as any} urlTransform={(value: string) => { return (!value.includes('https://')) ? process.env.NEXT_PUBLIC_STRAPI + value : value }} />
                        </Typography>
                    </CardActions>

                    {post.slugurl === "pourquoi-sonice" && (
                        <SoNice />
                    )}

                    <CardActions>
                        {post.categories.map((cat, keyCat) => {
                            return <Chip variant="outlined" label={removeAtENFR(cat.name)} key={`chip-${keyCat}`} component="a" href={`/category/${cat.slug}`} clickable sx={{ margin: "8px" }} />;
                        })}
                    </CardActions>

                    <CardActions><SocialMedia dictionary={t} post={post} size={32} /></CardActions>
                    <GalleryImages />
                </Paper>) : <>Not Found</>}
            </React.Fragment>
        );
    }

    function SuspenseQueryPost({ children, title }: PostProps) {
        let result = useSuspenseQuery(postQuery, {
            fetchPolicy: "no-cache",
            variables: { slugurl },
        }); //no-cache cache-first // fetchPolicy: "cache-first",
        return (
            <>
                <Result key="result-post" source="useSuspenseQuery(postQuery)" data={result.data} />
                <React.Fragment key="children">{children}</React.Fragment>
            </>
        );
    }

    return (
        <Suspense>
            <SuspenseQueryPost slugurl={slugurl} />
        </Suspense>
    );
}