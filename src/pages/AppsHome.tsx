import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
// import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import AppItem from '../components/AppItem';

interface AppsHomeProps { }

const AppsHome: React.FC<AppsHomeProps> = () => {
  const apps = [
    {
      id: 1,
      name: 'Federal Motion Maker',
      path: '/federal/tabs/search',
      icon: 'logo-bitcoin',
      color: 'primary',
      description: 'Find and save dockets from PACER. Generate legal documents for the same.',
      image: '/assets/lll3.svg'
    },
    {
      id: 2,
      name: 'State Motion Maker',
      path: '/apps',
      icon: 'cog-outline',
      color: 'secondary',
      description: '~~ Coming Soon ~~'
    },
    {
      id: 3,
      name: 'CK Editor Playground',
      path: '/editor',
      icon: 'documents',
      color: 'tertiary',
      description: 'Playground to experiment with CK Editor builds and configurations.'
    },
    {
      id: 0,
      name: 'Conference',
      path: '/conf/tabs/schedule',
      icon: 'people-circle-outline',
      color: 'tertiary',
      description: 'Sample App for a fictional conference. For demonstration purposes only.'
    }
  ]
  return (
    <IonPage id="apps-page">
<IonHeader className="" color="light">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
              <IonTitle size="large">Apps Home</IonTitle>
            <IonButtons slot="end">
              {/* <IonButton onClick={presentPopover}>
                <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
              </IonButton> */}
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <IonContent color="medium">

        <IonGrid>
            <IonRow>
              {apps.map(app => (
                <IonCol size-xs="12" size-sm="6" size-md="4" key={app.id}>
                  <AppItem
                    key={app.id}
                    app={app}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default React.memo(AppsHome);
