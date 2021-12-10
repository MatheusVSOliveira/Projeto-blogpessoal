import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import { useHistory, useParams } from 'react-router-dom';
import { buscaId, post, put } from '../../../services/Service';
import './CadastroTema.css';
import Tema from '../../../models/Tema';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/user/UserReducer';
import {toast} from 'react-toastify';


function CadastroTema() {
    let history = useHistory();
    const{id} = useParams<{id:string}>();
    const token = useSelector<UserState, UserState["tokens"]>( 
        (state) => state.tokens
    );

    const[tema, setTema] = useState<Tema>({
        id:0,
        nome:'',
        descricao: '',
        imagem:''
        
    }) 

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

    useEffect(() =>{
        if(id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string){
        buscaId(`/temas/${id}`,setTema, {
            headers:{
                'Authorization':token
            }
        })
    }

    function updatedTema(e:ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("tema " + JSON.stringify(tema))

        if (id !== undefined) {
            console.log(tema)
            put(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Tema atualizado com sucesso!', {
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
            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Tema cadastrado com sucesso!', {
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
        history.push('/temas')
    }

    return (
        <Container maxWidth="sm" className="margin">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro de temas</Typography>
                <TextField value={tema.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="nome" label="nome" variant="outlined" name="nome" margin="normal" fullWidth />
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" multiline={true} minRows={4} fullWidth /> 
                <TextField value={tema.imagem} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="imagem" label="imagem" variant="outlined" name="imagem" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary" className='btn-color'>
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;
