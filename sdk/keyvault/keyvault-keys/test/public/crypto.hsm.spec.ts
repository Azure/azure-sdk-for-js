// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type { ClientSecretCredential } from "@azure/identity";
import type { NoOpCredential } from "@azure-tools/test-credential";

import type { KeyClient, KeyVaultKey } from "@azure/keyvault-keys";
import { CryptographyClient } from "@azure/keyvault-keys";
import { authenticate, envSetupForPlayback } from "./utils/testAuthentication.js";
import { stringToUint8Array, uint8ArrayToString } from "./utils/crypto.js";
import TestClient from "./utils/testClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("CryptographyClient for managed HSM (skipped if MHSM is not deployed)", () => {
  let hsmClient: KeyClient;
  let testClient: TestClient;
  let cryptoClient: CryptographyClient;
  let recorder: Recorder;
  let credential: ClientSecretCredential | NoOpCredential;
  let keyName: string;
  let keyVaultKey: KeyVaultKey;
  let keySuffix: string;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    await recorder.start(envSetupForPlayback);

    const authentication = await authenticate(recorder);

    if (!authentication.hsmClient) {
      // Managed HSM is not deployed for this run due to service resource restrictions so we skip these tests.
      // This is only necessary while Managed HSM is in preview.
      ctx.skip();
    }

    hsmClient = authentication.hsmClient;
    testClient = new TestClient(authentication.hsmClient);
    credential = authentication.credential;
    keySuffix = authentication.keySuffix;
    keyName = testClient.formatName("cryptography-client-test" + keySuffix);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  describe("with AES crypto algorithms", async function () {
    it("encrypts and decrypts using AES-GCM", async function (ctx) {
      keyVaultKey = await hsmClient.createKey(keyName, "AES", { keySize: 256 });
      cryptoClient = new CryptographyClient(
        keyVaultKey.id!,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: !isLiveMode() }),
      );
      const text = ctx.task.name;
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
    });

    it("encrypts and decrypts using AES-CBC", async function (ctx) {
      keyVaultKey = await hsmClient.createKey(keyName, "AES", { keySize: 256 });
      cryptoClient = new CryptographyClient(
        keyVaultKey.id!,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: !isLiveMode() }),
      );
      const text = ctx.task.name;
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
    });
  });
});
