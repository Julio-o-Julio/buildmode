import { FastifyTypedInstance } from '../../../../config/typesFastify';
import { ValidateUserUseCase } from '../../../../modules/auth/useCases/validateUserUseCase/validateUserUseCase';
import { HttpStatus } from '../../../../utils/httpStatus';
import { createDatabaseModule } from '../../../database/createDatabaseModule';
import { UserPayload } from './models/UserPayload';
import { signInSchema } from './schemas/signInSchema';

export function authRoutes(app: FastifyTypedInstance) {
  app.post(
    '/signIn',
    {
      schema: {
        tags: ['signIn', 'users'],
        description: 'Sign in user',
        body: signInSchema,
      },
    },
    async (req, res) => {
      const { phone, password } = req.body;

      const { userRepository } = createDatabaseModule();

      const validateUserUseCase = new ValidateUserUseCase(userRepository);

      const user = await validateUserUseCase.execute({ phone, password });

      const payload: UserPayload = {
        sub: user.id,
        username: user.username,
        name: user.name,
        phone: user.phone,
        updatedAt: user.updatedAt.toJSON(),
        createdAt: user.createdAt.toJSON(),
      };

      const jwtToken = app.jwt.sign(payload);

      return res.status(HttpStatus.OK).send({ access_token: jwtToken });
    },
  );
}
