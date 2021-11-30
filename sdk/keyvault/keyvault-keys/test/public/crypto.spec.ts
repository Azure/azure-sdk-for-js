// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { supportsTracing } from "../../../keyvault-common/test/utils/supportsTracing";
import { Context } from "mocha";
import { createHash } from "crypto";
import { Recorder, env, isLiveMode } from "@azure-tools/test-recorder";
import { ClientSecretCredential } from "@azure/identity";

import { CryptographyClient, KeyVaultKey, KeyClient } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";
import { stringToUint8Array, uint8ArrayToString } from "../utils/crypto";
import { RsaCryptographyProvider } from "../../src/cryptography/rsaCryptographyProvider";
import { getServiceVersion } from "../utils/utils.common";
import { isNode } from "@azure/core-http";

describe("CryptographyClient (all decrypts happen remotely)", () => {
  const keyPrefix = `crypto${env.KEY_NAME || "KeyName"}`;
  let client: KeyClient;
  let testClient: TestClient;
  let cryptoClient: CryptographyClient;
  let recorder: Recorder;
  let credential: ClientSecretCredential;
  let keyName: string;
  let keyVaultKey: KeyVaultKey;
  let keySuffix: string;

  if (!isNode) {
    // Local cryptography is only supported in NodeJS
    return;
  }

  describe("RSA keys", () => {
    beforeEach(async function(this: Context) {
      const authentication = await authenticate(this, getServiceVersion());
      client = authentication.client;
      recorder = authentication.recorder;
      testClient = authentication.testClient;
      credential = authentication.credential;
      keySuffix = authentication.keySuffix;
      keyName = recorder.getUniqueName("RSA");
      keyVaultKey = await client.createKey(keyName, "RSA");
      cryptoClient = new CryptographyClient(keyVaultKey, credential);
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await testClient.flushKey(keyName);
      }
      await recorder.stop();
    });

    if (isLiveMode()) {
      it("encrypt & decrypt with RSA1_5", async function(this: Context) {
        const text = this.test!.title;
        const encryptResult = await cryptoClient.encrypt({
          algorithm: "RSA1_5",
          plaintext: stringToUint8Array(text)
        });
        const decryptResult = await cryptoClient.decrypt({
          algorithm: "RSA1_5",
          ciphertext: encryptResult.result
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("manually encrypt locally and decrypt remotely, both with RSA1_5", async function(this: Context) {
        const text = this.test!.title;
        const localProvider = new RsaCryptographyProvider(keyVaultKey.key!);
        const encryptResult = await localProvider.encrypt({
          algorithm: "RSA1_5",
          plaintext: Buffer.from(text)
        });
        const decryptResult = await cryptoClient.decrypt({
          algorithm: "RSA1_5",
          ciphertext: encryptResult.result
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("encrypt & decrypt with RSA-OAEP", async function(this: Context) {
        const text = this.test!.title;
        const encryptResult = await cryptoClient.encrypt(
          {
            algorithm: "RSA-OAEP",
            plaintext: stringToUint8Array(text)
          },
          {}
        );
        const decryptResult = await cryptoClient.decrypt({
          algorithm: "RSA-OAEP",
          ciphertext: encryptResult.result
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("manually encrypt locally and decrypt remotely, both with RSA-OAEP", async function(this: Context) {
        const text = this.test!.title;
        const localProvider = new RsaCryptographyProvider(keyVaultKey.key!);
        const encryptResult = await localProvider.encrypt({
          algorithm: "RSA-OAEP",
          plaintext: Buffer.from(text)
        });
        const decryptResult = await cryptoClient.decrypt({
          algorithm: "RSA-OAEP",
          ciphertext: encryptResult.result
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("the CryptographyClient can be created from a full KeyVaultKey object", async function(this: Context) {
        const customKeyName = testClient.formatName(
          `${keyPrefix}-${this!.test!.title}-${keySuffix}`
        );
        const customKeyVaultKey = await client.createKey(customKeyName, "RSA");
        const cryptoClientFromKey = new CryptographyClient(customKeyVaultKey, credential);

        const text = this.test!.title;
        const encryptResult = await cryptoClientFromKey.encrypt({
          algorithm: "RSA1_5",
          plaintext: stringToUint8Array(text)
        });
        const decryptResult = await cryptoClientFromKey.decrypt({
          algorithm: "RSA1_5",
          ciphertext: encryptResult.result
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("wrap and unwrap with rsa1_5", async function() {
        recorder.skip(
          undefined,
          "Wrapping and unwrapping don't cause a repeatable pattern, so these tests can only run in playback mode"
        );
        const text = "arepa";
        const wrapped = await cryptoClient.wrapKey("RSA1_5", stringToUint8Array(text));
        const unwrappedResult = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
        const unwrappedText = uint8ArrayToString(unwrappedResult.result);
        assert.equal(text, unwrappedText);
        assert.equal("RSA1_5", unwrappedResult.algorithm);
      });

      it("wrap and unwrap with RSA-OAEP", async function(this: Context) {
        recorder.skip(
          undefined,
          "Wrapping and unwrapping don't cause a repeatable pattern, so these tests can only run in playback mode"
        );
        const text = this.test!.title;
        const wrapped = await cryptoClient.wrapKey("RSA-OAEP", stringToUint8Array(text));
        const unwrappedResult = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
        const unwrappedText = uint8ArrayToString(unwrappedResult.result);
        assert.equal(text, unwrappedText);
        assert.equal("RSA-OAEP", unwrappedResult.algorithm);
      });
    }

    it("sign and verify with RS256", async function(): Promise<void> {
      const signatureValue = Buffer.from("32 byte signature in ascii chars");
      const hash = createHash("SHA256");
      hash.update(signatureValue);

      const signature = await cryptoClient.sign("RS256", signatureValue);
      const verifyResult = await cryptoClient.verify("RS256", signatureValue, signature.result);

      assert.ok(verifyResult.result);
    });

    it("sign and verify data with RS256 (local verification)", async function() {
      const signatureValue = Buffer.from("32 byte signature in ascii chars");
      const signature = await cryptoClient.signData("RS256", signatureValue);
      const verifyResult = await cryptoClient.verifyData("RS256", signatureValue, signature.result);
      assert.ok(verifyResult.result);
    });

    it("supports tracing", async function() {
      await supportsTracing(
        (tracingOptions) =>
          cryptoClient.encrypt("RSA1_5", stringToUint8Array("data"), { tracingOptions }),
        ["Azure.KeyVault.Keys.CryptographyClient.encrypt"]
      );
    });
  });

  describe("RSA-HSM keys", () => {
    beforeEach(async function(this: Context) {
      if (isLiveMode() && env.KEYVAULT_SKU !== "premium") {
        // RSA-HSM keys are only available in the premium KeyVault SKU which is not
        // available in all clouds.
        this.skip();
      }

      const authentication = await authenticate(this, getServiceVersion());
      client = authentication.client;
      recorder = authentication.recorder;
      testClient = authentication.testClient;
      credential = authentication.credential;
      keySuffix = authentication.keySuffix;
      keyName = recorder.getUniqueName("RSA-HSM");
      keyVaultKey = await client.createKey(keyName, "RSA-HSM");
      cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await testClient.flushKey(keyName);
      }
      await recorder?.stop();
    });

    it("encrypt & decrypt with an RSA-HSM key and the RSA-OAEP algorithm", async function(this: Context) {
      recorder.skip(undefined, "Encryption with RSA is not repeatable");
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt("RSA-OAEP", stringToUint8Array(text));
      const decryptResult = await cryptoClient.decrypt("RSA-OAEP", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("encrypt & decrypt with an RSA-HSM key and the RSA1_5 algorithm", async function(this: Context) {
      recorder.skip(undefined, "Encryption with RSA is not repeatable");
      const text = this.test!.title;
      const encryptResult = await cryptoClient.encrypt("RSA1_5", stringToUint8Array(text));
      const decryptResult = await cryptoClient.decrypt("RSA1_5", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("wrap and unwrap with RSA-OAEP on a RSA-HSM key", async function(this: Context) {
      recorder.skip(
        undefined,
        "Wrapping and unwrapping don't cause a repeatable pattern, so this test can only run live"
      );
      const text = this.test!.title;
      const wrapped = await cryptoClient.wrapKey("RSA-OAEP", stringToUint8Array(text));
      const unwrappedResult = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
      const unwrappedText = uint8ArrayToString(unwrappedResult.result);
      assert.equal(text, unwrappedText);
    });

    it("wrap and unwrap with RSA1_5 on a RSA-HSM key", async function(this: Context) {
      recorder.skip(
        undefined,
        "Wrapping and unwrapping don't cause a repeatable pattern, so this test can only run live"
      );
      const text = this.test!.title;
      const wrapped = await cryptoClient.wrapKey("RSA1_5", stringToUint8Array(text));
      const unwrappedResult = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
      const unwrappedText = uint8ArrayToString(unwrappedResult.result);
      assert.equal(text, unwrappedText);
    });

    it("sign and verify with RS256 through an RSA-HSM key", async function(this: Context): Promise<
      void
    > {
      const signatureValue = Buffer.from("My Message");
      const hash = createHash("sha256");
      hash.update(signatureValue);
      const digest = hash.digest();
      const signature = await cryptoClient.sign("RS256", digest);
      const verifyResult = await cryptoClient.verify("RS256", digest, signature.result);
      assert.ok(verifyResult.result);
    });

    it("sign and verify data with RS256 through an RSA-HSM key (local verification)", async function(): Promise<
      void
    > {
      const signatureValue = Buffer.from("My Message");
      const signature = await cryptoClient.signData("RS256", signatureValue);
      const verifyResult = await cryptoClient.verifyData("RS256", signatureValue, signature.result);
      assert.ok(verifyResult.result);
    });

    it("sign and verify with RS384 through an RSA-HSM key", async function(this: Context): Promise<
      void
    > {
      const signatureValue = Buffer.from("My Message");
      const hash = createHash("sha384");
      hash.update(signatureValue);
      const digest = hash.digest();
      const signature = await cryptoClient.sign("RS384", digest);
      const verifyResult = await cryptoClient.verify("RS384", digest, signature.result);
      assert.ok(verifyResult.result);
    });
  });

  describe("EC keys", () => {
    beforeEach(async function(this: Context) {
      const authentication = await authenticate(this, getServiceVersion());
      client = authentication.client;
      recorder = authentication.recorder;
      testClient = authentication.testClient;
      credential = authentication.credential;
      keySuffix = authentication.keySuffix;
      keyName = recorder.getUniqueName("EC");
    });

    for (const [keyCurve, signatureAlgorithm, shaAlgorithm] of [
      ["P-256", "ES256", "SHA256"],
      ["P-256K", "ES256K", "SHA256"],
      ["P-384", "ES384", "SHA384"],
      ["P-521", "ES512", "SHA512"]
    ] as const) {
      it(`sign / signData and verify / verifyData using ${signatureAlgorithm}`, async function(this: Context) {
        keyVaultKey = await client.createEcKey(keyName, { curve: keyCurve });
        // Implicitly test the getCryptographyClient method here
        cryptoClient = client.getCryptographyClient(keyVaultKey.name, {
          keyVersion: keyVaultKey.properties.version
        });
        const data = Buffer.from("my message");

        // Sign and verify
        const hash = createHash(shaAlgorithm);
        hash.update(data);
        const digest = hash.digest();

        let signature = await cryptoClient.sign(signatureAlgorithm, digest);
        let verification = await cryptoClient.verify(signatureAlgorithm, digest, signature.result);
        assert.isTrue(verification.result);

        // SignData and VerifyData
        signature = await cryptoClient.signData(signatureAlgorithm, data);
        verification = await cryptoClient.verifyData(signatureAlgorithm, data, signature.result);
        assert.isTrue(verification.result);
        await testClient.flushKey(keyName);
        await recorder.stop();
      });
    }
  });
});
