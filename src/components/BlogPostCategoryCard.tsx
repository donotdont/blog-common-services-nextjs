"use client";
import * as React from 'react';
import { useState, Suspense, startTransition } from 'react';
import Link from "next/link";

/* MUI */
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';

/* GraphQL */
import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

/* Time */
import Moment from 'react-moment';
import 'moment/locale/fr';
import ButtonBase from '@mui/material/ButtonBase';
import CardActionArea from '@mui/material/CardActionArea';
import SocialMedia from './SocialMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';
import Pagination from '@mui/material/Pagination';
import { Interface } from 'readline';

//import { getClient } from "./../ApolloClient";

type Props = {
  dictionary: string;
  slug: string;
}

interface PostProps {
  children: React.ReactNode;
  page: number;
  category: string;
}

export default function BlogPostCategoryCard({ dictionary, slug }: Props) {
  //const { data } = await getClient().query({ query: userQuery });

  //console.log(data);
  const t = dictionary;
  const [page, setPage] = React.useState(1);
  const [category, setCategory] = React.useState(slug);

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    startTransition(() => {
      setPage(value);
    })
  };

  const postsQuery: TypedDocumentNode<Variables> = gql`
  query getPosts($page: Int, $category: String) {
    postsConnection(
      where: {
        categories: { slug: $category }
        tag: { slug: "${t['language-selected'].toLowerCase()}" }
        active: true
      }
      start: $page
      sort: "published:DESC"
      limit: 10
    ) {
      aggregate {
        totalCount
        count
      }
      values {
        title
        summary
        published
        slugurl
        medialibrary {
          file {
            url
          }
        }
        categories {
          name
          slug
        }
        tag {
          name
          slug
        }
        user {
          first_name
          last_name
          profile_image {
            url
          }
        }
      }
    }
  }  
`;

  function dateFormat(post) {
    return (<Moment format="D MMMM YYYY" titleFormat="DD MMMM YYYY" locale={t['language-selected'].toLowerCase()} withTitle>{post.published}</Moment>)
  }

  function removeAtENFR(name) {
    return (t['language-selected'] == "FR") ? name.replace(/ @fr/g, '') : name.replace(/ @en/g, '');
  }

  function Result({ source, data }: { source: string; data: unknown }) {
    /*return (
      <div>
        <span>Source: {source}</span>
        <span>
          Data:
          {JSON.stringify(data)}
        </span>s
      </div>
    );*/
    return (
      <>
        {/*JSON.stringify(data.postsConnection.values)*/}
        {/*<BlogPostCardSkeleton />*/}
        {data && data.postsConnection && data.postsConnection.values.map((post, keyPost) => {
          //console.log(post);
          return (
            <Grid item md={4} key={keyPost}>
              <Card>
                <CardHeader
                  avatar={
                    <ButtonBase>
                      <Avatar aria-label={(post && post.user) ? post.user.first_name + '  ' + post.user.last_name : ""} src={'https://strapi2.common-services.com' + post.user.profile_image.url}></Avatar>
                    </ButtonBase>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.user.first_name + " " + post.user.last_name}
                  subheader={dateFormat(post)}
                />
                <Link href={`${process.env.NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_HOST}/${t['language-selected'].toLowerCase()}/${post.slugurl}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="194"
                      image={process.env.NEXT_PUBLIC_STRAPI + post.medialibrary.file.url}
                      alt={post.title}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" color="text.primary">{post.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{post.summary}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>

                {post.categories && post.categories.length > 0 && (
                  <CardActions>
                    <Stack direction="row" spacing={1}>
                      {post.categories.map((category, KeyCategory) => (
                        <Chip
                          key={KeyCategory}
                          label={removeAtENFR(category.name)}
                          component="a"
                          href={"/category/" + category.slug}
                          variant="outlined"
                          size="small"
                          clickable
                        />
                      ))}
                    </Stack>
                  </CardActions>
                )}

                <CardActions><SocialMedia dictionary={t} post={post} size={32} /></CardActions>

              </Card>
            </Grid>
          )
        }
        )}
        <Grid
          item
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ marginTop: 2 }}
        >
          <Grid item>
            <Pagination count={(Math.ceil(data.postsConnection.aggregate.count / 10))} page={page} variant="outlined" color="primary" onChange={handleChange} />
          </Grid>
        </Grid>
      </>
    );
  }

  function SuspenseQueryPosts({ children, page, category }: PostProps) {
    let result = useSuspenseQuery(postsQuery, {
      fetchPolicy: "no-cache",
      variables: { page: (page-1), category },
    }); //no-cache cache-first // fetchPolicy: "cache-first",
    return (
      <>
        <Result source="useSuspenseQuery(postsQuery)" data={result.data} />
        <React.Fragment key="children">{children}</React.Fragment>
      </>
    );
  }

  return (
    <Suspense fallback={<BlogPostCardSkeleton />}>
      <SuspenseQueryPosts page={page} category={category} />
    </Suspense>
  );
}