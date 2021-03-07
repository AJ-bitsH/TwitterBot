import React from "react";
import {
  Container,
  Typography,
  FormControl,
  Card,
  CardContent,
  Box,
  Button,
  Input,
  Grid,
} from "@material-ui/core";
import "./App.css";
import DataTable from "./dataTable";

import firebase from "firebase/app";
import "firebase/auth";
//import { fetch } from "./nodeFile";

const firebaseConfig = {
  apiKey: "AIzaSyARBrrh44-8mJ1MJIih9G0vU4wbhYEqczE",
  authDomain: "twitterbot-690eb.firebaseapp.com",
  projectId: "twitterbot-690eb",
  storageBucket: "twitterbot-690eb.appspot.com",
  messagingSenderId: "884229738310",
  appId: "1:884229738310:web:e1d9d8296f3c0911249f47",
  measurementId: "G-F5LCJVRB6L",
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [username, setUsername] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [name, setName] = React.useState("Display name will appear here");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  function twitterSignInPopup() {
    var provider = new firebase.auth.TwitterAuthProvider();
    provider.setCustomParameters({
      lang: "en",
    });
    // [START auth_twitter_signin_popup]
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        // eslint-disable-next-line no-unused-vars
        var token = credential.accessToken;
        // eslint-disable-next-line no-unused-vars
        var secret = credential.secret;

        // The signed-in user info.
        var user = result.user;
        setName(user.displayName);
        setPhotoUrl(user.photoURL);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        alert(errorCode);
        var errorMessage = error.message;
        alert(errorMessage);
        // The email of the user's account used.
        // eslint-disable-next-line no-unused-vars
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // eslint-disable-next-line no-unused-vars
        var credential = error.credential;

        // ...
      });
    // [END auth_twitter_signin_popup]
  }

  return (
    <Container maxwidth="xs">
      <Box m={2} />
      <Card>
        <CardContent>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <FormControl>
              <Input
                id="my-input1"
                value={username}
                aria-describedby="my-helper-text1"
                placeholder="Username"
                onChange={handleUsernameChange}
              />
            </FormControl>

            <Button
              color="primary"
              onClick={() => {
                twitterSignInPopup();
              }}
            >
              signin
            </Button>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <Grid item>
              {photoUrl === "" ? (
                <Typography>profile pic will appear here</Typography>
              ) : (
                <img height={300} width={300} src={photoUrl} alt="new" />
              )}
            </Grid>

            <Grid>
              <Typography>{name}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <DataTable username={username} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
