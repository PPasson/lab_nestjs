import { IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  firstname: string;
}
