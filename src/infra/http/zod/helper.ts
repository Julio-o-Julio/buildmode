import { z } from 'zod';
import { ExceptionMessage } from './data/ExceptionMessage';

// Regexs equivalentes aos seus decorators
export const cleanStringRegex = /^[a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/; // letras + caracteres especiais permitidos
export const validCharactersRegex = /^[a-z0-9._]+$/; // apenas letras minúsculas, números, _ e .
export const phoneRegex = /^\d{13}$/; // exatamente 13 dígitos

// Wrappers com mensagens de erro personalizadas
export const cleanString = (field: string) =>
  z.string().refine(
    (val) => cleanStringRegex.test(val),
    { message: ExceptionMessage.CleanString(field) }
  );

export const validCharacters = (field: string) =>
  z.string().refine(
    (val) => validCharactersRegex.test(val),
    { message: ExceptionMessage.ValidCharacters(field) }
  );

export const isPhone = (field: string) =>
  z.string().refine(
    (val) => phoneRegex.test(val),
    { message: ExceptionMessage.Phone(field) }
  );
