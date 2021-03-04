// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode, TokenCredential } from "@azure/core-http";
import chai, { assert } from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import sinon from "sinon";
import { CryptographyClient, KeyVaultKey } from "../../src";
import { RsaCryptographyProvider } from "../../src/cryptography/rsaCryptographyProvider";
import { JsonWebKey } from "../../src";
import { stringToUint8Array } from "../utils/crypto";
import { CryptographyProvider } from "../../src/cryptography/models";
import { RemoteCryptographyProvider } from "../../src/cryptography/remoteCryptographyProvider";

describe("internal crypto tests", () => {
  const tokenCredential: TokenCredential = {
    getToken: () => Promise.resolve(null)
  };

  describe("with a Key identifier", () => {
    it("parses the vaultUrl", () => {
      const client = new CryptographyClient(
        "https://my.vault.azure.net/keys/keyId/v1",
        tokenCredential
      );
      assert.equal(client.vaultUrl, "https://my.vault.azure.net");
    });

    it("throws if id is invalid", () => {
      assert.throws(
        () => new CryptographyClient("foo", tokenCredential),
        /not a valid Key Vault key ID/
      );
    });
  });

  describe("with a KeyVault Key", () => {
    let key: KeyVaultKey;
    beforeEach(() => {
      key = {
        name: "key",
        id: "https://azure_keyvault.vault.azure.net/keys/keyId/v1",
        properties: {
          name: "key",
          vaultUrl: "foo"
        }
      };
    });

    describe("checkKeyValidity", () => {
      it("Checking that the key's notBefore is respected", async function() {
        const notBefore = new Date(Date.now() + 60 * 1000 * 60 * 24); // Now + 24h
        key.properties.notBefore = notBefore;
        const cryptoClient = new CryptographyClient(key, tokenCredential);
        await assert.isRejected(
          cryptoClient.encrypt("RSA1_5", stringToUint8Array("")),
          `Key ${key.id} can't be used before ${notBefore.toISOString()}`
        );
      });

      it("Checking that the key's expires is respected", async function() {
        const expiresOn = new Date(Date.now() - 60 * 1000 * 60 * 24); // Now - 24h
        key.properties.expiresOn = expiresOn;
        const cryptoClient = new CryptographyClient(key, tokenCredential);
        await assert.isRejected(
          cryptoClient.encrypt("RSA1_5", stringToUint8Array("")),
          `Key ${key.id} expired at ${expiresOn.toISOString()}`
        );
      });

      it("validates key operations", async () => {
        const cryptoClient = new CryptographyClient(key, tokenCredential);
        key.keyOperations = ["encrypt"];
        await assert.isRejected(cryptoClient.decrypt("RSA1_5", stringToUint8Array("")));
      });

      it("parses the vaultUrl", () => {
        const client = new CryptographyClient(key, tokenCredential);
        assert.equal(client.vaultUrl, "https://azure_keyvault.vault.azure.net");
      });
      it("throws if id is invalid", () => {
        key.id = "invalid_id";
        assert.throws(
          () => new CryptographyClient(key, tokenCredential),
          /not a valid Key Vault key ID/
        );
      });
    });
  });

  describe("with a JsonWebKey", () => {
    let key: JsonWebKey;

    beforeEach(() => {
      key = {};
    });

    it("validates key operations", async () => {
      const cryptoClient = new CryptographyClient(key);
      key.keyOps = ["encrypt"];
      await assert.isRejected(
        cryptoClient.decrypt("RSA1_5", stringToUint8Array("")),
        /Operation decrypt is not supported/
      );
    });
  });

  describe("Parameter passing to encrypt / decrypt", function() {
    let client: CryptographyClient;
    let cryptoProvider: CryptographyProvider;
    let encryptStub: sinon.SinonStub;
    let decryptStub: sinon.SinonStub;

    beforeEach(() => {
      const key = {
        id: "https://my.vault.azure.net/keys/keyId/v1",
        name: "fake key",
        properties: { name: "fake key", vaultUrl: "https://keyvault.vault.azure.net" }
      };
      client = new CryptographyClient(key, tokenCredential);
      cryptoProvider = new RemoteCryptographyProvider(key, tokenCredential);
      encryptStub = sinon
        .stub(cryptoProvider, "encrypt")
        .returns(Promise.resolve({ algorithm: "", result: stringToUint8Array("") }));
      decryptStub = sinon
        .stub(cryptoProvider, "decrypt")
        .returns(Promise.resolve({ algorithm: "", result: stringToUint8Array("") }));
      sinon.stub(cryptoProvider, "supportsOperation").returns(true);
      client["providers"] = [cryptoProvider];
    });

    afterEach(() => {
      sinon.restore();
    });

    describe("Encrypt parameter mapping", async function() {
      it("maps parameters correctly when using the previous API", async function() {
        const text = stringToUint8Array(this.test!.title!);
        await client.encrypt("RSA1_5", text, { requestOptions: { timeout: 5 } });

        sinon.assert.calledWith(
          encryptStub,
          { algorithm: "RSA1_5", plaintext: text },
          { requestOptions: { timeout: 5 }, tracingOptions: { spanOptions: {} } }
        );
      });

      it("maps parameters correctly when using the current API", async function() {
        const text = stringToUint8Array(this.test!.title!);

        await client.encrypt(
          { algorithm: "RSA1_5", plaintext: text },
          { requestOptions: { timeout: 5 } }
        );

        sinon.assert.calledWith(
          encryptStub,
          { algorithm: "RSA1_5", plaintext: text },
          { requestOptions: { timeout: 5 }, tracingOptions: { spanOptions: {} } }
        );
      });
    });

    describe("Decrypt parameter mapping", async function() {
      it("maps parameters correctly when using the previous API", async function() {
        const text = stringToUint8Array(this.test!.title!);
        await client.decrypt("RSA1_5", text, { requestOptions: { timeout: 5 } });

        sinon.assert.calledWith(
          decryptStub,
          { algorithm: "RSA1_5", ciphertext: text },
          { requestOptions: { timeout: 5 }, tracingOptions: { spanOptions: {} } }
        );
      });

      it("maps parameters correctly when using the current API", async function() {
        const text = stringToUint8Array(this.test!.title!);

        await client.decrypt(
          { algorithm: "RSA1_5", ciphertext: text },
          { requestOptions: { timeout: 5 } }
        );

        sinon.assert.calledWith(
          decryptStub,
          { algorithm: "RSA1_5", ciphertext: text },
          { requestOptions: { timeout: 5 }, tracingOptions: { spanOptions: {} } }
        );
      });
    });
  });

  describe("RSA local cryptography tests", function() {
    it("throws a validation error when the key is invalid", function() {
      if (!isNode) {
        // Local cryptography is not supported in the browser
        this.skip();
      }
      const rsaProvider = new RsaCryptographyProvider({ kty: "AES", keyOps: ["encrypt"] });
      assert.throws(
        () => rsaProvider.encrypt({ algorithm: "RSA1_5", plaintext: stringToUint8Array("foo") }),
        "Key type does not match the algorithm RSA"
      );
    });

    it("uses the browser replacement when running in the browser", function() {
      if (isNode) {
        this.skip();
      }
      const rsaProvider = new RsaCryptographyProvider({ kty: "RSA", keyOps: ["encrypt"] });
      assert.throws(
        () => rsaProvider.encrypt({ algorithm: "RSA1_5", plaintext: stringToUint8Array("foo") }),
        /not supported in the browser/
      );
    });
  });
});
