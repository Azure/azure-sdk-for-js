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

describe("Secret client - recover, backup and restore operations", () => {
  const clientId = process.env["AAD_CLIENT_ID"] || "";
  const clientSecret = process.env["AAD_CLIENT_SECRET"] || "";
  const tenantId = process.env["AAD_TENANT_ID"] || "";
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

  it("can recover a deleted secret", async () => {
    const secretName = getUniqueName("secret");
    after(deleteSecretAfter(secretName));
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
  });

  it("can recover a deleted secret (non existing)", async () => {
    const secretName = getUniqueName("secret");
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
    const secretName = getUniqueName("secret");
    after(deleteSecretAfter(secretName));
    await client.setSecret(secretName, "RSA");
    const result = await client.backupSecret(secretName);
    assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupSecret()");
    assert.ok(result.length > 4700, "Unexpected length of buffer from backupSecret()");
  });

  it("can backup a secret (non existing)", async () => {
    const secretName = getUniqueName("secret");
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
    const secretName = getUniqueName("secret");
    after(deleteSecretAfter(secretName));
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
