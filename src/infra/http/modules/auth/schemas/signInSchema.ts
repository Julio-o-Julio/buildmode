import z from 'zod';
import { ExceptionMessage } from '../../../zod/data/ExceptionMessage';
import { phoneRegex } from '../../../zod/helper';

export const signInSchema = z.object({
  phone: z
    .string({ required_error: ExceptionMessage.NotEmpty('phone') })
    .min(13, { message: ExceptionMessage.Length('phone', 13, 13) })
    .max(13, { message: ExceptionMessage.Length('phone', 13, 13) })
    .regex(phoneRegex, { message: ExceptionMessage.Phone('phone') }),

  password: z
    .string({ required_error: ExceptionMessage.NotEmpty('password') })
    .min(6, { message: ExceptionMessage.Length('password', 6, 128) })
    .max(128, { message: ExceptionMessage.Length('password', 6, 128) }),
});
