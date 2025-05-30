import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInUseCase } from '../../../../modules/auth/useCases/signInUseCase/signInUseCase';
import { Public } from './decorators/isPublic';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { AuthRequestModel } from './models/authRequestModel';

@Controller()
export class AuthController {
  constructor(private sigInUseCase: SignInUseCase) {}

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.sigInUseCase.execute({
      user: request.user,
    });

    return { access_token };
  }
}
