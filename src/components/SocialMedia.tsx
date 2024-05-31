"use client";
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';
import {
    FacebookShareButton,
    //GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    //TelegramShareButton,
    //WhatsappShareButton,
    PinterestShareButton,
    //VKShareButton,
    //OKShareButton,
    //RedditShareButton,
    TumblrShareButton,
    //LivejournalShareButton,
    //MailruShareButton,
    //ViberShareButton,
    //WorkplaceShareButton,
    //LineShareButton,
    EmailShareButton,
} from 'react-share';

import {
    FacebookIcon,
    TwitterIcon,
    //TelegramIcon,
    //WhatsappIcon,
    //GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
    //VKIcon,
    //OKIcon,
    //RedditIcon,
    TumblrIcon,
    //LivejournalIcon,
    //MailruIcon,
    //ViberIcon,
    //WorkplaceIcon,
    //LineIcon,
    EmailIcon,
} from 'react-share';

type Props = {
    dictionary: any;
    size: number;
    post: any;
}

export default function SocialMedia({ dictionary, size, post }: Props) {
    const t = dictionary;
    var BlogURL;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            BlogURL = window.location.origin;
        }
    }, []);

    return (
        <CardActions disableSpacing>
            <Stack direction="row" spacing={2}>
                {/*<IconButton aria-label={t['Share to Facebook']}>*/}
                <FacebookShareButton
                    aria-label={t['Facebook']}
                    url={`${BlogURL}/post/${post.slugurl}`}
                    title={post.title}>
                    <FacebookIcon size={size ? size : 24} round aria-hidden={true} />
                </FacebookShareButton>
                {/*</IconButton>*/}

                {/*<IconButton aria-label={t['Share to Pinteres']}>*/}
                <PinterestShareButton
                    aria-label={t['Pinteres']}
                    url={`${BlogURL}/post/${post.slugurl}`}
                    media={`${BlogURL}/post/${post.slugurl}`}
                    title={post.title}>
                    <PinterestIcon size={size ? size : 24} round aria-hidden={true} />
                </PinterestShareButton>
                {/*</IconButton>*/}

                {/*<IconButton aria-label={t['Share to Linkedin']}>*/}
                <LinkedinShareButton
                    aria-label={t['Linkedin']}
                    url={`${BlogURL}/post/${post.slugurl}`}
                    title={post.title}>
                    <LinkedinIcon size={size ? size : 24} round aria-hidden={true} />
                </LinkedinShareButton>
                {/*</IconButton>*/}

                {/*<IconButton aria-label={t['Share to Twitter']}>*/}
                <TwitterShareButton
                    aria-label={t['Twitter']}
                    url={`${BlogURL}/post/${post.slugurl}`}
                    title={post.title}>
                    <TwitterIcon size={size ? size : 24} round aria-hidden={true} />
                </TwitterShareButton>
                {/*</IconButton>*/}

                {/*<IconButton aria-label={t['Share to Tumblr']}>*/}
                <TumblrShareButton
                    aria-label={t['Tumblr']}
                    url={`${BlogURL}/post/${post.slugurl}`}
                    title={post.title}>
                    <TumblrIcon size={size ? size : 24} round aria-hidden={true} />
                </TumblrShareButton>
                {/*</IconButton>*/}

                {/*<IconButton aria-label={t['Share to Email']}>*/}
                <EmailShareButton
                    aria-label={t['Email']}
                    url={`${BlogURL}/post/${post.slugurl}`}
                    title={post.title}>
                    <EmailIcon size={size ? size : 24} round aria-hidden={true} />
                </EmailShareButton>
                {/*</IconButton>*/}
            </Stack>
        </CardActions>
    );
}