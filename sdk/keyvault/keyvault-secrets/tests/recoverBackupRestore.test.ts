// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { SecretsClient } from "../src";
import {
  record,
  setReplaceableVariables,
  retry,
  setReplacements,
  env,
  uniqueString
} from "./utils/recorder";
import { EnvironmentCredential } from "@azure/identity";
import TestClient from "./utils/testClient";

describe("Secret client - restore secrets and recover backups", () => {
  const secretValue = "SECRET_VALUE";
  let client: SecretsClient;
  let testClient: TestClient;
  let recorder: any;

  const secretPrefix = `recover${env.SECRET_NAME || "SecretName"}`;
  let secretSuffix: string;

  before(async function() {
    setReplaceableVariables({
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      KEYVAULT_NAME: "keyvault_name"
    });

    secretSuffix = uniqueString();
    setReplacements([
      (recording) => recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording) =>
        secretSuffix === "" ? recording : recording.replace(new RegExp(secretSuffix, "g"), "")
    ]);

    recorder = record(this); // eslint-disable-line no-invalid-this

    const vaultName = env.KEYVAULT_NAME;
    const url = `https://${vaultName}.vault.azure.net`;
    const credential = new EnvironmentCredential();
    client = new SecretsClient(url, credential);
    testClient = new TestClient(client);
  });

  after(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can recover a deleted secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
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
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
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
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    await client.setSecret(secretName, "RSA");
    const result = await client.backupSecret(secretName);
    assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupSecret()");
    assert.ok(
      result.length > 4500,
      `Unexpected length (${result.length}) of buffer from backupSecret()`
    );
    await testClient.flushSecret(secretName);
  });

  it("can backup a secret (non existing)", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
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
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    await client.setSecret(secretName, "RSA");
    const backup = await client.backupSecret(secretName);
    await testClient.flushSecret(secretName);
    await retry(async () => client.restoreSecret(backup));
    const getResult = await client.getSecret(secretName);
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await testClient.flushSecret(secretName);
  });

  it("can restore a secret (Malformed Backup Bytes)", async function() {
    const backup = Buffer.alloc(4728);
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
