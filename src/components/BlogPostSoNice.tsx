import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* MUI */
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
            {value === index && (
                <Box sx={{ p: 3 }}>{children}</Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BlogPostSoNice({ dictionary }: Props) {
    const t = dictionary;
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="SoNice Étiquetage" {...a11yProps(0)} />
                    <Tab label="SoNice Suivi de Colis" {...a11yProps(1)} />
                    <Tab label="SoNice Retour" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Grid item xs={12} sm container>
                    <Grid item xs={4} container direction="column" spacing={16} sx={{ marginTop: 0, textAlign: "center" }}>
                        <Link href="http://addons.prestashop.com/fr/recherche?search_query=SoNice+Etiquetage" target="_blank" rel="noopener noreferrer"><Image className="alignnone size-full wp-image-811" alt="logo" src="https://i0.wp.com/blog.common-services.com/wp-content/uploads/2014/05/logo.png?resize=48%2C48" width="48" height="48" priority /></Link>
                    </Grid>
                    <Grid item xs={8} container direction="column" spacing={16} sx={{ marginTop: 0 }}>
                        <Typography component="p">So Nice &Eacute;tiquetage est une solution d&rsquo;impression d&rsquo;&eacute;tiquettes Colissimo &amp; So Colissimo depuis le back-office Prestashop uniquement r&eacute;serv&eacute;e aux professionnels du e-commerce.</Typography>

                        <h5>Pour b&eacute;n&eacute;ficier du module et de ses services, vous devrez &ecirc;tre titulaire d&rsquo;un contrat So Colissimo Flexibilit&eacute; option Web Service d&rsquo;&Eacute;tiquetage.</h5>
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Grid item xs={12} sm container>
                    <Grid item xs={4} container direction="column" spacing={16} style={{ marginTop: 0, textAlign: "center" }}>
                        <Link href="http://addons.prestashop.com/fr/transport-logistique-livraison-modules-prestashop/9824-sonice-suivi-colis.html" target="_blank" rel="noopener noreferrer"><Image className="alignnone size-full wp-image-816" alt="logo_sonice_suivi" src="https://i0.wp.com/blog.common-services.com/wp-content/uploads/2014/05/logo_sonice_suivi1.png?resize=48%2C46" width="48" height="46" priority /></Link>
                    </Grid>
                    <Grid item xs={8} container direction="column" spacing={16} style={{ marginTop: 0 }}>
                        <Typography component="p">SoNice Suivi de Colis est une solution de suivi en back-office professionnelle pour les titulaires d&rsquo;un contrat ColiPoste pour les offres Colissimo et SoColissimo.</Typography>

                        <h5>Pour b&eacute;n&eacute;ficier du module et de ses services, vous devrez &ecirc;tre titulaire d&rsquo;un contrat So Colissimo Flexibilit&eacute; option Suivi de Colis.</h5>
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Grid item xs={12} sm container>
                    <Grid item xs={4} container direction="column" spacing={16} style={{ marginTop: 0, textAlign: "center" }}>
                        <Link href="http://addons.prestashop.com/fr/transport-logistique-livraison-modules-prestashop/9058-sonice-retour-etiquette-retour-colissimo.html" target="_blank" rel="noopener noreferrer"><Image className="alignnone size-full wp-image-813" alt="logo" src="https://i0.wp.com/blog.common-services.com/wp-content/uploads/2014/05/logo1.png?resize=48%2C48" width="48" height="48" priority /></Link>
                    </Grid>
                    <Grid item xs={8} container direction="column" spacing={16} style={{ marginTop: 0 }}>
                        <Typography component="p">Exclusivit&eacute; Prestashop Addons.&nbsp;So Nice Retour est un service de cr&eacute;ation d&rsquo;&eacute;tiquettes Colissimo pour les retours produits.</Typography>

                        <h5>Pour b&eacute;n&eacute;ficier du module et de ses services, vous devrez &ecirc;tre titulaire d&rsquo;un contrat So Colissimo Flexibilit&eacute; option Retour Online.</h5>
                    </Grid>
                </Grid>
            </CustomTabPanel>
        </Box>
    );
}