import * as assert from "assert";
import { SecretsClient } from "../src";
import { record, setReplaceableVariables, delay, setReplacements, env } from "./utils/recorder";
import { EnvironmentCredential } from "@azure/identity";

describe("Secret client - create, read, update and delete operations", () => {
  const secretValue = "SECRET_VALUE";
  const version = "";
  let client: SecretsClient;
  let recorder: any;

  // NOTES:
  // - To allow multiple integraton runs at the same time,
  //   we might need to factor in more environment variables.
  // - Another way to improve this is to add a specfic key per test.
  // - The environment variable is probably better named like PREFIX_KEY_NAME.
  const secretName = `CRUD${env.SECRET_NAME || "SecretName"}`;

  // NOTES:
  // - These functions are probably better moved to a common utility file.
  //   However, to do that we'll have to create a class or closure to maintain
  //   the instance of the KeyClient available.
  async function purgeSecret() {
    await client.purgeDeletedSecret(secretName);
    await delay(30000);
  }
  async function flushSecret() {
    await client.deleteSecret(secretName);
    await purgeSecret();
  }
  async function maybeFlushSecret() {
    try {
      await client.deleteSecret(secretName);
      await delay(30000);
    } catch (e) {
      // It will fail if the key doesn't exist. This expected.
    }
    try {
      await client.purgeDeletedSecret(secretName);
      await delay(30000);
    } catch (e) {
      // It will fail if the key doesn't exist. This expected.
    }
  }

  before(async function() {
    setReplaceableVariables({
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      KEYVAULT_NAME: "keyvault_name"
    });

    setReplacements([
      (recording) => recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
    ]);

    recorder = record(this);

    const vaultName = env.KEYVAULT_NAME;
    const url = `https://${vaultName}.vault.azure.net`;
    const credential = new EnvironmentCredential();
    client = new SecretsClient(url, credential);

    await maybeFlushSecret();

    recorder.stop();
  });

  beforeEach(async function() {
    recorder = record(this);
  });

  afterEach(async () => {
    recorder.stop();
  });

  // The tests follow

  it("can add a secret", async () => {
    const result = await client.setSecret(secretName, secretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await flushSecret();
  });

  it("cannot create a secret with an empty name", async () => {
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

  it("can set a secret with Empty Value", async () => {
    const secretValue = "";
    const result = await client.setSecret(secretName, secretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await flushSecret();
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
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);
    await client.setSecret(secretName, secretValue, { expires: expiryDate });
    const updated = await client.getSecret(secretName);
    assert.equal(
      expiryDate.getDate(),
      updated.expires.getDate(),
      "Expect attribute 'expires' to be defined."
    );
    await flushSecret();
  });

  it("can update a secret", async () => {
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

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
    await flushSecret();
  });

  it("can update a disabled Secret", async () => {
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

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
    await flushSecret();
  });

  it("can get a secret", async () => {
    await client.setSecret(secretName, secretValue);
    const result = await client.getSecret(secretName);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await flushSecret();
  });

  it("can't get a disabled Secret", async () => {
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
    await flushSecret();
  });

  it("can retrieve the latest version of a secret value", async () => {
    await client.setSecret(secretName, secretValue);

    const result = await client.getSecret(secretName);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await flushSecret();
  });

  it("can get a secret (Non Existing)", async () => {
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
    await purgeSecret();
  });

  it("can delete a secret (Non Existing)", async () => {
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
    await client.setSecret(secretName, "RSA");
    await client.deleteSecret(secretName);
    await delay(30000);
    const getResult = await client.getDeletedSecret(secretName);
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await purgeSecret();
  });

  it("can get a deleted secret (Non Existing)", async () => {
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
