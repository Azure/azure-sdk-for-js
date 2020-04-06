// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { KeyClient } from "../src";
import { testPollerProperties } from "./utils/recorderUtils";
import { env, Recorder } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { assertThrowsAbortError } from "./utils/utils.common";

describe("Keys client - list keys in various ways", () => {
  const keyPrefix = `recover${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  // This test is only useful while developing locally
  it("can purge all keys", async function() {
    // WARNING: When running integration-tests, or having TEST_MODE="record", all of the keys in the indicated KEYVAULT_NAME will be deleted as part of this test.
    recorder.skip(undefined, "Skipping this test on playback.");
    for await (const properties of client.listPropertiesOfKeys()) {
      try {
        await testClient.flushKey(properties.name);
      } catch (e) {}
    }
    for await (const deletedKey of client.listDeletedKeys()) {
      try {
        await testClient.purgeKey(deletedKey.name);
      } catch (e) {}
    }
  });

  it("can get the versions of a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (const version of client.listPropertiesOfKeyVersions(keyName)) {
      assert.equal(
        version.name,
        keyName,
        "Unexpected key name in result from listPropertiesOfKeyVersions()."
      );
      totalVersions += 1;
    }
    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can get the versions of a key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const iter = client.listPropertiesOfKeyVersions("doesntmatter", {
      requestOptions: { timeout: 1 }
    });
    await assertThrowsAbortError(async () => {
      await iter.next();
    });
  });

  it("can get the versions of a key (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (const page of client.listPropertiesOfKeyVersions(keyName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.name,
          keyName,
          "Unexpected key name in result from listPropertiesOfKeyVersions()."
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
    await testClient.flushKey(keyName);
  });

  it("list 0 versions of a non-existing key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    let totalVersions = 0;
    for await (const version of client.listPropertiesOfKeyVersions(keyName)) {
      assert.equal(
        version.name,
        keyName,
        "Unexpected key name in result from listPropertiesOfKeyVersions()."
      );
      totalVersions += 1;
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("list 0 versions of a non-existing key (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    let totalVersions = 0;
    for await (const page of client.listPropertiesOfKeyVersions(keyName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.name,
          keyName,
          "Unexpected key name in result from listPropertiesOfKeyVersions()."
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("can get several inserted keys", async function() {
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

  // On playback mode, the tests happen too fast for the timeout to work
  it("can get several inserted keys with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const iter = client.listPropertiesOfKeys({ requestOptions: { timeout: 1 } });

    await assertThrowsAbortError(async () => {
      await iter.next();
    });
  });

  it("can get several inserted keys (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const page of client.listPropertiesOfKeys().byPage()) {
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

  it("list deleted keys", async function() {
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

  // On playback mode, the tests happen too fast for the timeout to work
  it("list deleted keys with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const iter = client.listDeletedKeys({ requestOptions: { timeout: 1 } });
    await assertThrowsAbortError(async () => {
      await iter.next();
    });
  });

  it("list deleted keys (paged)", async function() {
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
    for await (const page of client.listDeletedKeys().byPage()) {
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
