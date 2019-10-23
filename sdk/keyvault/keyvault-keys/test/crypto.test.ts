// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import * as crypto from "crypto";
import * as constants from "constants";
import { isNode } from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";
import { CryptographyClient, KeyVaultKey, KeyClient } from "../src";
import { convertJWKtoPEM } from "../src/cryptographyClient";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { isRecording } from "./utils/recorderUtils";
import { stringToUint8Array, uint8ArrayToString } from "./utils/crypto";

describe("CryptographyClient (all decrypts happen remotely)", () => {
  let client: KeyClient;
  let testClient: TestClient;
  let cryptoClient: CryptographyClient;
  let recorder: any;
  let credential: ClientSecretCredential;
  let keyName: string;
  let key: KeyVaultKey;
  let keyVaultUrl: string;
  let keyUrl: string;
  let keySuffix: string;

  before(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
    testClient = authentication.testClient;
    credential = authentication.credential;
    keySuffix = authentication.keySuffix;
    keyName = testClient.formatName("cryptography-client-test" + keySuffix);
    key = await client.createKey(keyName, "RSA");
    keyVaultUrl = key.properties.vaultUrl;
    keyUrl = key.key!.kid as string;
    cryptoClient = new CryptographyClient(keyVaultUrl, key.key!.kid!, credential);
  });

  after(async function() {
    await testClient.flushKey(keyName);
    recorder.stop();
  });

  // The tests follow

  it("getKey from client initialized with a key URL", async function() {
    const getKeyResult = await cryptoClient.getKey();
    assert.equal(getKeyResult.kid, keyUrl);
  });

  it("getKey from client initialized with a JWK key", async function() {
    const jwtKeyClient = new CryptographyClient(keyVaultUrl, key.key!, credential);
    const getKeyResult = await jwtKeyClient.getKey();
    assert.equal(getKeyResult.kid, key.key!.kid);
  });

  if (isRecording) {
    it("encrypt & decrypt with RSA1_5", async function() {
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt("RSA1_5", stringToUint8Array(text));
      const decryptResult = await cryptoClient.decrypt("RSA1_5", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    if (isNode) {
      it("manually encrypt locally and decrypt remotely, both with RSA1_5", async function() {
        const text = this.test!.title;
        const key = await cryptoClient.getKey();
        const keyPEM = convertJWKtoPEM(key);
        const padded: any = { key: keyPEM, padding: constants.RSA_PKCS1_PADDING };
        const encrypted = crypto.publicEncrypt(padded, Buffer.from(text));
        const decryptResult = await cryptoClient.decrypt("RSA1_5", encrypted);
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });
    }

    it("encrypt & decrypt with RSA-OAEP", async function() {
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt("RSA-OAEP", stringToUint8Array(text));
      const decryptResult = await cryptoClient.decrypt("RSA-OAEP", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    if (isNode) {
      it("manually encrypt locally and decrypt remotely, both with RSA-OAEP", async function() {
        const text = this.test!.title;
        const key = await cryptoClient.getKey();
        // Encrypting outside the client since the client will intentionally
        const keyPEM = convertJWKtoPEM(key);
        const encrypted = crypto.publicEncrypt(keyPEM, Buffer.from(text));
        const decryptResult = await cryptoClient.decrypt("RSA-OAEP", encrypted);
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });
    }
  }

  if (isNode) {
    it("sign and verify with RS256", async function() {
      const signatureValue = this.test!.title;
      const hash = crypto.createHash("sha256");
      hash.update(signatureValue);
      const digest = hash.digest();
      const signature = await cryptoClient.sign("RS256", digest);
      const verifyResult = await cryptoClient.verify("RS256", digest, signature.result);
      assert.ok(verifyResult);
    });
  }

  if (isRecording) {
    it("wrap and unwrap with rsa1_5", async function() {
      const text = "arepa";
      const wrapped = await cryptoClient.wrapKey("RSA1_5", stringToUint8Array(text));
      const unwrappedResult = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
      const unwrappedText = uint8ArrayToString(unwrappedResult.result);
      assert.equal(text, unwrappedText);
    });

    it("wrap and unwrap with RSA-OAEP", async function() {
      const text = this.test!.title;
      const wrapped = await cryptoClient.wrapKey("RSA-OAEP", stringToUint8Array(text));
      const unwrappedResult = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
      const unwrappedText = uint8ArrayToString(unwrappedResult.result);
      assert.equal(text, unwrappedText);
    });
  }
});
