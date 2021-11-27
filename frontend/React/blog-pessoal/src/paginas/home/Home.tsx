import React, { useEffect } from 'react';
import {Typography, Box, Grid, Button} from '@material-ui/core'; 
import './Home.css';
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem'; 
import { Link, useHistory } from 'react-router-dom';
import { TokenState } from '../../store/tokens/TokensReducer';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

function Home() {
    
    let history = useHistory();
    const token = useSelector<TokenState, TokenState["tokens"]>(
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
            <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>  
                <Grid alignItems="center" xs={12} sm={6}> 
                    <Box paddingX={2} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to="/postagens" className="text-decorator-none">
                            <Button variant="outlined" className='botao'>Ver Postagens</Button> 
                        </Link> 
                    </Box>
                </Grid>
                <Grid xs={12} sm={6} >
                    <img src="https://i.imgur.com/ljTeIsM.png" alt="" width="480px" height="480px" /> 
                </Grid>
                <Grid xs={12} className='postagens'>
                    <TabPostagem/>
                </Grid>
            </Grid>  
        </>
    );
}

export default Home;