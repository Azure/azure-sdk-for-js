// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { KeysClient } from "../src";
import { retry, env } from "./utils/recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";

describe("Keys client - list keys in various ways", () => {
  const keyPrefix = `recover${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeysClient;
  let testClient: TestClient;
  let recorder: any;

  before(async function() {
    const authentication = await authenticate(this);
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  after(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can get the versions of a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (const version of client.listKeyVersions(keyName)) {
      assert.equal(version.name, keyName, "Unexpected key name in result from listKeyVersions().");
      totalVersions += 1;
    }
    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
    await testClient.flushKey(keyName);
  });

  it("can get the versions of a key (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (const page of client.listKeyVersions(keyName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.name,
          keyName,
          "Unexpected key name in result from listKeyVersions()."
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
    for await (const version of client.listKeyVersions(keyName)) {
      assert.equal(version.name, keyName, "Unexpected key name in result from listKeyVersions().");
      totalVersions += 1;
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("list 0 versions of a non-existing key (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    let totalVersions = 0;
    for await (const page of client.listKeyVersions(keyName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.name,
          keyName,
          "Unexpected key name in result from listKeyVersions()."
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
    for await (const key of client.listKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by getKeys.");

    for (const name of keyNames) {
      await testClient.flushKey(name);
    }
  });

  it("can get several inserted keys (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const page of client.listKeys().byPage()) {
      for (const key of page) {
        // The vault might contain more keys than the ones we inserted.
        if (!keyNames.includes(key.name)) continue;
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
      await client.deleteKey(name);
    }

    // Waiting until the keys are deleted
    for (const name of keyNames) {
      await retry(async () => client.getDeletedKey(name));
    }

    let found = 0;
    for await (const key of client.listDeletedKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by listDeletedKeys.");

    for (const name of keyNames) {
      await testClient.purgeKey(name);
    }
  });

  it("list deleted keys (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (const name of keyNames) {
      await client.deleteKey(name);
    }

    // Waiting until the keys are deleted
    for (const name of keyNames) {
      await retry(async () => client.getDeletedKey(name));
    }

    let found = 0;
    for await (const page of client.listDeletedKeys().byPage()) {
      for (const key of page) {
        // The vault might contain more keys than the ones we inserted.
        if (!keyNames.includes(key.name)) continue;
        found += 1;
      }
    }

    assert.equal(found, 2, "Unexpected number of keys found by listDeletedKeys.");

    for (const name of keyNames) {
      await testClient.purgeKey(name);
    }
  });
});
