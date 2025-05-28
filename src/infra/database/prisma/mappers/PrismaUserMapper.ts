import { User as UserRaw } from '@prisma/client';
import { parse as uuidParse, stringify as uuidStringify } from 'uuid';
import { User } from '../../../../modules/user/entities/User';

export class PrismaUserMapper {
  static toPrisma({
    id,
    username,
    name,
    phone,
    password,
    updatedAt,
    createdAt,
  }: User): UserRaw {
    return {
      id: uuidParse(id),
      phone,
      name,
      username,
      password,
      updated_at: updatedAt,
      created_at: createdAt,
    };
  }

  static toDomain({
    id,
    username,
    name,
    phone,
    password,
    updated_at,
    created_at,
  }: UserRaw): User {
    return new User(
      {
        username,
        name,
        phone,
        password,
        updatedAt: updated_at,
        createdAt: created_at,
      },
      uuidStringify(id),
    );
  }
}
