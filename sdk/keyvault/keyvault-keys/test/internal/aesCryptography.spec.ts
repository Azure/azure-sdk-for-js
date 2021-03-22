// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  AesCbcEncryptionAlgorithm,
  CryptographyClient,
  JsonWebKey,
  KeyClient,
  KeyVaultKey
} from "../../src";
import { getKey, stringToUint8Array, uint8ArrayToString } from "../utils/crypto";
import { isNode } from "@azure/core-http";
import { AesCryptographyProvider } from "../../src/cryptography/aesCryptographyProvider";
import TestClient from "../utils/testClient";
import { authenticate } from "../utils/testAuthentication";
import { env, Recorder } from "@azure/test-utils-recorder";
import { RemoteCryptographyProvider } from "../../src/cryptography/remoteCryptographyProvider";
import { ClientSecretCredential } from "@azure/identity";

describe("AesCryptographyProvider browser tests", function() {
  it("uses the browser replacement when running in the browser", /** @this */ async function() {
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

describe("AesCryptographyProvider internal tests", function() {
  for (const keySize of [128, 192, 256]) {
    let cryptoClient: CryptographyClient;
    const encryptionAlgorithm = `A${keySize}CBCPAD` as AesCbcEncryptionAlgorithm;
    let jwk: JsonWebKey;

    beforeEach(/** @this */ function() {
      if (!isNode) {
        this.skip();
      }

      jwk = {
        keyOps: ["encrypt", "decrypt", "wrapKey", "unwrapKey"],
        k: getKey(keySize >> 3), // Generate a symmetric key for testing
        kty: "oct"
      };

      cryptoClient = new CryptographyClient(jwk);
    });

    describe(`AES-CBC with PKCS padding (${keySize})`, () => {
      describe("local-only tests", async function() {
        it("encrypts and decrypts locally", /** @this */ async function() {
          const text = this.test!.title;
          const encryptResult = await cryptoClient.encrypt({
            algorithm: encryptionAlgorithm,
            plaintext: stringToUint8Array(text)
            // Test the client generating an IV
          });

          const decryptResult = await cryptoClient.decrypt({
            algorithm: encryptionAlgorithm,
            ciphertext: encryptResult.result!,
            iv: encryptResult.iv!
          });
          assert.equal(uint8ArrayToString(decryptResult.result), text);
        });

        it("validates the key type", /** @this */ async function() {
          const text = this.test!.title;
          jwk.kty = "RSA";

          await assert.isRejected(
            cryptoClient.encrypt({
              algorithm: encryptionAlgorithm,
              plaintext: stringToUint8Array(text),
              iv: getKey(16)
            }),
            /Key type does not match/
          );

          await assert.isRejected(
            cryptoClient.decrypt({
              algorithm: encryptionAlgorithm,
              ciphertext: stringToUint8Array(text),
              iv: getKey(16)
            }),
            /Key type does not match/
          );
        });

        it("validates the key length", /** @this */ async function() {
          const text = this.test!.title;
          jwk.k = getKey((keySize >> 3) - 1);

          await assert.isRejected(
            cryptoClient.encrypt({
              algorithm: encryptionAlgorithm,
              plaintext: stringToUint8Array(text),
              iv: getKey(16)
            }),
            /Key must be at least \d+ bits/
          );

          await assert.isRejected(
            cryptoClient.decrypt({
              algorithm: encryptionAlgorithm,
              ciphertext: stringToUint8Array(text),
              iv: getKey(16)
            }),
            /Key must be at least \d+ bits/
          );
        });
      });

      describe("local-remote tests", async function() {
        const keyPrefix = `CRUD${env.KEY_NAME || "KeyName"}`;
        let keySuffix: string;
        let credential: ClientSecretCredential;
        let client: KeyClient;
        let testClient: TestClient;
        let recorder: Recorder;
        let keyVaultKey: KeyVaultKey;
        let remoteProvider: RemoteCryptographyProvider;

        beforeEach(/** @this */ async function() {
          const authentication = await authenticate(this);
          recorder = authentication.recorder;

          if (!authentication.hsmClient) {
            // Managed HSM is not deployed for this run due to service resource restrictions so we skip these tests.
            // This is only necessary while Managed HSM is in preview.
            this.skip();
          }

          client = authentication.hsmClient;
          credential = authentication.credential;
          testClient = new TestClient(authentication.hsmClient);
          keySuffix = authentication.keySuffix;
        });

        afterEach(async function() {
          await recorder.stop();
        });

        it("encrypts locally and decrypts remotely", /** @this */ async function() {
          const keyName = testClient.formatName(`${keyPrefix}-${this.test!.title}-${keySuffix}`);
          keyVaultKey = await client.importKey(keyName, jwk, {});
          remoteProvider = new RemoteCryptographyProvider(keyVaultKey, credential);

          const text = this.test!.title;
          const iv = getKey(16);
          const encryptResult = await cryptoClient.encrypt({
            algorithm: encryptionAlgorithm,
            plaintext: stringToUint8Array(text),
            iv: iv
          });

          const decryptResult = await remoteProvider.decrypt({
            algorithm: encryptionAlgorithm,
            ciphertext: encryptResult.result!,
            iv: encryptResult.iv!
          });
          assert.equal(uint8ArrayToString(decryptResult.result), text);
          await testClient.flushKey(keyName);
        });

        it("encrypts remotely and decrypts locally", /** @this */ async function() {
          const keyName = testClient.formatName(`${keyPrefix}-${this.test!.title}-${keySuffix}`);
          keyVaultKey = await client.importKey(keyName, jwk, {});
          remoteProvider = new RemoteCryptographyProvider(keyVaultKey, credential);

          const text = this.test!.title;
          const iv = getKey(16);
          const encryptResult = await remoteProvider.encrypt({
            algorithm: encryptionAlgorithm,
            plaintext: stringToUint8Array(text),
            iv
          });

          const decryptResult = await cryptoClient.decrypt({
            algorithm: encryptionAlgorithm,
            ciphertext: encryptResult.result!,
            iv: encryptResult.iv || iv
          });
          assert.equal(uint8ArrayToString(decryptResult.result), text);
          await testClient.flushKey(keyName);
        });
      });
    });
  }
});
