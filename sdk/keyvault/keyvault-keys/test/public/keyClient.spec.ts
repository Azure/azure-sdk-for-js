// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";
import type {
  CreateEcKeyOptions,
  GetKeyOptions,
  KeyClient,
  UpdateKeyPropertiesOptions,
} from "@azure/keyvault-keys";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate, envSetupForPlayback } from "./utils/testAuthentication.js";
import type TestClient from "./utils/testClient.js";
import { stringToUint8Array, uint8ArrayToString } from "./utils/crypto.js";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({
  toSupportTracing: toSupportTracing,
});

describe("Keys client - create, read, update and delete operations", () => {
  const keyPrefix = `CRUD${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);

    // These tests rely on the attestation URI inside the Release Policy, which is sanitized by the test recorder.
    // Using a bodiless matcher to ignore the differences that this causes.
    await recorder.start(envSetupForPlayback);
    await recorder.setMatcher("BodilessMatcher");

    const authentication = await authenticate(recorder);
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // The tests follow

  it("can create a key while giving a manual type", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const result = await client.createKey(keyName, "RSA");
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("cannot create a key with an empty name", async () => {
    const keyName = "";
    try {
      await client.createKey(keyName, "RSA");
      assert.fail("Expected an error");
    } catch (e) {
      // Catch expected error
    }
  });

  it("can create a RSA key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const result = await client.createRsaKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a RSA key with size", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const options = {
      keySize: 2048,
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a RSA key with public exponent", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const options = {
      publicExponent: 3,
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create an EC key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const result = await client.createEcKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create an EC key with curve", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const options: CreateEcKeyOptions = {
      curve: "P-256",
    };
    const result = await client.createEcKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a disabled key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const options = {
      enabled: false,
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a key with notBefore", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const date = new Date("2019-01-01");
    const notBefore = new Date(date.getTime() + 5000); // 5 seconds later
    notBefore.setMilliseconds(0);

    const options = { notBefore };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result!.properties.notBefore!.getTime(),
      notBefore.getTime(),
      "Unexpected notBefore value from createKey().",
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a key with expires", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const date = new Date("2019-01-01");
    const expiresOn = new Date(date.getTime() + 5000); // 5 seconds later
    expiresOn.setMilliseconds(0);

    const options = { expiresOn };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result!.properties.expiresOn!.getTime(),
      expiresOn.getTime(),
      "Unexpected expires value from createKey().",
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can update key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const { version } = (await client.createRsaKey(keyName)).properties;
    const options: UpdateKeyPropertiesOptions = { enabled: false };
    const result = await client.updateKeyProperties(keyName, version!, options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from updateKey().");
  });

  it("can update a key's properties without specifying a version", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    await client.createRsaKey(keyName);
    const options: UpdateKeyPropertiesOptions = { enabled: false };
    const result = await client.updateKeyProperties(keyName, options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from updateKey().");
  });

  it("can update a key's properties for a specific version", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const { version: previousVersion } = (await client.createRsaKey(keyName)).properties;
    const { version: newVersion } = (await client.createRsaKey(keyName)).properties;
    assert.notEqual(previousVersion, newVersion);

    const options: UpdateKeyPropertiesOptions = { enabled: false };
    const result = await client.updateKeyProperties(keyName, previousVersion!, options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from updateKey().");
  });

  it("can update a disabled key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const createOptions = {
      enabled: false,
    };
    const { version } = (await client.createRsaKey(keyName, createOptions)).properties;
    const expiresOn = new Date("2019-01-01");
    expiresOn.setMilliseconds(0);
    const updateOptions: UpdateKeyPropertiesOptions = { expiresOn };
    const result = await client.updateKeyProperties(keyName, version || "", updateOptions);
    assert.equal(
      result!.properties.expiresOn!.getTime(),
      expiresOn.getTime(),
      "Unexpected expires value after attempting to update a disabled key",
    );
    await testClient.flushKey(keyName);
  });

  it("can delete a key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    await poller.pollUntilDone();

    try {
      await client.getKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      if (e.name === "RestError") {
        assert.equal(e.code, "KeyNotFound");
        assert.equal(e.statusCode, 404);
      } else {
        throw e;
      }
    }
    await testClient.purgeKey(keyName);
  });

  it("delete nonexisting key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    try {
      await client.getKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      if (e.name === "RestError") {
        assert.equal(e.code, "KeyNotFound");
        assert.equal(e.statusCode, 404);
      } else {
        throw e;
      }
    }
  });

  it("can get a key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  it("can get a specific version of a key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    const { version } = (await client.createKey(keyName, "RSA")).properties;
    const options: GetKeyOptions = { version };
    const getResult = await client.getKey(keyName, options);
    assert.equal(
      getResult.properties.version,
      version,
      "Unexpected key name in result from getKey().",
    );
    await testClient.flushKey(keyName);
  });

  it("can get a deleted key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    assert.equal(
      poller.getResult()!.name,
      keyName,
      "Unexpected key name in result from beginDeleteKey().",
    );
    await poller.pollUntilDone();
    let getResult = poller.getResult();
    assert.equal(
      getResult!.name,
      keyName,
      "Unexpected key name in result from poller.getResult().",
    );
    getResult = await client.getDeletedKey(keyName);
    assert.equal(getResult!.name, keyName, "Unexpected key name in result from getDeletedKey().");
    await testClient.purgeKey(keyName);
  });

  it("can't get a deleted key that doesn't exist", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    let error;
    try {
      const poller = await client.beginDeleteKey(keyName, testPollerProperties);
      await poller.pollUntilDone();
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.code, "KeyNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("can purge a deleted key", async (ctx) => {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    await poller.pollUntilDone();
    await client.purgeDeletedKey(keyName);
  });

  describe("key rotation", () => {
    it("rotateKey supports rotating a key", async () => {
      const keyName = recorder.variable(
        "keyrotate",
        `keyrotate-${Math.floor(Math.random() * 1000)}`,
      );
      const key = await client.createKey(keyName, "RSA");
      const rotatedKey = await client.rotateKey(keyName);

      // A new version is created, and the key material is rotated (RSA key, check n and e).
      assert.notEqual(rotatedKey.id, key.id);
      assert.notEqual(rotatedKey.properties.version, key.properties.version);
      assert.notEqual(rotatedKey.key?.n, key.key?.n);
    });

    it("updateKeyRotationPolicy supports creating a new rotation policy and fetching it", async () => {
      const keyName = recorder.variable(
        "keyrotationpolicy",
        `keyrotationpolicy-${Math.floor(Math.random() * 1000)}`,
      );
      const key = await client.createKey(keyName, "RSA");

      const rotationPolicy = await client.updateKeyRotationPolicy(key.name, {
        expiresIn: "P90D",
        lifetimeActions: [
          {
            action: "Rotate",
            timeBeforeExpiry: "P30D",
          },
        ],
      });

      const fetchedPolicy = await client.getKeyRotationPolicy(keyName);

      assert.deepEqual(fetchedPolicy, rotationPolicy);
    });

    it("updateKeyRotationPolicy supports updating an existing policy", async () => {
      const keyName = recorder.variable(
        "keyrotationpolicy",
        `keyrotationpolicy-${Math.floor(Math.random() * 1000)}`,
      );
      const key = await client.createKey(keyName, "RSA");

      // Create a policy which we will override later.
      await client.updateKeyRotationPolicy(key.name, {
        lifetimeActions: [
          {
            action: "Rotate",
            timeAfterCreate: "P2M",
          },
        ],
      });

      const updatedPolicy = await client.updateKeyRotationPolicy(key.name, {
        expiresIn: "P90D",
        lifetimeActions: [
          {
            action: "Notify",
            timeBeforeExpiry: "P30D",
          },
        ],
      });

      assert.deepEqual(updatedPolicy, {
        id: updatedPolicy.id,
        createdOn: updatedPolicy.createdOn,
        updatedOn: updatedPolicy.updatedOn,
        expiresIn: "P90D",
        lifetimeActions: [
          {
            timeAfterCreate: undefined,
            action: "Notify",
            timeBeforeExpiry: "P30D",
          },
        ],
      });
    });

    it("throws when attempting to fetch a policy of a non-existent key", async () => {
      const keyName = recorder.variable(
        "nonexistentkey",
        `nonexistentkey-${Math.floor(Math.random() * 1000)}`,
      );
      await expect(client.getKeyRotationPolicy(keyName)).rejects.toThrow();
    });

    it("supports tracing", async () => {
      const keyName = recorder.variable(
        "rotationpolicytracing",
        `rotationpolicytracing-${Math.floor(Math.random() * 1000)}`,
      );
      const key = await client.createKey(keyName, "RSA");

      await expect(async (options: any) => {
        await client.updateKeyRotationPolicy(
          key.name,
          {
            lifetimeActions: [
              {
                action: "Rotate",
                timeAfterCreate: "P2M",
              },
            ],
          },
          options,
        );
        await client.getKeyRotationPolicy(key.name, options);
      }).toSupportTracing(["KeyClient.updateKeyRotationPolicy", "KeyClient.getKeyRotationPolicy"]);
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
        version: "1.0.0",
      };
      encodedReleasePolicy = stringToUint8Array(JSON.stringify(releasePolicy));

      if (!isPlaybackMode()) {
        const attestationTokenClient = createDefaultHttpClient();
        const response = await attestationTokenClient.sendRequest(
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
        `exportkey-${Math.floor(Math.random() * 1000)}`,
      );
      const createdKey = await client.createRsaKey(keyName, {
        exportable: true,
        hsm: true,
        releasePolicy: { encodedPolicy: encodedReleasePolicy },
        keyOps: ["encrypt", "decrypt"],
      });

      assert.exists(createdKey.properties.releasePolicy?.encodedPolicy);
      assert.isNotEmpty(
        JSON.parse(uint8ArrayToString(createdKey.properties.releasePolicy!.encodedPolicy!)),
      );
      assert.isTrue(createdKey.properties.exportable);
      const releaseResult = await client.releaseKey(keyName, attestation);

      assert.exists(releaseResult.value);
    });

    it("errors when key is exportable without a release policy", async () => {
      const keyName = recorder.variable(
        "exportablenopolicy",
        `exportablenopolicy-${Math.floor(Math.random() * 1000)}`,
      );
      await expect(client.createRsaKey(keyName, { exportable: true, hsm: true })).rejects.toThrow(
        /exportable/i,
      );
    });

    it("errors when a key has a release policy but is not exportable", async () => {
      const keyName = recorder.variable(
        "policynonexportable",
        `policynonexportable-${Math.floor(Math.random() * 1000)}`,
      );
      await expect(
        client.createRsaKey(keyName, {
          hsm: true,
          releasePolicy: { encodedPolicy: encodedReleasePolicy },
        }),
      ).rejects.toThrow(/exportable/i);
    });

    it("errors when updating an immutable release policy", async () => {
      const keyName = recorder.variable(
        "immutablerelease",
        `immutablerelease-${Math.floor(Math.random() * 1000)}`,
      );
      const createdKey = await client.createRsaKey(keyName, {
        exportable: true,
        hsm: true,
        releasePolicy: {
          encodedPolicy: encodedReleasePolicy,
          immutable: true,
        },
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

      await expect(
        client.updateKeyProperties(createdKey.name, {
          releasePolicy: {
            encodedPolicy: stringToUint8Array(JSON.stringify(newReleasePolicy)),
            immutable: true,
          },
        }),
      ).rejects.toThrow(/Immutable Key Release/);
    });
  });

  describe("tracing", () => {
    it("traces through the basic operations", async () => {
      const keyName = recorder.variable(
        "keyclienttracing",
        `keyclienttracing-${Math.floor(Math.random() * 1000)}`,
      );

      await expect(async (options: any) => {
        await client.createKey(keyName, "RSA", options);
        await client.getKey(keyName, options);
        await client.backupKey(keyName, options);
        // TODO: figure out tracing strategy for list operations
        // await client.listDeletedKeys(options).next();
        // await client.listPropertiesOfKeys(options).next();
        // await client.listPropertiesOfKeyVersions(keyName, options).next();
        await client.updateKeyProperties(keyName, options);
      }).toSupportTracing([
        "KeyClient.createKey",
        "KeyClient.getKey",
        "KeyClient.backupKey",
        "KeyClient.updateKeyProperties",
      ]);
    });

    it("traces through key rotation operations", async () => {
      const keyName = recorder.variable(
        "keyrotationtracing",
        `keyrotationtracing-${Math.floor(Math.random() * 1000)}`,
      );
      await client.createKey(keyName, "RSA");
      await expect(async (options: any) => {
        await client.updateKeyRotationPolicy(
          keyName,
          {
            lifetimeActions: [
              {
                action: "Rotate",
                timeAfterCreate: "P50D",
              },
            ],
          },
          options,
        );
        await client.getKeyRotationPolicy(keyName, options);
      }).toSupportTracing(["KeyClient.updateKeyRotationPolicy", "KeyClient.getKeyRotationPolicy"]);
    });

    it("traces through secure key release", async () => {
      await expect(async (options: any) => {
        try {
          await client.releaseKey("foo", "anything", options);
        } catch {
          // ignore errors, as it's not worth setting up the secure key release policy for this test.
        }
      }).toSupportTracing(["KeyClient.releaseKey"]);
    });
  });
});
