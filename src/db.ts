import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { User, CreateUserDto } from './types/types';

const defaultUser: User = {
    id: "0",
    name: 'default user',
    age: 100
};

class DataBase {
    dbFilename = '';
    constructor() {
        const dbFilename = path.join(__dirname, '../', 'db.json');

        if (!fs.existsSync(dbFilename)) {
            fs.writeFileSync(dbFilename, JSON.stringify(
                [defaultUser]
            ));
        }
        this.dbFilename = dbFilename;
    }

    private async readDb():Promise<User[]> {
        const content = await fs.readFileSync(this.dbFilename);
        return JSON.parse(content.toString());
    }

    private async writeDb(users: User[]):Promise<void> {
        await fs.writeFileSync(this.dbFilename, JSON.stringify( users ));
    }

    async getUsers():Promise<User[]> {
        return this.readDb();
    }

    async createUser(requestBody: CreateUserDto):Promise<User> {
        const { name, age } = requestBody;
        const users = await this.readDb();
        //db validation
        const userExists = users.find((user: User) => user.name === name);
        if (userExists) {
            throw new Error(`User ${name} already exists`)
        }

        const newUser: User = {
            id: uuidv4(),
            name,
            age
        }
        users.push(newUser);
        await this.writeDb(users);

        return newUser;
    }

    async deleteUser(id: string) {
        const currentUsers = await this.readDb();

        //db validation
        const userToRemove = currentUsers.find((user: User) => user.id === id);
        if (!userToRemove) {
            throw new Error(`Invalid id`)
        }

        const users = currentUsers.filter((user: User) => user.id !== id);

        await this.writeDb(users);
    }
}

export default DataBase;
