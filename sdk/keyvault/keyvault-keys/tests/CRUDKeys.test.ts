import * as assert from "assert";
import { expect } from "chai";
import {
  getKeyvaultName,
  getCredentialWithServicePrincipalSecret,
  getUniqueName
} from "./utils/utils.common";
import { KeysClient, CreateEcKeyOptions, UpdateKeyOptions, GetKeyOptions } from "../src";
import { ServiceClientCredentials, RestError, delay } from "@azure/ms-rest-js";

describe("Keys client - create, read, update and delete operations", () => {
  let credential: ServiceClientCredentials;
  let keyVaultName: string;
  let keyVaultUrl: string;
  let client: KeysClient;
  let version: string;

  const deleteKeyAfter = (name) => async () => {
    await client.deleteKey(name);
    await delay(10000);
    await client.purgeDeletedKey(name);
  };

  before(async () => {
    credential = await getCredentialWithServicePrincipalSecret();
    keyVaultName = getKeyvaultName();
    keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    client = new KeysClient(keyVaultUrl, credential);
    version = "";
  });

  it("can create a key while giving a manual type", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    const result = await client.createKey(keyName, "RSA");
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
  });

  it("cannot create a key with an empty name", async () => {
    const keyName = "";
    let error;
    try {
      await client.createKey(keyName, "RSA");
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `"keyName" with value "" should satisfy the constraint "Pattern": /^[0-9a-zA-Z-]+$/.`,
      "Unexpected error while running createKey with an empty string as the name."
    );
  });

  it("cannot create a key with a null name", async () => {
    const keyName = null;
    let error;
    try {
      await client.createKey(keyName, "RSA");
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "keyName cannot be null or undefined.",
      "Unexpected error while running createKey with an empty string as the name."
    );
  });

  it("can create a RSA key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    const result = await client.createRsaKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
  });

  it("can create a RSA key with size", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    let options = {
      keySize: 2048
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
  });

  it("can create an EC key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    const result = await client.createEcKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
  });

  it("can create an EC key with curve", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    let options: CreateEcKeyOptions = {
      curve: "P-256"
    };
    const result = await client.createEcKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
  });

  it("can create a disabled key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    let options = {
      enabled: false
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.enabled, false, "Unexpected enabled value from createKey().");
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
  });

  it("can create a key with notBefore", async () => {
    const keyName = getUniqueName("key");
    after((name) => async () => {
      await client.deleteKey(name);
      try {
        await client.purgeDeletedKey(name);
        throw Error("Expecting an error but not catching one.");
      } catch (e) {
        // This test consistently says that it's being deleted once we try to purge it
        // console.error(e);
      }
    });

    let currentDate = new Date();
    let notBefore = new Date(currentDate.getTime() + 5000); // 5 seconds later
    notBefore.setMilliseconds(0);

    let options = { notBefore };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result.notBefore.getTime(),
      notBefore.getTime(),
      "Unexpected notBefore value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
  });

  it("can create a key with expires", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));

    let currentDate = new Date();
    let expires = new Date(currentDate.getTime() + 5000); // 5 seconds later
    expires.setMilliseconds(0);

    let options = { expires };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result.expires.getTime(),
      expires.getTime(),
      "Unexpected expires value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
  });

  it("can update key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    const { version } = await client.createRsaKey(keyName);
    let options: UpdateKeyOptions = { enabled: false };
    const result = await client.updateKey(keyName, version, options);
    assert.equal(result.enabled, false, "Unexpected enabled value from updateKey().");
  });

  it("can update a disabled key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    const createOptions = {
      enabled: false
    };
    const { version } = await client.createRsaKey(keyName, createOptions);
    const expires = new Date();
    expires.setMilliseconds(0);
    const updateOptions: UpdateKeyOptions = { expires };
    const result = await client.updateKey(keyName, version, updateOptions);
    assert.equal(
      result.expires.getTime(),
      expires.getTime(),
      "Unexpected expires value after attempting to update a disabled key"
    );
  });

  it("can delete a key", async () => {
    const keyName = getUniqueName("key");

    const result = await client.createKey(keyName, "RSA");
    await client.deleteKey(keyName);

    try {
      await client.getKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e instanceof RestError) {
        assert.equal(e.message, `Key not found: ${keyName}`);
      } else {
        throw e;
      }
    }
  });

  it("delete nonexisting key", async () => {
    const keyName = getUniqueName("key");

    try {
      await client.getKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e instanceof RestError) {
        assert.equal(e.message, `Key not found: ${keyName}`);
      } else {
        throw e;
      }
    }
  });

  it("can get a key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));

    const result = await client.createKey(keyName, "RSA");
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
  });

  it("can get a specific version of a key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));

    const { version } = await client.createKey(keyName, "RSA");
    const options: GetKeyOptions = { version };
    const getResult = await client.getKey(keyName, options);
    assert.equal(getResult.version, version, "Unexpected key name in result from getKey().");
  });

  it("can get a deleted key", async () => {
    const keyName = getUniqueName("key");
    await client.createKey(keyName, "RSA");
    await client.deleteKey(keyName);
    await delay(15000);
    const getResult = await client.getDeletedKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await client.purgeDeletedKey(keyName);
  });

  it("can't get a deleted key that doesn't exist", async () => {
    const keyName = getUniqueName("key");
    let error;
    try {
      await client.deleteKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `Key not found: ${keyName}`,
      "Unexpected key name in result from getKey()."
    );
  });
});
