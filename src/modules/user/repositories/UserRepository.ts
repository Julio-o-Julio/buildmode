import { User } from '../entities/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findByPhone(phone: string): Promise<User | null>;
}
