// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import type { KeyClient } from "../../src/index.js";
import { authenticate, envSetupForPlayback } from "./utils/testAuthentication.js";
import TestClient from "./utils/testClient.js";
import type { CreateOctKeyOptions } from "../../src/keysModels.js";
import { KnownKeyExportEncryptionAlgorithm } from "../../src/index.js";
import { createRsaKey, stringToUint8Array, uint8ArrayToString } from "./utils/crypto.js";
import { createPipelineRequest, createDefaultHttpClient } from "@azure/core-rest-pipeline";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";

import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({
  toSupportTracing,
});

describe("Keys client - create, read, update and delete operations for managed HSM", () => {
  const keyPrefix = `CRUD${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let hsmClient: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);

    // These tests rely on the attestation URI inside the Release Policy, which is sanitized by the test recorder.
    // Using a bodiless matcher to ignore the differences that this causes.
    recorder.setMatcher("BodilessMatcher");
    await recorder.start(envSetupForPlayback);

    const authentication = await authenticate(recorder);
    if (!authentication.hsmClient) {
      // Managed HSM is not deployed for this run due to service resource restrictions so we skip these tests.
      // This is only necessary while Managed HSM is in preview.
      ctx.skip();
    }

    hsmClient = authentication.hsmClient;
    keySuffix = authentication.keySuffix;
    testClient = new TestClient(authentication.hsmClient);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can create an OCT key with options", async function (ctx) {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const options: CreateOctKeyOptions = {
      hsm: true,
    };
    const result = await hsmClient.createOctKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    assert.equal(result.keyType, "oct-HSM");
    await testClient.flushKey(keyName);
  });

  describe("getRandomBytes", () => {
    it("can return the required number of bytes", async () => {
      const result = await hsmClient.getRandomBytes(10);
      assert.exists(result);
      assert.equal(result.length, 10);
    });

    it("returns an error when bytes is out of range", async () => {
      await expect(hsmClient.getRandomBytes(-1)).rejects.toThrow();
      await expect(hsmClient.getRandomBytes(0)).rejects.toThrow();
      await expect(hsmClient.getRandomBytes(129)).rejects.toThrow();
    });

    it("supports tracing", async () => {
      await expect((options: any) => hsmClient.getRandomBytes(1, options)).toSupportTracing([
        "KeyClient.getRandomBytes",
      ]);
    });
  });

  describe("releaseKey", () => {
    let attestation: string;
    let encodedReleasePolicy: Uint8Array;

    beforeEach(async () => {
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

    it("can create an exportable key and release it", async () => {
      const keyName = recorder.variable(
        "exportkey",
        `exportkey-${Math.floor(Math.random() * 100000)}`,
      );
      const createdKey = await hsmClient.createKey(keyName, "RSA", {
        exportable: true,
        releasePolicy: { encodedPolicy: encodedReleasePolicy },
        keyOps: ["encrypt", "decrypt"],
      });

      assert.exists(createdKey.properties.releasePolicy?.encodedPolicy);
      assert.isNotEmpty(
        JSON.parse(uint8ArrayToString(createdKey.properties.releasePolicy!.encodedPolicy!)),
      );
      assert.isTrue(createdKey.properties.exportable);
      const releaseResult = await hsmClient.releaseKey(keyName, attestation);

      assert.exists(releaseResult.value);
    });

    it("can import an exportable key and release it", async () => {
      const keyName = recorder.variable(
        "importreleasekey",
        `importreleasekey-${Math.floor(Math.random() * 100000)}`,
      );

      const importedKey = await hsmClient.importKey(keyName, createRsaKey(), {
        exportable: true,
        releasePolicy: { encodedPolicy: encodedReleasePolicy },
      });

      assert.exists(importedKey.properties.releasePolicy?.encodedPolicy);
      assert.isNotEmpty(
        JSON.parse(uint8ArrayToString(importedKey.properties.releasePolicy!.encodedPolicy!)),
      );
      const releaseResult = await hsmClient.releaseKey(keyName, attestation, {
        version: importedKey.properties.version,
        nonce: "nonce",
        algorithm: KnownKeyExportEncryptionAlgorithm.RsaAesKeyWrap256,
      });

      assert.exists(releaseResult.value);
    });

    it("can update a key's release policy", async () => {
      const keyName = recorder.variable(
        "exportkey",
        `exportkey-${Math.floor(Math.random() * 100000)}`,
      );

      const createdKey = await hsmClient.createKey(keyName, "RSA", {
        exportable: true,
        releasePolicy: { encodedPolicy: encodedReleasePolicy },
        keyOps: ["encrypt", "decrypt"],
      });

      const newReleasePolicy = {
        anyOf: [
          {
            anyOf: [
              {
                claim: "sdk-test",
                equals: "false",
              },
            ],
            authority: env.AZURE_KEYVAULT_ATTESTATION_URI,
          },
        ],
        version: "1.0",
      };
      const updatedKey = await hsmClient.updateKeyProperties(createdKey.name, {
        releasePolicy: { encodedPolicy: stringToUint8Array(JSON.stringify(newReleasePolicy)) },
      });

      assert.exists(updatedKey.properties.releasePolicy?.encodedPolicy);

      // Release policy is sanitized by the test recorder, so we can't compare the exact value in playback mode

      if (!isPlaybackMode()) {
        const decodedReleasePolicy = JSON.parse(
          uint8ArrayToString(updatedKey.properties.releasePolicy!.encodedPolicy!),
        );

        assert.equal(decodedReleasePolicy.anyOf[0].anyOf[0].equals, "false");
      }
    });

    it("errors when key is exportable without a release policy", async () => {
      const keyName = recorder.variable(
        "exportablenopolicy",
        `exportablenopolicy-${Math.floor(Math.random() * 100000)}`,
      );
      await expect(hsmClient.createRsaKey(keyName, { exportable: true })).rejects.toThrow(
        /exportable/i,
      );
    });

    it("errors when a key has a release policy but is not exportable", async () => {
      const keyName = recorder.variable(
        "policynonexportable",
        `policynonexportable-${Math.floor(Math.random() * 100000)}`,
      );
      await expect(
        hsmClient.createRsaKey(keyName, {
          releasePolicy: { encodedPolicy: encodedReleasePolicy },
        }),
      ).rejects.toThrow(/exportable/i);
    });
  });

  it("can get a key with its attestation blob", async () => {
    await hsmClient.createRsaKey("keyAttestation");
    const key = await hsmClient.getKey("keyAttestation");
    expect(key.properties.attestation).toBeUndefined();
    const keyWithAttestation = await hsmClient.getKeyAttestation("keyAttestation");
    expect(keyWithAttestation.properties.attestation).toBeDefined();
    expect(keyWithAttestation.properties.attestation?.privateKeyAttestation).toBeDefined();
    expect(keyWithAttestation.properties.attestation?.publicKeyAttestation).toBeDefined();
  });
});
