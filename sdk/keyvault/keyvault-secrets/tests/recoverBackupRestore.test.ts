// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { SecretsClient } from "../src";
import { record, setReplaceableVariables, delay, setReplacements, env } from "./utils/recorder";
import { EnvironmentCredential } from "@azure/identity";

describe("Secret client - restore secrets and recover backups", () => {
  const secretValue = "SECRET_VALUE";
  const version = "";
  let client: SecretsClient;
  let recorder: any;

  // NOTES:
  // - To allow multiple integraton runs at the same time,
  //   we might need to factor in more environment variables.
  // - Another way to improve this is to add a specfic key per test.
  // - The environment variable is probably better named like PREFIX_KEY_NAME.
  const secretName = `recover${env.SECRET_NAME || "SecretName"}`;

  // NOTES:
  // - These functions are probably better moved to a common utility file.
  //   However, to do that we'll have to create a class or closure to maintain
  //   the instance of the KeyClient available.
  async function purgeSecret() {
    await client.purgeDeletedSecret(secretName);
    await delay(30000);
  }
  async function flushSecret() {
    await client.deleteSecret(secretName);
    await delay(30000);
    await purgeSecret();
  }
  async function maybeFlushSecret() {
    try {
      await client.deleteSecret(secretName);
      await delay(30000);
    } catch (e) {
      // It will fail if the key doesn't exist. This expected.
    }
    try {
      await client.purgeDeletedSecret(secretName);
      await delay(30000);
    } catch (e) {
      // It will fail if the key doesn't exist. This expected.
    }
  }

  before(async function() {
    setReplaceableVariables({
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      KEYVAULT_NAME: "keyvault_name"
    });

    setReplacements([
      (recording) => recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
    ]);

    recorder = record(this);

    const vaultName = env.KEYVAULT_NAME;
    const url = `https://${vaultName}.vault.azure.net`;
    const credential = new EnvironmentCredential();
    client = new SecretsClient(url, credential);

    await maybeFlushSecret();
  });

  after(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can recover a deleted secret", async () => {
    await client.setSecret(secretName, "RSA");
    await client.deleteSecret(secretName);
    await delay(20000);
    const getDeletedResult = await client.getDeletedSecret(secretName);
    assert.equal(
      getDeletedResult.name,
      secretName,
      "Unexpected secret name in result from getSecret()."
    );
    await client.recoverDeletedSecret(secretName);
    await delay(20000);
    const getResult = await client.getSecret(secretName);
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await flushSecret();
  });

  it("can recover a deleted secret (non existing)", async () => {
    let error;
    try {
      await client.recoverDeletedSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Secret not found: ${secretName}`);
  });

  it("can backup a secret", async () => {
    await client.setSecret(secretName, "RSA");
    const result = await client.backupSecret(secretName);
    assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupSecret()");
    assert.ok(
      result.length > 4500,
      `Unexpected length (${result.length}) of buffer from backupSecret()`
    );
    await flushSecret();
  });

  it("can backup a secret (non existing)", async () => {
    let error;
    try {
      await client.backupSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Secret not found: ${secretName}`);
  });

  it("can restore a secret", async () => {
    await client.setSecret(secretName, "RSA");
    const backup = await client.backupSecret(secretName);
    await client.deleteSecret(secretName);
    await delay(20000);
    await client.purgeDeletedSecret(secretName);
    await delay(20000);
    await client.restoreSecret(backup);
    await delay(20000);
    const getResult = await client.getSecret(secretName);
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await flushSecret();
  });

  it("can restore a secret (Malformed Backup Bytes)", async () => {
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
