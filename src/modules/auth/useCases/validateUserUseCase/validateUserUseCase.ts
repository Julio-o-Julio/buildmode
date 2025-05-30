import { UserRepository } from '../../../user/repositories/UserRepository';
import { compare } from 'bcrypt';
import { AuthValuesIncorrectException } from '../../exceptions/AuthValuesIncorrectException';
import { User } from '../../../user/entities/User';

interface ValidateUserRequest {
  phone: string;
  password: string;
}

export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ phone, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByPhone(phone);

    if (!user) throw new AuthValuesIncorrectException();

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) throw new AuthValuesIncorrectException();

    return user;
  }
}
