import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { PrimaryGeneratedColumn, Table } from "typeorm";

export class CreateUserDto {
    id: number;

    @ApiProperty({example: 'lnwza55plus'})
    @IsString()
    username: string;

    @ApiProperty({example: 'employee'})
    @IsString()
    role: string;

    @ApiProperty({example: 'jubjub'})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: 'Passon'})
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({example: 'Thecoolest'})
    @IsString()
    @IsNotEmpty()
    lastname: string;
}

export class CreateLoginDto {
    @ApiProperty({example: 'lnwza55plus'})
    @IsString()
    username: string;

    @ApiProperty({example: 'jubjub'})
    @IsString()
    @IsNotEmpty()
    password: string;
}
