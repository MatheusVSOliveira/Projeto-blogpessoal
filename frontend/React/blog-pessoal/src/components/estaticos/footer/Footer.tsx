import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography, Box, Grid } from '@material-ui/core';
import './Footer.css';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/user/UserReducer';


function Footer() {

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );

    var footerComponent;

    if (token != '') {
        footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid alignItems="center" item xs={12}>
                <Box className='footer-box-1'>
                    <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h6" align="center" gutterBottom className='text-color-white'>Siga-me nas redes sociais </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <a href="https://github.com/MatheusVSOliveira" target="_blank">
                            <GitHubIcon className='redes' />
                        </a>
                        <a href="https://www.instagram.com/aquariologia/" target="_blank">
                            <InstagramIcon className='redes' />
                        </a>
                        <a href="https://www.linkedin.com/in/matheusvsoliveira/" target="_blank">
                            <LinkedInIcon className='redes' />
                        </a>
                    </Box>
                </Box>
                <Box className='footer-box-2' >
                    <Typography variant="subtitle2" align="center" gutterBottom className='text-color-white'>Site criado por Matheus Oliveira ©</Typography>
                </Box>
            </Grid>
        </Grid>
    }

    return (
        <>
            {footerComponent}
        </>
    )
}

export default Footer;