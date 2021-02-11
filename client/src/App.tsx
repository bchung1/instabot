import React from 'react';
import {Route, Switch} from 'react-router-dom';

// styles
import {ThemeProvider} from 'styled-components';
import rootTheme from './styles/rootTheme';

// pages
import Home from './pages/Home';

// components
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider theme={rootTheme}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
