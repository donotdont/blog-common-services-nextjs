"use client";
import * as React from 'react';
import { useState, Suspense, startTransition, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";

/* MUI */
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AccountBox, Event } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

/* GraphQL */
import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

/* Time */
import Moment from 'react-moment';
import 'moment/locale/fr';

/* HTML */
//import { Markup } from "react-render-markup";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import BlogPagePaperSkeleton from './BlogPostPaperSkeleton';
import PageNotFound from './PageNotFound';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

type Props = {
    dictionary: any;
    title: string;
}

interface PageProps {
    children: React.ReactNode;
}

export default function BlogPagePaper({ dictionary, title }: Props) {
    const t = dictionary;

    const [token, setToken] = useState('')
    const verifyRecaptchaCallback = React.useCallback((token: string) => {
        setToken(token)
    }, []);

    //const lang = t['language-selected'].toLowerCase();
    const [slug, setSlug] = React.useState<string>(title);
    const [contactStatus, setContactStatus] = React.useState<string>();


    const pageQuery = gql`query getPage($slug: String){
        pages(where: {slug:$slug,active:true},limit:1){
            title_${t['language-selected'].toLowerCase()}
			body_${t['language-selected'].toLowerCase()}
			slug
        }
      }
    `;

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
        const page = (data && data.pages && data.pages.length > 0) ? data.pages[0] : null;
        const [loadding, setLoadding] = React.useState<boolean>(false);
        const [formData, setFormData] = React.useState<any>({
            name: "",
            email: "",
            subject: "",
            message: "",
            nameError: "",
            emailError: "",
            subjectError: "",
            messageError: ""
        });

        function dateFormat(_post: any) {
            return (<Moment format="D MMMM YYYY" titleFormat="DD MMMM YYYY" locale={t['language-selected'].toLowerCase()} withTitle>{_post.published}</Moment>)
        }

        function removeAtENFR(name: string) {
            return (t['language-selected'] == "FR") ? name.replace(/ @fr/g, '') : name.replace(/ @en/g, '');
        }

        function transformImageUri(_uri: string) {
            return process.env.NEXT_PUBLIC_HOST + _uri;
        }

        function endPointUri() {
            return process.env.NEXT_PUBLIC_HOST;
        }

        function validateEmail(email: string) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        function validate() {
            let error = false;
            console.log(formData.name.length);
            if (formData.name.length == 0) {
                setFormData((prevState: any) => ({
                    ...prevState,
                    ["nameError"]: "Field is required!"
                }));
                error = true;
            }
            if (formData.email.length == 0) {
                setFormData((prevState: any) => ({
                    ...prevState,
                    ["emailError"]: "Field is required!"
                }));
                error = true;
            } else if (!validateEmail(formData.email)) {
                setFormData((prevState: any) => ({
                    ...prevState,
                    ["emailError"]: "Please enter a valid email address"
                }));
                error = true;
            }
            if (formData.subject.length == 0) {
                setFormData((prevState: any) => ({
                    ...prevState,
                    ["subjectError"]: "Field is required!"
                }));
                error = true;
            }
            if (formData.message.length == 0) {
                setFormData((prevState: any) => ({
                    ...prevState,
                    ["messageError"]: "Field is required!"
                }));
                error = true;
            }

            if (error) {
                return false;
            } else {
                setFormData((prevState: any) => ({
                    ...prevState,
                    ["nameError"]: "",
                    ["emailError"]: "",
                    ["subjectError"]: "",
                    ["messageError"]: ""
                }));
                return true;
            }
        }

        async function handleSubmit(event: any) {
            event.preventDefault();
            const validation = validate();
            //console.log("validation", validation);
            if (validation) {
                setLoadding(true);
                // clear form
                //this.setState(initialState);
                //console.log(this.state);
                axios({
                    method: "POST",
                    url: process.env.NEXT_PUBLIC_HOST + "/api",
                    data: {
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message
                    }
                }).then((response) => {
                    if (response.data.msg === 'success') {
                        setContactStatus("success");
                    } else if (response.data.msg === 'fail') {
                        setContactStatus("error");
                    }
                    setLoadding(false);
                });
            } else {
                setContactStatus("");
                setLoadding(false);
            }
        }

        function handleChange(e: React.ChangeEvent<any>) {
            const { name, value } = e.target;
            setFormData((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        }

        return (
            <React.Fragment>
                {(page) ?
                    (<Paper elevation={2}>
                        <Card elevation={0}>
                            <CardHeader
                                title={<Typography variant="h5" component="h1">{page[`title_${t['language-selected'].toLowerCase()}`]}</Typography>}
                            />

                            <CardActions>
                                <CardContent>
                                    <Typography component={'span'} variant={'body2'}>
                                        <ReactMarkdown className={'doc-markdown'} rehypePlugins={[rehypeRaw] as any} urlTransform={(value: string) => { return (!value.includes('https://')) ? process.env.NEXT_PUBLIC_STRAPI + value : value }} >{
                                            page[`body_${t['language-selected'].toLowerCase()}`]}
                                        </ReactMarkdown>
                                    </Typography>

                                    {slug && slug == "contact" && (
                                        <React.Fragment>
                                            {/*<GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA} language={t['language-selected'].toLowerCase()}>*/}
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 0 },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                onSubmit={handleSubmit}
                                            >

                                                {contactStatus && (
                                                    <React.Fragment>
                                                        {contactStatus === "success" && (
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12}>
                                                                    <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="success">
                                                                        {t['Thank you for your message, It has been sent']}.
                                                                    </Alert>
                                                                </Grid>
                                                            </Grid>)}
                                                        {contactStatus === "error" && (
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12}>
                                                                    <Alert icon={<WarningAmberIcon fontSize="inherit" />} severity="error">
                                                                        {t['There was an error trying to send your message, Please try again later']}.
                                                                    </Alert>
                                                                </Grid>
                                                            </Grid>)}
                                                    </React.Fragment>
                                                )}

                                                {contactStatus !== "success" && (
                                                    <React.Fragment>
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justifyContent="center"
                                                            alignItems="flex-start"
                                                            spacing={1} >
                                                            <Grid item xs={12} sm={4}>
                                                                <TextField
                                                                    required
                                                                    error={formData.nameError.length > 0}
                                                                    label={t["Your Name"]}
                                                                    name="name"
                                                                    onChange={handleChange}
                                                                    value={formData.name}
                                                                    margin="normal"
                                                                    variant="filled"
                                                                    helperText={formData.nameError}
                                                                    sx={{ width: "100%" }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <TextField
                                                                    required
                                                                    error={formData.emailError.length > 0}
                                                                    label={t["Your Email"]}
                                                                    name="email"
                                                                    onChange={handleChange}
                                                                    value={formData.email}
                                                                    margin="normal"
                                                                    variant="filled"
                                                                    helperText={formData.emailError}
                                                                    sx={{ width: "100%" }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <TextField
                                                                    required
                                                                    error={formData.subjectError.length > 0}
                                                                    label={t["Subject"]}
                                                                    name="subject"
                                                                    onChange={handleChange}
                                                                    value={formData.subject}
                                                                    margin="normal"
                                                                    variant="filled"
                                                                    helperText={formData.subjectError}
                                                                    sx={{ width: "100%" }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    required
                                                                    error={formData.messageError.length > 0}
                                                                    label={t["Your Message"]}
                                                                    multiline
                                                                    rows="4"
                                                                    name="message"
                                                                    onChange={handleChange}
                                                                    value={formData.message}
                                                                    margin="normal"
                                                                    variant="filled"
                                                                    helperText={formData.messageError}
                                                                    sx={{ width: "100%" }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12} sx={{ textAlign: "right" }}>
                                                                {/*<GoogleReCaptcha
                                                                        onVerify={verifyRecaptchaCallback}
                                                                    />*/}

                                                                {/*<Button variant="contained" color="primary" type="submit" endIcon={<SendIcon />}>
                                                                    {t["Send"]}
                                                                </Button>*/}
                                                                <LoadingButton
                                                                    type="submit"
                                                                    loading={loadding}
                                                                    loadingPosition="end"
                                                                    endIcon={<SendIcon />}
                                                                    variant="outlined"
                                                                >
                                                                    {t["Send"]}
                                                                </LoadingButton>
                                                            </Grid>
                                                        </Grid>
                                                    </React.Fragment>)}

                                            </Box>
                                            {/*</GoogleReCaptchaProvider>*/}
                                        </React.Fragment>)}
                                </CardContent>
                            </CardActions>



                        </Card>
                    </Paper>) : (<PageNotFound dictionary={t} />)
                }
            </React.Fragment >)
    }

    function SuspenseQueryPage() {
        let result = useSuspenseQuery(pageQuery, {
            fetchPolicy: "network-only",
            variables: { slug },
        }); //no-cache cache-first // fetchPolicy: "cache-first",
        return (
            <>
                <Result key="result-post" source="useSuspenseQuery(pageQuery)" data={result.data} />
            </>
        );
    }

    return (
        <Suspense fallback={<BlogPagePaperSkeleton />}>
            <SuspenseQueryPage />
        </Suspense>
    );
}