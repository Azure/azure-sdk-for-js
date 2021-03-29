// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { createHash } from "crypto";
import { Recorder, env, isPlaybackMode } from "@azure/test-utils-recorder";
import { ClientSecretCredential } from "@azure/identity";
import { isNode } from "@azure/core-http";

import { CryptographyClient, KeyVaultKey, KeyClient } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";
import { stringToUint8Array, uint8ArrayToString } from "../utils/crypto";
import { RsaCryptographyProvider } from "../../src/cryptography/rsaCryptographyProvider";

describe("CryptographyClient (all decrypts happen remotely)", () => {
  const keyPrefix = `crypto${env.KEY_NAME || "KeyName"}`;
  let client: KeyClient;
  let testClient: TestClient;
  let cryptoClient: CryptographyClient;
  let recorder: Recorder;
  let credential: ClientSecretCredential;
  let keyName: string;
  let keyVaultKey: KeyVaultKey;
  let keySuffix: string;

  if (!isNode) {
    // Local cryptography is only supported in NodeJS
    return;
  }

  beforeEach(async function(this: Context) {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
    testClient = authentication.testClient;
    credential = authentication.credential;
    keySuffix = authentication.keySuffix;
    keyName = testClient.formatName("cryptography-client-test" + keySuffix);
    keyVaultKey = await client.createKey(keyName, "RSA");
    cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await testClient.flushKey(keyName);
    }
    await recorder.stop();
  });

  // The tests follow

  if (!isPlaybackMode()) {
    it("encrypt & decrypt with RSA1_5", async function(this: Context) {
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt({
        algorithm: "RSA1_5",
        plaintext: stringToUint8Array(text)
      });
      const decryptResult = await cryptoClient.decrypt({
        algorithm: "RSA1_5",
        ciphertext: encryptResult.result
      });
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("manually encrypt locally and decrypt remotely, both with RSA1_5", async function(this: Context) {
      const text = this.test!.title;
      const localProvider = new RsaCryptographyProvider(keyVaultKey.key!);
      const encryptResult = await localProvider.encrypt({
        algorithm: "RSA1_5",
        plaintext: Buffer.from(text)
      });
      const decryptResult = await cryptoClient.decrypt({
        algorithm: "RSA1_5",
        ciphertext: encryptResult.result
      });
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("encrypt & decrypt with RSA-OAEP", async function(this: Context) {
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt(
        {
          algorithm: "RSA-OAEP",
          plaintext: stringToUint8Array(text)
        },
        {}
      );
      const decryptResult = await cryptoClient.decrypt({
        algorithm: "RSA-OAEP",
        ciphertext: encryptResult.result
      });
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("manually encrypt locally and decrypt remotely, both with RSA-OAEP", async function(this: Context) {
      const text = this.test!.title;
      const localProvider = new RsaCryptographyProvider(keyVaultKey.key!);
      const encryptResult = await localProvider.encrypt({
        algorithm: "RSA-OAEP",
        plaintext: Buffer.from(text)
      });
      const decryptResult = await cryptoClient.decrypt({
        algorithm: "RSA-OAEP",
        ciphertext: encryptResult.result
      });
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("the CryptographyClient can be created from a full KeyVaultKey object", async function(this: Context) {
      const customKeyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
      const customKeyVaultKey = await client.createKey(customKeyName, "RSA");
      const cryptoClientFromKey = new CryptographyClient(customKeyVaultKey, credential);

      const text = this.test!.title;
      const encryptResult = await cryptoClientFromKey.encrypt({
        algorithm: "RSA1_5",
        plaintext: stringToUint8Array(text)
      });
      const decryptResult = await cryptoClientFromKey.decrypt({
        algorithm: "RSA1_5",
        ciphertext: encryptResult.result
      });
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });
  }

  it("sign and verify with RS256", async function(): Promise<void> {
    const signatureValue = Buffer.from("32 byte signature in ascii chars");
    const hash = createHash("SHA256");
    hash.update(signatureValue);

    const signature = await cryptoClient.sign("RS256", signatureValue);
    const verifyResult = await cryptoClient.verify("RS256", signatureValue, signature.result);

    assert.ok(verifyResult.result);
  });

  it("sign and verify data with RS256 (local verification)", async function() {
    const signatureValue = Buffer.from("32 byte signature in ascii chars");
    const signature = await cryptoClient.signData("RS256", signatureValue);
    const verifyResult = await cryptoClient.verifyData("RS256", signatureValue, signature.result);
    assert.ok(verifyResult.result);
  });

  it("wrap and unwrap with rsa1_5", async function() {
    recorder.skip(
      undefined,
      "Wrapping and unwrapping don't cause a repeatable pattern, so these tests can only run in playback mode"
    );
    const text = "arepa";
    const wrapped = await cryptoClient.wrapKey("RSA1_5", stringToUint8Array(text));
    const unwrappedResult = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
    const unwrappedText = uint8ArrayToString(unwrappedResult.result);
    assert.equal(text, unwrappedText);
    assert.equal("RSA1_5", unwrappedResult.algorithm);
  });

  it("wrap and unwrap with RSA-OAEP", async function(this: Context) {
    recorder.skip(
      undefined,
      "Wrapping and unwrapping don't cause a repeatable pattern, so these tests can only run in playback mode"
    );
    const text = this.test!.title;
    const wrapped = await cryptoClient.wrapKey("RSA-OAEP", stringToUint8Array(text));
    const unwrappedResult = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
    const unwrappedText = uint8ArrayToString(unwrappedResult.result);
    assert.equal(text, unwrappedText);
    assert.equal("RSA-OAEP", unwrappedResult.algorithm);
  });

  if (!isPlaybackMode()) {
    it("encrypt & decrypt with an RSA-HSM key and the RSA-OAEP algorithm", async function(this: Context) {
      const hsmKeyName = keyName + "2";
      const hsmKey = await client.createKey(hsmKeyName, "RSA-HSM");
      const hsmCryptoClient = new CryptographyClient(hsmKey.id!, credential);
      const text = this.test!.title;
      const encryptResult = await hsmCryptoClient.encrypt("RSA-OAEP", stringToUint8Array(text));
      const decryptResult = await hsmCryptoClient.decrypt("RSA-OAEP", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
      await testClient.flushKey(hsmKeyName);
    });

    it("encrypt & decrypt with an RSA-HSM key and the RSA1_5 algorithm", async function(this: Context) {
      const hsmKeyName = keyName + "2";
      const hsmKey = await client.createKey(hsmKeyName, "RSA-HSM");
      const hsmCryptoClient = new CryptographyClient(hsmKey.id!, credential);
      const text = this.test!.title;
      const encryptResult = await hsmCryptoClient.encrypt("RSA1_5", stringToUint8Array(text));
      const decryptResult = await hsmCryptoClient.decrypt("RSA1_5", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
      await testClient.flushKey(hsmKeyName);
    });
  }

  it("wrap and unwrap with RSA-OAEP on a RSA-HSM key", async function(this: Context) {
    recorder.skip(
      undefined,
      "Wrapping and unwrapping don't cause a repeatable pattern, so this test can only run live"
    );
    const hsmKeyName = keyName + "2";
    const hsmKey = await client.createKey(hsmKeyName, "RSA-HSM");
    const hsmCryptoClient = new CryptographyClient(hsmKey.id!, credential);
    const text = this.test!.title;
    const wrapped = await hsmCryptoClient.wrapKey("RSA-OAEP", stringToUint8Array(text));
    const unwrappedResult = await hsmCryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
    const unwrappedText = uint8ArrayToString(unwrappedResult.result);
    assert.equal(text, unwrappedText);
    await testClient.flushKey(hsmKeyName);
  });

  it("wrap and unwrap with RSA1_5 on a RSA-HSM key", async function(this: Context) {
    recorder.skip(
      undefined,
      "Wrapping and unwrapping don't cause a repeatable pattern, so this test can only run live"
    );
    const hsmKeyName = keyName + "2";
    const hsmKey = await client.createKey(hsmKeyName, "RSA-HSM");
    const hsmCryptoClient = new CryptographyClient(hsmKey.id!, credential);
    const text = this.test!.title;
    const wrapped = await hsmCryptoClient.wrapKey("RSA1_5", stringToUint8Array(text));
    const unwrappedResult = await hsmCryptoClient.unwrapKey("RSA1_5", wrapped.result);
    const unwrappedText = uint8ArrayToString(unwrappedResult.result);
    assert.equal(text, unwrappedText);
    await testClient.flushKey(hsmKeyName);
  });

  it("sign and verify with RS256 through an RSA-HSM key", async function(this: Context): Promise<
    void
  > {
    const hsmKeyName = keyName + "2";
    const hsmKey = await client.createKey(hsmKeyName, "RSA-HSM");
    const hsmCryptoClient = new CryptographyClient(hsmKey.id!, credential);
    const signatureValue = this.test!.title;
    const hash = createHash("sha256");
    hash.update(signatureValue);
    const digest = hash.digest();
    const signature = await hsmCryptoClient.sign("RS256", digest);
    const verifyResult = await hsmCryptoClient.verify("RS256", digest, signature.result);
    assert.ok(verifyResult);
    await testClient.flushKey(hsmKeyName);
  });

  it("sign and verify data with RS256 through an RSA-HSM key (local verification)", async function(): Promise<
    void
  > {
    const hsmKeyName = keyName + "3";
    const hsmKey = await client.createKey(hsmKeyName, "RSA-HSM");
    const hsmCryptoClient = new CryptographyClient(hsmKey.id!, credential);
    const signatureValue = Buffer.from("My Message");
    const signature = await hsmCryptoClient.signData("RS256", signatureValue);
    const verifyResult = await hsmCryptoClient.verifyData(
      "RS256",
      signatureValue,
      signature.result
    );
    assert.ok(verifyResult);
    await testClient.flushKey(hsmKeyName);
  });

  it("sign and verify with RS384 through an RSA-HSM key", async function(this: Context): Promise<
    void
  > {
    const hsmKeyName = keyName + "2";
    const hsmKey = await client.createKey(hsmKeyName, "RSA-HSM");
    const hsmCryptoClient = new CryptographyClient(hsmKey.id!, credential);
    const signatureValue = this.test!.title;
    const hash = createHash("sha384");
    hash.update(signatureValue);
    const digest = hash.digest();
    const signature = await hsmCryptoClient.sign("RS384", digest);
    const verifyResult = await hsmCryptoClient.verify("RS384", digest, signature.result);
    assert.ok(verifyResult);
    await testClient.flushKey(hsmKeyName);
  });
});
