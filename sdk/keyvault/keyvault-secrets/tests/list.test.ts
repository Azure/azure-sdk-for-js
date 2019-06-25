// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { expect } from "chai";
import { SecretsClient } from "../src";
import {
  record,
  setReplaceableVariables,
  retry,
  setReplacements,
  env,
  uniqueString
} from "./utils/recorder";
import { RetryOptions } from "./utils/retry";
import { EnvironmentCredential } from "@azure/identity";
import TestClient from "./utils/testClient";

describe("Secret client - list secrets in various ways", () => {
  const secretValue = "SECRET_VALUE";
  let client: SecretsClient;
  let testClient: TestClient;
  let recorder: any;

  const secretPrefix = `list${env.SECRET_NAME || "SecretName"}`;
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

  it("can list secrets", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (const name of secretNames) {
      await client.setSecret(name, "RSA");
    }

    let found = 0;
    for await (const secret of client.listSecrets()) {
      // The vault might contain more secrets than the ones we inserted.
      if (!secretNames.includes(secret.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of secrets found by getSecrets.");

    for (const name of secretNames) {
      await testClient.flushSecret(name);
    }
  });

  it("can list deleted secrets", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (const name of secretNames) {
      await client.setSecret(name, "RSA");
    }
    for (const name of secretNames) {
      await client.deleteSecret(name);
    }

    // Waiting until the key is deleted
    await retry(async () => client.getDeletedSecret(secretNames[0]), {} as RetryOptions);

    let found = 0;
    for await (const secret of client.listDeletedSecrets()) {
      // The vault might contain more secrets than the ones we inserted.
      if (!secretNames.includes(secret.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of secrets found by getDeletedSecrets.");

    for (const name of secretNames) {
      await testClient.purgeSecret(name);
    }
  });

  it("can retrieve all versions of a secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const secretValues = [`${secretValue}0`, `${secretValue}1`, `${secretValue}2`];
    interface VersionValuePair {
      version: string;
      value: string;
    }
    const versions: VersionValuePair[] = [];
    for (const v of secretValues) {
      const response = await client.setSecret(secretName, v);
      versions.push({ version: response.version!, value: response.value! });
    }

    const results: VersionValuePair[] = [];
    for await (const item of client.listSecretVersions(secretName)) {
      const version = item.version!;
      const secret = await client.getSecret(secretName, { version: version });
      results.push({ version: item.version!, value: secret.value! });
    }

    const comp = (a: VersionValuePair, b: VersionValuePair): number =>
      (a.version + a.value).localeCompare(b.version + b.value);
    results.sort(comp);
    versions.sort(comp);

    expect(results).to.deep.equal(versions);
    await testClient.flushSecret(secretName);
  });

  it("can list secret versions (non existing)", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    let totalVersions = 0;
    for await (const version of client.listSecretVersions(secretName)) {
      assert.equal(
        version.name,
        secretName,
        "Unexpected key name in result from listKeyVersions()."
      );
      totalVersions += 1;
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for secret ${secretName}`);
  });

  it("can list secrets", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (const name of secretNames) {
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
    for (const name of secretNames) {
      await testClient.flushSecret(name);
    }
  });

  it("can list deleted secrets", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (const name of secretNames) {
      await client.setSecret(name, "RSA");
    }
    for (const name of secretNames) {
      await client.deleteSecret(name);
    }

    // Waiting until the key is deleted
    await retry(async () => client.getDeletedSecret(secretNames[0]), {} as RetryOptions);

    let found = 0;
    for await (const page of client.listDeletedSecrets().byPage()) {
      for (const secret of page) {
        // The vault might contain more secrets than the ones we inserted.
        if (!secretNames.includes(secret.name)) continue;
        found += 1;
      }
    }
    assert.equal(found, 2, "Unexpected number of secrets found by getDeletedSecrets.");
    for (const name of secretNames) {
      await testClient.purgeSecret(name);
    }
  });

  it("can retrieve all versions of a secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const secretValues = [`${secretValue}0`, `${secretValue}1`, `${secretValue}2`];
    interface VersionValuePair {
      version: string;
      value: string;
    }
    const versions: VersionValuePair[] = [];
    for (const v of secretValues) {
      const response = await client.setSecret(secretName, v);
      versions.push({ version: response.version!, value: response.value! });
    }

    const results: VersionValuePair[] = [];
    for await (const page of client.listSecretVersions(secretName).byPage()) {
      for (const item of page) {
        const version = item.version!;
        const secret = await client.getSecret(secretName, { version });
        results.push({ version, value: secret.value! });
      }
    }

    const comp = (a: VersionValuePair, b: VersionValuePair): number =>
      (a.version + a.value).localeCompare(b.version + b.value);
    results.sort(comp);
    versions.sort(comp);

    expect(results).to.deep.equal(versions);
    await testClient.flushSecret(secretName);
  });

  it("can list secret versions (non existing)", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    let totalVersions = 0;
    for await (const page of client.listSecretVersions(secretName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.name,
          secretName,
          "Unexpected key name in result from listKeyVersions()."
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for secret ${secretName}`);
  });
});
