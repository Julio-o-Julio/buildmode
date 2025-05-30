import { User } from '../../../../../modules/user/entities/User';

export class AuthRequestModel extends Request {
  user: User;
}
