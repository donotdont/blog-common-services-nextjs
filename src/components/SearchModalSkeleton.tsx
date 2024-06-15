import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArticleIcon from '@mui/icons-material/Article';
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SearchModalSkeleton() {
    const numbers = [1, 2, 3, 4, 5];
    return (
        <React.Fragment>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ padding: '8px' }}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="circular" width={20} height={20} />
            </Stack>
            <MenuList>
                {numbers && numbers.map((num: any, keyNum: number) => (
                    <MenuItem key={keyNum}>
                        <ListItemIcon>
                            <ArticleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText><Skeleton animation="wave" /></ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
        </React.Fragment>
    );
}