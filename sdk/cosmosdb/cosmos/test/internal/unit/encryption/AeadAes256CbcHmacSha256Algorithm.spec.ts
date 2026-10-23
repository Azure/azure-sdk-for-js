// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EncryptionType } from "../../../../src/index.js";
import { AeadAes256CbcHmacSha256Algorithm } from "../../../../src/encryption/AeadAes256CbcHmacSha256Algorithm/index.js";
import { DataEncryptionKey } from "../../../../src/encryption/EncryptionKey/index.js";
import { TypeMarker } from "../../../../src/encryption/enums/TypeMarker.js";
import { createHmac } from "node:crypto";
import { describe, it, assert, beforeEach } from "vitest";

class TestDataEncryptionKey extends DataEncryptionKey {
  constructor(rootKey: Buffer) {
    super(rootKey, "Test Key");
  }
}

describe("AeadAes256CbcHmacSha256 Algorithm", () => {
  let dataEncryptionKey: DataEncryptionKey;
  let algorithm: AeadAes256CbcHmacSha256Algorithm;

  beforeEach(() => {
    const hexString = "A5237E37726177F68CBC114F96B3B2DE4E792E701CC5AA955BEFF41BCF4862A8";
    const rootKey = Buffer.from(hexString, "hex");
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

    assert.ok(!cipherTextBuffer1.equals(cipherTextBuffer2));
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
    cipherTextBuffer[0] = 0x3;
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

  it("should preserve the deterministic legacy golden ciphertext", () => {
    const deterministicAlgorithm = new AeadAes256CbcHmacSha256Algorithm(
      dataEncryptionKey,
      EncryptionType.DETERMINISTIC,
    );
    const ciphertext = deterministicAlgorithm.encrypt(Buffer.from("This is a test message"));
    assert.strictEqual(
      ciphertext.toString("hex"),
      "01fa85f83f344b3e588847490242996b59dca791b24e5460f861e24e502fbaeb1d9751135973ae352d48ea3bdf2ef1dc39cc6761893ed72b3721ce82481cbf6cb9fa0df848964f2fc42449f93ed36ffd24",
    );
  });

  it.each([EncryptionType.DETERMINISTIC, EncryptionType.RANDOMIZED])(
    "should roundtrip authenticated type ciphertext with %s encryption",
    (encryptionType) => {
      const typedAlgorithm = new AeadAes256CbcHmacSha256Algorithm(
        dataEncryptionKey,
        encryptionType,
      );
      const plaintext = Buffer.from("This is a test message");
      const ciphertext = typedAlgorithm.encrypt(plaintext, TypeMarker.String);
      assert.strictEqual(ciphertext[0], 2);
      assert.deepStrictEqual(typedAlgorithm.decrypt(ciphertext, TypeMarker.String), plaintext);
    },
  );

  it("should authenticate the exact experimental version, marker, IV, ciphertext, and version size", () => {
    const plaintext = Buffer.from("This is a test message");
    const ciphertext = algorithm.encrypt(plaintext, TypeMarker.String);
    const expectedTag = createHmac("sha256", dataEncryptionKey.macKeyBuffer)
      .update(
        Buffer.concat([
          Buffer.from([2, TypeMarker.String]),
          ciphertext.subarray(33, 49),
          ciphertext.subarray(49),
          Buffer.from([1]),
        ]),
      )
      .digest();
    assert.deepStrictEqual(ciphertext.subarray(1, 33), expectedTag);
  });

  it("should preserve framing, length, deterministic IV, and AES ciphertext across formats", () => {
    const deterministicAlgorithm = new AeadAes256CbcHmacSha256Algorithm(
      dataEncryptionKey,
      EncryptionType.DETERMINISTIC,
    );
    const plaintext = Buffer.from("This is a test message");
    const legacy = deterministicAlgorithm.encrypt(plaintext);
    const typed = deterministicAlgorithm.encrypt(plaintext, TypeMarker.String);
    assert.strictEqual(typed.length, legacy.length);
    assert.deepStrictEqual(typed.subarray(33), legacy.subarray(33));
    assert.notDeepEqual(typed.subarray(0, 33), legacy.subarray(0, 33));
    assert.deepStrictEqual(deterministicAlgorithm.encrypt(plaintext, TypeMarker.String), typed);
  });

  it("should compare randomized authenticated ciphertext by content", () => {
    const plaintext = Buffer.from("This is a test message");
    assert.ok(
      !algorithm
        .encrypt(plaintext, TypeMarker.String)
        .equals(algorithm.encrypt(plaintext, TypeMarker.String)),
    );
  });

  it.each([TypeMarker.Double, TypeMarker.Boolean, TypeMarker.Null, 0, 255])(
    "should reject marker tampering to %s before interpreting plaintext",
    (tamperedMarker) => {
      const ciphertext = algorithm.encrypt(Buffer.from("12345678"), TypeMarker.Long);
      assert.throws(
        () => algorithm.decrypt(ciphertext, tamperedMarker),
        /Invalid authentication tag/,
      );
    },
  );

  it("should require a marker to decrypt experimental ciphertext", () => {
    const ciphertext = algorithm.encrypt(Buffer.from("message"), TypeMarker.String);
    assert.throws(() => algorithm.decrypt(ciphertext), /A one-byte type marker is required/);
  });

  it("should reject version changes without falling back to the other authentication input", () => {
    const legacy = algorithm.encrypt(Buffer.from("message"));
    legacy[0] = 2;
    assert.throws(() => algorithm.decrypt(legacy, TypeMarker.String), /Invalid authentication tag/);
    const typed = algorithm.encrypt(Buffer.from("message"), TypeMarker.String);
    typed[0] = 1;
    assert.throws(() => algorithm.decrypt(typed, TypeMarker.String), /Invalid authentication tag/);
  });

  it("should not accept a version 2 tag that omits the marker", () => {
    const ciphertext = algorithm.encrypt(Buffer.from("message"), TypeMarker.String);
    const tagWithoutMarker = createHmac("sha256", dataEncryptionKey.macKeyBuffer)
      .update(Buffer.concat([Buffer.from([2]), ciphertext.subarray(33), Buffer.from([1])]))
      .digest();
    tagWithoutMarker.copy(ciphertext, 1);
    assert.throws(
      () => algorithm.decrypt(ciphertext, TypeMarker.String),
      /Invalid authentication tag/,
    );
  });

  it.each([0, 3, 255])("should reject unknown version %s", (version) => {
    const ciphertext = algorithm.encrypt(Buffer.from("message"), TypeMarker.String);
    ciphertext[0] = version;
    assert.throws(
      () => algorithm.decrypt(ciphertext, TypeMarker.String),
      /Invalid cipher text version/,
    );
  });

  it.each([undefined, TypeMarker.String])(
    "should reject truncated ciphertext with marker %s",
    (marker) => {
      const ciphertext = algorithm.encrypt(Buffer.from("This is a test message"), marker);
      for (const length of [0, 1, 32, 48, 49, 64, ciphertext.length - 1, ciphertext.length - 16]) {
        assert.throws(
          () => algorithm.decrypt(ciphertext.subarray(0, length), marker),
          /Invalid (cipher text length|authentication tag)/,
        );
      }
    },
  );

  it("should alternate legacy and authenticated reads on the same algorithm without version state", () => {
    const plaintext = Buffer.from("message");
    const legacy = algorithm.encrypt(plaintext);
    const typed = algorithm.encrypt(plaintext, TypeMarker.String);
    assert.deepStrictEqual(algorithm.decrypt(legacy, TypeMarker.String), plaintext);
    assert.deepStrictEqual(algorithm.decrypt(typed, TypeMarker.String), plaintext);
    assert.deepStrictEqual(algorithm.decrypt(legacy), plaintext);
    assert.strictEqual(algorithm.encrypt(plaintext)[0], 1);
  });
});
