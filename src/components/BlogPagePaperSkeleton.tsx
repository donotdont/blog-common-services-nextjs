import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { CardActionArea, CardActions, CardContent, IconButton, Paper, Stack } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function BlogPagePaperSkeleton() {
    return (
        <React.Fragment>
                <Paper elevation={2}>
                    <Card elevation={0}>
                        <CardHeader
                            title={<Skeleton
                                animation="wave"
                                height={10}
                                width="80%"
                                style={{ marginBottom: 6 }}
                            />}
                        />
                        <CardActionArea>
                            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                            <CardContent>
                                <React.Fragment>
                                    <Skeleton variant="text" animation="wave" width="50%" sx={{ fontSize: '1.5rem', marginBottom: '12px' }} />
                                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={10} width="80%" />
                                </React.Fragment>
                            </CardContent>
                        </CardActionArea>

                        <CardActions>
                            <CardContent>
                                <Stack direction="row" spacing={1}>
                                    <Skeleton animation="wave" height={15} width={30} />
                                    <Skeleton animation="wave" height={15} width={30} />
                                    <Skeleton animation="wave" height={15} width={30} />
                                </Stack>
                            </CardContent>
                        </CardActions>

                        <CardActions>
                            <Stack direction="row" spacing={2}>
                                <Skeleton animation={false} variant="circular" width={32} height={32} />
                                <Skeleton animation={false} variant="circular" width={32} height={32} />
                                <Skeleton animation={false} variant="circular" width={32} height={32} />
                                <Skeleton animation={false} variant="circular" width={32} height={32} />
                                <Skeleton animation={false} variant="circular" width={32} height={32} />
                            </Stack>
                        </CardActions>

                    </Card>
                </Paper>
        </React.Fragment>
    );
}