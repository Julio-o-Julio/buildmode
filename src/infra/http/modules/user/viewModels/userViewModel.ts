import { User } from '../../../../../modules/user/entities/User';

export class UserViewModel {
  static toHttp({ username, name, phone, createdAt }: User) {
    return {
      username,
      name,
      phone,
      createdAt,
    };
  }
}
