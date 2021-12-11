import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service'
import { Box, Card, CardActions, CardContent, Typography, Grid } from '@mui/material';
import { Button } from '@material-ui/core';
import './ListaPostagem.css';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/user/UserReducer';
import { toast } from 'react-toastify';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );
  const tipo = useSelector<UserState, UserState["tipo"]>(
    (state) => state.tipo
  );
  let history = useHistory();

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

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [posts.length])

  var botoes: string
  if (tipo != "Admin") {
    botoes = "bottom-none"
  }

  return (
    <>

      {
        posts.map(post => (
          <Grid container>
            <Grid display='flex' flexWrap='wrap' justifyContent='center' xs={12}>
              <Box m={2} minWidth='350px' width='75vh'>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {post.tema?.nome}
                    </Typography>
                    <Box display='flex' alignItems='center' paddingY={2}>
                      <Typography variant="h4" component="h5" className='title-format'>
                        {post.titulo}
                      </Typography>
                    </Box>
                    <Box className='back-color-post' >
                      <Box display='flex' justifyContent='center' padding={2}>
                        <img src={post.imagem} alt="" width="100%" height='315px' className='image-border-radius' />
                      </Box>
                      <Box display='flex' justifyContent='center' alignItems='center' paddingX={2} className='text-post-format'>
                        <Typography variant="body1" component="h6" textAlign='justify'>
                          {post.texto}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions className='btn-center'>
                    <Box display="flex" justifyContent="center" className={botoes} mb={1.5}>
                      <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" className="btn-color" size='small' color="primary">
                            atualizar
                          </Button>
                        </Box>
                      </Link>
                      <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" size='small' color="secondary" className='btn-color'>
                            deletar
                          </Button>
                        </Box>
                      </Link>
                    </Box>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          </Grid>
        ))
      }

    </>
  )
}

export default ListaPostagem;