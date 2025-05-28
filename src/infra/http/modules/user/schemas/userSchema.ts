import z from 'zod';
import { ExceptionMessage } from '../../../zod/data/ExceptionMessage';
import {
  cleanStringRegex,
  isPhone,
  validCharactersRegex,
} from '../../../zod/helper';

export const createUserSchema = z.object({
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
    .min(6, { message: ExceptionMessage.Length('confirmPassword', 6, 128) })
    .max(128, { message: ExceptionMessage.Length('confirmPassword', 6, 128) }),
});
