export async function createHash(_algorithm: string, _data: Uint8Array): Promise<Buffer> {
  throw new Error("Our libraries don't currently support browser hashing");
}

export class EncryptionProcessor {}

export class RandomGenerator {}

export async function randomBytes(_size: number): Promise<string> {
  throw new Error("Our libraries don't currently support browser random generator");
}
