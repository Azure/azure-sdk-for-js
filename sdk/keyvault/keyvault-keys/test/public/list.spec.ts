// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
import { Context } from "mocha";
import { Recorder, env, isRecordMode } from "@azure-tools/test-recorder";

import { KeyClient } from "../../src";
import { getServiceVersion } from "./utils/common";
import { testPollerProperties } from "./utils/recorderUtils";
import { authenticate, envSetupForPlayback } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";

describe("Keys client - list keys in various ways", () => {
  const keyPrefix = `list${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(envSetupForPlayback);

    const authentication = await authenticate(getServiceVersion(), recorder);
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  // Use this while recording to make sure the target keyvault is clean.
  // The next tests will produce a more consistent output.
  // This test is only useful while developing locally.
  it("can purge all keys", async function (this: Context): Promise<void> {
    // WARNING: When TEST_MODE equals "record", all of the keys in the indicated KEYVAULT_URI will be deleted as part of this test.
    if (!isRecordMode()) {
      return this.skip();
    }
    for await (const properties of client.listPropertiesOfKeys()) {
      try {
        await testClient.flushKey(properties.name);
      } catch {
        // Nothing to do here.
      }
    }
    for await (const deletedKey of client.listDeletedKeys()) {
      try {
        await testClient.purgeKey(deletedKey.name);
      } catch {
        // Nothing to do here.
      }
    }
  });

  it("can get the versions of a key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const expectedVersions = 2;

    for (let i = 0; i < expectedVersions; ++i) {
      await client.createKey(keyName, "RSA");
    }

    let totalVersions = 0;
    for await (const version of client.listPropertiesOfKeyVersions(keyName)) {
      assert.equal(
        version.name,
        keyName,
        "Unexpected key name in result from listPropertiesOfKeyVersions().",
      );
      totalVersions += 1;
    }
    assert.equal(totalVersions, expectedVersions, `Unexpected total versions for key ${keyName}`);
    await testClient.flushKey(keyName);
  });

  it("can get the versions of a key (paged)", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);

    const expectedVersions = 2;
    for (let i = 0; i < expectedVersions; ++i) {
      await client.createKey(keyName, "RSA");
    }

    let totalVersions = 0;
    for await (const page of client
      .listPropertiesOfKeyVersions(keyName)
      .byPage({ maxPageSize: 1 })) {
      for (const version of page) {
        assert.equal(
          version.name,
          keyName,
          "Unexpected key name in result from listPropertiesOfKeyVersions().",
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, expectedVersions, `Unexpected total versions for key ${keyName}`);
    await testClient.flushKey(keyName);
  });

  it("list 0 versions of a non-existing key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    let totalVersions = 0;
    for await (const version of client.listPropertiesOfKeyVersions(keyName)) {
      assert.equal(
        version.name,
        keyName,
        "Unexpected key name in result from listPropertiesOfKeyVersions().",
      );
      totalVersions += 1;
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("list 0 versions of a non-existing key (paged)", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    let totalVersions = 0;
    for await (const page of client.listPropertiesOfKeyVersions(keyName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.name,
          keyName,
          "Unexpected key name in result from listPropertiesOfKeyVersions().",
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("can get several inserted keys", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const properties of client.listPropertiesOfKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(properties.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by getKeys.");

    for (const name of keyNames) {
      await testClient.flushKey(name);
    }
  });

  it("can get several inserted keys (paged)", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const page of client.listPropertiesOfKeys().byPage({ maxPageSize: 1 })) {
      for (const properties of page) {
        // The vault might contain more keys than the ones we inserted.
        if (!keyNames.includes(properties.name)) continue;
        found += 1;
      }
    }

    assert.equal(found, 2, "Unexpected number of keys found by getKeys.");

    for (const name of keyNames) {
      await testClient.flushKey(name);
    }
  });

  it("list deleted keys", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (const name of keyNames) {
      const poller = await client.beginDeleteKey(name, testPollerProperties);
      await poller.pollUntilDone();
    }

    let found = 0;
    for await (const deletedKey of client.listDeletedKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(deletedKey.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by listDeletedKeys.");

    for (const name of keyNames) {
      await testClient.purgeKey(name);
    }
  });

  it("list deleted keys (paged)", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (const name of keyNames) {
      const poller = await client.beginDeleteKey(name, testPollerProperties);
      await poller.pollUntilDone();
    }

    let found = 0;
    for await (const page of client.listDeletedKeys().byPage({ maxPageSize: 1 })) {
      for (const deletedKey of page) {
        // The vault might contain more keys than the ones we inserted.
        if (!keyNames.includes(deletedKey.name)) continue;
        found += 1;
      }
    }

    assert.equal(found, 2, "Unexpected number of keys found by listDeletedKeys.");

    for (const name of keyNames) {
      await testClient.purgeKey(name);
    }
  });
});
