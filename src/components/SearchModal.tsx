import * as React from 'react';
import { startTransition, Suspense, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';
import { Alert, CircularProgress, Fade, FormLabel, Input, LinearProgress, OutlinedInput } from '@mui/material';
import { WidthFull } from '@mui/icons-material';

//import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
//import SearchIcon from '@mui/icons-material/Search';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import DirectionsIcon from '@mui/icons-material/Directions';

//import Divider from '@mui/material/Divider';
//import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
//import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import ArticleIcon from '@mui/icons-material/Article';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

/* GraphQL */
import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Link from 'next/link';
import SearchModalSkeleton from './SearchModalSkeleton';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    dictionary: any;
}

type PostProps = {
    search: string;
}

const ShotcutSearch = styled('div')(({ theme }) => ({
    fontSize: '12px !important',
    fontWeight: 'bold',
    lineHeight: '20px',
    marginLeft: '4px',
    color: '#888888',
    border: '1px solid rgb(223, 226, 231)',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: '0px 4px',
    borderRadius: '7px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: '8px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export default function SearchModal({ dictionary }: Props) {
    const t = dictionary;

    const [open, setOpen] = React.useState(false);
    const [keyword, setKeyword] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [loading, setLoading] = React.useState<boolean>(true);
    const [searchCountdownInterval, setSearchCountdownInterval] = React.useState<any>(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const rootRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        /*const timeOutId = setTimeout(() => setDisplayMessage(search), 500);
        return () => clearTimeout(timeOutId);*/
        setLoading(true);
        const searchCountdownInterval2 = setTimeout(() => {
            // Decrease the countdown value every second
            setLoading(true);
            startTransition(() => {
                setSearch(keyword);
            });
        }, 2000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearTimeout(searchCountdownInterval2);

    }, [keyword]);

    function handleChange(event: React.ChangeEvent<any>) {
        /*startTransition(() => {
            setSearch(event.target.value);
        });*/
        setLoading(true);
        /*if (searchCountdownInterval)
            clearTimeout(searchCountdownInterval);
        setSearchCountdownInterval(window.setTimeout(() => {
            setLoading(true);
        }, 1500));*/
        setKeyword(event.target.value);
    };

    function handleSearch(event: React.MouseEvent<unknown>) {
        /*startTransition(() => {
            setSearch(event.target.value);
        });*/
        setLoading(true);
        /*if (searchCountdownInterval)
            clearTimeout(searchCountdownInterval);
        setSearchCountdownInterval(window.setTimeout(() => {
            setLoading(true);
        }, 1500));*/
        setKeyword(keyword);
    };

    const searchPostsQuery: any = gql`
    query searchPosts($search: String, $lang: String){
        posts(where: {_or:[{title_contains:$search}, {summary_contains:$search}, {slugurl_contains:$search}, {body_contains:$search}],tag:{slug_contains: $lang } }, limit:10){
            title
            slugurl
            published
            tag{
                name
                slug
            }
            categories{
                name
                slug
            }
        }
        categories(where: { slug_contains: $lang }){
            name
            slug
        }
    }
`;

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            //console.log(`Pressed keyCode ${event ?? event.key}`,event ?? event.key);
            if (event && ((event.key === 'k' || event.key === 'K') && event.ctrlKey == true)) {
                // Do code here
                handleOpen();
                event.preventDefault();
            }
        };

        document.addEventListener("keydown", keyDownHandler);

        return () => document.removeEventListener("keydown", keyDownHandler);
    }, []);

    const [countdown, setCountdown] = React.useState(5);

    /*useEffect(() => {
        const countdownInterval = setInterval(() => {
            // Decrease the countdown value every second
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(countdownInterval);
    }, []); // Empty dependency array ensures the effect runs only once

    useEffect(() => {
        // Use setTimeout to reset the countdown after it reaches 0
        if (countdown === 0) {
            setTimeout(() => {
                setCountdown(5); // Reset the countdown to 5 seconds
            }, 2000); // Delay before resetting (2 seconds)
        }
    }, [countdown]); // Effect re-runs whenever countdown changes*/

    function removeAtENFR(name: string) {
        return (t['language-selected'] == "FR") ? name.replace(/ @fr/g, '') : name.replace(/ @en/g, '');
    }

    function Result({ source, data }: { source: string; data: any }) {

        /*return (
          <div>
            <span>Source: {source}</span>
            <span>
              Data:
              {JSON.stringify(data)}
            </span>
          </div>
        );*/

        return (
            <React.Fragment>
                {data && data.categories.length > 0 ? (<Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ padding: '8px' }}>
                    {data.categories.map((category: any, keyCategory: number) => (
                        <Chip
                            key={keyCategory}
                            label={removeAtENFR(category.name)}
                            component="a"
                            href={`${process.env.NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_HOST}/${t['language-selected'].toLowerCase()}/category/${category.slug}`}
                            variant="outlined"
                            size="small"
                            clickable
                        />
                    ))}
                </Stack>) : ""}

                {data && data.posts.length > 0 ? (<MenuList>
                    {data.posts.map((post: any, keyPost: number) => {
                        var title = post.title;
                        var length = 40;
                        var trimmedTitle = title.length > length ?
                            title.substring(0, length - 3) + "..." :
                            title;
                        return (
                            <Link key={keyPost} href={`${process.env.NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_HOST}/${t['language-selected'].toLowerCase()}/${post.slugurl}`}>
                                <MenuItem key={keyPost}>
                                    <ListItemIcon>
                                        <ArticleIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>{trimmedTitle}</ListItemText>
                                    {post.categories && post.categories.length > 0 ? (<Chip label={removeAtENFR(post.categories[0].name)} size="small" variant="outlined" />) : null}
                                </MenuItem>
                            </Link>
                        );
                    })}
                </MenuList>) : (<Alert severity="info">Not Found the article.</Alert>)
                }
            </React.Fragment >
        );
    }

    function SuspenseQuerySearchPosts({ search }: PostProps) {
        let result: any = useSuspenseQuery(searchPostsQuery, {
            fetchPolicy: "no-cache",
            variables: { search, lang: t['language-selected'] },
        }); //no-cache cache-first // fetchPolicy: "cache-first",

        if (result && result.data && search == keyword)
            window.setTimeout(() => {
                setLoading(false);
            }, 500);

        return (
            <React.Fragment>
                <Result source="useSuspenseQuery(searchPostsQuery)" data={result && result.data ? result.data : null} />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Button
                onClick={handleOpen}
                variant="outlined"
                startIcon={<SearchIcon fontSize="small"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }} />}
                endIcon={<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}><ShotcutSearch>Ctrl+K</ShotcutSearch></Box>}
                aria-label="search"
                size="small" sx={{ minWidth: '18px', minHeight: '24px' }}>
                <Typography
                    component="span"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    {t['search']}
                </Typography>
                <SearchIcon fontSize="small" sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block', md: 'none' } }} />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <React.Fragment>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', borderRadius: 0 }}
                            >
                                <IconButton sx={{ p: '10px' }} aria-label="menu">
                                    {loading === true ? (<CircularProgress color="primary" size={16} />) : (<MenuIcon />)}
                                </IconButton>
                                <InputBase
                                    value={keyword}
                                    onChange={handleChange}
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search Blog"
                                    inputProps={{ 'aria-label': 'search blog' }}
                                    autoFocus={true}
                                    inputRef={(input: HTMLInputElement) => {
                                        if (input)
                                            setTimeout(() => { input.focus(); }, 500);
                                    }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <IconButton color="primary" sx={{ p: '10px' }} aria-label="close" onClick={handleClose}>
                                    <HighlightOffRoundedIcon />
                                </IconButton>
                            </Paper>
                        </React.Fragment>

                        {loading && (<LinearProgress sx={{ height: 2 }} />)}

                        <Suspense fallback={<SearchModalSkeleton />}>
                            <SuspenseQuerySearchPosts search={search} />
                        </Suspense>

                    </Box>
                </Fade>
            </Modal>
        </React.Fragment>

    );
}