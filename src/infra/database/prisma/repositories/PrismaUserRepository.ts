import { User } from '../../../../modules/user/entities/User';
import { UserRepository } from '../../../../modules/user/repositories/UserRepository';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { PrismaService } from '../prismaService';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: { ...userRaw, username: userRaw.username.toLowerCase() },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
