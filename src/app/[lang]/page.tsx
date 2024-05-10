import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import Counter from "./components/counter";
import LocaleSwitcher from "./components/locale-switcher";
import Navigation from "@/components/Navigation";
import "./../globals.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BlogPostCard from "@/components/BlogPostCard";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <Navigation dictionary={dictionary} />
      <LocaleSwitcher />
      <Container maxWidth="xl" sx={{ marginTop: '24px' }}>
        <Grid container spacing={2}>
          <Grid item md={9}>
            <Grid container direction="row" justify="center" alignItems="stretch" spacing={4} >
              <BlogPostCard dictionary={dictionary} />
            </Grid>
          </Grid>
          <Grid item md={3}>
            md=3
          </Grid>
        </Grid>
      </Container>
      <p>Current locale: {lang}</p>
      <p>
        This text is rendered on the server:{" "}
        {dictionary["server-component"].welcome}
      </p>
      <Counter dictionary={dictionary.counter} />
    </div>
  );
}