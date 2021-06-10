import './App.css';
import { useEffect, useState } from 'react'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = (authToken) => {
  console.log("authtoken:", authToken);

  return new ApolloClient({
    link: new HttpLink({
      // I just set up my own Hasura instance in the cloud so that
      // we don't have to mess with production. It's configured
      // exactly like production.
      uri: 'https://sprad-test-2.hasura.app/v1/graphql',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }),
    cache: new InMemoryCache(),
  });
};

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [client, setClient] = useState();

  useEffect(() => {
    if(!client) {
      // This is the call that gets the access token (JWT) needed to
      // make calls to Hasura.
      getAccessTokenSilently().then((accessToken) => {
        console.log("access token:", accessToken);
        if (accessToken) {
          setClient(createApolloClient(accessToken));
        }
      }).catch(console.error)
    } else if (!isAuthenticated) {
      setClient(undefined)
    }

  }, [getAccessTokenSilently, client, isAuthenticated])

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      { isAuthenticated && client ? <ApolloProvider client={client}><LogoutButton /></ApolloProvider> : <LoginButton /> }
    </div>
  );
}

export default App;
