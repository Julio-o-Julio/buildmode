import { FastifyInstance } from 'fastify';
import { UserController } from './userController';

export async function userRoutes(
  app: FastifyInstance,
  controller: UserController,
) {
  app.post('/user', controller.createUser.bind(controller));
}
