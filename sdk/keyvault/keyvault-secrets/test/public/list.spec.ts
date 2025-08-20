// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isLiveMode, isRecordMode } from "@azure-tools/test-recorder";

import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { SecretClient } from "@azure/keyvault-secrets";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import type TestClient from "./utils/testClient.js";

describe("Secret client - list secrets in various ways", () => {
  const secretValue = "SECRET_VALUE";
  const secretPrefix = `list${env.SECRET_NAME || "SecretName"}`;
  let secretSuffix: string;
  let client: SecretClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    secretSuffix = authentication.secretSuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  // Use this while recording to make sure the target keyvault is clean.
  // The next tests will produce a more consistent output.
  // This test is only useful while developing locally.
  // WARNING: When TEST_MODE equals "record", all of the secrets in the indicated KEYVAULT_URI will be deleted as part of this test.
  it.skipIf(!isRecordMode())("can purge all secrets", async function () {
    for await (const secretProperties of client.listPropertiesOfSecrets()) {
      try {
        await testClient.flushSecret(secretProperties.name);
      } catch {
        // Nothing to do here.
      }
    }
    for await (const deletedSecret of client.listDeletedSecrets()) {
      try {
        await testClient.purgeSecret(deletedSecret.name);
      } catch {
        // Nothing to do here.
      }
    }
  });

  it("can list secret properties", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (const name of secretNames) {
      await client.setSecret(name, "RSA");
    }

    let found = 0;
    for await (const secretProperties of client.listPropertiesOfSecrets()) {
      // The vault might contain more secrets than the ones we inserted.
      if (!secretNames.includes(secretProperties.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of secrets found by getSecrets.");
  });

  it("can list deleted secrets", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (const name of secretNames) {
      await client.setSecret(name, "RSA");
    }
    for (const name of secretNames) {
      const deletePoller = await client.beginDeleteSecret(name, testPollerProperties);
      await deletePoller.pollUntilDone();
    }

    let found = 0;
    for await (const secret of client.listDeletedSecrets()) {
      // The vault might contain more secrets than the ones we inserted.
      if (!secretNames.includes(secret.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of secrets found by getDeletedSecrets.");
  });

  it.skipIf(!isLiveMode())("can retrieve all versions of a secret", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const secretValues = [`${secretValue}0`, `${secretValue}1`, `${secretValue}2`];
    interface VersionValuePair {
      version: string;
      value: string;
    }
    const versions: VersionValuePair[] = [];
    for (const v of secretValues) {
      const response = await client.setSecret(secretName, v);
      versions.push({ version: response.properties.version!, value: response.value! });
    }

    const results: VersionValuePair[] = [];
    for await (const secretProperties of client.listPropertiesOfSecretVersions(secretName)) {
      const version = secretProperties.version!;
      const secret = await client.getSecret(secretName, { version: version });
      results.push({ version: secretProperties.version!, value: secret.value! });
    }

    const comp = (a: VersionValuePair, b: VersionValuePair): number =>
      (a.version + a.value).localeCompare(b.version + b.value);
    results.sort(comp);
    versions.sort(comp);

    assert.deepEqual(results, versions);
  });

  it("can list secret versions (non existing)", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    let totalVersions = 0;
    for await (const secretProperties of client.listPropertiesOfSecretVersions(secretName)) {
      assert.equal(
        secretProperties.name,
        secretName,
        "Unexpected key name in result from listKeyVersions().",
      );
      totalVersions += 1;
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for secret ${secretName}`);
  });

  it("can list secrets by page", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (const name of secretNames) {
      await client.setSecret(name, "RSA");
    }
    let found = 0;
    for await (const page of client.listPropertiesOfSecrets().byPage({ maxPageSize: 1 })) {
      assert.isAtMost(page.length, 1);
      for (const secretProperties of page) {
        // The vault might contain more secrets than the ones we inserted.
        if (!secretNames.includes(secretProperties.name)) continue;
        found += 1;
      }
    }
    assert.equal(found, 2, "Unexpected number of secrets found by getSecrets.");
  });

  it("can list deleted secrets by page", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (const name of secretNames) {
      await client.setSecret(name, "RSA");
    }
    for (const name of secretNames) {
      const deletePoller = await client.beginDeleteSecret(name, testPollerProperties);
      await deletePoller.pollUntilDone();
    }

    let found = 0;
    for await (const page of client.listDeletedSecrets().byPage({ maxPageSize: 1 })) {
      assert.isAtMost(page.length, 1);
      for (const secret of page) {
        // The vault might contain more secrets than the ones we inserted.
        if (!secretNames.includes(secret.name)) continue;
        found += 1;
      }
    }
    assert.equal(found, 2, "Unexpected number of secrets found by getDeletedSecrets.");
  });

  it("can retrieve all versions of a secret by page", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const secretValues = [`${secretValue}0`, `${secretValue}1`, `${secretValue}2`];
    interface VersionValuePair {
      version: string;
      value: string;
    }
    const versions: VersionValuePair[] = [];
    for (const v of secretValues) {
      const response = await client.setSecret(secretName, v);
      versions.push({ version: response.properties.version!, value: response.value! });
    }

    const results: VersionValuePair[] = [];
    for await (const page of client
      .listPropertiesOfSecretVersions(secretName)
      .byPage({ maxPageSize: 1 })) {
      assert.isAtMost(page.length, 1);
      for (const secretProperties of page) {
        const version = secretProperties.version!;
        const secret = await client.getSecret(secretName, { version });
        results.push({ version, value: secret.value! });
      }
    }

    const comp = (a: VersionValuePair, b: VersionValuePair): number =>
      (a.version + a.value).localeCompare(b.version + b.value);
    results.sort(comp);
    versions.sort(comp);

    assert.deepEqual(results, versions);
  });

  it("can list secret versions by page (non existing)", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    let totalVersions = 0;
    for await (const page of client
      .listPropertiesOfSecretVersions(secretName)
      .byPage({ maxPageSize: 1 })) {
      assert.isAtMost(page.length, 1);
      for (const secretProperties of page) {
        assert.equal(
          secretProperties.name,
          secretName,
          "Unexpected key name in result from listKeyVersions().",
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for secret ${secretName}`);
  });
});
