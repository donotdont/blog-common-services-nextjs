"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Skeleton from "@mui/material/Skeleton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

type Props = {
    dictionary: any;
}

export default function SidebarSkeleton(props: Props) {
    const numbers = [1, 2, 3]
    const t = props.dictionary;
    const [value, setValue] = React.useState(0);
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" sx={{ marginBottom: 1 }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            aria-label="basic tabs example"
                            variant="fullWidth"
                        >
                            <Tab label={t['Recent']} />
                            <Tab label={t['Popular']} />
                        </Tabs>
                    </Box>
                    <>
                        <List component="nav" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {numbers && numbers.length > 0 && numbers.map((num, keyNum) => {

                                return (
                                    <ListItemButton key={keyNum} divider={numbers.length - 1 > keyNum}>
                                        <ListItemText
                                            primary={<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />}
                                            secondary={<Skeleton animation="wave" height={10} width="80%" />} />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </>
                </Box>
            </Card>

            <Card variant="outlined" sx={{ marginBottom: 1 }}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader-company"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader-company">
                            {t['Company'].toUpperCase()}
                        </ListSubheader>
                    }
                >
                    {numbers && numbers.length > 0 && numbers.map((num, keyNum) => {
                        return (
                            <ListItemButton key={keyNum} divider={numbers.length - 1 > keyNum}>
                                <ListItemText primary={<Skeleton animation="wave" height={10} width="80%" />} />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Card>

            <Card variant="outlined" sx={{ marginBottom: 1 }}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader-category"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader-category">
                            {t['Category'].toUpperCase()}
                        </ListSubheader>
                    }
                >
                    {numbers && numbers.length > 0 && numbers.map((num, keyNum) => {
                        return (
                            <ListItemButton key={keyNum} divider={numbers.length - 1 > keyNum}>
                                <ListItemText primary={<Skeleton animation="wave" height={10} width="80%" />} />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Card>
        </Box>
    );
}