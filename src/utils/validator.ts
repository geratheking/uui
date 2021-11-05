import { CreateUserDto } from '../types/types'

const validate = {
    createUserValidation: (body: CreateUserDto): string[] => {
        const requiredField = ['name', 'age'];
        let errors: string[] = [];

        requiredField.forEach((field: string) => {

            if (!(field in body)) {
                errors.push(`Field "${field}" is required`);
            }
        });

        return errors;
    }
}

export default validate;