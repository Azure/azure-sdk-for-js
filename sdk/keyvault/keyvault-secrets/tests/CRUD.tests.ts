import * as assert from "assert";
import { expect } from "chai";
import {
  getKeyvaultName,
  getCredentialWithServicePrincipalSecret,
  getUniqueName
} from "./utils/utils.common";
import { SecretsClient } from "../src";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { delay } from "@azure/ms-rest-js";

describe("Secret client - create, read, update and delete operations", () => {
  const clientId = process.env["AAD_CLIENT_ID"] || "";
  const clientSecret = process.env["AAD_CLIENT_SECRET"] || "";
  const tenantId = process.env["AAD_TENANT_ID"] || "";
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";

  let client: SecretsClient;
  let version: string;

  const deleteKeyAfter = (name) => async () => {
    await client.deleteSecret(name);
    await delay(10000);
    await client.purgeDeletedSecret(name);
  };

  before(async () => {
    const url = `https://${vaultName}.vault.azure.net`;

    const credential = await msRestNodeAuth.loginWithServicePrincipalSecret(
      clientId,
      clientSecret,
      tenantId,
      {
        tokenAudience: "https://vault.azure.net"
      }
    );

    client = new SecretsClient(url, credential);
    version = "";
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

  it("can set Secret with Empty Name");
  it("can set Secret with Empty Value");
  it("can set Secret Null case");

  it("can set a secret with attributes", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    after(async () => {
      await client.deleteSecret(secretName);
    });
    await client.setSecret(secretName, secretValue, { expires: expiryDate });

    const updated = await client.getSecret(secretName);

    // TODO: Investigate. The service seems to change the milliseconds part of the expiry date.
    // For now just compare year, month, and date in assertion.
    assert.ok(
      updated.expires!.getUTCFullYear() === expiryDate.getUTCFullYear() &&
        updated.expires!.getUTCMonth() === expiryDate.getUTCMonth() &&
        updated.expires!.getUTCDate() === expiryDate.getUTCDate(),
      "Expect attribute 'expires' to be updated."
    );
  });

  it("can update a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    after(async () => {
      await client.deleteSecret(secretName);
    });
    await client.setSecret(secretName, secretValue);

    await client.updateSecretAttributes(secretName, version, {
      expires: expiryDate
    });

    const updated = await client.getSecret(secretName);

    // TODO: Investigate. The service seems to change the milliseconds part of the expiry date.
    // For now just compare year, month, and date in assertion.
    assert.ok(
      updated.expires!.getUTCFullYear() === expiryDate.getUTCFullYear() &&
        updated.expires!.getUTCMonth() === expiryDate.getUTCMonth() &&
        updated.expires!.getUTCDate() === expiryDate.getUTCDate(),
      "Expect attribute 'expires' to be updated."
    );
  });

  it("can update Disabled Secret");
  it("can get Secret");

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

  it("can get Secret (Non Existing)");

  it("can delete a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue1 = getUniqueName("value");
    await client.setSecret(secretName, secretValue1);

    await client.deleteSecret(secretName);

    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e.statusCode === 404) {
        assert.equal(e.message, `Secret not found: ${secretName}`);
      } else {
        throw e;
      }
    }
  });

  it("can delete Secret (Non Existing)");
  it("can get Deleted Secret");
  it("can get Deleted Secret (Non Existing)");
});
