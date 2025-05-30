import { HttpStatus } from '../../../utils/httpStatus';
import { AppException } from './../../../exceptions/appExceptions';

export class AuthValuesIncorrectException extends AppException {
  constructor() {
    super({
      message: 'Número de telefone ou senha incorretos',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
