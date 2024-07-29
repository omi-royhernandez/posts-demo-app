export interface User {
  name: string;
  company: {
    name: string;
  };
}

export interface Comment {
  id: number;
  email: string;
  body: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  user: User;
  comments: {
    data: Comment[];
  };
}

export interface GetPostsData {
  posts: {
    data: Post[];
  };
}

export interface PageQueryOptions {
  paginate: {
    page?: number;
    limit?: number;
  };
}

export interface GetPostsVars {
  options: PageQueryOptions;
}
