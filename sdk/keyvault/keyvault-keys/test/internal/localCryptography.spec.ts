// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  validators,
  localSupportedAlgorithms,
  LocalSupportedAlgorithmName
} from "../../src/localCryptography/algorithms";
import { JsonWebKey, KeyClient, CryptographyClient, SignatureAlgorithm } from "../../src";
import * as chai from "chai";
import { isNode } from "@azure/core-http";
import { createHash } from "crypto";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";
import { Recorder, env } from "@azure/test-utils-recorder";
import { ClientSecretCredential } from "@azure/identity";
const { assert } = chai;

describe("Local cryptography tests", () => {
  const keyPrefix = `localCrypto${env.KEY_NAME || "KeyName"}`;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;
  let credential: ClientSecretCredential;
  let keySuffix: string;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
    testClient = authentication.testClient;
    credential = authentication.credential;
    keySuffix = authentication.keySuffix;
  });

  afterEach(async function() {
    recorder.stop();
  });

  describe("validators", () => {
    describe("keyOps", () => {
      it("can validate if a key has a specific operation", async function() {
        const supportedOperation = "encrypt";
        const jsonWebKey: JsonWebKey = {
          keyOps: [supportedOperation]
        };
        assert.doesNotThrow(() => validators.keyOps(jsonWebKey, supportedOperation));
      });
      it("throws if a key doesn't have a specific operation", async function() {
        const supportedOperation = "encrypt";
        const jsonWebKey: JsonWebKey = {
          keyOps: [
            /* No supported operation */
          ]
        };
        assert.throws(() => validators.keyOps(jsonWebKey, supportedOperation));
      });
    });

    describe("rsa", () => {
      it("can validate if a key type is RSA", async function() {
        const jsonWebKey: JsonWebKey = {
          kty: "RSA"
        };
        assert.doesNotThrow(() => validators.rsa(jsonWebKey));
      });
      it("throws if a key type is not RSA", async function() {
        const jsonWebKey: JsonWebKey = {};
        assert.throws(() => validators.rsa(jsonWebKey));
      });
    });

    describe("nodeOnly", () => {
      it("passes only if we're in node", async function() {
        if (!isNode) {
          this.skip();
          return;
        }
        assert.doesNotThrow(() => validators.nodeOnly());
      });
      it("throws if we're not in node", async function() {
        if (isNode) {
          this.skip();
          return;
        }
        assert.throws(() => validators.nodeOnly());
      });
    });
  });

  describe("client public operations", () => {
    describe("encrypt & decrypt", () => {
      it("RSA1_5", async function() {
        recorder.skip("browser", "Local encryption is only supported in NodeJS");
        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const keyVaultKey = await client.createKey(keyName, "RSA");
        const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

        const localCryptoClient = await cryptoClient.getLocalCryptographyClient()!;
        const text = Buffer.from(this.test!.title);
        const encrypted = await localCryptoClient.encrypt("RSA1_5", text);
        const unwrapped = await cryptoClient.decrypt("RSA1_5", encrypted.result);
        assert.deepEqual(unwrapped.result, text);
        await testClient.flushKey(keyName);
      });
      it("RSA-OAEP", async function() {
        recorder.skip("browser", "Local encryption is only supported in NodeJS");
        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const keyVaultKey = await client.createKey(keyName, "RSA");
        const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

        const localCryptoClient = await cryptoClient.getLocalCryptographyClient()!;
        const text = Buffer.from(this.test!.title);
        const encrypted = await localCryptoClient.encrypt("RSA-OAEP", text);
        const unwrapped = await cryptoClient.decrypt("RSA-OAEP", encrypted.result);
        assert.deepEqual(unwrapped.result, text);
        await testClient.flushKey(keyName);
      });
    });

    describe("wrapKey & unwrapKey", () => {
      it("RSA1_5", async function() {
        recorder.skip("browser", "Local encryption is only supported in NodeJS");
        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const keyVaultKey = await client.createKey(keyName, "RSA");
        const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

        const localCryptoClient = await cryptoClient.getLocalCryptographyClient()!;
        const data = Buffer.from("arepa");
        const wrapped = await localCryptoClient.wrapKey("RSA1_5", data);

        // Local Cryptography Client part
        // unwrapKey is not implemented locally yet
        const unwrapped = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
        assert.deepEqual(unwrapped.result, data);
        await testClient.flushKey(keyName);
      });
      it("RSA-OAEP", async function() {
        recorder.skip("browser", "Local encryption is only supported in NodeJS");
        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const keyVaultKey = await client.createKey(keyName, "RSA");
        const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

        const localCryptoClient = await cryptoClient.getLocalCryptographyClient()!;
        const data = Buffer.from("arepa");
        const wrapped = await localCryptoClient.wrapKey("RSA-OAEP", data);

        // Local Cryptography Client part
        // unwrapKey is not implemented locally yet
        const unwrapped = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
        assert.deepEqual(unwrapped.result, data);
        await testClient.flushKey(keyName);
      });
    });

    describe("verify", () => {
      const localSupportedAlgorithmNames = Object.keys(localSupportedAlgorithms);

      for (const localAlgorithmName of localSupportedAlgorithmNames) {
        const algorithm =
          localSupportedAlgorithms[localAlgorithmName as LocalSupportedAlgorithmName];
        const signAlgorithm = algorithm.signAlgorithm;

        if (!signAlgorithm) {
          continue;
        }

        it(localAlgorithmName, async function(): Promise<void> {
          recorder.skip(
            "browser",
            `Local sign of algorithm ${localAlgorithmName} is only supported in NodeJS`
          );

          if (!isNode) {
            // recorder.skip is not meant for TEST_MODE=live
            return this.skip();
          }

          const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
          const keyVaultKey = await client.createKey(keyName, "RSA");
          const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

          // Sign is not implemented yet.
          // This boils down to the JWK to PEM conversion, which doesn't support private keys at the moment.
          const signatureValue = this.test!.title;
          const hash = createHash(signAlgorithm);
          hash.update(signatureValue);
          const digest = hash.digest();
          const signature = await cryptoClient.sign(
            localAlgorithmName as SignatureAlgorithm,
            digest
          );

          // Local Cryptography Client part
          const localCryptoClient = await cryptoClient.getLocalCryptographyClient()!;
          const verifyResult = await localCryptoClient.verifyData(
            localAlgorithmName as LocalSupportedAlgorithmName,
            digest,
            signature.result
          );
          assert.ok(verifyResult);

          await testClient.flushKey(keyName);
        });
      }
    });
  });
});
