// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { ClientSecretCredential } from "@azure/identity";

import { CryptographyClient, KeyClient, KeyVaultKey } from "../../src";
import { authenticate } from "./utils/testAuthentication";
import { stringToUint8Array, uint8ArrayToString } from "./utils/crypto";
import TestClient from "./utils/testClient";
import { getServiceVersion, onVersions } from "./utils/common";
import { isNode } from "@azure/core-http";

onVersions({ minVer: "7.2" }).describe(
  "CryptographyClient for managed HSM (skipped if MHSM is not deployed)",
  () => {
    let hsmClient: KeyClient;
    let testClient: TestClient;
    let cryptoClient: CryptographyClient;
    let recorder: Recorder;
    let credential: ClientSecretCredential;
    let keyName: string;
    let keyVaultKey: KeyVaultKey;
    let keySuffix: string;

    beforeEach(async function (this: Context) {
      const authentication = await authenticate(this, getServiceVersion());
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

    describe("with AES crypto algorithms", async function () {
      it("encrypts and decrypts using AES-GCM", async function (this: Context) {
        keyVaultKey = await hsmClient.createKey(keyName, "AES", { keySize: 256 });
        cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);
        const text = this.test!.title;
        const encryptResult = await cryptoClient.encrypt({
          algorithm: "A256GCM",
          plaintext: stringToUint8Array(text),
        });
        assert.exists(encryptResult.iv);
        assert.exists(encryptResult.authenticationTag);

        const decryptResult = await cryptoClient.decrypt({
          algorithm: "A256GCM",
          ciphertext: encryptResult.result!,
          iv: encryptResult.iv!,
          authenticationTag: encryptResult.authenticationTag!,
        });
        assert.equal(text, uint8ArrayToString(decryptResult.result));
        await testClient?.flushKey(keyName);
        await recorder.stop();
      });

      it("encrypts and decrypts using AES-CBC", async function (this: Context) {
        if (!isNode) {
          this.skip();
        }
        keyVaultKey = await hsmClient.createKey(keyName, "AES", { keySize: 256 });
        cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);
        const text = this.test!.title;
        // We are using a predictable IV to support our recorded tests; however, you should use a cryptographically secure IV or omit it and
        // let the client library generate it for you.
        const iv = stringToUint8Array("xxxxxxxxxxxxxxxx");
        const encryptResult = await cryptoClient.encrypt({
          algorithm: "A256CBCPAD",
          plaintext: stringToUint8Array(text),
          iv,
        });

        const decryptResult = await cryptoClient.decrypt({
          algorithm: "A256CBCPAD",
          ciphertext: encryptResult.result!,
          iv,
        });
        assert.equal(uint8ArrayToString(decryptResult.result), text);
        await testClient?.flushKey(keyName);
        await recorder.stop();
      });
    });
  }
);
