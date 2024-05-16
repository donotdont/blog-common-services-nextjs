/*import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
*/

import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import Counter from "./[lang]/components/counter";
import LocaleSwitcher from "./[lang]/components/locale-switcher";
import BlogPostCard from "@/components/BlogPostCard";
import Navigation from "@/components/Navigation";

import "./globals.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Paper, Stack } from "@mui/material";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import SidebarSkeleton from "@/components/SidebarSkeleton";

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
      <Container maxWidth="xl" sx={{ marginTop: '40px' }}>
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

    <Footer dictionary={dictionary} size={32}  />
      {/*<p>Current locale: {lang}</p>
      <p>
        This text is rendered on the server:{" "}
        {dictionary["server-component"].welcome}
      </p>
  <Counter dictionary={dictionary.counter} />*/}
    </div>
  );
}