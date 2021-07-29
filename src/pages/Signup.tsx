import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername, setLoggedInToken } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState({});

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }
    if(!confirmPassword || confirmPassword !== password) {
      setConfirmPasswordError(true);
    }
    if(!email) {
      setEmailError(true);
    }

    if(username && password && confirmPassword && email) {
      const postBody = {
        email,
        password,
        confirmPassword,
        handle: username
      }
      axios.post('/api/users/signup', postBody)
        .then(async (resp)=>{
          // resp should contain token
          console.log(resp.data)
          await setLoggedInToken(resp.data.token)
          await setIsLoggedIn(true);
          await setUsernameAction(username);
          history.push('/federal/tabs/search', {direction: 'none'});
        })
        .catch((err)=>{
          console.error(err);
          setErrorMessage(err)
        })
    }
  };

  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={signup}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setUsername(e.detail.value!);
                setUsernameError(false);
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!);
                setPasswordError(false);
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
            <IonItem>
              <IonLabel position="stacked" color="primary">Confirm Password</IonLabel>
              <IonInput name="confirmPassword" type="password" value={confirmPassword} onIonChange={e => {
                setConfirmPassword(e.detail.value!);
                setConfirmPasswordError(false);
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && confirmPasswordError && <IonText color="danger">
              <p className="ion-padding-start">
                Confirm Password is required
              </p>
            </IonText>}
             <IonItem>
              <IonLabel position="stacked" color="primary">E-mail</IonLabel>
              <IonInput name="handle" type="text" value={email} onIonChange={e => {
                setEmail(e.detail.value!);
                setEmailError(false);
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && emailError && <IonText color="danger">
              <p className="ion-padding-start">
                E-mail is required
              </p>
            </IonText>}
          </IonList>
            {formSubmitted && errorMessage && <IonText color="danger">
              <p className="ion-padding-start">
                {`${errorMessage}`}
              </p>
              </IonText>}
          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Create</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})
