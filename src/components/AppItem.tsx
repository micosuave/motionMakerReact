import React from 'react';
import { IApps } from '../models/IApps';
import { IonCard, IonCardHeader, IonLabel, IonCardContent, } from '@ionic/react';


interface AppItemProps {
  app: IApps;
}

const AppItem: React.FC<AppItemProps> = ({ app }) => {
  return (
    <>
      <IonCard className="speaker-card" color={app.color} routerLink={app.path}>
        <IonCardHeader>
          {/* <IonItem button detail={false} lines="none" className="speaker-item">
            <IonAvatar slot="start">
              <img src={process.env.PUBLIC_URL + app.image} alt="AppIcon" />
            </IonAvatar>
          </IonItem> */}
          <IonLabel>
              <h2>{app.name}</h2>

            </IonLabel>
        </IonCardHeader>

        <IonCardContent>
          <p>{process.env.PUBLIC_URL}</p>
          <p>{app.description}</p>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default AppItem;
