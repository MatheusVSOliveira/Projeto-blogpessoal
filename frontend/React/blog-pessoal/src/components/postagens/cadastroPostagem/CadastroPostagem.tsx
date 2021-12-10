import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPostagem.css';
import { useHistory, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';
import { UserState } from '../../../store/user/UserReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CadastroPostagem() {

    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );
    useEffect(() => {
        if (token == "") {
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
            history.push("/login")
        }
    }, [token])

    const [tema, setTema] = useState<Tema>({    
        id: 0,
        nome:'',
        descricao: '', 
        imagem:''
        
        
        })
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        imagem: '',
        tema: null
    })

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('userLogin: ' + Object.values(postagem)) 

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem atualizada com sucesso!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false, /* passando o mouse na notificação ela continua na tela quando TRUE */
                draggable: false, /* Move a notificação de local quando TRUE */
                theme: 'colored', /** Como a notificação será mostrada > colorida */
                progress: undefined
            })
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem cadastrada com sucesso!', {
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
        back() 

    }

    function back() {
        history.push('/postagens')
    }

    return (
        <Container maxWidth="sm" className="margin">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro artigos</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth multiline={true} minRows={8} />
                <TextField value={postagem.imagem} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="imagem" label="imagem" name="imagem" variant="outlined" margin="normal" fullWidth />
                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label"> Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.nome}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText> Escolha o tema do artigo </FormHelperText>
                    <Button type="submit" variant="contained" color="primary" className='btn-color'>
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPostagem;
