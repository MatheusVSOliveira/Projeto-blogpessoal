import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import './Sobre.css';

function Sobre() {
    return (
        <>
            <Grid container display='flex' justifyContent="center" alignItems="center">
                <Grid display='flex' justifyContent='center' xs={12}>
                    <Box m={2} minWidth='350px' width='70vh'>
                        <Card variant="outlined">
                            <CardContent>
                                <Box paddingTop={1}>
                                    <Box display='flex' justifyContent='center' padding={1}>
                                        <img src='https://i.imgur.com/9VSrhzV.jpg' alt="" width="260px" height='260px' className='img-border-radius-50' />
                                    </Box>
                                    <Box display='flex' justifyContent='center' alignItems='center' padding={1}>
                                        <Typography variant="body1" component="h6" textAlign='justify'>
                                           Matheus Oliveira, natural da cidade de São Paulo, biólogo e desenvolvedor.  Há 4 anos teve a 
                                           oportunidade de conhecer o ramo pet, onde pode interagir com diferentes tipos de animais, exóticos 
                                           e nativos, com uma atenção especial para a área de peixes ornamentais. A partir deste momento, sentiu 
                                           a necessidade de buscar uma maior capacitação e conhecimento na área que atuava, ingressando 
                                           no curso de Ciências Biológicas no inicio de 2017 e se graduando no final de 2020. Em 2021, 
                                           buscando a transição para a área de desenvolvimento e tecnologia se formou como programador de sistemas e desenvolvedor web. 
                                           O blog Aquadev tem como objetivo unir duas áreas em que é fascinado, a de peixes ornamentais que é um
                                           dos seus hobbies, e a tecnologia, em que tem como objetivo atuar profissionalmente. Assim, todo o conteúdo do blog 
                                           (textos, informações e a maioria das imagens), bem como o seu design e estrutura são de sua autoria.
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Sobre
