
import { getDictionary } from "../../../../../get-dictionary";
import { Locale } from "../../../../../i18n-config";
import BlogPostCategoryCard from "@/components/BlogPostCategoryCard";
import Navigation from "@/components/Navigation";
import "./../../../globals.css";

import Container from "@mui/material/Container";
import { Grid, Paper, Stack } from "@mui/material";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default async function IndexPage({
  params: { lang, slug },
}: {
  params: { lang: Locale, slug: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
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
              <BlogPostCategoryCard dictionary={dictionary} slug={slug} />
            </Grid>
          </Grid>
          <Grid item md={3}>
            <Sidebar dictionary={dictionary} />
          </Grid>
        </Grid>
      </Container>

      <Footer dictionary={dictionary} size={32} />
    </div>
  );
}