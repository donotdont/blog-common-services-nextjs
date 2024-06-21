"use client";

import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { useScroll, useAnimationControls } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";

export default function ScrollToTopButton() {

    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
    const [isVisible, setIsVisible] = useState<boolean>(false);

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const { scrollYProgress } = useScroll();
    const controls = useAnimationControls();

    useEffect(() => {
        return scrollYProgress.on('change', (latestValue: any) => {
            if (latestValue > 0.15) {
                controls.start('show');
                setIsVisible(true);
            } else {
                controls.start('hide');
                setIsVisible(false);
            }
        });
    });

    return (<Fade in={isVisible}>
        <Tooltip placement="left" title="Scroll to top">
            <Fab
                size="small"
                color="default"
                aria-label="Go to Top"
                onClick={scrollToTop}
                sx={{ position: "fixed", bottom: 16, right: 16, backgroundColor: "rgb(255 245 235)", border: "1px solid #ff5722" }}>
                <KeyboardArrowUpIcon sx={{ color: "#ff5722" }} />
            </Fab>
        </Tooltip>
    </Fade>)
}