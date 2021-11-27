import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';
import { addToken } from '../../../store/tokens/Actions';
import { toast } from 'react-toastify';

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let history = useHistory();

    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(''));
        toast.info('Usuário deslogado', {
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

    var navbarComponent;

    if (token != '') {
        navbarComponent = <AppBar position="static" style={{ backgroundColor: "#1b759b"! }}>
            <Toolbar variant="dense">
                <Box className='cursor'>
                    <Typography variant="h5" color="inherit">
                       
                    </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Box display="flex" justifyContent="start">
                        <Link to="/home" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    home
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/postagens" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    postagens
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/temas" className="text-decorator-none">
                            <Box className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    temas
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/formularioTema" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    cadastrar tema
                                </Typography>
                            </Box>
                        </Link>
                        <Box className='cursor' onClick={goLogout}>
                            <Typography variant="h6" color="inherit">
                                logout
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    }

    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;