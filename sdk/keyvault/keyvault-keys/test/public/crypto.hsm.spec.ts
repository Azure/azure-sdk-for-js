// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { env, isLiveMode, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import type { ClientSecretCredential } from "@azure/identity";
import type { NoOpCredential } from "@azure-tools/test-credential";

import type { KeyClient, KeyVaultKey } from "../../src/index.js";
import { CryptographyClient } from "../../src/index.js";
import { authenticate, envSetupForPlayback } from "./utils/testAuthentication.js";
import { stringToUint8Array, uint8ArrayToString } from "./utils/crypto.js";
import TestClient from "./utils/testClient.js";
import { createPipelineRequest, createDefaultHttpClient } from "@azure/core-rest-pipeline";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";

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

  describe("secureWrapKey & secureUnwrapKey", () => {
    let attestation: string;
    let encodedReleasePolicy: Uint8Array;

    beforeEach(async () => {
      await recorder.setMatcher("BodilessMatcher");
      const attestationUri = env.AZURE_KEYVAULT_ATTESTATION_URI;
      const releasePolicy = {
        anyOf: [
          {
            allOf: [
              {
                claim: "sdk-test",
                equals: "true",
              },
            ],
            authority: attestationUri,
          },
        ],
        version: "1.0",
      };

      encodedReleasePolicy = stringToUint8Array(JSON.stringify(releasePolicy));

      if (!isPlaybackMode()) {
        const client = createDefaultHttpClient();
        const response = await client.sendRequest(
          createPipelineRequest({ url: `${attestationUri}/generate-test-token` }),
        );
        attestation = JSON.parse(response.bodyAsText!).token;
        recorder.variable("attestation", attestation);
      } else {
        attestation = recorder.variable("attestation", attestation);
      }
    });

    it("can secure wrap and unwrap a key using RSA-OAEP-256", async () => {
      const keyName = recorder.variable(
        "securewrapkey",
        `securewrapkey-${Math.floor(Math.random() * 100000)}`,
      );

      await hsmClient.createRsaKey(keyName, {
        keyOps: ["secureWrapKey", "secureUnwrapKey"],
        releasePolicy: { encodedPolicy: encodedReleasePolicy },
      });

      const cryptographyClient = hsmClient.getCryptographyClient(keyName);
      const wrapped = await cryptographyClient.secureWrapKey("RSA-OAEP-256");
      assert.exists(wrapped.result);
      assert.isAbove(wrapped.result.byteLength, 0);
      assert.equal(wrapped.algorithm, "RSA-OAEP-256");
      assert.isNotEmpty(wrapped.keyID);

      const unwrapped = await cryptographyClient.secureUnwrapKey(
        wrapped.algorithm,
        wrapped.result,
        attestation,
      );
      assert.exists(unwrapped.result);
      assert.isAbove(unwrapped.result.byteLength, 0);
      assert.equal(unwrapped.algorithm, "RSA-OAEP-256");
      assert.isNotEmpty(unwrapped.keyID);

      await testClient.flushKey(keyName);
    });

    it("can secure wrap and unwrap targeting a specific key version", async () => {
      const keyName = recorder.variable(
        "securewrapkey-version",
        `securewrapkey-version-${Math.floor(Math.random() * 100000)}`,
      );

      const createdKey = await hsmClient.createRsaKey(keyName, {
        keyOps: ["secureWrapKey", "secureUnwrapKey"],
        releasePolicy: { encodedPolicy: encodedReleasePolicy },
      });
      const version = createdKey.properties.version!;

      const cryptographyClient = hsmClient.getCryptographyClient(keyName, { keyVersion: version });
      const wrapped = await cryptographyClient.secureWrapKey("RSA-OAEP-256");
      assert.exists(wrapped.result);
      assert.include(wrapped.keyID, version);

      const unwrapped = await cryptographyClient.secureUnwrapKey(
        wrapped.algorithm,
        wrapped.result,
        attestation,
      );
      assert.exists(unwrapped.result);
      assert.include(unwrapped.keyID, version);
      await testClient.flushKey(keyName);
    });

    it("secureUnwrapKey throws when the attestation token is invalid", async () => {
      const keyName = recorder.variable(
        "securewrapkey-badattest",
        `securewrapkey-badattest-${Math.floor(Math.random() * 100000)}`,
      );

      await hsmClient.createRsaKey(keyName, {
        keyOps: ["secureWrapKey", "secureUnwrapKey"],
        releasePolicy: { encodedPolicy: encodedReleasePolicy },
      });

      const cryptographyClient = hsmClient.getCryptographyClient(keyName);
      const wrapped = await cryptographyClient.secureWrapKey("RSA-OAEP-256");
      await expect(
        cryptographyClient.secureUnwrapKey(
          wrapped.algorithm,
          wrapped.result,
          "not-a-valid-attestation-token",
        ),
      ).rejects.toThrow();

      await testClient.flushKey(keyName);
    });

    it("secureWrapKey throws when the key has no release policy", async () => {
      const keyName = recorder.variable(
        "securewrapkey-nopolicy",
        `securewrapkey-nopolicy-${Math.floor(Math.random() * 100000)}`,
      );

      await expect(
        hsmClient.createRsaKey(keyName, { keyOps: ["secureWrapKey", "secureUnwrapKey"] }),
      ).rejects.toThrow();
    });
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
