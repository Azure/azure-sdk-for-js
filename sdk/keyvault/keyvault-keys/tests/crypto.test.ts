// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import * as crypto from "crypto";
import * as constants from "constants";
import { isNode } from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";
import { CryptographyClient, Key, KeysClient } from "../src";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { isRecording } from "./utils/recorder";
import { stringToUint8Array, uint8ArrayToString } from "./utils/crypto";

let keyto: any;
if (isNode) {
  keyto = require("@trust/keyto");
}

describe("CryptographyClient (all decrypts happen remotely)", () => {
  let client: KeysClient;
  let testClient: TestClient;
  let cryptoClient: CryptographyClient;
  let recorder: any;
  let credential: ClientSecretCredential;
  let keyName: string;
  let key: Key;
  let keyVaultUrl: string;
  let keyUrl: string;

  before(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
    testClient = authentication.testClient;
    credential = authentication.credential;
    keyName = testClient.formatName("cryptography-client-test");
    key = await client.createKey(keyName, "RSA");
    keyVaultUrl = key.vaultUrl;
    keyUrl = key.keyMaterial!.kid as string;
    cryptoClient = new CryptographyClient(keyVaultUrl, key.keyMaterial!.kid!, credential);
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
    const jwtKeyClient = new CryptographyClient(keyVaultUrl, key.keyMaterial!, credential);
    const getKeyResult = await jwtKeyClient.getKey();
    assert.equal(getKeyResult.kid, key.keyMaterial!.kid);
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
        const keyPEM = keyto.from(key, "jwk").toString("pem", "public_pkcs1");
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
        const keyPEM = keyto.from(key, "jwk").toString("pem", "public_pkcs1");
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
