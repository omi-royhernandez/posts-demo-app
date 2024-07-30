import React from 'react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';
import Posts from './Posts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Create an HttpLink to the GraphQL Zero endpoint
const httpLink = new HttpLink({
  uri: 'https://graphqlzero.almansi.me/api',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Router>
          {/* Entry point for routes */}
          <Routes>
            <Route path="/" element={<Posts />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
