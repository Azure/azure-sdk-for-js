// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { Context } from "mocha";
import { AbortController } from "@azure/abort-controller";
import { Recorder, env, isPlaybackMode, isRecordMode } from "@azure-tools/test-recorder";

import {
  CreateEcKeyOptions,
  GetKeyOptions,
  KeyClient,
  UpdateKeyPropertiesOptions,
} from "../../src";
import {
  assertThrowsAbortError,
  getServiceVersion,
  isPublicCloud,
  onVersions,
} from "./utils/common";
import { testPollerProperties } from "./utils/recorderUtils";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { DefaultHttpClient, WebResource } from "@azure/core-http";
import { stringToUint8Array, uint8ArrayToString } from "./utils/crypto";

describe("Keys client - create, read, update and delete operations", () => {
  const keyPrefix = `CRUD${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const authentication = await authenticate(this, getServiceVersion());
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can create a key while giving a manual type", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const result = await client.createKey(keyName, "RSA");
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can abort creating a key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const controller = new AbortController();

    await assertThrowsAbortError(async () => {
      const resultPromise = client.createKey(keyName, "RSA", {
        abortSignal: controller.signal,
      });
      controller.abort();
      await resultPromise;
    });
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can create a key with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await assertThrowsAbortError(async () => {
      await client.createKey(keyName, "RSA", {
        requestOptions: {
          timeout: 1,
        },
      });
    });
  });

  it("cannot create a key with an empty name", async function () {
    const keyName = "";
    try {
      await client.createKey(keyName, "RSA");
      assert.fail("Expected an error");
    } catch (e) {
      // Catch expected error
    }
  });

  it("can create a RSA key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const result = await client.createRsaKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a RSA key with size", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const options = {
      keySize: 2048,
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a RSA key with public exponent", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const options = {
      publicExponent: 3,
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can create a RSA key with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);

    await assertThrowsAbortError(async () => {
      await client.createRsaKey(keyName, {
        requestOptions: {
          timeout: 1,
        },
      });
    });
  });

  it("can create an EC key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const result = await client.createEcKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create an EC key with curve", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const options: CreateEcKeyOptions = {
      curve: "P-256",
    };
    const result = await client.createEcKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can create an EC key with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await assertThrowsAbortError(async () => {
      await client.createEcKey(keyName, {
        requestOptions: {
          timeout: 1,
        },
      });
    });
  });

  it("can create a disabled key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const options = {
      enabled: false,
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a key with notBefore", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const date = new Date("2019-01-01");
    const notBefore = new Date(date.getTime() + 5000); // 5 seconds later
    notBefore.setMilliseconds(0);

    const options = { notBefore };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result!.properties.notBefore!.getTime(),
      notBefore.getTime(),
      "Unexpected notBefore value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a key with expires", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const date = new Date("2019-01-01");
    const expiresOn = new Date(date.getTime() + 5000); // 5 seconds later
    expiresOn.setMilliseconds(0);

    const options = { expiresOn };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result!.properties.expiresOn!.getTime(),
      expiresOn.getTime(),
      "Unexpected expires value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can update key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const { version } = (await client.createRsaKey(keyName)).properties;
    const options: UpdateKeyPropertiesOptions = { enabled: false };
    const result = await client.updateKeyProperties(keyName, version!, options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from updateKey().");
  });

  it("can update a key's properties without specifying a version", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createRsaKey(keyName);
    const options: UpdateKeyPropertiesOptions = { enabled: false };
    const result = await client.updateKeyProperties(keyName, options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from updateKey().");
  });

  it("can update a key's properties for a specific version", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const { version: previousVersion } = (await client.createRsaKey(keyName)).properties;
    const { version: newVersion } = (await client.createRsaKey(keyName)).properties;
    assert.notEqual(previousVersion, newVersion);

    const options: UpdateKeyPropertiesOptions = { enabled: false };
    const result = await client.updateKeyProperties(keyName, previousVersion!, options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from updateKey().");
  });

  it("can update a disabled key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
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
      "Unexpected expires value after attempting to update a disabled key"
    );
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can update key with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const { version } = (await client.createRsaKey(keyName)).properties;
    const options: UpdateKeyPropertiesOptions = {
      enabled: false,
      requestOptions: { timeout: 1 },
    };
    await assertThrowsAbortError(async () => {
      await client.updateKeyProperties(keyName, version || "", options);
    });
  });

  it("can delete a key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
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

  // On playback mode, the tests happen too fast for the timeout to work
  it("can delete a key with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    await assertThrowsAbortError(async () => {
      await client.beginDeleteKey(keyName, {
        ...testPollerProperties,
        requestOptions: {
          timeout: 1,
        },
      });
    });
  });

  it("delete nonexisting key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
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

  it("can get a key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can get a key with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    await assertThrowsAbortError(async () => {
      await client.getKey(keyName, { requestOptions: { timeout: 1 } });
    });
  });

  it("can get a specific version of a key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const { version } = (await client.createKey(keyName, "RSA")).properties;
    const options: GetKeyOptions = { version };
    const getResult = await client.getKey(keyName, options);
    assert.equal(
      getResult.properties.version,
      version,
      "Unexpected key name in result from getKey()."
    );
    await testClient.flushKey(keyName);
  });

  it("can get a deleted key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    assert.equal(
      poller.getResult()!.name,
      keyName,
      "Unexpected key name in result from beginDeleteKey()."
    );
    await poller.pollUntilDone();
    let getResult = await poller.getResult();
    assert.equal(
      getResult!.name,
      keyName,
      "Unexpected key name in result from poller.getResult()."
    );
    getResult = await client.getDeletedKey(keyName);
    assert.equal(getResult!.name, keyName, "Unexpected key name in result from getDeletedKey().");
    await testClient.purgeKey(keyName);
  });

  it("can't get a deleted key that doesn't exist", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
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

  it("can purge a deleted key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    await poller.pollUntilDone();
    await client.purgeDeletedKey(keyName);
  });

  onVersions({ minVer: "7.3" }).describe("key rotation", () => {
    if (isPublicCloud() || isRecordMode() || isPlaybackMode()) {
      // Key Rotation is a preview feature that is not supported in all clouds yet.
      // Once 7.3 GAs we should be able to run this unconditionally.
      it("rotateKey supports rotating a key", async () => {
        const keyName = recorder.getUniqueName("keyrotate");
        const key = await client.createKey(keyName, "RSA");
        const rotatedKey = await client.rotateKey(keyName);

        // The rotated key should have mostly the same data, excluding properties that are rotated.
        assert.deepEqualExcludingEvery(rotatedKey, key, ["id", "kid", "version", "n", "e"] as any);

        // A new version is created, and the key material is rotated (RSA key, check n and e).
        assert.notEqual(rotatedKey.id, key.id);
        assert.notEqual(rotatedKey.properties.version, key.properties.version);
        assert.notDeepEqual(rotatedKey.key?.n, key.key?.n);
      });

      it("updateKeyRotationPolicy supports creating a new rotation policy and fetching it", async () => {
        const keyName = recorder.getUniqueName("keyrotationpolicy");
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
        const keyName = recorder.getUniqueName("keyrotationpolicy");
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
        const keyName = recorder.getUniqueName("nonexistentkey");
        await assert.isRejected(client.getKeyRotationPolicy(keyName));
      });

      it("supports tracing", async () => {
        const keyName = recorder.getUniqueName("rotationpolicytracing");
        const key = await client.createKey(keyName, "RSA");

        await assert.supportsTracing(
          async (options) => {
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
              options
            );
            await client.getKeyRotationPolicy(key.name, options);
          },
          ["KeyClient.updateKeyRotationPolicy", "KeyClient.getKeyRotationPolicy"]
        );
      });
    }
  });

  onVersions({ minVer: "7.3" }).describe("releaseKey", () => {
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
      const attestationTokenClient = new DefaultHttpClient();
      const response = await attestationTokenClient.sendRequest(
        new WebResource(`${attestationUri}/generate-test-token`)
      );
      attestation = JSON.parse(response.bodyAsText!).token;
    });

    it("can create an exportable key and release it", async () => {
      const keyName = recorder.getUniqueName("exportkey");
      const createdKey = await client.createRsaKey(keyName, {
        exportable: true,
        hsm: true,
        releasePolicy: { encodedPolicy: encodedReleasePolicy },
        keyOps: ["encrypt", "decrypt"],
      });

      assert.exists(createdKey.properties.releasePolicy?.encodedPolicy);
      assert.isNotEmpty(
        JSON.parse(uint8ArrayToString(createdKey.properties.releasePolicy!.encodedPolicy!))
      );
      assert.isTrue(createdKey.properties.exportable);
      const releaseResult = await client.releaseKey(keyName, attestation);

      assert.exists(releaseResult.value);
    });

    it("errors when key is exportable without a release policy", async () => {
      const keyName = recorder.getUniqueName("exportablenopolicy");
      await assert.isRejected(
        client.createRsaKey(keyName, { exportable: true, hsm: true }),
        /exportable/i
      );
    });

    it("errors when a key has a release policy but is not exportable", async () => {
      const keyName = recorder.getUniqueName("policynonexportable");
      await assert.isRejected(
        client.createRsaKey(keyName, {
          hsm: true,
          releasePolicy: { encodedPolicy: encodedReleasePolicy },
        }),
        /exportable/i
      );
    });

    it("errors when updating an immutable release policy", async () => {
      const keyName = recorder.getUniqueName("immutablerelease");
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

      await assert.isRejected(
        client.updateKeyProperties(createdKey.name, {
          releasePolicy: {
            encodedPolicy: stringToUint8Array(JSON.stringify(newReleasePolicy)),
            immutable: true,
          },
        }),
        /Immutable Key Release/
      );
    });
  });

  describe("tracing", () => {
    it("traces through the basic operations", async () => {
      const keyName = recorder.getUniqueName("keyclienttracing");
      await assert.supportsTracing(
        async (options) => {
          await client.createKey(keyName, "RSA", options);
          await client.getKey(keyName, options);
          await client.backupKey(keyName, options);
          await client.listDeletedKeys(options).next();
          await client.listPropertiesOfKeys(options).next();
          await client.listPropertiesOfKeyVersions(keyName, options).next();
          await client.updateKeyProperties(keyName, options);
        },
        [
          "KeyClient.createKey",
          "KeyClient.getKey",
          "KeyClient.backupKey",
          "KeyClient.listDeletedKeysPage",
          "KeyClient.listPropertiesOfKeysPage",
          "KeyClient.listPropertiesOfKeyVersionsPage",
          "KeyClient.updateKeyProperties",
        ]
      );
    });

    onVersions({ minVer: "7.3" }).it("traces through key rotation operations", async () => {
      const keyName = recorder.getUniqueName("keyrotationtracing");
      await client.createKey(keyName, "RSA");
      await assert.supportsTracing(
        async (options) => {
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
            options
          );
          await client.getKeyRotationPolicy(keyName, options);
        },
        ["KeyClient.updateKeyRotationPolicy", "KeyClient.getKeyRotationPolicy"]
      );
    });

    onVersions({ minVer: "7.3" }).it("traces through secure key release", async () => {
      await assert.supportsTracing(
        async (options) => {
          try {
            await client.releaseKey("foo", "anything", options);
          } catch {
            // ignore errors, as it's not worth setting up the secure key release policy for this test.
          }
        },
        ["KeyClient.releaseKey"]
      );
    });
  });
});
