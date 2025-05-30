import { z } from 'zod';
import { FastifyTypedInstance } from '../../../../config/typesFastify';
import { HttpStatus } from '../../../../utils/httpStatus';
import { ExceptionMessage } from '../../zod/data/ExceptionMessage';
import {
  cleanStringRegex,
  isPhone,
  validCharactersRegex,
} from '../../zod/helper';
import { userModule } from './userModule';
import { UserViewModel } from './viewModels/userViewModel';

export async function userRoutes(app: FastifyTypedInstance) {
  app.post(
    '/user',
    {
      schema: {
        tags: ['users'],
        description: 'Create a new user',
        body: z.object({
          username: z
            .string()
            .min(4, { message: ExceptionMessage.Length('username', 4, 32) })
            .max(32, { message: ExceptionMessage.Length('username', 4, 32) })
            .refine((val) => cleanStringRegex.test(val), {
              message: ExceptionMessage.CleanString('username'),
            })
            .refine((val: string) => val === val.toLowerCase(), {
              message: ExceptionMessage.Lowercase('username'),
            })
            .refine((val: any) => validCharactersRegex.test(val), {
              message: ExceptionMessage.ValidCharacters('username'),
            }),

          phone: isPhone('phone'),

          name: z
            .string()
            .min(2, { message: ExceptionMessage.Length('name', 2, 128) })
            .max(128, { message: ExceptionMessage.Length('name', 2, 128) })
            .optional(),

          password: z
            .string()
            .min(6, { message: ExceptionMessage.Length('password', 6, 128) })
            .max(128, { message: ExceptionMessage.Length('password', 6, 128) }),

          confirmPassword: z
            .string()
            .min(6, {
              message: ExceptionMessage.Length('confirmPassword', 6, 128),
            })
            .max(128, {
              message: ExceptionMessage.Length('confirmPassword', 6, 128),
            }),
        }),
      },
    },
    async (req, res) => {
      const { username, phone, name, password, confirmPassword } = req.body;

      const { createUserUseCase } = userModule();

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
