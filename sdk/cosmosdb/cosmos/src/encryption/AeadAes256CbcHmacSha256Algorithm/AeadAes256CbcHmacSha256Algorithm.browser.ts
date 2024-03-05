export class AeadAes256CbcHmacSha256Algorithm {}
export function randomBytes(_size: number): Buffer {
  throw new Error("Client-side random generator not supported in browser environment");
}
