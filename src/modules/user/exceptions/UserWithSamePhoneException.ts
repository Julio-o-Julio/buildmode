import { HttpStatus } from '../../../utils/httpStatus';
import { AppException } from './../../../exceptions/appExceptions';

export class UserWithSamePhoneException extends AppException {
  constructor() {
    super({
      message: 'Já existe uma conta com este número de telefone',
      status: HttpStatus.CONFLICT,
    });
  }
}
