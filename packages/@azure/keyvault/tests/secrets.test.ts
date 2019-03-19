import * as assert from "assert";
import { getKeyvaultName, getCredentialWithServicePrincipalSecret, getUniqueName } from "./utils/utils.common";
import { SecretsClient, Pipeline } from "../lib/secretsClient";
import { signingPolicy, exponentialRetryPolicy, deserializationPolicy, ServiceClientCredentials, RestError } from '@azure/ms-rest-js';

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

    const result = await client.setSecret(secretName, secretValue);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  it("can retrieve the latest version of a secret value", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    after(async () => {
      await client.deleteSecret(secretName);
    });
    await client.setSecret(secretName, secretValue);

    const result = await client.getSecret(secretName);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  it("can update a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    await client.setSecret(secretName, secretValue);

    await client.updateSecret(secretName, "", {
      secretAttributes: {
        expires: expiryDate
      }
    });

    const updated = await client.getSecret(secretName);

    // The service seems to update the milliseconds part of the expiry date so just
    // compare year, month, and date in assertion.
    assert.ok(
      updated.attributes!.expires!.getUTCFullYear() === expiryDate.getUTCFullYear()
      && updated.attributes!.expires!.getUTCMonth() === expiryDate.getUTCMonth()
      && updated.attributes!.expires!.getUTCDate() === expiryDate.getUTCDate(),
      "Expect attribute 'expires' to be updated.");
  });

  it("can delete a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue1 = getUniqueName("value");
    await client.setSecret(secretName, secretValue1);

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

});