import { InferGetStaticPropsType } from 'next'
import { GetStaticProps } from 'next'

import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import BlogPostCard from "@/components/BlogPostCard";
import Navigation from "@/components/Navigation";

import "./globals.css";
import Container from "@mui/material/Container";
import { Grid, Paper, Stack } from "@mui/material";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
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
          <Grid item md={9}>
            <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={4} >
              <BlogPostCard dictionary={dictionary} />
            </Grid>
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