import React, { useState, useEffect } from "react";
import { IonHeader, IonToolbar, IonTitle, IonButton, IonMenuButton, IonButtons, IonContent, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonIcon, IonList, IonSpinner } from "@ionic/react"
import { playSkipBackOutline, playSkipForwardOutline, searchOutline } from "ionicons/icons";
import { ICourt } from "../../interfaces/ICourt";
import { IDocket } from "../../interfaces/IDocket";
import { getCourtData } from '../../data/dataApi';
export interface SearchPageProps { }

const SearchPage: React.FC<SearchPageProps> = () => {
  const [ courts, setCourts ] = useState<ICourt[]>([]);
  const [ selectedCourt, setCourt ] = useState<ICourt>();
  const [ dnum, setDnum ] = useState<string>('');
  const [ searchResults, setSearchResults ] = useState<IDocket[]>([]);


  // Load Courts on INIT
  useEffect(()=>{
    getCourtData().then((courts)=> setCourts(courts));
  },[])
  // Default to D.Maryland
  useEffect(()=>{
    setCourt(courts[82])
  },[courts])
  return (
    <>
    <IonHeader>
      <IonToolbar color="light">
        <IonTitle>Federal-Search</IonTitle>
        <IonButtons slot="end">
          <IonMenuButton autoHide={true}></IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent color="medium">
      <IonCard>
        <IonCardContent>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol>
                <IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Court</IonLabel>
                    <IonSelect interface="action-sheet" id="courtSelect" value={selectedCourt} onIonChange={(e) => setCourt(e.detail.value)} >
                      <IonSelectOption value="">All Jurisdictions</IonSelectOption>
                      {
                        courts.map( (court, index, courts) => {
                          return (
                            <IonSelectOption value={court} key={'C' + index}>
                              {index + 1}. {court.short_name} - {court.full_name}
                            </IonSelectOption>
                          )
                        })
                      }
                   </IonSelect>
                  </IonItem>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Docket Number</IonLabel>
                  <IonInput type="text" id="dnum" value={dnum} onIonChange={(e) => setDnum(e.detail.value ? e.detail.value.trim() : '')}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton color="primary" expand="block" fill="outline">
                        <IonIcon slot="icon-only" icon={searchOutline}></IonIcon>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonButton color="danger" expand="block" fill="outline">
                        <IonIcon slot="icon-only" icon={playSkipBackOutline}></IonIcon>
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton color="success" expand="block" fill="outline">
                        <IonIcon slot="icon-only" icon={playSkipForwardOutline}></IonIcon>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol push="5" className="ion-align-self-center">
                {/* <IonSpinner name="dots"></IonSpinner> */}
                <p>{selectedCourt && selectedCourt.full_name}</p>
                <p>{dnum}</p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonList>
                  {
                    searchResults.map((docket, index, results) => {
                      return (
                        <IonItem button routerLink={`/federal/tabs/search/docket/${docket.id}`} key={'D' + index}>
                          <IonLabel>{docket.case_name} {docket.docket_number}</IonLabel>
                          <small>filed {docket.date_filed}</small>
                        </IonItem>
                      )
                    })
                  }
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </IonContent>
    <h1>Search Page Works</h1>
    </>
  )
}

export default SearchPage;
