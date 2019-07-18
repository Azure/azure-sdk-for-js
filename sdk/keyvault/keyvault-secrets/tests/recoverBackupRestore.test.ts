// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { SecretsClient } from "../src";
import { retry, isNode, env } from "./utils/recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
 
describe("Secret client - restore secrets and recover backups", () => {
  const secretPrefix = `CRUD${env.SECRET_NAME || "SecretName"}`;
  let secretSuffix: string;
  let client: SecretsClient;
  let testClient: TestClient;
  let recorder: any;

  before(async function() {
    const authentication = await authenticate(this);
    secretSuffix = authentication.secretSuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  after(async function() {
    recorder.stop();
  });
 
  // The tests follow

  it("can recover a deleted secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this!.test!.title}-${secretSuffix}`);
    await client.setSecret(secretName, "RSA");
    await client.deleteSecret(secretName);
    const getDeletedResult = await retry(async () => client.getDeletedSecret(secretName));
    assert.equal(
      getDeletedResult.name,
      secretName,
      "Unexpected secret name in result from getSecret()."
    );
    await client.recoverDeletedSecret(secretName);
    const getResult = await retry(async () => client.getSecret(secretName));
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await testClient.flushSecret(secretName);
  });

  it("can recover a deleted secret (non existing)", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this!.test!.title}-${secretSuffix}`);
    let error;
    try {
      await client.recoverDeletedSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Secret not found: ${secretName}`);
  });

  it("can backup a secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this!.test!.title}-${secretSuffix}`);
    await client.setSecret(secretName, "RSA");
    const result = await client.backupSecret(secretName);
    if (isNode) {
      assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupKey()");
    } else {
      assert.equal(result!.constructor, Uint8Array, "Unexpected return value from backupKey()");
    }
    assert.ok(
      result!.length > 4500,
      `Unexpected length (${result.length}) of buffer from backupSecret()`
    );
    await testClient.flushSecret(secretName);
  });

  it("can backup a secret (non existing)", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this!.test!.title}-${secretSuffix}`);
    let error;
    try {
      await client.backupSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Secret not found: ${secretName}`);
  });

  it("can restore a secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this!.test!.title}-${secretSuffix}`);
    await client.setSecret(secretName, "RSA");
    const backup = await client.backupSecret(secretName);
    await testClient.flushSecret(secretName);
    await retry(async () => client.restoreSecret(backup as Uint8Array));
    const getResult = await client.getSecret(secretName);
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await testClient.flushSecret(secretName);
  });

  it("can restore a secret (Malformed Backup Bytes)", async function() {
    const backup = new Uint8Array(4728);
    let error;
    try {
      await client.restoreSecret(backup);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "Backup blob contains invalid or corrupt version.",
      "Unexpected error from restoreSecret()"
    );
  });
});
