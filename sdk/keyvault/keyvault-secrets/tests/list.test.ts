import * as assert from "assert";
import { expect } from "chai";
import { getKeyvaultName, getUniqueName } from "./utils/utils.common";
import { SecretsClient } from "../src";
import { delay } from "@azure/core-http";
import { EnvironmentCredential } from "@azure/identity";

describe("Secret client - list operations", () => {
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";

  let client: SecretsClient;
  let version: string;

  const deleteSecretAfter = (name) => async () => {
    await client.deleteSecret(name);
    await delay(30000);
    await client.purgeDeletedSecret(name).catch();
  };

  before(async () => {
    const url = `https://${vaultName}.vault.azure.net`;
    const credential = new EnvironmentCredential();
    client = new SecretsClient(url, credential);
    version = "";
  });

  it("can list secrets", async () => {
    const secretNames = [getUniqueName("secrets"), getUniqueName("secrets")];

    after(async () => {
      for (let name of secretNames) {
        await client.deleteSecret(name);
        await delay(20000);
        await client.purgeDeletedSecret(name);
      }
    });

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
  });

  it("can list deleted secrets", async () => {
    const secretNames = [getUniqueName("secrets"), getUniqueName("secrets")];

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
  });

  it("can retrieve all versions of a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue1 = getUniqueName("value");
    const secretValue2 = getUniqueName("value");
    const secretValue3 = getUniqueName("value");
    after(async () => {
      await client.deleteSecret(secretName);
    });
    const secretValues = [secretValue1, secretValue2, secretValue3];
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
  });

  it("can list secret versions (non existing)", async () => {
    const secretName = getUniqueName("secret");
    let totalVersions = 0;

    for await (let version of client.listSecretVersions(secretName)) {
      totalVersions += 1;
    }

    assert.equal(totalVersions, 0, `Unexpected total versions for secret ${secretName}`);
  });

  it("can list secrets", async () => {
    const secretNames = [getUniqueName("secrets"), getUniqueName("secrets")];

    after(async () => {
      for (let name of secretNames) {
        await client.deleteSecret(name);
        await delay(20000);
        await client.purgeDeletedSecret(name);
      }
    });

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
  });

  it("can list deleted secrets", async () => {
    const secretNames = [getUniqueName("secrets"), getUniqueName("secrets")];

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
  });

  it("can retrieve all versions of a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue1 = getUniqueName("value");
    const secretValue2 = getUniqueName("value");
    const secretValue3 = getUniqueName("value");
    after(async () => {
      await client.deleteSecret(secretName);
    });
    const secretValues = [secretValue1, secretValue2, secretValue3];
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
  });

  it("can list secret versions (non existing)", async () => {
    const secretName = getUniqueName("secret");
    let totalVersions = 0;

    for await (const page of client.listSecretVersions(secretName).byPage()) {
      for (const secret of page) {
        totalVersions += 1;
      }
    }

    assert.equal(totalVersions, 0, `Unexpected total versions for secret ${secretName}`);
  });
});
