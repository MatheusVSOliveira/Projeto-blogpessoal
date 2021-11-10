import React, { useEffect, useState } from 'react'
import { Typography, Button, Box, Card, CardActions, CardContent } from "@material-ui/core"
import './DeletarPostagem.css';
import Postagem from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../services/Service';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';
import {toast} from 'react-toastify';

function DeletarPostagem() {

  let history = useHistory();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const [postagem, setPostagens] = useState<Postagem>()

  useEffect(() => {
    if (token == '') {
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

  useEffect(() => {
    if (id !== undefined) {
      findById(id)
    }
  }, [id])

  async function findById(id: string) {
    buscaId(`/postagens/${id}`, setPostagens, {
      headers: {
        'Authorization': token
      }
    })
  }

  function sim() {
    history.push('/postagens')
    deleteId(`/postagens/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    toast.success('Postagem deletada com sucesso!', {
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

  function nao() {
    history.push('/postagens')
  }


  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
                {postagem?.titulo}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box>
                <Button onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarPostagem;