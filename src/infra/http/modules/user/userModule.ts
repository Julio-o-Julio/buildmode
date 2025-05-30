import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { PrismaService } from '../../../database/prisma/prismaService';
import { PrismaUserRepository } from '../../../database/prisma/repositories/PrismaUserRepository';

export function userModule() {
  const prisma = new PrismaService();
  const userRepository = new PrismaUserRepository(prisma);
  const createUserUseCase = new CreateUserUseCase(userRepository);

  return { createUserUseCase };
}
