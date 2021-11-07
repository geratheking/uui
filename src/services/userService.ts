import {v4 as uuidv4} from "uuid";
import DataBase from "../db";

import {CreateUserDto, User} from "../types/types";

class UserService {
    db: DataBase;

    constructor() {
        this.db = new DataBase();
    }

    async getUsers():Promise<User[]> {
        return this.db.readDb();
    }

    async createUser(requestBody: CreateUserDto):Promise<User> {
        const { name, age } = requestBody;
        const users = await this.db.readDb();

        const userExists = users.find((user: User) => user.name === name);
        if (userExists) {
            throw new Error(`User ${name} already exists`)
        }

        const newUser: User = {
            id: uuidv4(),
            name,
            age
        };
        users.push(newUser);
        this.db.writeDb(users);

        return newUser;
    }

    async deleteUser(id: string) {
        const currentUsers = await this.db.readDb();

        const userToRemove = currentUsers.find((user: User) => user.id === id);
        if (!userToRemove) {
            throw new Error(`Invalid id`)
        }

        const users = currentUsers.filter((user: User) => user.id !== id);

        await this.db.writeDb(users);
        return userToRemove;
    }
}

export default UserService;