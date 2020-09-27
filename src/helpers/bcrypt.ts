import bcrypt from "bcryptjs";

export const hashPassword = (password: string): string => {
    const SALT = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, SALT);
};

export const comparePassword = (password: string, dbPassword: string): boolean => {
    return bcrypt.compareSync(password, dbPassword);
};