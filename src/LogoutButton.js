import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { gql, useQuery } from '@apollo/client';

const GET_CUSTOMERS = gql`
  query {
    customers(limit: 10) {
      first_name
    }
  }`;

const LogoutButton = (idToken) => {
  console.log("logout button called");

  const { logout } = useAuth0();
  // Obviously calling a query doesn't belong in button component
  // but I was just trying to get something done quickly.
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

   if (loading) {
     return <div>Loading...</div>;
   }
   if (error) {
     console.error("error:", error);
     return <div>Error!</div>;
   }

  return (
    <div>
      <div><b>I'm Logged in</b></div>
      <br/>
      <div>Data from Hasura:</div>
      {data.customers.map((customer) => {
        return <div key={customer.id}>{customer.first_name}</div>
      })}
      <br/>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
