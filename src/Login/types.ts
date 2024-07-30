export interface UserData {
  email: string;
}

export interface SearchOptions {
  q: string;
}

export interface PageQueryOptions {
  search: SearchOptions;
}

export interface QueryOptions {
  options: PageQueryOptions;
}

export interface AuthenticateEmailData {
  users: {
    data: UserData[];
  };
}
