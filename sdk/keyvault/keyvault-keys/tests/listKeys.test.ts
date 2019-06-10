import * as assert from "assert";
import { expect } from "chai";
import {
  getKeyvaultName,
  getCredentialWithServicePrincipalSecret,
  getUniqueName
} from "./utils/utils.common";
import { KeysClient } from "../src";
import { ServiceClientCredentials, RestError } from "@azure/ms-rest-js";
import Promise from "bluebird";

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

  it("can get several inserted keys", async () => {
    const keyNames = [getUniqueName("keys"), getUniqueName("keys")];
    const secretValue = getUniqueName("value");

    after(async () => {
      for (let name of keyNames) {
        await client.deleteKey(name);
      }
    });

    for (let name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const key of client.getKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
    }

    assert.equal(found, 2, "Unexpected number of secrets found by getAllSecrets.");
  });
});
