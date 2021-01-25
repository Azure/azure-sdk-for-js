// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LocalSupportedAlgorithmName,
  KeyClient,
  CryptographyClient,
  SignatureAlgorithm,
  KeyVaultKey
} from "../../src";
import * as chai from "chai";
import { isNode } from "@azure/core-http";
import { createHash } from "crypto";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";
import { Recorder, env } from "@azure/test-utils-recorder";
import { ClientSecretCredential } from "@azure/identity";
import { localSupportedAlgorithms } from "../../src/localCryptography/algorithms";
import { throwsAsync } from "../utils/utils.common";
const { assert } = chai;

describe("Local cryptography public tests", () => {
  const keyPrefix = `localCrypto${env.KEY_NAME || "KeyName"}`;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;
  let credential: ClientSecretCredential;
  let keySuffix: string;

  if (!isNode) {
    // Local cryptography is only supported in NodeJS
    return;
  }

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
    testClient = authentication.testClient;
    credential = authentication.credential;
    keySuffix = authentication.keySuffix;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("When using a local JsonWebToken", function() {
    let customKeyName;
    let customKeyVaultKey: KeyVaultKey;
    let cryptoClientFromKey: CryptographyClient;

    beforeEach(async function() {
      customKeyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
      customKeyVaultKey = await client.createKey(customKeyName, "RSA");
      cryptoClientFromKey = new CryptographyClient(customKeyVaultKey.key!);
    });

    it("the CryptographyClient can be created from a local JsonWebKey object", async function() {
      assert.notExists(cryptoClientFromKey.vaultUrl);
      assert.equal(cryptoClientFromKey.keyId, customKeyVaultKey.id);
    });

    describe("when using an unsupported algorithm", function() {
      const expectedError = new Error(`Algorithm foo is not supported for a local JsonWebKey.`);

      it("throws on encyrpt", async function() {
        await throwsAsync(async () => {
          await cryptoClientFromKey.encrypt("foo", Buffer.from("bar"));
        }, expectedError);
      });

      it("throws on wrapKey", async function() {
        await throwsAsync(async () => {
          await cryptoClientFromKey.wrapKey("A128KW", Buffer.from("bar"));
        }, new Error("Algorithm A128KW is not supported for a local JsonWebKey."));
      });
      it("throws on verifyData", async function() {
        await throwsAsync(async () => {
          await cryptoClientFromKey.verifyData("foo", Buffer.from("bar"), Buffer.from("baz"));
        }, expectedError);
      });
    });

    describe("when using an unsupported operation", function() {
      it("throws on decrypt", async function() {
        await throwsAsync(async () => {
          await cryptoClientFromKey.decrypt("RSA1_5", Buffer.from("bar"));
        }, new Error("Decrypting a local JsonWebKey is not supported."));
      });

      it("throws on unwrapKey", async function() {
        await throwsAsync(async () => {
          await cryptoClientFromKey.unwrapKey("RSA1_5", Buffer.from("bar"));
        }, new Error("Unwrapping a local JsonWebKey is not supported."));
      });

      it("throws on sign", async function() {
        await throwsAsync(async () => {
          await cryptoClientFromKey.sign("RSA1_5", Buffer.from("bar"));
        }, new Error("Signing a local JsonWebKey is not supported."));
      });

      it("throws on verify", async function() {
        await throwsAsync(async () => {
          await cryptoClientFromKey.verify("RSA1_5", Buffer.from("bar"), Buffer.from("baz"));
        }, new Error("Verifying a local JsonWebKey is not supported."));
      });

      it("throws on signData", async function() {
        await throwsAsync(async () => {
          await cryptoClientFromKey.signData("RSA1_5", Buffer.from("bar"));
        }, new Error("Signing a local JsonWebKey is not supported."));
      });
    });
  });

  it("encrypt & decrypt RSA1_5", async function() {
    recorder.skip(undefined, "Local encryption can't be tested on playback");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyVaultKey = await client.createKey(keyName, "RSA");
    const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

    const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
    const text = Buffer.from(this.test!.title);
    const encrypted = await localCryptoClient.encrypt("RSA1_5", text);
    const unwrapped = await cryptoClient.decrypt("RSA1_5", encrypted.result);
    assert.deepEqual(unwrapped.result, text);
    await testClient.flushKey(keyName);
  });

  it("encrypt & decrypt RSA-OAEP", async function() {
    recorder.skip(undefined, "Local encryption can't be tested on playback");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyVaultKey = await client.createKey(keyName, "RSA");
    const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

    const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
    const text = Buffer.from(this.test!.title);
    const encrypted = await localCryptoClient.encrypt("RSA-OAEP", text);
    const unwrapped = await cryptoClient.decrypt("RSA-OAEP", encrypted.result);
    assert.deepEqual(unwrapped.result, text);
    await testClient.flushKey(keyName);
  });

  it("wrapKey & unwrapKey RSA1_5", async function() {
    recorder.skip(undefined, "Local encryption can't be tested on playback");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyVaultKey = await client.createKey(keyName, "RSA");
    const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

    const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
    const data = Buffer.from("arepa");
    const wrapped = await localCryptoClient.wrapKey("RSA1_5", data);

    // Local Cryptography Client part
    // unwrapKey is not implemented locally yet
    const unwrapped = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
    assert.deepEqual(unwrapped.result, data);
    await testClient.flushKey(keyName);
  });

  it("wrapKey & unwrapKey RSA-OAEP", async function() {
    recorder.skip(undefined, "Local encryption can't be tested on playback");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyVaultKey = await client.createKey(keyName, "RSA");
    const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

    const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
    const data = Buffer.from("arepa");
    const wrapped = await localCryptoClient.wrapKey("RSA-OAEP", data);

    // Local Cryptography Client part
    // unwrapKey is not implemented locally yet
    const unwrapped = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
    assert.deepEqual(unwrapped.result, data);
    await testClient.flushKey(keyName);
  });

  describe("verify", () => {
    const localSupportedAlgorithmNames = Object.keys(localSupportedAlgorithms);

    for (const localAlgorithmName of localSupportedAlgorithmNames) {
      const algorithm = localSupportedAlgorithms[localAlgorithmName as LocalSupportedAlgorithmName];
      const signAlgorithm = algorithm?.signAlgorithm;
      if (!signAlgorithm) {
        continue;
      }

      it(localAlgorithmName, async function(): Promise<void> {
        recorder.skip(
          "browser",
          `Local sign of algorithm ${localAlgorithmName} is only supported in NodeJS`
        );

        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const keyVaultKey = await client.createKey(keyName, "RSA");
        const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);

        // Sign is not implemented yet.
        // This boils down to the JWK to PEM conversion, which doesn't support private keys at the moment.
        const signatureValue = this.test!.title;
        const hash = createHash(signAlgorithm);
        hash.update(signatureValue);
        const digest = hash.digest();
        const signature = await cryptoClient.sign(localAlgorithmName as SignatureAlgorithm, digest);

        // Local Cryptography Client part
        const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
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
