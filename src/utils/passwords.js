import bcrypt from "bcrypt";

export const hashPass = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
};
export const ComparePass = async (password, passwordHash) => {
    const isValid = await bcrypt.compare(password, passwordHash);

    return isValid;
};