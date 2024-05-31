import type { Metadata, ResolvingMetadata } from 'next';
import { getDictionary } from "../../../../get-dictionary";
import { Locale } from "../../../../i18n-config";
import Navigation from "@/components/Navigation";
import "./../../globals.css";
import "./gallery.css";

import Container from "@mui/material/Container";
import { Grid, Paper, Stack } from "@mui/material";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import BlogPostPaper from "@/components/BlogPostPaper";
import BlogPostPaperSkeleton from "@/components/BlogPostPaperSkeleton";
import React from 'react';

interface Props {
  params: {
    lang: Locale;
    title: string;
  }
}

export default async function IndexTitlePage({
  params: { lang, title },
}: Props) {
  const dictionary: any = await getDictionary(lang);

  return (
    <React.Fragment>
      <Navigation dictionary={dictionary} />
      <Container maxWidth="xl" sx={{ marginTop: '88px' }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12} md={9} sx={{ marginButtom: 50 }}>
            <BlogPostPaper dictionary={dictionary} title={title} />
          </Grid>
          <Grid item md={3}>
            <Sidebar dictionary={dictionary} />
          </Grid>
        </Grid>
      </Container>

      <Footer dictionary={dictionary} />
    </React.Fragment>
  );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slugurl = params.title;

  // fetch data
  const post = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/posts?slugurl_contains=${slugurl}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post[0].seo_title,
    description: post[0].meta_description,
    openGraph: {
      images: [process.env.NEXT_PUBLIC_STRAPI + post[0].medialibrary.file.url, ...previousImages],
    },
  }
}