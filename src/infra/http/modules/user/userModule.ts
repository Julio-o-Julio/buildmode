import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { PrismaService } from '../../../database/prisma/prismaService';
import { PrismaUserRepository } from '../../../database/prisma/repositories/PrismaUserRepository';
import { UserController } from './userController';

export function createUserModule() {
  const prisma = new PrismaService();
  const userRepository = new PrismaUserRepository(prisma);
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const userController = new UserController(createUserUseCase);

  return { userController };
}
