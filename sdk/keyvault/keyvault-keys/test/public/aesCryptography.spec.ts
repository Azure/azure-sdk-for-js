// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { CryptographyClient, JsonWebKey } from "../../src";
import { stringToUint8Array, uint8ArrayToString } from "../utils/crypto";
import { randomBytes as cryptoRandomBytes } from "crypto";
import { isNode } from "@azure/core-http";
import { AesCryptographyProvider } from "../../src/cryptography/aesCryptographyProvider";

describe("aesCryptographyProvider", () => {
  // TODO: move to internal test
  describe("when running in the browser", () => {
    it("uses the browser replacement", async function() {
      if (isNode) {
        this.skip();
      }

      const aesProvider = new AesCryptographyProvider({});
      assert.throws(
        () =>
          aesProvider.encrypt({
            algorithm: "A256CBCPAD",
            plaintext: stringToUint8Array("foo"),
            iv: stringToUint8Array("foo")
          }),
        /not supported in the browser/
      );
    });
  });

  // TODO: add roundtrip and partial roundtrip tests
  // For this we'll need to create a key and import it.
  describe("AES-CBC with PKCS#7 padding (local)", function() {
    function randomBytes(size: number) {
      if (cryptoRandomBytes) {
        return cryptoRandomBytes(size);
      } else {
        return crypto.getRandomValues(new Uint8Array(size));
      }
    }
    const algorithms: { [s: string]: number } = {
      A128CBCPAD: 128,
      A192CBCPAD: 192,
      A256CBCPAD: 256
    };

    for (const algorithm in algorithms) {
      const keySize = algorithms[algorithm];

      describe(`A${keySize}CBCPAD`, () => {
        let jwk: JsonWebKey;
        let cryptoClient: CryptographyClient;

        beforeEach(() => {
          jwk = {
            keyOps: ["encrypt", "decrypt", "wrapKey", "unwrapKey", "sign", "verify"],
            k: randomBytes(keySize >> 3), // Generate a random key until secure key release is available
            kty: "oct"
          };

          cryptoClient = new CryptographyClient(jwk);
        });

        it("encrypts and decrypts", async function() {
          const text = this.test!.title;
          const iv = randomBytes(16);
          const encryptResult = await cryptoClient.encrypt({
            algorithm: algorithm as any,
            plaintext: stringToUint8Array(text),
            iv: iv
          });

          const decryptResult = await cryptoClient.decrypt({
            algorithm: algorithm as any,
            ciphertext: encryptResult.result!,
            iv: encryptResult.iv!
          });

          assert.equal(uint8ArrayToString(decryptResult.result), text);
        });

        it("provides a default IV if none is supplied", async function() {
          const text = this.test!.title;
          const encryptResult = await cryptoClient.encrypt({
            algorithm: algorithm as any,
            plaintext: stringToUint8Array(text)
          });
          assert.exists(encryptResult.iv);

          const decryptResult = await cryptoClient.decrypt({
            algorithm: algorithm as any,
            ciphertext: encryptResult.result!,
            iv: encryptResult.iv!
          });

          assert.equal(uint8ArrayToString(decryptResult.result), text);
        });

        it("checks the kty", async function() {
          const text = this.test!.title;
          jwk.kty = "RSA";
          await assert.isRejected(
            cryptoClient.encrypt({
              algorithm: algorithm as any,
              plaintext: stringToUint8Array(text)
            }),
            /Key type does not match/
          );
          await assert.isRejected(
            cryptoClient.decrypt({
              algorithm: algorithm as any,
              ciphertext: stringToUint8Array(text)
            }),
            /Key type does not match/
          );
        });

        it("checks the key length", async function() {
          const text = this.test!.title;
          jwk.k = randomBytes((keySize >> 3) - 1);
          await assert.isRejected(
            cryptoClient.encrypt({
              algorithm: algorithm as any,
              plaintext: stringToUint8Array(text)
            }),
            /Key must be at least \d+ bits/
          );
          await assert.isRejected(
            cryptoClient.decrypt({
              algorithm: algorithm as any,
              ciphertext: stringToUint8Array(text)
            }),
            /Key must be at least \d+ bits/
          );
        });
      });
    }
  });
});
