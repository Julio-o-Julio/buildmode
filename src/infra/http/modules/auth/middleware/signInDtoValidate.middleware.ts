import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { SignInBody } from '../schemas/signInSchema';

@Injectable()
export class SignInDtoValidateMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    const body: SignInBody = req.body as SignInBody;

    const signInBody = new SignInBody();
    signInBody.phone = body.phone;
    signInBody.password = body.password;

    const validations = await validate(signInBody);

    if (validations.length) {
      throw new BadRequestException(validations);
    }

    next();
  }
}
