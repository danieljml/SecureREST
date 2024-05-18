import bcrypt from 'bcrypt';

const saltRounds = 5;

export const passwordEncryptor = (password: string): string => {
  return bcrypt.hashSync(password, saltRounds);
};

export const passwordCompare = async (
  password: string,
  passwordHashed: string
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHashed);
};
