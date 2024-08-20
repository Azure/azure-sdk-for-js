// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { randomBytes } from "crypto";
import { EncryptionType } from "../../../../src";
import { AeadAes256CbcHmacSha256Algorithm } from "../../../../src/encryption/AeadAes256CbcHmacSha256Algorithm";
import { DataEncryptionKey } from "../../../../src/encryption/EncryptionKey";

class TestDataEncryptionKey extends DataEncryptionKey {
  constructor(rootKey: Buffer) {
    super(rootKey, "Test Key");
  }
}

describe("AeadAes256CbcHmacSha256 Algorithm", () => {
  let dataEncryptionKey: DataEncryptionKey;
  let algorithm: AeadAes256CbcHmacSha256Algorithm;

  beforeEach(() => {
    const rootKey = randomBytes(32);
    dataEncryptionKey = new TestDataEncryptionKey(rootKey);
    algorithm = new AeadAes256CbcHmacSha256Algorithm(dataEncryptionKey, EncryptionType.RANDOMIZED);
  });

  it("should encrypt and decrypt correctly", () => {
    const plainTextBuffer = Buffer.from("This is a test message");
    const cipherTextBuffer = algorithm.encrypt(plainTextBuffer);
    const decryptedBuffer = algorithm.decrypt(cipherTextBuffer);
    assert.strictEqual(decryptedBuffer.toString(), plainTextBuffer.toString());
  });

  it("should produce different ciphertext for the same plaintext when using randomized encryption", () => {
    const plainTextBuffer = Buffer.from("This is a test message");
    const cipherTextBuffer1 = algorithm.encrypt(plainTextBuffer);
    const cipherTextBuffer2 = algorithm.encrypt(plainTextBuffer);

    assert.ok(cipherTextBuffer1 !== cipherTextBuffer2);
  });

  it("should produce the same ciphertext for the same plaintext when using deterministic encryption", () => {
    const deterministicAlgorithm = new AeadAes256CbcHmacSha256Algorithm(
      dataEncryptionKey,
      EncryptionType.DETERMINISTIC,
    );
    const plainTextBuffer = Buffer.from("This is a test message");
    const cipherTextBuffer1 = deterministicAlgorithm.encrypt(plainTextBuffer);
    const cipherTextBuffer2 = deterministicAlgorithm.encrypt(plainTextBuffer);

    assert.ok(cipherTextBuffer1.equals(cipherTextBuffer2));
  });

  it("should throw an error if ciphertext is too short", () => {
    const invalidCipherText = Buffer.from([0x1]);
    assert.throws(() => algorithm.decrypt(invalidCipherText), /Invalid cipher text length/);
  });

  it("should throw an error if ciphertext has an invalid version", () => {
    const plainTextBuffer = Buffer.from("This is a test message");
    const cipherTextBuffer = algorithm.encrypt(plainTextBuffer);
    // The first byte of the cipher text represents algo version, altering it should throw error
    cipherTextBuffer[0] = 0x2;
    assert.throws(() => algorithm.decrypt(cipherTextBuffer), /Invalid cipher text version/);
  });

  it("should throw an error if the authentication tag is invalid", () => {
    const plainTextBuffer = Buffer.from("This is a test message");
    const cipherTextBuffer = algorithm.encrypt(plainTextBuffer);
    // Modify the last byte of cipherTextBuffer tag to make the authentication tag invalid
    cipherTextBuffer[cipherTextBuffer.length - 1] = ~cipherTextBuffer[cipherTextBuffer.length - 1];
    // should fail while decrypting since cipher text is tampered
    assert.throws(() => algorithm.decrypt(cipherTextBuffer), /Invalid authentication tag/);
  });
});
