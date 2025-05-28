import { HttpStatus } from '../../../utils/httpStatus';
import { AppException } from './../../../exceptions/appExceptions';

export class PasswordMismatchException extends AppException {
  constructor() {
    super({
      message:
        'As senhas digitadas não coincidem. Por favor, verifique e tente novamente.',
      status: HttpStatus.CONFLICT,
    });
  }
}
