import React, { ReactElement } from 'react';
import {Route, Switch} from 'react-router-dom';

// styles
import {ThemeProvider} from 'styled-components';
import rootTheme from './styles/rootTheme';

// pages
import Home from './pages/Home';
import Instagram from './pages/Instagram';

// components
import Navbar from './components/Navbar';


export default function App(): ReactElement {
  return (
    <ThemeProvider theme={rootTheme}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/instagram" component={Instagram} />
      </Switch>
    </ThemeProvider>
  );
}