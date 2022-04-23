// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, TokenCredential, isNode } from "@azure/core-http";
import { Context } from "mocha";
import { assert } from "@azure/test-utils";
import sinon from "sinon";
import {
  CryptographyClient,
  DecryptParameters,
  EncryptParameters,
  KeyClient,
  KeyVaultKey,
} from "../../src";
import { RsaCryptographyProvider } from "../../src/cryptography/rsaCryptographyProvider";
import { JsonWebKey } from "../../src";
import { stringToUint8Array } from "../public/utils/crypto";
import { CryptographyProvider } from "../../src/cryptography/models";
import { RemoteCryptographyProvider } from "../../src/cryptography/remoteCryptographyProvider";

describe("internal crypto tests", () => {
  const tokenCredential: TokenCredential = {
    getToken: () => Promise.resolve(null),
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

    it("allows version to be omitted", () => {
      const client = new CryptographyClient(
        "https://my.vault.azure.net/keys/keyId",
        tokenCredential
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
      it("Checking that the key's notBefore is respected", async function () {
        const notBefore = new Date(Date.now() + 60 * 1000 * 60 * 24); // Now + 24h
        key.properties.notBefore = notBefore;
        const cryptoClient = new CryptographyClient(key, tokenCredential);
        await assert.isRejected(
          cryptoClient.encrypt("RSA1_5", stringToUint8Array("")),
          `Key ${key.id} can't be used before ${notBefore.toISOString()}`
        );
      });

      it("Checking that the key's expires is respected", async function () {
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
    let encryptStub: sinon.SinonStub;
    let decryptStub: sinon.SinonStub;

    beforeEach(() => {
      const key = {
        id: "https://my.vault.azure.net/keys/keyId/v1",
        name: "fake key",
        properties: { name: "fake key", vaultUrl: "https://keyvault.vault.azure.net" },
      };
      client = new CryptographyClient(key, tokenCredential);
      cryptoProvider = new RemoteCryptographyProvider(key, tokenCredential);
      encryptStub = sinon
        .stub(cryptoProvider, "encrypt")
        .returns(Promise.resolve({ algorithm: "", result: stringToUint8Array("") }));
      decryptStub = sinon
        .stub(cryptoProvider, "decrypt")
        .returns(Promise.resolve({ algorithm: "", result: stringToUint8Array("") }));
      sinon.stub(cryptoProvider, "isSupported").returns(true);
      client["providers"] = [cryptoProvider];
    });

    afterEach(() => {
      sinon.restore();
    });

    describe("Encrypt parameter mapping", async function () {
      it("maps parameters correctly when using the previous API", async function (this: Context) {
        const text = stringToUint8Array(this.test!.title!);
        await client.encrypt("RSA1_5", text, { requestOptions: { timeout: 5 } });

        sinon.assert.calledWith(
          encryptStub,
          { algorithm: "RSA1_5", plaintext: text },
          operationOptionsSinonMatcher({
            requestOptions: { timeout: 5 },
            tracingOptions: {},
          })
        );
      });

      it("maps parameters correctly when using the current API", async function (this: Context) {
        const text = stringToUint8Array(this.test!.title!);

        await client.encrypt(
          { algorithm: "RSA1_5", plaintext: text },
          { requestOptions: { timeout: 5 } }
        );

        sinon.assert.calledWith(
          encryptStub,
          { algorithm: "RSA1_5", plaintext: text },
          operationOptionsSinonMatcher({
            requestOptions: { timeout: 5 },
            tracingOptions: {},
          })
        );
      });
    });

    describe("Decrypt parameter mapping", async function () {
      it("maps parameters correctly when using the previous API", async function (this: Context) {
        const text = stringToUint8Array(this.test!.title!);
        await client.decrypt("RSA1_5", text, { requestOptions: { timeout: 5 } });

        sinon.assert.calledWith(
          decryptStub,
          { algorithm: "RSA1_5", ciphertext: text },
          operationOptionsSinonMatcher({
            requestOptions: { timeout: 5 },
            tracingOptions: {},
          })
        );
      });

      it("maps parameters correctly when using the current API", async function (this: Context) {
        const text = stringToUint8Array(this.test!.title!);

        await client.decrypt(
          { algorithm: "RSA1_5", ciphertext: text },
          { requestOptions: { timeout: 5 } }
        );

        sinon.assert.calledWith(
          decryptStub,
          { algorithm: "RSA1_5", ciphertext: text },
          operationOptionsSinonMatcher({
            requestOptions: { timeout: 5 },
            tracingOptions: {},
          })
        );
      });
    });
  });

  describe("RSA local cryptography tests", function () {
    it("throws a validation error when the key is invalid", function (this: Context) {
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

    it("uses the browser replacement when running in the browser", function (this: Context) {
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

  describe("cryptography client error handling", function () {
    let cryptoClient: CryptographyClient;
    let localProvider: RsaCryptographyProvider;

    beforeEach(() => {
      localProvider = new RsaCryptographyProvider({});
      sinon.stub(localProvider, "isSupported").returns(true);
      for (const operation of [
        "encrypt",
        "decrypt",
        "sign",
        "wrapKey",
        "unwrapKey",
        "signData",
        "verify",
        "verifyData",
      ]) {
        sinon
          .stub(localProvider, operation as keyof RsaCryptographyProvider)
          .throwsException("Error");
      }
    });

    afterEach(function () {
      sinon.reset();
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

      describe("when a local provider errors", function () {
        it("remotes the encrypt operation", async function () {
          const remoteStub = sinon.stub(remoteProvider, "encrypt");

          const parameters: EncryptParameters = {
            algorithm: "RSA-OAEP",
            plaintext: stringToUint8Array("text"),
          };

          await cryptoClient.encrypt(parameters);
          assert.isTrue(remoteStub.calledOnceWith(parameters));
        });

        it("remotes the decrypt operation", async function () {
          const remoteStub = sinon.stub(remoteProvider, "decrypt");

          const parameters: DecryptParameters = {
            algorithm: "RSA-OAEP",
            ciphertext: stringToUint8Array("text"),
          };
          await cryptoClient.decrypt(parameters);
          assert.isTrue(remoteStub.calledOnceWith(parameters));
        });

        it("remotes the wrapKey operation", async function () {
          const remoteStub = sinon.stub(remoteProvider, "wrapKey");

          const keyToWrap = stringToUint8Array("myKey");
          await cryptoClient.wrapKey("RSA-OAEP", keyToWrap);
          assert.isTrue(remoteStub.calledOnceWith("RSA-OAEP", keyToWrap));
        });

        it("remotes the unwrapKey operation", async function () {
          const remoteStub = sinon.stub(remoteProvider, "unwrapKey");

          const wrappedKey = stringToUint8Array("myKey");
          await cryptoClient.unwrapKey("RSA-OAEP", wrappedKey);
          assert.isTrue(remoteStub.calledOnceWith("RSA-OAEP", wrappedKey));
        });

        it("remotes the sign operation", async function () {
          const remoteStub = sinon.stub(remoteProvider, "sign");

          const data = stringToUint8Array("myKey");
          await cryptoClient.sign("PS256", data);
          assert.isTrue(remoteStub.calledOnceWith("PS256", data));
        });

        it("remotes the signData operation", async function () {
          const remoteStub = sinon.stub(remoteProvider, "signData");

          const data = stringToUint8Array("myKey");
          await cryptoClient.signData("PS256", data);
          assert.isTrue(remoteStub.calledOnceWith("PS256", data));
        });

        it("remotes the verify operation", async function () {
          const remoteStub = sinon.stub(remoteProvider, "verify");

          const data = stringToUint8Array("myKey");
          const sig = stringToUint8Array("sig");
          await cryptoClient.verify("PS256", data, sig);
          assert.isTrue(remoteStub.calledOnceWith("PS256", data, sig));
        });

        it("remotes the verifyData operation", async function () {
          const remoteStub = sinon.stub(remoteProvider, "verifyData");

          const data = stringToUint8Array("myKey");
          const sig = stringToUint8Array("sig");
          await cryptoClient.verifyData("PS256", data, sig);
          assert.isTrue(remoteStub.calledOnceWith("PS256", data, sig));
        });
      });
    });

    describe("local only mode", function () {
      beforeEach(() => {
        const jwk: JsonWebKey = {};
        localProvider = new RsaCryptographyProvider(jwk);
        sinon.stub(localProvider, "isSupported").returns(true);

        cryptoClient = new CryptographyClient(jwk);

        // Setup the crypto client with our stubs
        cryptoClient["providers"] = [localProvider];
      });

      describe("when a local provider errors", function () {
        it("throws the original encrypt exception", async function () {
          await assert.isRejected(
            cryptoClient.encrypt({ algorithm: "RSA-OAEP", plaintext: stringToUint8Array("text") })
          );
        });

        it("throws the original decrypt exception", async function () {
          await assert.isRejected(
            cryptoClient.decrypt({ algorithm: "RSA-OAEP", ciphertext: stringToUint8Array("text") })
          );
        });

        it("throws the original wrapKey exception", async function () {
          await assert.isRejected(cryptoClient.wrapKey("RSA-OAEP", stringToUint8Array("myKey")));
        });

        it("throws the original unwrapKey exception", async function () {
          await assert.isRejected(cryptoClient.unwrapKey("RSA-OAEP", stringToUint8Array("myKey")));
        });
        it("throws the original sign exception", async function () {
          await assert.isRejected(cryptoClient.sign("PS256", stringToUint8Array("data")));
        });
        it("throws the original signData exception", async function () {
          await assert.isRejected(cryptoClient.signData("PS256", stringToUint8Array("data")));
        });
        it("throws the original verify exception", async function () {
          await assert.isRejected(
            cryptoClient.verify("PS256", stringToUint8Array("data"), stringToUint8Array("sig"))
          );
        });
        it("throws the original verifyData exception", async function () {
          await assert.isRejected(
            cryptoClient.verifyData("PS256", stringToUint8Array("data"), stringToUint8Array("sig"))
          );
        });
      });
    });
  });
});

/**
 * The tests in this suite check that the created options match what createSpan() would create
 * when properly parenting and propagating options.
 *
 * This is slightly trickier with later versions of OpenTelemetry where the created `context`
 * instances are not guaranteed to be comparable even if they are logically the same. So this
 * matcher does the comparisons needed and still maintain sinon.calledWith() compatibility.
 */
function operationOptionsSinonMatcher<T extends OperationOptions>(
  expectedPropagatedOptions: T
): ReturnType<typeof sinon.match> {
  return sinon.match((actualOptions: T) => {
    // check that an actual context was set up (ie, we must have
    // called `createSpan` to get these new options.)
    assert.ok(actualOptions.tracingOptions?.tracingContext);
    delete actualOptions.tracingOptions?.tracingContext;

    assert.deepEqualExcludingEvery(actualOptions, expectedPropagatedOptions, [
      "spanOptions",
    ] as any);
    return true;
  });
}
