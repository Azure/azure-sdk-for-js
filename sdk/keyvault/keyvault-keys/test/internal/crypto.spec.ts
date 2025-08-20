// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { DecryptParameters, EncryptParameters, KeyVaultKey } from "@azure/keyvault-keys";
import { CryptographyClient, KeyClient } from "@azure/keyvault-keys";
import { RsaCryptographyProvider } from "$internal/cryptography/rsaCryptographyProvider.js";
import type { JsonWebKey } from "@azure/keyvault-keys";
import { stringToUint8Array } from "../public/utils/crypto.js";
import type { CryptographyProvider } from "$internal/cryptography/models.js";
import { RemoteCryptographyProvider } from "$internal/cryptography/remoteCryptographyProvider.js";
import { NoOpCredential } from "@azure-tools/test-credential";
import type { SendRequest } from "@azure/core-rest-pipeline";
import { RestError, createHttpHeaders } from "@azure/core-rest-pipeline";
import type { MockInstance } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("internal crypto tests", () => {
  const tokenCredential: TokenCredential = {
    getToken: () => Promise.resolve(null),
  };

  describe("with a Key identifier", () => {
    it("parses the vaultUrl", () => {
      const client = new CryptographyClient(
        "https://my.vault.azure.net/keys/keyId/v1",
        tokenCredential,
      );
      assert.equal(client.vaultUrl, "https://my.vault.azure.net");
    });

    it("throws if id is invalid", () => {
      assert.throws(
        () => new CryptographyClient("foo", tokenCredential),
        /not a valid Key Vault key ID/,
      );
    });

    it("allows version to be omitted", () => {
      const client = new CryptographyClient(
        "https://my.vault.azure.net/keys/keyId",
        tokenCredential,
      );
      assert.equal(client.vaultUrl, "https://my.vault.azure.net");
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
          vaultUrl: "foo",
        },
      };
    });

    describe("checkKeyValidity", () => {
      it("Checking that the key's notBefore is respected", async () => {
        const notBefore = new Date(Date.now() + 60 * 1000 * 60 * 24); // Now + 24h
        key.properties.notBefore = notBefore;
        const cryptoClient = new CryptographyClient(key, tokenCredential);
        await expect(cryptoClient.encrypt("RSA1_5", stringToUint8Array(""))).rejects.toThrow(
          `Key ${key.id} can't be used before ${notBefore.toISOString()}`,
        );
      });

      it("Checking that the key's expires is respected", async () => {
        const expiresOn = new Date(Date.now() - 60 * 1000 * 60 * 24); // Now - 24h
        key.properties.expiresOn = expiresOn;
        const cryptoClient = new CryptographyClient(key, tokenCredential);
        await expect(cryptoClient.encrypt("RSA1_5", stringToUint8Array(""))).rejects.toThrow(
          `Key ${key.id} expired at ${expiresOn.toISOString()}`,
        );
      });

      it("validates key operations", async () => {
        const cryptoClient = new CryptographyClient(key, tokenCredential);
        key.keyOperations = ["encrypt"];
        await expect(cryptoClient.decrypt("RSA1_5", stringToUint8Array(""))).rejects.toThrow();
      });

      it("parses the vaultUrl", () => {
        const client = new CryptographyClient(key, tokenCredential);
        assert.equal(client.vaultUrl, "https://azure_keyvault.vault.azure.net");
      });
      it("throws if id is invalid", () => {
        key.id = "invalid_id";
        assert.throws(
          () => new CryptographyClient(key, tokenCredential),
          /not a valid Key Vault key ID/,
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
      await expect(cryptoClient.decrypt("RSA1_5", stringToUint8Array(""))).rejects.toThrow(
        /Operation decrypt is not supported/,
      );
    });
  });

  describe("from a keyClient", () => {
    it("shares the generated client", () => {
      const keyClient = new KeyClient("https://my.vault.azure.net/", tokenCredential);
      const cryptoClient = keyClient.getCryptographyClient("keyId", { keyVersion: "v1" });
      assert.strictEqual(keyClient["client"], cryptoClient["remoteProvider"]!["client"]);
    });

    it("supports omitting key version", () => {
      const keyClient = new KeyClient("https://my.vault.azure.net/", tokenCredential);
      const cryptoClient = keyClient.getCryptographyClient("keyId");
      assert.strictEqual(keyClient["client"], cryptoClient["remoteProvider"]!["client"]);
    });
  });

  describe("Parameter passing to encrypt / decrypt", function () {
    let client: CryptographyClient;
    let cryptoProvider: CryptographyProvider;
    let encryptStub: MockInstance<typeof cryptoProvider.encrypt>;
    let decryptStub: MockInstance<typeof cryptoProvider.decrypt>;

    beforeEach(() => {
      const key = {
        id: "https://my.vault.azure.net/keys/keyId/v1",
        name: "fake key",
        properties: { name: "fake key", vaultUrl: "https://keyvault.vault.azure.net" },
      };
      client = new CryptographyClient(key, tokenCredential);
      cryptoProvider = new RemoteCryptographyProvider(key, tokenCredential);
      encryptStub = vi
        .spyOn(cryptoProvider, "encrypt")
        .mockReturnValue(Promise.resolve({ algorithm: "", result: stringToUint8Array("") }));
      decryptStub = vi
        .spyOn(cryptoProvider, "decrypt")
        .mockReturnValue(Promise.resolve({ algorithm: "", result: stringToUint8Array("") }));
      vi.spyOn(cryptoProvider, "isSupported").mockReturnValue(true);
      client["providers"] = [cryptoProvider];
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    describe("Encrypt parameter mapping", async function () {
      it("maps parameters correctly when using the previous API", async function (ctx) {
        const text = stringToUint8Array(ctx.task.name!);
        await client.encrypt("RSA1_5", text, { requestOptions: { timeout: 5 } });

        expect(encryptStub).toHaveBeenCalledWith(
          { algorithm: "RSA1_5", plaintext: text },
          expect.objectContaining({ requestOptions: { timeout: 5 } }),
        );
      });

      it("maps parameters correctly when using the current API", async function (ctx) {
        const text = stringToUint8Array(ctx.task.name!);

        await client.encrypt(
          { algorithm: "RSA1_5", plaintext: text },
          { requestOptions: { timeout: 5 } },
        );

        expect(encryptStub).toHaveBeenCalledWith(
          { algorithm: "RSA1_5", plaintext: text },
          expect.objectContaining({ requestOptions: { timeout: 5 } }),
        );
      });
    });

    describe("Decrypt parameter mapping", async function () {
      it("maps parameters correctly when using the previous API", async function (ctx) {
        const text = stringToUint8Array(ctx.task.name!);
        await client.decrypt("RSA1_5", text, { requestOptions: { timeout: 5 } });

        expect(decryptStub).toHaveBeenCalledWith(
          { algorithm: "RSA1_5", ciphertext: text },
          expect.objectContaining({ requestOptions: { timeout: 5 } }),
        );
      });

      it("maps parameters correctly when using the current API", async function (ctx) {
        const text = stringToUint8Array(ctx.task.name!);

        await client.decrypt(
          { algorithm: "RSA1_5", ciphertext: text },
          { requestOptions: { timeout: 5 } },
        );

        expect(decryptStub).toHaveBeenCalledWith(
          { algorithm: "RSA1_5", ciphertext: text },
          expect.objectContaining({ requestOptions: { timeout: 5 } }),
        );
      });
    });
  });

  describe("RSA local cryptography tests", function () {
    it("throws a validation error when the key is invalid", () => {
      const rsaProvider = new RsaCryptographyProvider({ kty: "AES", keyOps: ["encrypt"] });
      assert.throws(
        () => rsaProvider.encrypt({ algorithm: "RSA1_5", plaintext: stringToUint8Array("foo") }),
        "Key type does not match the algorithm RSA",
      );
    });
  });

  describe("cryptography client error handling", function () {
    let cryptoClient: CryptographyClient;
    let localProvider: RsaCryptographyProvider;

    beforeEach(() => {
      localProvider = new RsaCryptographyProvider({});
      vi.spyOn(localProvider, "isSupported").mockReturnValue(true);
      for (const operation of [
        "encrypt",
        "decrypt",
        "sign",
        "wrapKey",
        "unwrapKey",
        "signData",
        "verify",
        "verifyData",
      ] as const) {
        vi.spyOn(localProvider, operation).mockImplementation(() => {
          throw new Error("Local error");
        });
      }
    });

    afterEach(function () {
      vi.restoreAllMocks();
    });

    describe("hybrid mode", function () {
      let remoteProvider: RemoteCryptographyProvider;

      beforeEach(() => {
        const key: KeyVaultKey = {
          name: "key",
          id: "https://my_keyvault.vault.azure.net/keys/id/version",
          properties: {
            name: "key",
            vaultUrl: "http://my_keyvault.vault.azure.net",
            id: "https://my_keyvault.vault.azure.net/keys/id/version",
          },
          key: {
            kid: "https://my_keyvault.vault.azure.net/keys/id/version",
          },
        };

        remoteProvider = new RemoteCryptographyProvider(key, tokenCredential);
        cryptoClient = new CryptographyClient(key, tokenCredential);

        // Setup the crypto client with our stubs
        cryptoClient["providers"] = [localProvider, remoteProvider];
        cryptoClient["remoteProvider"] = remoteProvider;
      });

      describe("when creating the client with an identifier", function () {
        it("falls back to the remote provider when the key cannot be fetched due to permissions", async () => {
          const sendSignRequest: SendRequest = (request) =>
            Promise.resolve({
              status: 200,
              headers: createHttpHeaders(),
              request: request,
              bodyAsText: JSON.stringify({
                key: {
                  kid: `https://my_keyvault.vault.azure.net/keys/keyName/id`,
                  value: "signature",
                },
              }),
            });

          const sendRequest = vi.fn();
          sendRequest.mockImplementation(sendSignRequest);
          sendRequest.mockReturnValueOnce(
            Promise.reject(new RestError("Forbidden", { statusCode: 403 })),
          );

          const idCryptoClient = new CryptographyClient(
            "https://myvault.vault.azure.net/keys/keyName/id",
            new NoOpCredential(),
            {
              httpClient: {
                sendRequest,
              },
            },
          );

          await idCryptoClient.sign("RS256", new Uint8Array([1, 2, 3]));
        });
      });

      describe("when a local provider errors", function () {
        it("remotes the encrypt operation", async () => {
          const remoteStub = vi
            .spyOn(remoteProvider, "encrypt")
            .mockResolvedValue({ algorithm: "", result: new Uint8Array(0) });

          const parameters: EncryptParameters = {
            algorithm: "RSA-OAEP",
            plaintext: stringToUint8Array("text"),
          };

          await cryptoClient.encrypt(parameters);
          expect(remoteStub).toHaveBeenCalledWith(parameters, expect.anything());
        });

        it("remotes the decrypt operation", async () => {
          const remoteStub = vi
            .spyOn(remoteProvider, "decrypt")
            .mockResolvedValue({ algorithm: "", result: new Uint8Array(0) });

          const parameters: DecryptParameters = {
            algorithm: "RSA-OAEP",
            ciphertext: stringToUint8Array("text"),
          };
          await cryptoClient.decrypt(parameters);
          expect(remoteStub).toHaveBeenCalledWith(parameters, expect.anything());
        });

        it("remotes the wrapKey operation", async () => {
          const remoteStub = vi
            .spyOn(remoteProvider, "wrapKey")
            .mockResolvedValue({ algorithm: "A128KW", result: new Uint8Array(0) });

          const keyToWrap = stringToUint8Array("myKey");
          await cryptoClient.wrapKey("RSA-OAEP", keyToWrap);
          expect(remoteStub).toHaveBeenCalledWith("RSA-OAEP", keyToWrap, expect.anything());
        });

        it("remotes the unwrapKey operation", async () => {
          const remoteStub = vi
            .spyOn(remoteProvider, "unwrapKey")
            .mockResolvedValue({ algorithm: "A128KW", result: new Uint8Array(0) });

          const wrappedKey = stringToUint8Array("myKey");
          await cryptoClient.unwrapKey("RSA-OAEP", wrappedKey);
          expect(remoteStub).toHaveBeenCalledWith("RSA-OAEP", wrappedKey, expect.anything());
        });

        it("remotes the sign operation", async () => {
          const remoteStub = vi
            .spyOn(remoteProvider, "sign")
            .mockResolvedValue({ algorithm: "PS256", result: new Uint8Array(0) });

          const data = stringToUint8Array("myKey");
          await cryptoClient.sign("PS256", data);
          expect(remoteStub).toHaveBeenCalledWith("PS256", data, expect.anything());
        });

        it("remotes the signData operation", async () => {
          const remoteStub = vi
            .spyOn(remoteProvider, "signData")
            .mockResolvedValue({ algorithm: "PS256", result: new Uint8Array(0) });

          const data = stringToUint8Array("myKey");
          await cryptoClient.signData("PS256", data);
          expect(remoteStub).toHaveBeenCalledWith("PS256", data, expect.anything());
        });

        it("remotes the verify operation", async () => {
          const remoteStub = vi.spyOn(remoteProvider, "verify").mockResolvedValue({ result: true });

          const data = stringToUint8Array("myKey");
          const sig = stringToUint8Array("sig");
          await cryptoClient.verify("PS256", data, sig);
          expect(remoteStub).toHaveBeenCalledWith("PS256", data, sig, expect.anything());
        });

        it("remotes the verifyData operation", async () => {
          const remoteStub = vi
            .spyOn(remoteProvider, "verifyData")
            .mockResolvedValue({ result: true });

          const data = stringToUint8Array("myKey");
          const sig = stringToUint8Array("sig");
          await cryptoClient.verifyData("PS256", data, sig);
          expect(remoteStub).toHaveBeenCalledWith("PS256", data, sig, expect.anything());
        });
      });
    });

    describe("local only mode", function () {
      beforeEach(() => {
        const jwk: JsonWebKey = {};
        localProvider = new RsaCryptographyProvider(jwk);
        vi.spyOn(localProvider, "isSupported").mockReturnValue(true);

        cryptoClient = new CryptographyClient(jwk);

        // Setup the crypto client with our stubs
        cryptoClient["providers"] = [localProvider];
      });

      describe("when a local provider errors", function () {
        it("throws the original encrypt exception", async () => {
          await expect(
            cryptoClient.encrypt({ algorithm: "RSA-OAEP", plaintext: stringToUint8Array("text") }),
          ).rejects.toThrow();
        });

        it("throws the original decrypt exception", async () => {
          await expect(
            cryptoClient.decrypt({ algorithm: "RSA-OAEP", ciphertext: stringToUint8Array("text") }),
          ).rejects.toThrow();
        });

        it("throws the original wrapKey exception", async () => {
          await expect(
            cryptoClient.wrapKey("RSA-OAEP", stringToUint8Array("myKey")),
          ).rejects.toThrow();
        });

        it("throws the original unwrapKey exception", async () => {
          await expect(
            cryptoClient.unwrapKey("RSA-OAEP", stringToUint8Array("myKey")),
          ).rejects.toThrow();
        });
        it("throws the original sign exception", async () => {
          await expect(cryptoClient.sign("PS256", stringToUint8Array("data"))).rejects.toThrow();
        });
        it("throws the original signData exception", async () => {
          await expect(
            cryptoClient.signData("PS256", stringToUint8Array("data")),
          ).rejects.toThrow();
        });
        it("throws the original verify exception", async () => {
          await expect(
            cryptoClient.verify("PS256", stringToUint8Array("data"), stringToUint8Array("sig")),
          ).rejects.toThrow();
        });
        it("throws the original verifyData exception", async () => {
          await expect(
            cryptoClient.verifyData("PS256", stringToUint8Array("data"), stringToUint8Array("sig")),
          ).rejects.toThrow();
        });
      });
    });
  });
});
