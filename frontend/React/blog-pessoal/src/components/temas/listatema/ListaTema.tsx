import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent,  Typography, Grid } from '@mui/material';
import{Button} from '@material-ui/core'
import './ListaTema.css';
import Tema from '../../../models/Tema';
import { useHistory } from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/user/UserReducer';
import { toast } from 'react-toastify';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([])
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );
  const tipo = useSelector<UserState, UserState["tipo"]>(
    (state) => state.tipo
  );
  let history = useHistory();

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
      history.push("/login")
    }
  }, [token])

  async function getTema() {
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [temas.length])

  var botoes: string
  if (tipo != "Admin") {
    botoes = "bottom-none"
  }


  return (
    <>
      <Grid container>
        <Grid display='flex' flexWrap='wrap' justifyContent='center' alignItems="center" xs={12} >  
          {
            temas.map(tema => (

              <Box m={2} display='flex' minWidth='350px' width='62vh'> 
                <Card variant="outlined">
                  <CardContent >
                    <Typography color="textSecondary" gutterBottom paddingX={2}>
                      {tema.nome}
                    </Typography>
                    <Box display='flex' justifyContent='center' padding={2}>
                      <img src={tema.imagem} alt="" width="100%" height='270px' className='image-border-radius' />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center' paddingX={2}> 
                      <Typography variant="body1" component="body" textAlign='justify'>
                        {tema.descricao}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions className='btn-center'>
                    <Box display="flex" justifyContent="center" className={botoes} mb={1.5} >
                      <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" className="btn-color " size='small' color="primary">
                            atualizar
                          </Button>
                        </Box>
                      </Link>
                      <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
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

            ))
          }
        </Grid>
      </Grid>

    </>
  );
}


export default ListaTema;