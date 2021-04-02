import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'src/entities/user.entity';
import { RespUsers } from 'src/interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() Body: CreateUserDto): Promise<any> {
    const dataSave = await this.userService.createUser(Body);
    return { data: dataSave };
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    const { username, password, firstname, lastname } = body;
    const _data: UpdateUserDto = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };

    const _newUser = await this.userService.update(id, _data);
    return _newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const _User = await this.userService.findOne({
      /*where: {
        isDelete: false,
        id: id,
      },*/
    });

    const _mapUsers = await this.mapUser([_User]);
    return _mapUsers;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }

  async mapUser(user: Users[]): Promise<RespUsers[]> {
    try {
      const _results = user.map((val) => {
        const _model: RespUsers = {
          id: val.id ? val.id : '',
          username: val.username ? val.username : '',
          password: val.password ? val.password : '',
          firstname: val.firstname ? val.firstname : '',
          lastname: val.lastname ? val.lastname : '',
        };
        return _model;
      });
      return _results;
    } catch (error) {
      throw error;
    }
  }
  
}
