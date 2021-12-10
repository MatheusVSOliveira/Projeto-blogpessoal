import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Typography, Grid } from '@mui/material';
import { Button } from '@material-ui/core'
import './DeletarTema.css';
import { useHistory, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/user/UserReducer';
import { toast } from 'react-toastify';


function DeletarTema() {

  let history = useHistory();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );
  const [tema, setTema] = useState<Tema>()

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
    buscaId(`/temas/${id}`, setTema, {
      headers: {
        'Authorization': token
      }
    })
  }

  function sim() {
    history.push('/temas')
    deleteId(`/temas/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    toast.success('Tema deletado com sucesso!', {
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
    history.push('/temas')
  }

  return (
    <>
      <Grid container>
        <Grid display='flex' flexWrap='wrap' justifyContent='center' alignItems="center" xs={12} minHeight='100vh' >
          <Box m={2} display='flex' minWidth='350px' width='80vh' justifyContent='center' alignItems='center'> 
            <Card variant="outlined">
              <CardContent>
                <Box display='flex' justifyContent='center'>
                <Typography  variant='h6' gutterBottom >  
                  Deseja deletar o tema?
                </Typography>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {tema?.nome}
                </Typography>
                <Box display='flex' justifyContent='center' padding={2}>
                  <img src={tema?.imagem} alt="" width="100%" height='270px' className='image-border-radius' />
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center' paddingX={2}>
                  <Typography variant="body1" component="body" textAlign='justify'>
                    {tema?.descricao}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions className='btn-center'>
                <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                  <Box mx={2} >
                    <Button onClick={sim} variant="contained" className="btn-color" size='small' color="primary" >
                      Sim
                    </Button>
                  </Box>
                  <Box mx={2}>
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
export default DeletarTema;