import { FastifyTypedInstance } from '../../../../config/typesFastify';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { HttpStatus } from '../../../../utils/httpStatus';
import { createDatabaseModule } from '../../../database/createDatabaseModule';
import { createUserSchema } from './schemas/createUserSchema';
import { UserViewModel } from './viewModels/userViewModel';

export async function userRoutes(app: FastifyTypedInstance) {
  app.post(
    '/user',
    {
      schema: {
        tags: ['users'],
        description: 'Create a new user',
        body: createUserSchema,
      },
    },
    async (req, res) => {
      const { username, phone, name, password, confirmPassword } = req.body;

      const { userRepository } = createDatabaseModule();

      const createUserUseCase = new CreateUserUseCase(userRepository);

      const user = await createUserUseCase.execute({
        username,
        phone,
        name,
        password,
        confirmPassword,
      });

      return res.status(HttpStatus.CREATED).send(UserViewModel.toHttp(user));
    },
  );
}
