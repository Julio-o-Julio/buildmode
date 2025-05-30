import { genSalt, hash } from 'bcrypt';
import { User } from '../../entities/User';
import { PasswordMismatchException } from '../../exceptions/PasswordMismatchException';
import { UserWithSamePhoneException } from '../../exceptions/UserWithSamePhoneException';
import { UserWithSameUsernameException } from '../../exceptions/UserWithSameUsernameException';
import { UserRepository } from '../../repositories/UserRepository';

interface CreateUserRequest {
  username: string;
  phone: string;
  name?: string | null;
  password: string;
  confirmPassword: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    username,
    phone,
    name,
    password,
    confirmPassword,
  }: CreateUserRequest) {
    const passwordMismatch = !(password === confirmPassword);
    if (passwordMismatch) throw new PasswordMismatchException();

    const userAlreadyExist = await this.userRepository.findByUsername(username);
    if (userAlreadyExist) throw new UserWithSameUsernameException();

    const userPhoneAlreadyExist = await this.userRepository.findByPhone(phone);
    if (userPhoneAlreadyExist) throw new UserWithSamePhoneException();

    const salt = await genSalt(12);

    const user = new User({
      username,
      phone,
      name,
      password: await hash(password, salt),
    });

    await this.userRepository.create(user);

    return user;
  }
}
