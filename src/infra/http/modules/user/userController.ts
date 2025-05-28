import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { HttpStatus } from '../../../../utils/httpStatus';
import { UserViewModel } from './viewModels/userViewModel';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(req: FastifyRequest, res: FastifyReply) {
    const createUserSchema = z.object({
      username: z.string(),
      phone: z.string(),
      name: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
    });

    const { username, phone, name, password, confirmPassword } =
      createUserSchema.parse(req.body);

    const user = await this.createUserUseCase.execute({
      username,
      phone,
      name,
      password,
      confirmPassword,
    });

    return res.status(HttpStatus.CREATED).send(UserViewModel.toHttp(user));
  }
}
