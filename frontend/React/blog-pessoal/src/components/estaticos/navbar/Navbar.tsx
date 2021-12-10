import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../../store/user/UserReducer';
import { addToken } from '../../../store/user/Actions';
import { toast } from 'react-toastify';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';


function Navbar() {
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );
    const tipo = useSelector<UserState, UserState["tipo"]>(
        (state) => state.tipo
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
    var cadastrarTema;
    var cadastrarPostagem;
    var home;

    if (tipo === 'Admin') {
        cadastrarTema = <Link to="/formularioTema" className="text-decorator-none">
            <Box mx={1} className='cursor'>
                <PostAddIcon />
            </Box>
        </Link>

        cadastrarPostagem = <Link to="/formularioPostagem" className="text-decorator-none">
            <Box mx={1} className='cursor'>
                <MenuBookIcon />
            </Box>
        </Link>

        home = <Link to="/home" className="text-decorator-none">
            <Box mx={1} className='cursor'>
            <HomeIcon/>
            </Box>
        </Link>
    }


    if (token != '') {
        navbarComponent = <AppBar position="static" className='navbar-color' >
            <Toolbar variant="dense" >
                <Box sx={{ display: { xs: 'flex', sm: 'block' } }}>
                    <Box display="flex" justifyContent="start">
                        {home}
                        {cadastrarTema}
                        {cadastrarPostagem}
                        <Box mx={1} display='flex' className='cursor'  onClick={goLogout}> 
                            <ExitToAppIcon />
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