export interface AuthContextType {
  loggedInUser: string;
  login: (userEmail: string) => void;
  logout: () => void;
}
