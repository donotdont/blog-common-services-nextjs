"use client";

import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion, useInView, useScroll, Variant, useAnimationControls } from "framer-motion";

interface ScrollToOptions {
    left?: number;
    top?: number;
    behavior?: "auto" | "smooth";
}

export default function ScrollToTopButton() {

    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
    const [isVisible, setIsVisible] = useState(false);

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const ScrollToTopContainerVariants: any = {
        hide: { opacity: 0, y: 100 },
        show: { opacity: 1, y: 0 },
    };

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

    /*useEffect(() => {
        const toggleVisibility = () => {
          // if the user scrolls down, show the button
          window.scrollY > 150 ? setIsVisible(true) : setIsVisible(false);
        }
        // listen for scroll events
        window.addEventListener("scroll", toggleVisibility);
    
        // clear the listener on component unmount
        return () => {
          window.removeEventListener("scroll", toggleVisibility);
        }
      }, [])*/

    return (
        isVisible && <Fab
            size="small"
            color="default"
            aria-label="Go to Top"
            onClick={scrollToTop}
            sx={{ position: "fixed", bottom: 16, right: 16, backgroundColor: "rgb(255 245 235)", border: "1px solid #ff5722" }}>
            <KeyboardArrowUpIcon sx={{ color: "#ff5722" }} />
        </Fab>
    )
}