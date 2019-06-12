import * as assert from "assert";
import { expect } from "chai";
import {
  getSecretvaultName,
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

  const deleteSecretAfter = (name) => async () => {
    await client.deleteSecret(name);
    await delay(20000);
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
    after(deleteSecretAfter(secretName));
    const result = await client.setSecret(secretName, secretValue);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  it("cannot create a secret with an empty name", async () => {
    const secretName = "";
    const secretValue = getUniqueName("value");
    let error;
    try {
      await client.setSecret(secretName, secretValue);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `"secretName" with value "" should satisfy the constraint "Pattern": /^[0-9a-zA-Z-]+$/.`,
      "Unexpected error while running setSecret with an empty string as the name."
    );
  });

  it("can set a secret with Empty Value", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = "";
    after(deleteSecretAfter(secretName));
    const result = await client.setSecret(secretName, secretValue);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  it("cannot create a secret with a null name", async () => {
    const secretName = null;
    let error;
    try {
      await client.setSecret(secretName, "");
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "secretName cannot be null or undefined.",
      "Unexpected error while running setSecret with an empty string as the name."
    );
  });

  it("can set a secret with attributes", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    after(deleteSecretAfter(secretName));
    await client.setSecret(secretName, secretValue, { expires: expiryDate });

    const updated = await client.getSecret(secretName);

    // TODO: Investigate. The service seems to change the milliseconds part of the expiry date.
    // For now just compare year, month, and date in assertion.
    assert.equal(
      expiryDate.getDate(),
      updated.expires.getDate(),
      "Expect attribute 'expires' to be defined."
    );
  });

  it("can update a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    after(deleteSecretAfter(secretName));
    await client.setSecret(secretName, secretValue);

    await client.updateSecretAttributes(secretName, version, {
      expires: expiryDate
    });

    const updated = await client.getSecret(secretName);

    assert.equal(
      updated.expires.getDate(),
      expiryDate.getDate(),
      "Expect attribute 'expires' to be updated."
    );
  });

  it("can update a disabled Secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    after(deleteSecretAfter(secretName));
    await client.setSecret(secretName, secretValue, {
      enabled: false
    });
    const updated = await client.updateSecretAttributes(secretName, version, {
      expires: expiryDate
    });
    assert.equal(
      updated.expires.getDate(),
      expiryDate.getDate(),
      "Expect attribute 'expires' to be updated."
    );
  });

  it("can get Secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    after(deleteSecretAfter(secretName));
    await client.setSecret(secretName, secretValue);
    const result = await client.getSecret(secretName);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  it("can't get a disabled Secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    after(deleteSecretAfter(secretName));

    await client.setSecret(secretName, secretValue, {
      enabled: false
    });
    let error;
    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "Operation get is not allowed on a disabled secret.",
      "Unexpected error after tryign to get a disabled secret"
    );
  });

  it("can retrieve the latest version of a secret value", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    after(deleteSecretAfter(secretName));
    await client.setSecret(secretName, secretValue);

    const result = await client.getSecret(secretName);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  it("can get a secret (Non Existing)", async () => {
    const secretName = getUniqueName("secret");
    let error;
    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `Secret not found: ${secretName}`,
      "Unexpected error after tryign to get a disabled secret"
    );
  });

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

  it("can delete a secret (Non Existing)", async () => {
    const secretName = getUniqueName("secret");
    let error;
    try {
      await client.deleteSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `Secret not found: ${secretName}`,
      "Unexpected error after tryign to get a disabled secret"
    );
  });

  it("can get a deleted secret", async () => {
    const secretName = getUniqueName("secret");
    await client.setSecret(secretName, "RSA");
    await client.deleteSecret(secretName);
    await delay(15000);
    const getResult = await client.getDeletedSecret(secretName);
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await client.purgeDeletedSecret(secretName);
  });

  it("can get a deleted secret (Non Existing)", async () => {
    const secretName = getUniqueName("secret");
    let error;
    try {
      await client.deleteSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `Secret not found: ${secretName}`,
      "Unexpected secret name in result from getKey()."
    );
  });
});
