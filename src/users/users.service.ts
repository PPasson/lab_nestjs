import { Body, Injectable, Param, Res } from '@nestjs/common';
import { Users } from 'src/entities/user.entity';
import { UsersRepository } from 'src/repositories/user.repository';
import { FindOneOptions, FindManyOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';

@Injectable()
export class UserService {
  userRepository: any;
  constructor(private readonly users: UsersRepository) {}

  async createUser(@Body() body: CreateUserDto): Promise<Users> {
    const { id, username, password, firstname, lastname } = body;
    const user = new Users();
    user.id = id;
    user.username = username;
    user.password = password;
    user.firstname = firstname;
    user.lastname = lastname;

    const userData = await user.save();
    return userData;
  }

  async findAll(options: FindManyOptions<Users> = {}): Promise<Users[]> {
    return await this.users.find(options);
  }



  async findOne(options: FindOneOptions<Users> =  {}): Promise<Users | undefined> {
    return await this.users.findOne(options);
  }
/*
  async findOne(username: string): Promise<Users[] | undefined>{
    return this.users.find(user => user.username === username);
  }*/


  async remove(id: number) {
    {
      const __User = await this.findOne({
        where: {
          id: id,
        },
      });
      await __User.remove();
    }
  }

  async update(id: number, body: UpdateUserDto): Promise<Users> {
    const { username, password, firstname, lastname } = body;
    const _oldUser = await this.findOne({
      where: {
        id: id,
      },
    });
    if (id) _oldUser.id = id;
    if (username) _oldUser.username = username;
    if (password) _oldUser.password = password;
    if (firstname) _oldUser.firstname = firstname;
    if (lastname) _oldUser.lastname = lastname;

    await _oldUser.save();
    return _oldUser;
  }

  async getUser(filter: UserFilterDto): Promise<Users[]> {
    return await this.userRepository.getProductAndSearch(filter);
  }
}