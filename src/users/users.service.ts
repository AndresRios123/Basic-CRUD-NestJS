import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users : User[] = [];
    private nextId = 1;

    create(dto : CreateUserDto): User{
        const user : User = {
            id : this.nextId++,
            ...dto,
        };
        this.users.push(user);
        return user;
    }

    findAll() : User[]{
        return this.users;
    }

    findOne(id: number) : User {
        const user = this.users.find((u) => u.id === id);
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    remove(id: number) : {deleted : true} {
        const user = this.findOne(id);
        this.users = this.users.filter((u) => u.id !== user.id)
        return {deleted: true};
    }

    update(id: number, dto: UpdateUserDto) : User{
        const user = this.findOne(id);
        Object.assign(user, dto);
        return user;
    }
}
