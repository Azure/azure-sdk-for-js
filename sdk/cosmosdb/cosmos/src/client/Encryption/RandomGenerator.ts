import { randomBytes } from "crypto";
export class RandomGenerator {
  constructor() {}
  public async randomBytes(size: number): Promise<string> {
    return randomBytes(size).toString("hex");
  }
}
