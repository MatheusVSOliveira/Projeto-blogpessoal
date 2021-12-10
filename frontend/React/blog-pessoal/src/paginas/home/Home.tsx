import React, { useEffect } from 'react';
import {Typography, Box, Grid, Button} from '@mui/material'; 
import './Home.css';
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import { Link, useHistory } from 'react-router-dom';
import { UserState } from '../../store/user/UserReducer';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

function Home() {
    
    let history = useHistory();
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens 
    );
    
    useEffect(()=> {
        if(token == ''){
            toast.error('Você precisa estar logado!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false, /* passando o mouse na notificação ela continua na tela quando TRUE */
                draggable: false, /* Move a notificação de local quando TRUE */
                theme: 'colored', /** Como a notificação será mostrada > colorida */
                progress: undefined 
            })
            history.push('/login')
        }
    }, [token])

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">  
                <Grid alignItems="center" xs={12} className='caixa'>   
                    <Box display='flex' flexDirection='column' alignItems= 'center' justifyContent='center' paddingX={2} paddingBottom={1} minHeight='28vh'>  
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center"  className='titulo'>CURIOSIDADES SOBRE ORGANISMOS AQUÁTICOS</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo2'> Os melhores conteúdos sobre organismos aquáticos estão aqui, mergulhe nessa jornada!</Typography>
                    </Box>
                </Grid>
                <Grid xs={12}>
                    <TabPostagem/>
                </Grid>
            </Grid>  
        </>
    );
}

export default Home;