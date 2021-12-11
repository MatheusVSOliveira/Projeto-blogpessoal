import React, { useEffect, useState } from 'react'
import { Typography, Box, Card, CardActions, CardContent, Grid } from "@mui/material"
import { Button } from "@material-ui/core"
import './DeletarPostagem.css';
import Postagem from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../services/Service';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/user/UserReducer';
import { toast } from 'react-toastify';

function DeletarPostagem() {

  let history = useHistory();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<UserState, UserState["tokens"]>(
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
      <Grid container display='flex' justifyContent="center" alignItems="center">
        <Grid display='flex' justifyContent='center' xs={12}>
          <Box m={2} minWidth='350px' width='75vh'>
            <Card variant="outlined">
              <CardContent>
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h6' gutterBottom >
                    Deseja deletar a postagem?
                  </Typography>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {postagem?.tema?.nome}
                </Typography>
                <Box display='flex' alignItems='center' paddingY={2}>
                  <Typography variant="h4" component="h5" className='title-format'>
                    {postagem?.titulo}
                  </Typography>
                </Box>
                <Box className='back-color-post' >
                  <Box display='flex' justifyContent='center' padding={2}>
                    <img src={postagem?.imagem} alt="" width="100%" height='315px' className='image-border-radius' />
                  </Box>
                  <Box display='flex' justifyContent='center' alignItems='center' padding={2} className='text-post-format'>
                    <Typography variant="body1" component="h6" textAlign='justify'>
                      {postagem?.texto}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions className='btn-center'>
                <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                  <Box mx={2}>
                    <Button onClick={sim} variant="contained" className="btn-color" size='small' color="primary">
                      Sim
                    </Button>
                  </Box>
                  <Box>
                    <Button onClick={nao} variant="contained" size='small' color="secondary" className='btn-color'>
                      Não
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default DeletarPostagem;