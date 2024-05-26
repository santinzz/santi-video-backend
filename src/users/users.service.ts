import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TSignUpDto } from 'src/models/sign-up';

interface IUserService {
  findOne(email: string): Promise<any>;
  getUsers(): Promise<any>;
  createUser(user: TSignUpDto): Promise<any>;
}

@Injectable()
export class UsersService implements IUserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  // Password already hashed here.
  async createUser({ email, username, password }) {
    return await this.prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });
  }
}
