import * as assert from "assert";
import chai from "chai"
const expect = chai.expect;
import { getKeyvaultName, getCredentialWithServicePrincipalSecret, getUniqueName } from "./utils/utils.common";
import { SecretsClient, EntityVersion } from "../src";
import { ServiceClientCredentials, RestError } from "@azure/ms-rest-js";

describe("Secret client", () => {
  let credential: ServiceClientCredentials;
  let keyVaultName: string;
  let keyVaultUrl: string;
  let client: SecretsClient;

  before(async () => {
    credential = await getCredentialWithServicePrincipalSecret()
    keyVaultName = getKeyvaultName();
    keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    client = new SecretsClient(keyVaultUrl, credential);
  });

  it("can add a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    after(async () => {
      await client.deleteSecret(secretName);
    });

    const result = await client.addSecret(secretName, secretValue);

    assert.equal(result.name, secretName, "Unexpected secret name in result from addSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from addSecret().");
  });

  it("can retrieve the latest version of a secret value", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    after(async () => {
      await client.deleteSecret(secretName);
    });
    await client.addSecret(secretName, secretValue);

    const result = await client.getSecret(secretName);

    assert.equal(result.name, secretName, "Unexpected secret name in result from addSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from addSecret().");
  });

  it("can update a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    after(async () => {
      await client.deleteSecret(secretName);
    });
    await client.addSecret(secretName, secretValue);

    let version = "" as EntityVersion;

    await client.updateSecretAttributes(secretName, version, {
      secretAttributes: {
        expires: expiryDate
      }
    });

    const updated = await client.getSecret(secretName);

    // TODO: Investigate. The service seems to change the milliseconds part of the expiry date.
    // For now just compare year, month, and date in assertion.
    assert.ok(
      updated.attributes!.expires!.getUTCFullYear() === expiryDate.getUTCFullYear()
      && updated.attributes!.expires!.getUTCMonth() === expiryDate.getUTCMonth()
      && updated.attributes!.expires!.getUTCDate() === expiryDate.getUTCDate(),
      "Expect attribute 'expires' to be updated.");
  });

  it("can delete a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue1 = getUniqueName("value");
    await client.addSecret(secretName, secretValue1);

    await client.deleteSecret(secretName);

    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.")
    } catch (e) {
      if (e instanceof RestError) {
        assert.equal(e.message, `Secret not found: ${secretName}`);
      } else {
        throw e;
      }
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
    interface versionValuePair { version: string, value: string }
    let versions: versionValuePair[] = [];
    for (const v of secretValues) {
      const response = await client.addSecret(secretName, v);
      versions.push({ version: response.version!, value: response.value! });
    }

    let results: versionValuePair[] = [];
    for await (const item of client.getSecretVersions(secretName)) {
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

});