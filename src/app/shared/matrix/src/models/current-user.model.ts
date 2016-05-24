export class CurrentUser {
  user_id: string;
  access_token: string;
  home_server: string;
  avatar_url: string;
  displayname: string;
  refresh_token: string;
  presence: 'offline' | 'online' = 'offline' ; // TODO tie this into some DOM listeners

  constructor() {}
}