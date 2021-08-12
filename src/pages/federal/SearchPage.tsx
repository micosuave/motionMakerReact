import React, { useState, useEffect } from "react";
import { IonHeader, IonToolbar, IonTitle, IonButton, IonMenuButton, IonButtons, IonContent, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonIcon, IonList, IonSpinner } from "@ionic/react"
import { playSkipBackOutline, playSkipForwardOutline, searchOutline } from "ionicons/icons";
import { ICourt } from "../../interfaces/ICourt";
import { IDocket } from "../../interfaces/IDocket";
import { getCourtData } from '../../data/dataApi';
import { connect } from '../../data/connect';
import jwtdecode from 'jwt-decode';
import axios, { AxiosRequestConfig } from 'axios';
import { ICLResp } from '../../interfaces/ICLResp';
interface StateProps {
  token?: string
}
export interface SearchPageProps extends StateProps {

}

const SearchPage: React.FC<SearchPageProps> = ({token}) => {
  const [ courts, setCourts ] = useState<ICourt[]>([]);
  const [ selectedCourt, setCourt ] = useState<ICourt>();
  const [ dnum, setDnum ] = useState<string>('');
  const [ searchResults, setSearchResults ] = useState<IDocket[]>([]);
  const [ user, setUser ] = useState<any>({});
  const [ next, setNext ] = useState<string | null>(null);
  const [ prev, setPrev ] = useState<string | null>(null);
  const [ count, setCount ] = useState<string | number | null>(null);
  const axiosCL = axios.create({headers:{ Authorization: 'Bearer ' + token}})

  useEffect(()=>{
    const User = token ? jwtdecode(token) : {};
    setUser(User);
  }, [token])
  // Load Courts on INIT
  useEffect(()=>{
    getCourtData().then((courts)=> setCourts(courts));
  },[])
  // Default to D.Maryland
  useEffect(()=>{
    setCourt(courts[82])
  },[courts])
  const searchCourts = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!dnum){
      alert('docket number required')
    }
    if(dnum && selectedCourt){
      axiosCL.get<ICLResp>(`/api/cl/search/${dnum}/court/${selectedCourt.id}`)
        .then(resp =>{
          setNext(resp.data.next)
          setPrev(resp.data.previous)
          setCount(resp.data.count)
          setSearchResults(resp.data.results)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
  const getNext = async () => {
    let config: AxiosRequestConfig = { params: { url : next}};
    axiosCL.get<ICLResp>('/api/cl/proxy/', config)
    .then(resp =>{
          setNext(resp.data.next)
          setPrev(resp.data.previous)
          setCount(resp.data.count)
          setSearchResults(resp.data.results)
        })
        .catch(err => {
          console.error(err)
        })
  }
  const getPrev = async () => {
    let config: AxiosRequestConfig = { params: { url : prev}};
    axiosCL.get<ICLResp>('/api/cl/proxy/', config)
    .then(resp =>{
          setNext(resp.data.next)
          setPrev(resp.data.previous)
          setCount(resp.data.count)
          setSearchResults(resp.data.results)
        })
        .catch(err => {
          console.error(err)
        })
  }
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
             <form noValidate onSubmit={searchCourts}>
            <IonRow className="ion-align-items-center">
              <IonCol size="7">
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
              <IonCol size="3">
                <IonItem>
                  <IonLabel position="floating">Docket Number</IonLabel>
                  <IonInput type="text" id="dnum" value={dnum} onIonChange={(e) => setDnum(e.detail.value ? e.detail.value.trim() : '')}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="2">
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton color="primary" expand="block" fill="outline" type="submit">
                        <IonIcon slot="icon-only" icon={searchOutline}></IonIcon>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {prev && <IonButton color="danger" expand="block" fill="outline" onClick={() => getPrev()}>
                        <IonIcon slot="icon-only" icon={playSkipBackOutline}></IonIcon>
                      </IonButton>}
                    </IonCol>
                    <IonCol>
                      {next && <IonButton color="success" expand="block" fill="outline" onClick={() => getNext()}>
                        <IonIcon slot="icon-only" icon={playSkipForwardOutline}></IonIcon>
                      </IonButton>}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonRow>
            </form>
            <IonRow className="ion-align-items-center">
              <IonCol push="5" className="ion-align-self-center">
                { count}
                {/* <IonSpinner name="dots"></IonSpinner> */}
                {/* <p>{selectedCourt && selectedCourt.full_name}</p> */}
                {/* <p>{dnum}</p> */}
                {/* <p>{token}</p> */}
                {/* <pre>{JSON.stringify(user, '\n', 2)}</pre> */}
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

// export default SearchPage;
export default connect<StateProps>({
  mapStateToProps: (state) => ({
    token: state.user.token
  }),
  mapDispatchToProps: {

  },
  component: SearchPage
})

