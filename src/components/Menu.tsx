import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle, IonHeader, IonToolbar, IonAvatar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { calendarOutline, hammer, moonOutline, help, informationCircleOutline, logIn, logOut, mapOutline, peopleOutline, person, personAdd, homeOutline, documentOutline, documentAttachOutline, documentsOutline, documentTextOutline, createOutline, pencilOutline, personCircleOutline, searchOutline, searchCircleOutline, listOutline } from 'ionicons/icons';

import { connect } from '../data/connect';
import { setDarkMode } from '../data/user/user.actions';

import './Menu.css'
const LexlabLogo = 'assets/lll3.svg';
const routes = {
  apps: [
    {
      title: 'Federal Motion Maker',
      appPages: [
      { title: 'Search', path: '/federal/tabs/search', icon: searchOutline },
      { title: 'Dockets', path: '/federal/tabs/dockets', icon: listOutline },
      { title: 'Templates', path: '/federal/tabs/templates', icon: documentsOutline },
      ]
    },
    {
      title: 'State Motion Maker',
      appPages: [
      { title: 'New Case', path: '/state/tabs/schedule', icon: createOutline, disabled: true },
      { title: 'Dockets', path: '/state/tabs/speakers', icon: listOutline, disabled: true },
      { title: 'Templates', path: '/state/tabs/map', icon: documentsOutline, disabled: true },
      ]
    },
    {
      title: 'Conference',
      appPages: [
      { title: 'Schedule', path: '/conf/tabs/schedule', icon: calendarOutline },
      { title: 'Speakers', path: '/conf/tabs/speakers', icon: peopleOutline },
      { title: 'Map', path: '/conf/tabs/map', icon: mapOutline },
      { title: 'About', path: '/conf/tabs/about', icon: informationCircleOutline }
      ]
    }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: person },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Logout', path: '/logout', icon: logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Signup', path: '/signup', icon: personAdd }
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string,
  disabled?: boolean
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, isAuthenticated, setDarkMode, menuEnabled }) => {
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem disabled={p.disabled} detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu  type="overlay" disabled={!menuEnabled} contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonAvatar slot="start" className="mmc-test-class">
            <img src={LexlabLogo} alt="Lexlab Logo" />
          </IonAvatar>
          <IonTitle>LexLab</IonTitle>
          <IonButtons slot="end">
            <IonMenuToggle autoHide={false}>
              <IonButton fill="clear" routerLink="/apps">
                <IonIcon slot="icon-only" icon={homeOutline}></IonIcon>
              </IonButton>
            </IonMenuToggle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        {
          routes.apps.map((app, index) => {
            return (
                <IonList lines="none" key={`App+${index}`}>
          <IonListHeader>{app.title}</IonListHeader>
          {renderlistItems(app.appPages)}
        </IonList>
              )


          })
        }

        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
          <IonItem>
            <IonIcon slot="start" icon={moonOutline}></IonIcon>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem button onClick={() => {
            history.push('/tutorial');
          }}>
            <IonIcon slot="start" icon={hammer} />
            Show Tutorial
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})
