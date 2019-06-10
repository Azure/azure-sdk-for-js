import * as assert from "assert";
import { expect } from "chai";
import {
  getKeyvaultName,
  getCredentialWithServicePrincipalSecret,
  getUniqueName
} from "./utils/utils.common";
import { KeysClient } from "../src";
import { ServiceClientCredentials, RestError } from "@azure/ms-rest-js";

describe("Keys client", () => {
  let credential: ServiceClientCredentials;
  let keyVaultName: string;
  let keyVaultUrl: string;
  let client: KeysClient;
  let version: string;

  let deleteKeyAfter = (name) => async () => {
    await client.deleteKey(name);
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

  it("can create a RSA key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    const result = await client.createRsaKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
  });

  it("can create an EC key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    const result = await client.createEcKey(keyName);
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

  i("can create a key not before certain date", async () => {
    const keyName = getUniqueName("key");
    after((name) => async () => {
      await client.deleteKey(name);
      try {
        await client.purgeDeletedKey(name);
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

  it("can get a key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));

    const result = await client.createKey(keyName, "RSA");
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
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

  it("can get the versions of a key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));

    const result = await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (let version of client.getKeyVersions(keyName)) {
      assert.equal(
        version.name,
        keyName,
        "Unexpected key name in result from createKeygetKeyVersions()."
      );
      totalVersions += 1;
    }

    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
  });
});
