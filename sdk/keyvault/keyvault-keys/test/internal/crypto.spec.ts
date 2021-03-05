// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import * as assert from "assert";
import sinon from "sinon";
import { CryptographyClient } from "../../src";
import { checkKeyValidity } from "../../src/keyVaultCryptographyClient";
import { stringToUint8Array } from "../utils/crypto";

describe("internal crypto tests", () => {
  describe("checkKeyValidity", () => {
    it("Checking that the key's notBefore is respected", async function() {
      const keyBundle = {
        attributes: {
          notBefore: new Date(Date.now() + 60 * 1000 * 60 * 24) // Now + 24h
        }
      };
      let error: Error | undefined = undefined;
      try {
        await checkKeyValidity("1", keyBundle);
      } catch (e) {
        error = e;
      }
      assert.equal(
        error?.message,
        `Key 1 can't be used before ${keyBundle.attributes.notBefore.toISOString()}`
      );
    });

    it("Checking that the key's expires is respected", async function() {
      const keyBundle = {
        attributes: {
          expires: new Date(Date.now() - 60 * 1000 * 60 * 24) // Now - 24h
        }
      };
      let error: Error | undefined = undefined;
      try {
        await checkKeyValidity("1", keyBundle);
      } catch (e) {
        error = e;
      }
      assert.equal(
        error?.message,
        `Key 1 expired at ${keyBundle.attributes.expires.toISOString()}`
      );
    });
  });

  describe("Parameter passing to encrypt / decrypt", function() {
    let client: CryptographyClient;
    let mockConcreteClient: sinon.SinonMock;
    let mockCredential;

    beforeEach(() => {
      mockCredential = sinon.createStubInstance(DefaultAzureCredential);
      client = new CryptographyClient(
        {
          name: "keyName",
          key: {
            kid: "https://keyvault.vault.azure.net/keys/foobar/123"
          },
          properties: {
            name: "keyName",
            vaultUrl: "https://keyvault.vault.azure.net"
          }
        },
        mockCredential
      );
      mockConcreteClient = sinon.mock(client["concreteClient"].client);
    });

    afterEach(() => {
      mockConcreteClient?.restore();
    });

    describe("Encrypt parameter mapping", async function() {
      it("maps parameters correctly when using the previous API", async function() {
        const text = stringToUint8Array(this.test!.title!);

        mockConcreteClient.expects("encrypt").calledOnceWithExactly(
          { algorithm: "RSA1_5", plaintext: text },
          {
            requestOptions: { timeout: 5 }
          }
        );

        await client.encrypt("RSA1_5", text, { requestOptions: { timeout: 5 } });
        mockConcreteClient.verify();
      });

      it("maps parameters correctly when using the current API", async function() {
        const text = stringToUint8Array(this.test!.title!);

        mockConcreteClient.expects("encrypt").calledOnceWithExactly(
          { algorithm: "RSA1_5", plaintext: text },
          {
            requestOptions: { timeout: 5 }
          }
        );

        await client.encrypt(
          { algorithm: "RSA1_5", plaintext: text },
          { requestOptions: { timeout: 5 } }
        );
        mockConcreteClient.verify();
      });
    });

    describe("Decrypt parameter mapping", async function() {
      it("maps parameters correctly when using the previous API", async function() {
        const text = stringToUint8Array(this.test!.title!);
        mockConcreteClient.expects("decrypt").calledOnceWithExactly(
          { algorithm: "RSA1_5", ciphertext: text },
          {
            requestOptions: { timeout: 5 }
          }
        );

        await client.decrypt("RSA1_5", text, { requestOptions: { timeout: 5 } });
        mockConcreteClient.verify();
      });

      it("maps parameters correctly when using the current API", async function() {
        const text = stringToUint8Array(this.test!.title!);
        mockConcreteClient.expects("decrypt").calledOnceWithExactly(
          { algorithm: "RSA1_5", ciphertext: text },
          {
            requestOptions: { timeout: 5 }
          }
        );

        await client.decrypt(
          { algorithm: "RSA1_5", ciphertext: text },
          { requestOptions: { timeout: 5 } }
        );
        mockConcreteClient.verify();
      });
    });
  });
});
