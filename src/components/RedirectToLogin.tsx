import React, { useEffect, useContext } from 'react';
import { IonRouterContext } from '@ionic/react';
import { setLoggedInToken } from '../data/user/user.actions';

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
  setUsername: Function;
  setLoggedInToken: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setUsername }) => {
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setUsername(undefined);
    setLoggedInToken(undefined);
    ionRouterContext.push('/apps')
  }, [setIsLoggedIn, setUsername,ionRouterContext]);
  return null;
};

export default RedirectToLogin;
