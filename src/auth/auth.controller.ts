import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/zod/zod-validation-pipe';
import { SignInDtoSchema, TSignInDto } from 'src/models/sign-in';
import { SignUpDtoSchema, TSignUpDto } from 'src/models/sign-up';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(SignInDtoSchema))
  signIn(@Body() signInDto: TSignInDto) {
    const { email, password } = signInDto;

    return this.authService.signIn(email, password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @UsePipes(new ZodValidationPipe(SignUpDtoSchema))
  signUp(@Body() signUpDto: TSignUpDto) {
    const { email, username, password } = signUpDto;

    return this.authService.signUp(email, username, password);
  }
}
