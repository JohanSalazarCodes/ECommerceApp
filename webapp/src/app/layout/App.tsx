import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../../api/errors/ServerError";
import NotFound from "../../api/errors/NotFound";
import BasketPage from '../../features/basket/BasketPage';
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from '../../features/checkout/CheckoutPage';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from '../../features/account/accountSlice';
import PrivateRoute from './PrivateRoute';

function App() {

  const distpatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await distpatch(fetchCurrentUser());
      await distpatch(fetchBasketAsync());
    } catch(error) {
      console.log(error);
    }
  }, [distpatch]); 

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false);
  const palettleType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: palettleType,
      background: {
        default: palettleType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising app..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" theme="colored" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/catalog" component={Catalog} />
          <Route path="/catalog/:id" component={ProductDetails} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/server-error" component={ServerError} />
          <Route path="/basket" component={BasketPage} />
          <PrivateRoute path="/checkout" component={CheckoutPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
