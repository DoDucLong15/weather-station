import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { encryptedText } from './helpers/security.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  public async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const checkUser = await this.userRepository.findOne({
      where: {
        email: dto.email
      }
    });
    if(checkUser) {
      throw new BadRequestException('User does exist!');
    }
    if(dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Confirm Password incorrect!');
    }
    const newUser = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      encodePassword: await encryptedText(dto.password)
    } as UserEntity;
    return await this.userRepository.save(newUser);
  }

  public async getUser(options: FindOneOptions<UserEntity>): Promise<UserEntity | null> {
    return await this.userRepository.findOne(options)
  }
}
