import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

interface IHashService {
  hashPassword(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

@Injectable()
export class HashService implements IHashService {
  async hashPassword(password: string) {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }

  async compare(password: string, hash: string) {
    return await compare(password, hash);
  }
}
