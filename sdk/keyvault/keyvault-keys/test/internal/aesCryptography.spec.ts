// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type {
  AesCbcEncryptionAlgorithm,
  JsonWebKey,
  KeyClient,
  KeyVaultKey,
} from "@azure/keyvault-keys";
import { CryptographyClient } from "@azure/keyvault-keys";
import { getKey, stringToUint8Array, uint8ArrayToString } from "../public/utils/crypto.js";
import TestClient from "../public/utils/testClient.js";
import { authenticate, envSetupForPlayback } from "../public/utils/testAuthentication.js";
import { Recorder, env, isLiveMode } from "@azure-tools/test-recorder";
import { RemoteCryptographyProvider } from "$internal/cryptography/remoteCryptographyProvider.js";
import type { ClientSecretCredential } from "@azure/identity";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("AesCryptographyProvider internal tests", function () {
  for (const keySize of [128, 192, 256]) {
    let cryptoClient: CryptographyClient;
    const encryptionAlgorithm = `A${keySize}CBCPAD` as AesCbcEncryptionAlgorithm;
    let jwk: JsonWebKey;

    beforeEach(function () {
      jwk = {
        keyOps: ["encrypt", "decrypt", "wrapKey", "unwrapKey"],
        k: getKey(keySize >> 3), // Generate a symmetric key for testing
        kty: "oct",
      };

      cryptoClient = new CryptographyClient(jwk);
    });

    describe(`AES-CBC with PKCS padding (${keySize})`, () => {
      describe("local-only tests", async function () {
        it("encrypts and decrypts locally", async function (ctx) {
          const text = ctx.task.name;
          const encryptResult = await cryptoClient.encrypt({
            algorithm: encryptionAlgorithm,
            plaintext: stringToUint8Array(text),
            // Test the client generating an IV
          });

          const decryptResult = await cryptoClient.decrypt({
            algorithm: encryptionAlgorithm,
            ciphertext: encryptResult.result!,
            iv: encryptResult.iv!,
          });
          expect(uint8ArrayToString(decryptResult.result)).toEqual(text);
        });

        it("validates the key type", async function (ctx) {
          const text = ctx.task.name;
          jwk.kty = "RSA";

          await expect(
            cryptoClient.encrypt({
              algorithm: encryptionAlgorithm,
              plaintext: stringToUint8Array(text),
              iv: getKey(16),
            }),
          ).rejects.toThrow(/Key type does not match/);

          await expect(
            cryptoClient.decrypt({
              algorithm: encryptionAlgorithm,
              ciphertext: stringToUint8Array(text),
              iv: getKey(16),
            }),
          ).rejects.toThrow(/Key type does not match/);
        });

        it("validates the key length", async function (ctx) {
          const text = ctx.task.name;
          jwk.k = getKey((keySize >> 3) - 1);

          await expect(
            cryptoClient.encrypt({
              algorithm: encryptionAlgorithm,
              plaintext: stringToUint8Array(text),
              iv: getKey(16),
            }),
          ).rejects.toThrow(/Key must be at least \d+ bits/);

          await expect(
            cryptoClient.decrypt({
              algorithm: encryptionAlgorithm,
              ciphertext: stringToUint8Array(text),
              iv: getKey(16),
            }),
          ).rejects.toThrow(/Key must be at least \d+ bits/);
        });
      });

      describe("local-remote tests", async function () {
        const keyPrefix = `CRUD${env.KEY_NAME || "KeyName"}`;
        let keySuffix: string;
        let credential: ClientSecretCredential;
        let client: KeyClient;
        let testClient: TestClient;
        let recorder: Recorder;
        let keyVaultKey: KeyVaultKey;
        let remoteProvider: RemoteCryptographyProvider;

        beforeEach(async function (ctx) {
          recorder = new Recorder(ctx);
          await recorder.start(envSetupForPlayback);

          const authentication = await authenticate(recorder);

          if (!authentication.hsmClient) {
            // Managed HSM is not deployed for this run due to service resource restrictions so we skip these tests.
            // This is only necessary while Managed HSM is in preview.
            ctx.skip();
          }

          client = authentication.hsmClient;
          credential = authentication.credential;
          testClient = new TestClient(authentication.hsmClient);
          keySuffix = authentication.keySuffix;
        });

        afterEach(async function () {
          await recorder.stop();
        });

        it("encrypts locally and decrypts remotely", async function (ctx) {
          const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
          keyVaultKey = await client.importKey(keyName, jwk, {});
          remoteProvider = new RemoteCryptographyProvider(
            keyVaultKey,
            credential,
            recorder.configureClientOptions({
              disableChallengeResourceVerification: !isLiveMode(),
            }),
          );

          const text = ctx.task.name;
          const iv = getKey(16);
          const encryptResult = await cryptoClient.encrypt({
            algorithm: encryptionAlgorithm,
            plaintext: stringToUint8Array(text),
            iv: iv,
          });

          const decryptResult = await remoteProvider.decrypt({
            algorithm: encryptionAlgorithm,
            ciphertext: encryptResult.result!,
            iv: encryptResult.iv!,
          });
          expect(uint8ArrayToString(decryptResult.result)).toEqual(text);
          await testClient.flushKey(keyName);
        });

        it("encrypts remotely and decrypts locally", async function (ctx) {
          const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
          keyVaultKey = await client.importKey(keyName, jwk, {});
          remoteProvider = new RemoteCryptographyProvider(
            keyVaultKey,
            credential,
            recorder.configureClientOptions({
              disableChallengeResourceVerification: !isLiveMode(),
            }),
          );

          const text = ctx.task.name;
          const iv = getKey(16);
          const encryptResult = await remoteProvider.encrypt({
            algorithm: encryptionAlgorithm,
            plaintext: stringToUint8Array(text),
            iv,
          });

          const decryptResult = await cryptoClient.decrypt({
            algorithm: encryptionAlgorithm,
            ciphertext: encryptResult.result!,
            iv: encryptResult.iv || iv,
          });

          expect(uint8ArrayToString(decryptResult.result)).toEqual(text);
          await testClient.flushKey(keyName);
        });
      });
    });
  }
});
