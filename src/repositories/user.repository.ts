import { Users } from '../entities/user.entity';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserFilterDto } from 'src/users/dto/user-filter.dto';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    async getUserById(id: number): Promise<Users> {
        try {
          const data = await this.findOne({
            select: ['id', 'username', 'password', 'firstname', 'lastname'],
            where: { id: id },
          });
          if (!data) throw new Error('not found id.');
    
          return data;
        } catch (error) {
          console.log(error.message);
          throw new NotFoundException(error.message);
        }
      }

      async getUserAndSearch(filter: UserFilterDto): Promise<Users[]> {
        try {
          const { username, firstname } = filter;
          const queryData = await getConnection()
            .createQueryBuilder(Users, 'user')
            .select(['id', 'username', 'password', 'firstname', 'lastname'])
            .where('is_delete = :is_delete', { is_delete: false });
    
          if (username) {
            queryData.andWhere('username ILIKE :username', {
              username: `%${username}%`,
            });
          }
    
          if (firstname) {
            queryData.andWhere('firstname ILIKE :firstname', {
              firstname: `%${firstname}%`,
            });
          }
    
          const data = await queryData.getRawMany();
    
          return data;
        } catch (error) {
          console.log(error.message);
          throw new NotFoundException(error.message);
        }
      }
}
