import {BadRequestException, Controller, Get, Query} from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findUsers(@Query('email') email: string, @Query('number') number?: string): Promise<User[]> {
        // Валидация email и number
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new BadRequestException('Invalid email format');
        }
        if (number && !/^\d{6}$/.test(number)) {
            throw new BadRequestException('Invalid number format');
        }

        return await this.usersService.findUsers(email, number);
    }
}
