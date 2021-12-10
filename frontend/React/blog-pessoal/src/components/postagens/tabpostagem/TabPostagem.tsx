import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';
import ListaTema from '../../temas/listatema/ListaTema';
import Sobre from '../../../paginas/sobre/Sobre';



function TabPostagem() {
  const [value, setValue] = useState('1')
  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static" className='app-bar-color'>
          <Tabs indicatorColor="secondary" onChange={handleChange}>
            <Tab label="Home" value="1" />
            <Tab label="Artigos" value="2" />
            <Tab label="Temas" value="3" />
            <Tab label="Sobre" value="4" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" className='padding-panel'>
          <Box display='flex' className='img-panel-1'/>  
        </TabPanel>
        <TabPanel value="2">
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="3" >
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaTema />
          </Box>
        </TabPanel>
        <TabPanel value="4">
          <Box display='flex'>
           <Sobre/> 
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;