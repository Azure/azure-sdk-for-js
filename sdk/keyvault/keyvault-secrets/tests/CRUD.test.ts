// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { SecretsClient } from "../src";
import {
  record,
  setReplaceableVariables,
  retry,
  setReplacements,
  env,
  uniqueString
} from "./utils/recorder";
import { EnvironmentCredential } from "@azure/identity";
import TestClient from "./utils/testClient";

describe("Secret client - create, read, update and delete operations", () => {
  const secretValue = "SECRET_VALUE";
  let client: SecretsClient;
  let testClient: TestClient;
  let recorder: any;

  const secretPrefix = `CRUD${env.SECRET_NAME || "SecretName"}`;
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

  it("can add a secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const result = await client.setSecret(secretName, secretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await testClient.flushSecret(secretName);
  });

  it("cannot create a secret with an empty name", async function() {
    const secretName = "";
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

  it("can set a secret with Empty Value", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const secretValue = "";
    const result = await client.setSecret(secretName, secretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await testClient.flushSecret(secretName);
  });

  it("cannot create a secret with a null name", async function() {
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

  it("can set a secret with attributes", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);
    await client.setSecret(secretName, secretValue, { expires: expiryDate });
    const updated = await client.getSecret(secretName);
    assert.equal(
      expiryDate.getDate(),
      updated.expires.getDate(),
      "Expect attribute 'expires' to be defined."
    );
    await testClient.flushSecret(secretName);
  });

  it("can update a secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue);
    await client.updateSecretAttributes(secretName, "", {
      expires: expiryDate
    });

    const updated = await client.getSecret(secretName);
    assert.equal(
      updated.expires.getDate(),
      expiryDate.getDate(),
      "Expect attribute 'expires' to be updated."
    );
    await testClient.flushSecret(secretName);
  });

  it("can update a disabled Secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue, {
      enabled: false
    });
    const updated = await client.updateSecretAttributes(secretName, "", {
      expires: expiryDate
    });
    assert.equal(
      updated.expires.getDate(),
      expiryDate.getDate(),
      "Expect attribute 'expires' to be updated."
    );
    await testClient.flushSecret(secretName);
  });

  it("can get a secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    await client.setSecret(secretName, secretValue);
    const result = await client.getSecret(secretName);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await testClient.flushSecret(secretName);
  });

  it("can't get a disabled Secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

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
    await testClient.flushSecret(secretName);
  });

  it("can retrieve the latest version of a secret value", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    await client.setSecret(secretName, secretValue);

    const result = await client.getSecret(secretName);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await testClient.flushSecret(secretName);
  });

  it("can get a secret (Non Existing)", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
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

  it("can delete a secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    await client.setSecret(secretName, secretValue);
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
    await testClient.purgeSecret(secretName);
  });

  it("can delete a secret (Non Existing)", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
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

  it("can get a deleted secret", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
    await client.setSecret(secretName, "RSA");
    await client.deleteSecret(secretName);
    const getResult = await retry(async () => client.getDeletedSecret(secretName));
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await testClient.purgeSecret(secretName);
  });

  it("can get a deleted secret (Non Existing)", async function() {
    const secretName = testClient.formatName(`${secretPrefix}-${this.test.title}-${secretSuffix}`);
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
