import React from 'react'
import { ApolloProvider } from "@apollo/client";
import client from './config/gql_config';
import Student from "./Student";

function App() {
  return (
    <ApolloProvider client={client}>
      <Student />
    </ApolloProvider>
  );
}

export default App;
