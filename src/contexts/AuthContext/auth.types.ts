export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User | null;
  email: string;
  id: string;
  name: string;
  role: string;
}

export interface AuthContextData {
  signed: boolean;
  loading: boolean
  signIn: (response: AuthResponse, callback?: () => void) => void;
  signOut: () => void;
  user: User | null; 
}