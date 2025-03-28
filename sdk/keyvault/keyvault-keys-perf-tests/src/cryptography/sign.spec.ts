// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash, randomBytes } from "node:crypto";
import { CryptographyTest } from "./cryptography.spec.js";

export class SignTest extends CryptographyTest {
  private digest?: Uint8Array;

  async setup() {
    const plaintext = randomBytes(32);
    this.digest = createHash("SHA256").update(plaintext).digest();
  }

  async run(): Promise<void> {
    await CryptographyTest.cryptoClient!.sign("RS256", this.digest!);
  }
}
