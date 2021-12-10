import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Grid, Typography, TextField} from '@mui/material';
import{Button} from '@material-ui/core'; 
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../services/Service';
import './Login.css';
import UserLogin from '../../models/UserLogin';
import { useDispatch } from 'react-redux';
import { addTipo, addToken } from '../../store/user/Actions';
import { toast } from 'react-toastify';




function Login() {

    let history = useHistory();
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            tipo: '',
            token: ''
        }
    )

    const [respUserLogin, setRespUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            tipo: '',
            token: ''
        }
    )

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (respUserLogin.token !== '') {
            dispatch(addToken(respUserLogin.token))
            dispatch(addTipo(respUserLogin.tipo));
            history.push('/home')
        }
    }, [respUserLogin.token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setRespUserLogin)
            toast.success('Usuário logado com sucesso!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false, /* passando o mouse na notificação ela continua na tela quando TRUE */
                draggable: false, /* Move a notificação de local quando TRUE */
                theme: 'colored', /** Como a notificação será mostrada > colorida */
                progress: undefined
            })
        } catch (error) {
            toast.error('Dados inconsistentes. Erro ao logar!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false, /* passando o mouse na notificação ela continua na tela quando TRUE */
                draggable: false, /* Move a notificação de local quando TRUE */
                theme: 'colored', /** Como a notificação será mostrada > colorida */
                progress: undefined
            })
        }
        /*console.log('userLogin: ' + Object.values(userLogin));*/
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' className='background-login'>
            <Grid display='flex' alignItems='center' justifyContent='center' xs={12}>
                <Box display='flex' flexDirection='column' className='form-format-login'>  
                    <form onSubmit={onSubmit} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='text-font-weight text-color-login'> Entrar </Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="usuário" variant="outlined" name='usuario' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="senha" variant="outlined" name='senha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' className='btnColor'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box justifyContent='center' alignItems='center' >
                            <Typography variant='subtitle1'  align='center' className='text-color-login'> Não tem uma conta? </Typography>
                            <Link to='/cadastrousuario' className='text-decorator-none text-font-weight'>
                                <Typography variant='subtitle1' gutterBottom align='center' className='text-font-weight text-color-login'> Cadastre-se </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login