// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { expect } from "chai";
import { SecretsClient } from "../src";
import { record, setReplaceableVariables, delay, setReplacements, env } from "./utils/recorder";
import { EnvironmentCredential } from "@azure/identity";
import "./utils/utils.common"; // This loads the asyncIterator polyfill

describe("Secret client - list secrets in various ways", () => {
  const secretValue = "SECRET_VALUE";
  const version = "";
  let client: SecretsClient;
  let recorder: any;

  // NOTES:
  // - To allow multiple integraton runs at the same time,
  //   we might need to factor in more environment variables.
  // - Another way to improve this is to add a specfic key per test.
  // - The environment variable is probably better named like PREFIX_KEY_NAME.
  const secretName = `list${env.SECRET_NAME || "SecretName"}`;

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

  after(async () => {
    recorder.stop();
  });

  // The tests follow

  it("can list secrets", async () => {
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (let name of secretNames) {
      await client.setSecret(name, "RSA");
    }

    let found = 0;
    for await (const secret of client.listSecrets()) {
      // The vault might contain more secrets than the ones we inserted.
      if (!secretNames.includes(secret.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of secrets found by getSecrets.");

    for (let name of secretNames) {
      await client.deleteSecret(name);
      await delay(20000);
      await client.purgeDeletedSecret(name);
    }
    await delay(20000);
  });

  it("can list deleted secrets", async () => {
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (let name of secretNames) {
      await client.setSecret(name, "RSA");
    }
    for (let name of secretNames) {
      await client.deleteSecret(name);
    }

    await delay(20000);

    let found = 0;
    for await (const secret of client.listDeletedSecrets()) {
      // The vault might contain more secrets than the ones we inserted.
      if (!secretNames.includes(secret.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of secrets found by getDeletedSecrets.");

    for (let name of secretNames) {
      await client.purgeDeletedSecret(name);
    }
    await delay(20000);
  });

  it("can retrieve all versions of a secret", async () => {
    const secretValues = [`${secretValue}0`, `${secretValue}1`, `${secretValue}2`];
    interface versionValuePair {
      version: string;
      value: string;
    }
    let versions: versionValuePair[] = [];
    for (const v of secretValues) {
      const response = await client.setSecret(secretName, v);
      versions.push({ version: response.version!, value: response.value! });
    }

    let results: versionValuePair[] = [];
    for await (const item of client.listSecretVersions(secretName)) {
      const version = item.version!;
      const secret = await client.getSecret(secretName, { version: version });
      results.push({ version: item.version!, value: secret.value! });
    }

    const comp = (a: versionValuePair, b: versionValuePair) =>
      (a.version + a.value).localeCompare(b.version + b.value);
    results.sort(comp);
    versions.sort(comp);

    expect(results).to.deep.equal(versions);
    await flushSecret();
  });

  it("can list secret versions (non existing)", async () => {
    let totalVersions = 0;
    for await (let version of client.listSecretVersions(secretName)) {
      totalVersions += 1;
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for secret ${secretName}`);
  });

  it("can list secrets", async () => {
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (let name of secretNames) {
      await client.setSecret(name, "RSA");
    }
    let found = 0;
    for await (const page of client.listSecrets().byPage()) {
      for (const secret of page) {
        // The vault might contain more secrets than the ones we inserted.
        if (!secretNames.includes(secret.name)) continue;
        found += 1;
      }
    }
    assert.equal(found, 2, "Unexpected number of secrets found by getSecrets.");
    for (let name of secretNames) {
      await client.deleteSecret(name);
      await delay(20000);
      await client.purgeDeletedSecret(name);
    }
    await delay(20000);
  });

  it("can list deleted secrets", async () => {
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (let name of secretNames) {
      await client.setSecret(name, "RSA");
    }
    for (let name of secretNames) {
      await client.deleteSecret(name);
    }
    await delay(20000);
    let found = 0;
    for await (const page of client.listDeletedSecrets().byPage()) {
      for (const secret of page) {
        // The vault might contain more secrets than the ones we inserted.
        if (!secretNames.includes(secret.name)) continue;
        found += 1;
      }
    }
    assert.equal(found, 2, "Unexpected number of secrets found by getDeletedSecrets.");
    for (let name of secretNames) {
      await client.purgeDeletedSecret(name);
    }
    await delay(20000);
  });

  it("can retrieve all versions of a secret", async () => {
    const secretValues = [`${secretValue}0`, `${secretValue}1`, `${secretValue}2`];
    interface versionValuePair {
      version: string;
      value: string;
    }
    let versions: versionValuePair[] = [];
    for (const v of secretValues) {
      const response = await client.setSecret(secretName, v);
      versions.push({ version: response.version!, value: response.value! });
    }

    let results: versionValuePair[] = [];
    for await (const page of client.listSecretVersions(secretName).byPage()) {
      for (const item of page) {
        const version = item.version!;
        const secret = await client.getSecret(secretName, { version });
        results.push({ version, value: secret.value! });
      }
    }

    const comp = (a: versionValuePair, b: versionValuePair) =>
      (a.version + a.value).localeCompare(b.version + b.value);
    results.sort(comp);
    versions.sort(comp);

    expect(results).to.deep.equal(versions);
    await flushSecret();
  });

  it("can list secret versions (non existing)", async () => {
    let totalVersions = 0;
    for await (const page of client.listSecretVersions(secretName).byPage()) {
      for (const secret of page) {
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for secret ${secretName}`);
  });
});
