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

  it("can add a key while giving a manual type", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    const result = await client.createKey(keyName, "RSA");
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
