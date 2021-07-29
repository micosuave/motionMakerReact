export interface UserState {
  isLoggedin: boolean;
  token?: string;
  username?: string;
  darkMode: boolean;
  hasSeenTutorial: boolean;
  loading: boolean;
};
