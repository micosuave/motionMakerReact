import { Plugins } from '@capacitor/core';
import { Schedule, Session } from '../models/Schedule';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';
import { ICourt } from '../interfaces/ICourt';

const { Storage } = Plugins;

const dataUrl = '/assets/data/data.json';
const locationsUrl = '/assets/data/locations.json';

const courtsUrl = '/assets/data/courts.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';
const FIRETOKEN = 'fireToken'

export const getCourtData = async () => {
  const response  = await Promise.all([
    fetch(courtsUrl),
  ]);
  const courtData = await response[0].json() as ICourt[];
  return courtData
}
export const getConfData = async () => {
  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)]);
  const responseData = await response[0].json();
  const schedule = responseData.schedule[0] as Schedule;
  const sessions = parseSessions(schedule);
  const speakers = responseData.speakers as Speaker[];
  const locations = await response[1].json() as Location[];
  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const data = {
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME }),
    Storage.get({ key: FIRETOKEN }),
  ]);
  const keys = await Storage.keys()
  console.log(keys)
  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  const token = await response[3].value || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username,
    token
  }
  return data;
}
export const setLoggedInTokenData = async (token?: string) => {
  console.log(token);
  if(!token){
    await Storage.remove({ key: FIRETOKEN });
  } else{
    await Storage.set({ key: FIRETOKEN, value: token });

  }
}
export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = [];
  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s))
  });
  return sessions;
}
