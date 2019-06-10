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

  it("can recover a deleted key");
  it("fails if one tries to recover a non-existing deleted key");
  it("can generate a backup of a key");
  it("fails to generate a backup of a non-existing key");
  it("can restore a key with a given backup");
  it("fails to restore a key with a malformed backup");
});
