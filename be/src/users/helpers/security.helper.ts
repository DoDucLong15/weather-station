import * as bcrypt from 'bcrypt';

export async function encryptedText(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export async function decryptedText(password: string, encodePassword: string): Promise<boolean> {
  return await bcrypt.compare(password, encodePassword);
}
