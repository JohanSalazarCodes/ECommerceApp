import Catalog from "../../features/catalog/Catalog";
import Header from './Header';
import { Container, createTheme, CssBaseline, Switch } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useState } from 'react';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const palettleType = darkMode? 'dark': 'light';

 const theme = createTheme({
   palette: {
     mode: palettleType,
     background: {
       default: palettleType === 'light'? '#eaeaea' : '#121212'
     }
   }
 })

 function handleThemeChange() {
  setDarkMode(!darkMode);
 }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline  />
     <Header darkMode={darkMode} handleThemeChange={handleThemeChange}  />
 
     <Container>
     <Catalog />
     </Container>
      
    </ThemeProvider>
  );
}

export default App;
