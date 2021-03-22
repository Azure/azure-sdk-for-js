// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";
import { ClientSecretCredential } from "@azure/identity";

import { CryptographyClient, KeyVaultKey, KeyClient } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import { stringToUint8Array, uint8ArrayToString } from "../utils/crypto";
import TestClient from "../utils/testClient";

describe("CryptographyClient for managed HSM (skipped if MHSM is not deployed)", () => {
  let hsmClient: KeyClient;
  let testClient: TestClient;
  let cryptoClient: CryptographyClient;
  let recorder: Recorder;
  let credential: ClientSecretCredential;
  let keyName: string;
  let keyVaultKey: KeyVaultKey;
  let keySuffix: string;

  beforeEach(/** @this Mocha.Context */ async function() {
    const authentication = await authenticate(this);
    recorder = authentication.recorder;

    if (!authentication.hsmClient) {
      // Managed HSM is not deployed for this run due to service resource restrictions so we skip these tests.
      // This is only necessary while Managed HSM is in preview.
      this.skip();
    }

    hsmClient = authentication.hsmClient;
    testClient = new TestClient(authentication.hsmClient);
    credential = authentication.credential;
    keySuffix = authentication.keySuffix;
    keyName = testClient.formatName("cryptography-client-test" + keySuffix);
  });

  afterEach(async function() {
    await testClient?.flushKey(keyName);
    await recorder.stop();
  });

  describe("with AES crypto algorithms", async function() {
    it("encrypts and decrypts using AES-GCM", /** @this Mocha.Context */ async function() {
      keyVaultKey = await hsmClient.createKey(keyName, "AES", { keySize: 256 });
      cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt({
        algorithm: "A256GCM",
        plaintext: stringToUint8Array(text)
      });
      assert.exists(encryptResult.iv);
      assert.exists(encryptResult.authenticationTag);

      const decryptResult = await cryptoClient.decrypt({
        algorithm: "A256GCM",
        ciphertext: encryptResult.result!,
        iv: encryptResult.iv!,
        authenticationTag: encryptResult.authenticationTag
      });
      assert.equal(text, uint8ArrayToString(decryptResult.result));
    });

    it("encrypts and decrypts using AES-CBC", /** @this Mocha.Context */ async function() {
      keyVaultKey = await hsmClient.createKey(keyName, "AES", { keySize: 256 });
      cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt({
        algorithm: "A256CBCPAD",
        plaintext: stringToUint8Array(text),
        iv: stringToUint8Array(text)
      });
      // There is a service-level issue where `iv` is not returned
      // from the service as part of the result. Until it's resolved
      // we have to pend this and just pass the same iv
      // back to decrypt for now.
      // assert.exists(encryptResult.iv);

      const decryptResult = await cryptoClient.decrypt({
        algorithm: "A256CBCPAD",
        ciphertext: encryptResult.result!,
        iv: stringToUint8Array(text) // Replace with `encryptResult.iv!` once ADO 9361749 is resolved.
      });
      assert.equal(uint8ArrayToString(decryptResult.result), text);
    });
  });
});
