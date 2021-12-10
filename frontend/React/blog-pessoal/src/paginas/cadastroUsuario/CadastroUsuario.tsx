import React, { ChangeEvent, useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, TextField } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import './CadastroUsuario.css';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { toast } from 'react-toastify';



function CadastroUsuario() {

    let history = useHistory();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            tipo: '',
            senha: ''
        })
    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            tipo: '',
            senha: ''
        })
    useEffect(() => {
        if (userResult.id != 0) {
            history.push("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (user.senha.length >= 8 && user.nome.length > 2 && confirmarSenha === user.senha) {
            if (user.usuario.indexOf("@") != -1 && user.usuario.indexOf(".") != -1) { 
                cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
                toast.success('Usuário cadastrado com sucesso!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'colored',
                    progress: undefined

                })
            }
            else {
                toast.error('Preencha os campos corretamente', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'colored',
                    progress: undefined
                })
            }

        } else {
            toast.error('Preencha os campos corretamente', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined
            })
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'> 
           <Grid item xs={12} sm={6} className='img-cadastro'></Grid>
            <Grid item xs={12} sm={6} alignItems='center'>
                <Box paddingX={6} paddingTop={2}> 
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='text-format-cadastrar'>Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='confirmar senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginBottom={4} marginTop={2} textAlign='center'> 
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btn-cancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary' className='btn-cadastrar'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
            
        </Grid>
    );
}

export default CadastroUsuario;