"use client";
import React, { Suspense } from "react";
/* MUI */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

/* GraphQL */
import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import { Padding } from "@mui/icons-material";
import Moment from "react-moment";

import populars from "@/components/popular.json";
import CardContent from "@mui/material/CardContent";
import ListSubheader from "@mui/material/ListSubheader";

type Props = {
    dictionary: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (<>{children}</>)}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Sidebar(props: Props) {
    const t = props.dictionary;
    const getCurrentLng = t['language-selected'].toLowerCase();
    const popularPosts = populars[getCurrentLng];
    var where_posts = '{tag:{slug_contains: "' + getCurrentLng + '" },active:true }';
    var where_pages = '{ active:true }';
    const sidebarQuery = gql`
    query Sidebar{
        posts(where: ${where_posts},sort:"published:DESC",limit:10){
            title
            published
            slugurl
        }
        pages(where:${where_pages},limit:10){
            title_${getCurrentLng}
            slug
        }
        categories{
            name
            slug
        }
    }
    `;

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function dateFormat(post) {
        return (<Moment format="D MMMM YYYY" titleFormat="DD MMMM YYYY" locale={t['language-selected'].toLowerCase()} withTitle>{post.published}</Moment>)
    }

    function removeAtEN(name) {
        return (t['language-selected'] == "FR") ? name.replace(/ @fr/g, '') : name.replace(/ @en/g, '');
    }

    function Result({ source, data }: { source: string; data: unknown }) {
        return (
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" sx={{ marginBottom: 1 }}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                variant="fullWidth"
                            >
                                <Tab label={t['Recent']} {...a11yProps(0)} />
                                <Tab label={t['Popular']} {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <List component="nav" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {data.posts && data.posts.length > 0 && data.posts.map((post, keyPost) => {

                                    return (
                                        <ListItemButton key={keyPost} divider={data.posts.length - 1 > keyPost} component="a" href={'/post/' + post.slugurl}>
                                            <ListItemText primary={post.title} secondary={dateFormat(post)} />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <List component="nav">
                                {popularPosts && popularPosts.length > 0 && popularPosts.map((popular, keyPopular) => {
                                    return (
                                        <ListItemButton key={keyPopular} divider={popularPosts.length - 1 > keyPopular} component="a" href={'/post/' + popular.slugurl}>
                                            <ListItemText primary={popular.title} secondary={dateFormat(popular)} />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </CustomTabPanel>
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
                        {data.pages && data.pages.length > 0 && data.pages.map((page, keyPage) => {
                            return (
                                <ListItemButton key={keyPage} divider={data.pages.length - 1 > keyPage} component="a" href={'/' + page.slug}>
                                    <ListItemText primary={page["title_" + getCurrentLng]} />
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
                        {data.categories && data.categories.length > 0 && data.categories.map((category, keyCategory) => {
                            return (
                                <ListItemButton key={keyCategory} divider={data.categories.length - 1 > keyCategory} component="a" href={'/' + category.slug}>
                                    <ListItemText primary={removeAtEN(category.name)} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Card>
            </Box>
        )
    }

    function SuspenseQuerySidebar({ children }: React.PropsWithChildren) {
        const result = useSuspenseQuery(sidebarQuery, { fetchPolicy: "cache-first" }); //no-cache cache-first
        return (
            <>
                <Result source="useSuspenseQuery(sidebarQuery)" data={result.data} />
                <React.Fragment key="children">{children}</React.Fragment>
            </>
        );
    }

    return (
        <Suspense>
            <SuspenseQuerySidebar />
        </Suspense>
    );
}