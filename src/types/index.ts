export type APIError = {
  message: string;
  code: any;
  status: boolean;
};

export type RepoState = {
  dataPage: DataPage;
  repoList: { [x: number]: Array<ListRepoItem> };
};

export type DataPage = {
  page: number;
  per_page: number;
  data: Array<ListUserItem>;
};

export type ListUserItem = {
  id?: number;
  login?: string;
  node_id?: string;
  organizations_url?: string;
  received_events_url?: string;
  detail_url?: string;
  repos_url?: string;
  location?: string;
  company?: string;
  avatar_url?: string;
  events_url?: string;
  html_url?: string;
  follower_url?: string;
  following_url?: string;
  gists_url?: string;
  gravatar_id?: string;
  followers?: number;
  following?: number;
  bio?: string;
  type?: string;
  score?: string;
  site_admin?: string;
  starred_url?: string;
  subscriptions_url?: string;
  url?: string;
  name?: string;
  blog?: string;
  repoList?: Array<ListRepoItem>;
};

export type ListRepoItem = {
  id?: number;
  owner?: ListUserItem;
  node_id?: string;
  name?: string;
  full_name?: string;
  private?: string;
  description?: string;
  html_url?: string;
  stargazers_count?: string;
  watchers_count?: string;
  language?: string;
};

export type StateData = {
  loading: string[];
  tmp_result: TmpType[];
};

export type TmpType = {
  key: string;
  status: boolean;
  msg: string;
  data: any;
};
