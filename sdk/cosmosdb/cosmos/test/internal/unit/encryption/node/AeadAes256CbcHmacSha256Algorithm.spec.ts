// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EncryptionType } from "../../../../../src/index.js";
import { AeadAes256CbcHmacSha256Algorithm } from "../../../../../src/encryption/AeadAes256CbcHmacSha256Algorithm/index.js";
import { DataEncryptionKey } from "../../../../../src/encryption/EncryptionKey/index.js";
import { describe, it, assert, expect, beforeEach } from "vitest";
import { stringToUint8Array } from "@azure/core-util";

class TestDataEncryptionKey extends DataEncryptionKey {
  private constructor(rootKey: Uint8Array) {
    super(rootKey, "Test Key");
  }

  static async createTest(rootKey: Uint8Array): Promise<TestDataEncryptionKey> {
    const key = new TestDataEncryptionKey(rootKey);
    await key.deriveKeys(rootKey);
    return key;
  }
}

describe("AeadAes256CbcHmacSha256 Algorithm", () => {
  let dataEncryptionKey: DataEncryptionKey;
  let algorithm: AeadAes256CbcHmacSha256Algorithm;

  beforeEach(async () => {
    const hexString = "A5237E37726177F68CBC114F96B3B2DE4E792E701CC5AA955BEFF41BCF4862A8";
    const rootKey = stringToUint8Array(hexString, "hex");
    dataEncryptionKey = await TestDataEncryptionKey.createTest(rootKey);
    algorithm = new AeadAes256CbcHmacSha256Algorithm(dataEncryptionKey, EncryptionType.RANDOMIZED);
  });

  it("should encrypt and decrypt correctly", async () => {
    const plainText = new TextEncoder().encode("This is a test message");
    const cipherText = await algorithm.encrypt(plainText);
    const decrypted = await algorithm.decrypt(cipherText);
    assert.deepEqual(decrypted, plainText);
  });

  it("should produce different ciphertext for the same plaintext when using randomized encryption", async () => {
    const plainText = new TextEncoder().encode("This is a test message");
    const cipherText1 = await algorithm.encrypt(plainText);
    const cipherText2 = await algorithm.encrypt(plainText);

    assert.notDeepEqual(cipherText1, cipherText2);
  });

  it("should produce the same ciphertext for the same plaintext when using deterministic encryption", async () => {
    const deterministicAlgorithm = new AeadAes256CbcHmacSha256Algorithm(
      dataEncryptionKey,
      EncryptionType.DETERMINISTIC,
    );
    const plainText = new TextEncoder().encode("This is a test message");
    const cipherText1 = await deterministicAlgorithm.encrypt(plainText);
    const cipherText2 = await deterministicAlgorithm.encrypt(plainText);

    assert.deepEqual(cipherText1, cipherText2);
  });

  it("should throw an error if ciphertext is too short", async () => {
    const invalidCipherText = new Uint8Array([0x1]);
    await expect(() => algorithm.decrypt(invalidCipherText)).rejects.toThrow(
      /Invalid cipher text length/,
    );
  });

  it("should throw an error if ciphertext has an invalid version", async () => {
    const plainText = new TextEncoder().encode("This is a test message");
    const cipherText = await algorithm.encrypt(plainText);
    // The first byte of the cipher text represents algo version, altering it should throw error
    cipherText[0] = 0x2;
    await expect(() => algorithm.decrypt(cipherText)).rejects.toThrow(
      /Invalid cipher text version/,
    );
  });

  it("should throw an error if the authentication tag is invalid", async () => {
    const plainText = new TextEncoder().encode("This is a test message");
    const cipherText = await algorithm.encrypt(plainText);
    // Modify the last byte of cipherText to make the authentication tag invalid
    cipherText[cipherText.length - 1] = ~cipherText[cipherText.length - 1];
    // should fail while decrypting since cipher text is tampered
    await expect(() => algorithm.decrypt(cipherText)).rejects.toThrow(
      /Invalid authentication tag/,
    );
  });
});
