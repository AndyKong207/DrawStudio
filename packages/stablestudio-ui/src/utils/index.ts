import sha256 from "crypto-js/sha256";

export function hash(password: string) {
  const salt = "G3AlV9e9ohT/0zKaFB5JzxRQUAw";
  return sha256(password + salt).toString();
}
