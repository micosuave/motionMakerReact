import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { searchOutline, listOutline, documentsOutline } from 'ionicons/icons';
import  SearchPage  from './SearchPage';
import  DocketsList  from './DocketsList';
import  DocketDetail  from './DocketDetail';
import  TemplatesView  from './TemplatesView';

interface FederalTabsProps { }

const FederalTabs: React.FC<FederalTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/federal" to="/federal/tabs/search" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/federal/tabs/search" render={() => <SearchPage />} exact={true} />
        <Route path="/federal/tabs/dockets" render={() => <DocketsList />} exact={true} />
        <Route path="/federal/tabs/search/:id" component={DocketDetail} exact={true} />
        <Route path="/federal/tabs/dockets/:id" component={DocketDetail} />
        <Route path="/federal/tabs/templates" render={() => <TemplatesView />} exact={true} />
        {/* <Route path="/conf/tabs/about" render={() => <About />} exact={true} /> */}
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/federal/tabs/search">
          <IonIcon icon={searchOutline} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/federal/tabs/dockets">
          <IonIcon icon={listOutline} />
          <IonLabel>Dockets</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/federal/tabs/templates">
          <IonIcon icon={documentsOutline} />
          <IonLabel>Templates</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default FederalTabs;
