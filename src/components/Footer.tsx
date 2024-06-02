
"use client";
import Link from "next/link";
import Image from 'next/image';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

/* Analytic */
import GoogleAnalytics from "./GoogleAnalytics";

/* Userback */
import Userback from "./Userback";

type Props = {
    dictionary: any;
}

export default function Footer({ dictionary }: Props) {
    const t = dictionary;
    var today = new Date(), year = today.getFullYear();
    return (
        <Container maxWidth="xl" sx={{ marginTop: '24px' }}>
            <footer className={"footer"}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        minHeight: '16vh',
                        textAlign: 'center',
                    }}
                >
                    <Grid item xs={3}>
                        {/*<a href="https://validator.w3.org/feed/check.cgi?url=https%3A//blog.common-services.com/feed.rss" target="_blank"><img src={logoRSSPNG} width="88" height="31" alt="[Valid RSS]" title="Validate my RSS feed" /></a>*/}

                        <Typography
                            variant="h6"
                            component="a"
                            href="https://validator.w3.org/feed/check.cgi?url=https%3A//blog.common-services.com/feed.rss"
                            target="_blank"
                           
                        >
                            <Image src="/valid-rss-rogers.png" alt="Valid RSS" width={88} height={31} priority />
                        </Typography>

                        <Typography component="p">
                            <span className={"copy-left"}>©</span> {year} <Button size="small" href="https://common-services.com" target="_blank" data-testid="cs-link">Common-Services</Button>, {t["homemade with love and powered by"]} <Button size="small" href='https://reactjs.org' target="_blank">React</Button>, <Button size="small" href='https://nextjs.org' target="_blank">Next.js</Button>, <Button size="small" href='https://material-ui.com' target="_blank">Material UI</Button> & <Button size="small" href='https://strapi.io' target="_blank">Strapi</Button>.
                        </Typography>
                    </Grid>
                </Grid>
                <GoogleAnalytics />
                <Userback />
            </footer>
        </Container>
    );
}