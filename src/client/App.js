import React from 'react';
import './App.css';
import PosterDesignPage from './customPoster/PosterDesignPage';
import Home from './homePage/Home';
import ShopProvider from './context/shopContext';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Config from './Config';
import Cart from './components/payment/Cart';



function App(props) {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#444',
      },
      secondary: {
        main: Config.colors.successGreen,
      }
    }
  });

  return (
    <ShopProvider>
        <ThemeProvider theme={theme}>
        <Router>
        <Cart/>
            <Switch>
              <Route path="/customMap">
                <meta name="viewport" content="width=500px, user-scalable=no"/>
                <PosterDesignPage/>
              </Route>
              <Route path="/">
                <meta name="viewport" content="width=1020px, user-scalable=yes"/>
                <Home/>
              </Route>
            </Switch>
        </Router>
      </ThemeProvider>
    </ShopProvider>
  );
}
export default App;
