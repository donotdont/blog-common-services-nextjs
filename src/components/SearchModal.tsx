import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';
import { FormLabel, Input, OutlinedInput } from '@mui/material';
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
    dictionary: string;
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
    padding: theme.spacing(0, 2),
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const keyDownHandler = React.useCallback((event: KeyboardEvent) => {
        //console.log(`Pressed keyCode ${event ?? event.key}`,event ?? event.key);
        if (event && ((event.key === 'k' || event.key === 'K') && event.ctrlKey == true)) {
          // Do code here
          handleOpen();
          event.preventDefault();
        }
      }, []);
      useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
    
        return () => document.removeEventListener("keydown", keyDownHandler);
      }, []);

    return (
        <>
            {/*<Button onClick={handleOpen}>Open modal</Button>*/}
            <Button
                onClick={handleOpen}
                variant="outlined"
                startIcon={<SearchIcon fontSize="small"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }} />}
                endIcon={<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}><ShotcutSearch>Ctrl+K</ShotcutSearch></Box>}
                aria-label="search"
                size="small" sx={{ minWidth: '18px', minHeight: '24px' }}>
                <Typography variant="span" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    {t['search']}
                </Typography>
                <SearchIcon fontSize="small" sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block', md: 'none' } }} />
            </Button>
            <Modal
                color="neutral"
                layout="center"
                size="lg"
                variant="plain"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    "& > .MuiBox-root": {
                        border: 'none',
                        borderRadius: '6px',
                        top: '150px',
                        padding: 0,
                        minWidth: '480px'
                    },
                    "& > .MuiBackdrop-root": {
                        backgroundColor: "rgb(255, 255, 255, 0.1)",
                        backdropFilter: "blur(2px)"
                    }
                }}
            >
                <Box sx={style}>
                    <header>
                        <form>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', borderRadius: 0 }}
                            >
                                <IconButton sx={{ p: '10px' }} aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search Blog"
                                    inputProps={{ 'aria-label': 'search blog' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <IconButton color="primary" sx={{ p: '10px' }} aria-label="close" onClick={handleClose}>
                                    <HighlightOffRoundedIcon />
                                </IconButton>
                            </Paper>
                        </form>
                    </header>
                    <div>
                        <Stack direction="row" spacing={1} sx={{ padding: '8px' }}>
                            <Chip label="Amazon" size="small" variant="outlined" component="a" href="#basic-chip" clickable />
                            <Chip label="Ebay" size="small" variant="outlined" component="a" href="#basic-chip" clickable />
                            <Chip label="Cdiscount" size="small" variant="outlined" component="a" href="#basic-chip" clickable />
                        </Stack>
                    </div>
                    <div>
                        <MenuList>
                            <MenuItem>
                                <ListItemIcon>
                                    <ArticleIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                    <Chip label="Amazon" size="small" variant="outlined" />
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ArticleIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                    <Chip label="Amazon" size="small" variant="outlined" />
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ArticleIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                    <Chip label="Amazon" size="small" variant="outlined" />
                                </Typography>
                            </MenuItem>
                            {/*<Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Web Clipboard</ListItemText>
                            </MenuItem>*/}
                        </MenuList>
                    </div>
                </Box>
            </Modal>
        </>
    );
}