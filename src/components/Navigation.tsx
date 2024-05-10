"use client";
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

//import { useLocale, useTranslations } from 'next-intl';
import LocaleMenuSwitcher from './LocaleMenuSwitcher';

/* MUI */
import clsx from "clsx";
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import { Language } from '@mui/icons-material';

import SearchModal from './SearchModal';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const pages = ["product", "store", "documentation"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface Props {
    window?: () => Window;
    children: React.ReactElement;
    dictionary: string;
}

export default function Navigation(props: Props) {
    const { children, window, dictionary } = props;
    //const locale = useLocale();
    //const t = useTranslations('Navigation');
    //const trigger = useScrollTrigger();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
    const t = dictionary;

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{
                background: '#ffffff',
                backgroundColor: trigger ? "rgb(255, 255, 255, 0.75)" : '#ffffff',
                backdropFilter: trigger ?? "blur(5px)"
            }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Image src="./common-services.svg"
                                alt="Common-Services Logo"
                                width={330}
                                height={45}
                                priority
                            />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link href={t['menubar'][page]['path']} target="_blank">
                                            <Typography textAlign="center">{t['menubar'][page]['name']}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Image src="./common-services.svg"
                                alt="Common-Services Logo"
                                width={300}
                                height={45}
                                priority />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Link href={t['menubar'][page]['path']} key={page} target="_blank">
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, display: 'block' }}
                                    >
                                        {t['menubar'][page]['name']}
                                    </Button>
                                </Link>
                            ))}
                        </Box>


                        <Box sx={{ flexGrow: 0, paddingRight: 2 }}>
                            {/*<Button variant="outlined" startIcon={<SearchIcon fontSize="small" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }} />} endIcon={<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}><ShotcutSearch>Ctrl+K</ShotcutSearch></Box>} aria-label="search" size="small" sx={{ minWidth: '18px', minHeight: '24px' }}>
                                        <Typography variant="span" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}>
                                            {t['search']}
                                        </Typography>
                                        <SearchIcon fontSize="small" sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block', md: 'none' } }} />
                                </Button>*/}
                            <SearchModal dictionary={dictionary} />
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title={t["language"]}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Badge badgeContent={t['language-selected']} color="primary">
                                        <Language />
                                    </Badge>
                                </IconButton>

                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <LocaleMenuSwitcher dictionary={dictionary} handleCloseUserMenu={handleCloseUserMenu} />
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}