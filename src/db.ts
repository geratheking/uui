import fs from 'fs';
import path from 'path';

import { User } from './types/types';

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

    public async readDb():Promise<User[]> {
        const content = await fs.readFileSync(this.dbFilename);
        return JSON.parse(content.toString());
    }

    public async writeDb(users: User[]):Promise<void> {
        await fs.writeFileSync(this.dbFilename, JSON.stringify( users ));
    }

}

export default DataBase;
