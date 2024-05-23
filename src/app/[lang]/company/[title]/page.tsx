import { getDictionary } from "../../../../../get-dictionary";
import { Locale } from "../../../../../i18n-config";
import Navigation from "@/components/Navigation";
import "./../../../globals.css";
import "./bootstrap.css";

import Container from "@mui/material/Container";
import { Grid, Paper, Stack } from "@mui/material";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import BlogPagePaper from "@/components/BlogPagePaper";

interface Props {
  params: {
    lang: Locale;
    title: string;
  }
}

export default async function IndexTitlePage({
  params: { lang, title },
}: Props) {
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
          <Grid item xs={12} sm={12} md={9} sx={{ marginButtom: 50 }}>
            <BlogPagePaper dictionary={dictionary} title={title} />
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