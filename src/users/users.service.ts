import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
    email: string;
    number: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        { email: 'jim@gmail.com', number: '221122' },
        { email: 'jam@gmail.com', number: '830347' },
        { email: 'john@gmail.com', number: '221122' },
        { email: 'jams@gmail.com', number: '349425' },
        { email: 'jams@gmail.com', number: '141424' },
        { email: 'jill@gmail.com', number: '822287' },
        { email: 'jill@gmail.com', number: '822286' },
    ];

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async findUsers(email: string, number?: string): Promise<User[]> {
        await this.delay(5000); // Задержка 5 секунд
        const foundUsers = this.users.filter(user =>
            user.email === email && (number ? user.number === number : true)
        );

        if (foundUsers.length === 0) {
            throw new NotFoundException('No users found');
        }

        return foundUsers;
    }
}
