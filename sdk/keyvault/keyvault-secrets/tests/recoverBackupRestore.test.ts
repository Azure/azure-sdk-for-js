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

  it("can recover a deleted secret", async () => {
    const keyName = getUniqueName("key");
    after(deleteSecretAfter(keyName));
    await client.setSecret(keyName, "RSA");
    await client.deleteSecret(keyName);
    await delay(15000);
    const getDeletedResult = await client.getDeletedSecret(keyName);
    assert.equal(getDeletedResult.name, keyName, "Unexpected key name in result from getSecret().");
    await client.recoverDeletedSecret(keyName);
    await delay(15000);
    const getResult = await client.getSecret(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getSecret().");
  });

  it("can recover a deleted secret (non existing)", async () => {
    const keyName = getUniqueName("key");
    let error;
    try {
      await client.recoverDeletedSecret(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Secret not found: ${keyName}`);
  });

  it("can backup a secret", async () => {
    const keyName = getUniqueName("key");
    after(deleteSecretAfter(keyName));
    await client.setSecret(keyName, "RSA");
    const result = await client.backupSecret(keyName);
    assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupSecret()");
    assert.equal(result.length, 4728, "Unexpected length of buffer from backupSecret()");
  });

  it("can backup a secret (non existing)", async () => {
    const keyName = getUniqueName("key");
    let error;
    try {
      await client.backupSecret(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Secret not found: ${keyName}`);
  });

  it("can restore a secret", async () => {
    const keyName = getUniqueName("key");
    after(deleteSecretAfter(keyName));
    await client.setSecret(keyName, "RSA");
    const backup = await client.backupSecret(keyName);
    await client.deleteSecret(keyName);
    await delay(15000);
    await client.purgeDeletedSecret(keyName);
    await delay(15000);
    await client.restoreSecret(backup);
    await delay(15000);
    const getResult = await client.getSecret(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getSecret().");
  });

  it("can restore a secret (Malformed Backup Bytes)", async () => {
    const backup = new Buffer(4728);
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
