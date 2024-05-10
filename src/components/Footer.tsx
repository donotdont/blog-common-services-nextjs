
"use client";
import Link from "next/link";
import Image from 'next/image';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

type Props = {
    dictionary: string;
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
                        {/*<a href="https://validator.w3.org/feed/check.cgi?url=https%3A//blog.common-services.com/feed.rss" target="_blank" rel="noopener noreferrer"><img src={logoRSSPNG} width="88" height="31" alt="[Valid RSS]" title="Validate my RSS feed" /></a>*/}

                        <Typography
                            variant="h6"
                            component="a"
                            href="https://validator.w3.org/feed/check.cgi?url=https%3A//blog.common-services.com/feed.rss"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image src="/valid-rss-rogers.png" alt="Valid RSS" width={88} height={31} priority />
                        </Typography>

                        <Typography component="p">
                            <span className={"copy-left"}>©</span> {year} <Link href="https://common-services.com" target="_blank"><Button size="small">Common-Services</Button></Link>, {t["homemade with love and powered by"]} <Link href='https://reactjs.org' target="_blank" rel="noopener noreferrer"><Button size="small">React</Button></Link>, <Link href='https://material-ui.com' target="_blank" rel="noopener noreferrer"><Button size="small">Material UI</Button></Link> & <Link href='https://strapi.io' target="_blank" rel="noopener noreferrer"><Button size="small">Strapi</Button></Link>.
                        </Typography>
                    </Grid>
                </Grid>
            </footer>
        </Container>
    );
}