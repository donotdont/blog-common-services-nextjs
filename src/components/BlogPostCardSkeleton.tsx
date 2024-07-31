import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { CardActionArea, CardActions, CardContent, IconButton, Stack } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function BlogPostCardSkeleton() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <React.Fragment>
            {numbers && numbers.length > 0 && numbers.map((num: any, keyNum: number) => {
                return (<Grid key={keyNum} item md={4}>
                    <Card>
                        <CardHeader
                            avatar={
                                <ButtonBase>
                                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                </ButtonBase>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={<Skeleton
                                animation="wave"
                                height={10}
                                width="80%"
                                style={{ marginBottom: 6 }}
                            />}
                            subheader={<Skeleton animation="wave" height={10} width="40%" />}
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
                </Grid>);
            })}
        </React.Fragment>
    );
}