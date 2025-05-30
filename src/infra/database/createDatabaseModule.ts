import { UserRepository } from '../../modules/user/repositories/UserRepository';
import { PrismaService } from './prisma/prismaService';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';

export function createDatabaseModule() {
  const prismaService = new PrismaService();

  const userRepository: UserRepository = new PrismaUserRepository(
    prismaService,
  );

  return {
    userRepository,
  };
}
