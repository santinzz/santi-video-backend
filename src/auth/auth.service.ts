import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/hash/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;

    const payload = { sub: user.id, username: user.username };

    const token = await this.jwtService.signAsync(payload);

    const session = { user: result, token };

    return session;
  }

  // Here Params are already validated by the ZodValidationPipe
  async signUp(email: string, username: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (user) throw new Error('User already exists');

    const hashedPassword = await this.hashService.hashPassword(password);

    const newUser = await this.usersService.createUser({
      email,
      username,
      password: hashedPassword,
    });

    return newUser;
  }
}
