// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-http";
import * as assert from "assert";
import Sinon from "sinon";
import sinon from "sinon";
import { CryptographyClient, KeyVaultKey } from "../../src";
import { CryptographyProvider } from "../../src/cryptography/CryptographyProvider";
import { RsaCryptographyProvider } from "../../src/cryptography/rsaCryptographyProvider";
import { stringToUint8Array } from "../utils/crypto";

describe.only("internal crypto tests", () => {
  const tokenCredential: TokenCredential = {
    getToken: () => Promise.resolve(null)
  };
  describe("with a KeyVault Key", () => {
    let key: KeyVaultKey;
    beforeEach(() => {
      key = {
        name: "key",
        id: "https://azure_keyvault.vault.azure.net/key1/v1",
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
        let error: Error | undefined = undefined;
        try {
          await cryptoClient.sign("RSA1_5", stringToUint8Array("foo"));
        } catch (e) {
          error = e;
        }
        assert.equal(
          error?.message,
          `Key ${key.id} can't be used before ${notBefore.toISOString()}`
        );
      });

      it("Checking that the key's expires is respected", async function() {
        const expiresOn = new Date(Date.now() - 60 * 1000 * 60 * 24); // Now - 24h
        key.properties.expiresOn = expiresOn;
        const cryptoClient = new CryptographyClient(key, tokenCredential);
        let error: Error | undefined = undefined;
        try {
          await cryptoClient.encrypt("RSA1_5", stringToUint8Array("Foo"));
        } catch (e) {
          error = e;
        }
        assert.equal(error?.message, `Key ${key.id} expired at ${expiresOn.toISOString()}`);
      });
    });
  });

  describe("Parameter passing to encrypt / decrypt", function() {
    let client: CryptographyClient;
    let cryptoProvider: CryptographyProvider;
    let encryptStub: Sinon.SinonStub;
    let decryptStub: Sinon.SinonStub;

    beforeEach(() => {
      const key = {
        kid: "https://keyvault.vault.azure.net/keys/foobar/123",
        keyOps: ["encrypt", "decrypt"]
      };
      client = new CryptographyClient(key);
      cryptoProvider = new RsaCryptographyProvider(key);
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
});
