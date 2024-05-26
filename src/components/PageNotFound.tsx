import React from "react";
import Link from "next/link";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

type Props = {
    dictionary: string;
}

export default function PageNotFound({ dictionary }: Props) {
    const t = dictionary;
    return (<React.Fragment>
        <Paper elevation={2}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h1">
                        {t['Page not found']} :(
                    </Typography>
                    <Typography component="p">
                        {t["Looks like you've followed a broken link or entered a URL that doesn't exist on this site"]}.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={`/`}><Button size="small">{t['Back to our site']}</Button></Link>
                </CardActions>
            </Card>
        </Paper>
    </React.Fragment>);
}