// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { createHash, publicEncrypt } from "crypto";
import * as constants from "constants";
import { ClientSecretCredential } from "@azure/identity";
import { CryptographyClient, KeyVaultKey, KeyClient } from "../src";
import { convertJWKtoPEM } from "../src/cryptographyClient";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { stringToUint8Array, uint8ArrayToString } from "../../keyvault-common/src";
import { isRecordMode, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";

describe("CryptographyClient (all decrypts happen remotely)", () => {
  let client: KeyClient;
  let testClient: TestClient;
  let cryptoClient: CryptographyClient;
  let recorder: Recorder;
  let credential: ClientSecretCredential;
  let keyName: string;
  let keyVaultKey: KeyVaultKey;
  let keySuffix: string;

  beforeEach(async function() {
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

  afterEach(async function() {
    await testClient.flushKey(keyName);
    recorder.stop();
  });

  // The tests follow

  if (isRecordMode()) {
    it("encrypt & decrypt with RSA1_5", async function() {
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt("RSA1_5", stringToUint8Array(text));
      const decryptResult = await cryptoClient.decrypt("RSA1_5", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("manually encrypt locally and decrypt remotely, both with RSA1_5", async function() {
      recorder.skip("browser", "Local encryption is only supported in NodeJS");
      const text = this.test!.title;
      const keyPEM = convertJWKtoPEM(keyVaultKey.key!);
      const padded: any = { key: keyPEM, padding: constants.RSA_PKCS1_PADDING };
      const encrypted = publicEncrypt(padded, Buffer.from(text));
      const decryptResult = await cryptoClient.decrypt("RSA1_5", encrypted);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("encrypt & decrypt with RSA-OAEP", async function() {
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt("RSA-OAEP", stringToUint8Array(text));
      const decryptResult = await cryptoClient.decrypt("RSA-OAEP", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("manually encrypt locally and decrypt remotely, both with RSA-OAEP", async function() {
      recorder.skip("browser", "Local encryption is only supported in NodeJS");
      const text = this.test!.title;
      // Encrypting outside the client since the client will intentionally
      const keyPEM = convertJWKtoPEM(keyVaultKey.key!);
      const encrypted = publicEncrypt(keyPEM, Buffer.from(text));
      const decryptResult = await cryptoClient.decrypt("RSA-OAEP", encrypted);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });
  }

  // Local encryption is only supported in NodeJS.
  it("sign and verify with RS256", async function() {
    recorder.skip("browser", "Local encryption is only supported in NodeJS");
    if (!isNode) {
      // recorder.skip is not meant for TEST_MODE=live
      return this.skip();
    }
    const signatureValue = this.test!.title;
    const hash = createHash("sha256");
    hash.update(signatureValue);
    const digest = hash.digest();
    const signature = await cryptoClient.sign("RS256", digest);
    const verifyResult = await cryptoClient.verify("RS256", digest, signature.result);
    assert.ok(verifyResult);
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
  });

  it("wrap and unwrap with RSA-OAEP", async function() {
    recorder.skip(
      undefined,
      "Wrapping and unwrapping don't cause a repeatable pattern, so these tests can only run in playback mode"
    );
    const text = this.test!.title;
    const wrapped = await cryptoClient.wrapKey("RSA-OAEP", stringToUint8Array(text));
    const unwrappedResult = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
    const unwrappedText = uint8ArrayToString(unwrappedResult.result);
    assert.equal(text, unwrappedText);
  });
});
