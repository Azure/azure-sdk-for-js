// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createHash } from "node:crypto";
import { Recorder, env, isLiveMode } from "@azure-tools/test-recorder";
import type { ClientSecretCredential } from "@azure/identity";

import type { KeyClient, KeyVaultKey } from "@azure/keyvault-keys";
import { CryptographyClient } from "@azure/keyvault-keys";
import { authenticate, envSetupForPlayback } from "../utils/testAuthentication.js";
import type TestClient from "../utils/testClient.js";
import { stringToUint8Array, uint8ArrayToString } from "./../utils/crypto.js";
import { RsaCryptographyProvider } from "$internal/cryptography/rsaCryptographyProvider.js";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";

import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({
  toSupportTracing: toSupportTracing,
});

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

  describe("RSA keys", () => {
    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      await recorder.start(envSetupForPlayback);

      const authentication = await authenticate(recorder);
      client = authentication.client;
      testClient = authentication.testClient;
      credential = authentication.credential;
      keySuffix = authentication.keySuffix;
      keyName = recorder.variable("RSA", `RSA-${Math.floor(Math.random() * 100000)}`);
      keyVaultKey = await client.createKey(keyName, "RSA");
      cryptoClient = new CryptographyClient(
        keyVaultKey,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: !isLiveMode() }),
      );
    });

    afterEach(async function () {
      await testClient.flushKey(keyName);
      await recorder.stop();
    });

    if (isLiveMode()) {
      it("encrypt & decrypt with RSA1_5", async (ctx) => {
        const text = ctx.task.name;
        const encryptResult = await cryptoClient.encrypt({
          algorithm: "RSA1_5",
          plaintext: stringToUint8Array(text),
        });
        const decryptResult = await cryptoClient.decrypt({
          algorithm: "RSA1_5",
          ciphertext: encryptResult.result,
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("manually encrypt locally and decrypt remotely, both with RSA1_5", async (ctx) => {
        const text = ctx.task.name;
        const localProvider = new RsaCryptographyProvider(keyVaultKey.key!);
        const encryptResult = await localProvider.encrypt({
          algorithm: "RSA1_5",
          plaintext: Buffer.from(text),
        });
        const decryptResult = await cryptoClient.decrypt({
          algorithm: "RSA1_5",
          ciphertext: encryptResult.result,
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("encrypt & decrypt with RSA-OAEP", async (ctx) => {
        const text = ctx.task.name;
        const encryptResult = await cryptoClient.encrypt(
          {
            algorithm: "RSA-OAEP",
            plaintext: stringToUint8Array(text),
          },
          {},
        );
        const decryptResult = await cryptoClient.decrypt({
          algorithm: "RSA-OAEP",
          ciphertext: encryptResult.result,
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("manually encrypt locally and decrypt remotely, both with RSA-OAEP", async (ctx) => {
        const text = ctx.task.name;
        const localProvider = new RsaCryptographyProvider(keyVaultKey.key!);
        const encryptResult = await localProvider.encrypt({
          algorithm: "RSA-OAEP",
          plaintext: Buffer.from(text),
        });
        const decryptResult = await cryptoClient.decrypt({
          algorithm: "RSA-OAEP",
          ciphertext: encryptResult.result,
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("the CryptographyClient can be created from a full KeyVaultKey object", async (ctx) => {
        const customKeyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
        const customKeyVaultKey = await client.createKey(customKeyName, "RSA");
        const cryptoClientFromKey = new CryptographyClient(
          customKeyVaultKey,
          credential,
          recorder.configureClientOptions({ disableChallengeResourceVerification: !isLiveMode() }),
        );

        const text = ctx.task.name;
        const encryptResult = await cryptoClientFromKey.encrypt({
          algorithm: "RSA1_5",
          plaintext: stringToUint8Array(text),
        });
        const decryptResult = await cryptoClientFromKey.decrypt({
          algorithm: "RSA1_5",
          ciphertext: encryptResult.result,
        });
        const decryptedText = uint8ArrayToString(decryptResult.result);
        assert.equal(text, decryptedText);
      });

      it("wrap and unwrap with rsa1_5", async (ctx) => {
        if (!isLiveMode()) {
          console.log(
            "Wrapping and unwrapping don't cause a repeatable pattern, so these tests can only run in playback mode",
          );
          ctx.skip();
        }
        const text = "arepa";
        const wrapped = await cryptoClient.wrapKey("RSA1_5", stringToUint8Array(text));
        const unwrappedResult = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
        const unwrappedText = uint8ArrayToString(unwrappedResult.result);
        assert.equal(text, unwrappedText);
        assert.equal("RSA1_5", unwrappedResult.algorithm);
      });

      it("wrap and unwrap with RSA-OAEP", async (ctx) => {
        if (!isLiveMode()) {
          console.log(
            "Wrapping and unwrapping don't cause a repeatable pattern, so these tests can only run in playback mode",
          );
          ctx.skip();
        }
        const text = ctx.task.name;
        const wrapped = await cryptoClient.wrapKey("RSA-OAEP", stringToUint8Array(text));
        const unwrappedResult = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
        const unwrappedText = uint8ArrayToString(unwrappedResult.result);
        assert.equal(text, unwrappedText);
        assert.equal("RSA-OAEP", unwrappedResult.algorithm);
      });
    }

    it("sign and verify with RS256", async function (): Promise<void> {
      const signatureValue = Buffer.from("32 byte signature in ascii chars");
      const hash = createHash("SHA256");
      hash.update(signatureValue);

      const signature = await cryptoClient.sign("RS256", signatureValue);
      const verifyResult = await cryptoClient.verify("RS256", signatureValue, signature.result);

      assert.ok(verifyResult.result);
    });

    it("sign and verify data with RS256 (local verification)", async () => {
      const signatureValue = Buffer.from("32 byte signature in ascii chars");
      const signature = await cryptoClient.signData("RS256", signatureValue);
      const verifyResult = await cryptoClient.verifyData("RS256", signatureValue, signature.result);
      assert.ok(verifyResult.result);
    });

    describe("tracing", () => {
      it("traces through remote cryptography calls", async () => {
        if (isLiveMode()) {
          await expect(async (options: any) => {
            const encryptResult = await cryptoClient.encrypt(
              { algorithm: "RSA1_5", plaintext: stringToUint8Array("Hello, world") },
              options,
            );
            await cryptoClient.decrypt(
              { algorithm: "RSA1_5", ciphertext: encryptResult.result },
              options,
            );

            const signResult = await cryptoClient.signData(
              "RS256",
              stringToUint8Array("Message"),
              options,
            );
            await cryptoClient.verifyData(
              "RS256",
              stringToUint8Array("Message"),
              signResult.result,
              options,
            );
          }).toSupportTracing([
            "CryptographyClient.encrypt",
            "CryptographyClient.decrypt",
            "CryptographyClient.signData",
            "CryptographyClient.verifyData",
          ]);
        }
      });
    });
  });

  describe("RSA-HSM keys", () => {
    beforeEach(async (ctx) => {
      if (isLiveMode() && env.KEYVAULT_SKU !== "premium") {
        // RSA-HSM keys are only available in the premium KeyVault SKU which is not
        // available in all clouds.
        ctx.skip();
      }

      recorder = new Recorder(ctx);
      await recorder.start(envSetupForPlayback);

      const authentication = await authenticate(recorder);
      client = authentication.client;
      testClient = authentication.testClient;
      credential = authentication.credential;
      keySuffix = authentication.keySuffix;

      keyName = recorder.variable("RSA-HSM", `RSA-HSM-${Math.floor(Math.random() * 100000)}`);
      keyVaultKey = await client.createKey(keyName, "RSA-HSM");
      cryptoClient = new CryptographyClient(
        keyVaultKey.id!,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: !isLiveMode() }),
      );
    });

    afterEach(async function () {
      await testClient.flushKey(keyName);
      await recorder?.stop();
    });

    it("encrypt & decrypt with an RSA-HSM key and the RSA-OAEP algorithm", async (ctx) => {
      if (!isLiveMode()) {
        console.log("Encryption with RSA is not repeatable");
        ctx.skip();
      }
      const text = ctx.task.name;
      const encryptResult = await cryptoClient.encrypt("RSA-OAEP", stringToUint8Array(text));
      const decryptResult = await cryptoClient.decrypt("RSA-OAEP", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("encrypt & decrypt with an RSA-HSM key and the RSA1_5 algorithm", async (ctx) => {
      if (!isLiveMode()) {
        console.log("Encryption with RSA is not repeatable");
        ctx.skip();
      }
      const text = ctx.task.name;
      const encryptResult = await cryptoClient.encrypt("RSA1_5", stringToUint8Array(text));
      const decryptResult = await cryptoClient.decrypt("RSA1_5", encryptResult.result);
      const decryptedText = uint8ArrayToString(decryptResult.result);
      assert.equal(text, decryptedText);
    });

    it("wrap and unwrap with RSA-OAEP on a RSA-HSM key", async (ctx) => {
      if (!isLiveMode()) {
        console.log(
          "Wrapping and unwrapping don't cause a repeatable pattern, so this test can only run live",
        );
        ctx.skip();
      }
      const text = ctx.task.name;
      const wrapped = await cryptoClient.wrapKey("RSA-OAEP", stringToUint8Array(text));
      const unwrappedResult = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
      const unwrappedText = uint8ArrayToString(unwrappedResult.result);
      assert.equal(text, unwrappedText);
    });

    it("wrap and unwrap with RSA1_5 on a RSA-HSM key", async (ctx) => {
      if (!isLiveMode()) {
        console.log(
          "Wrapping and unwrapping don't cause a repeatable pattern, so this test can only run live",
        );
        ctx.skip();
      }
      const text = ctx.task.name;
      const wrapped = await cryptoClient.wrapKey("RSA1_5", stringToUint8Array(text));
      const unwrappedResult = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
      const unwrappedText = uint8ArrayToString(unwrappedResult.result);
      assert.equal(text, unwrappedText);
    });

    it("sign and verify with RS256 through an RSA-HSM key", async function (): Promise<void> {
      const signatureValue = Buffer.from("My Message");
      const hash = createHash("sha256");
      hash.update(signatureValue);
      const digest = hash.digest();
      const signature = await cryptoClient.sign("RS256", digest);
      const verifyResult = await cryptoClient.verify("RS256", digest, signature.result);
      assert.ok(verifyResult.result);
    });

    it("sign and verify data with RS256 through an RSA-HSM key (local verification)", async function (): Promise<void> {
      const signatureValue = Buffer.from("My Message");
      const signature = await cryptoClient.signData("RS256", signatureValue);
      const verifyResult = await cryptoClient.verifyData("RS256", signatureValue, signature.result);
      assert.ok(verifyResult.result);
    });

    it("sign and verify with RS384 through an RSA-HSM key", async function (): Promise<void> {
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
    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      await recorder.start(envSetupForPlayback);

      const authentication = await authenticate(recorder);
      client = authentication.client;
      testClient = authentication.testClient;
      credential = authentication.credential;
      keySuffix = authentication.keySuffix;

      keyName = recorder.variable("EC", `EC-${Math.floor(Math.random() * 100000)}`);
    });

    for (const [keyCurve, signatureAlgorithm, shaAlgorithm] of [
      ["P-256", "ES256", "SHA256"],
      ["P-256K", "ES256K", "SHA256"],
      ["P-384", "ES384", "SHA384"],
      ["P-521", "ES512", "SHA512"],
    ] as const) {
      it(`sign / signData and verify / verifyData using ${signatureAlgorithm}`, async function () {
        keyVaultKey = await client.createEcKey(keyName, { curve: keyCurve });
        // Implicitly test the getCryptographyClient method here
        cryptoClient = client.getCryptographyClient(
          keyVaultKey.name,
          recorder.configureClientOptions({
            keyVersion: keyVaultKey.properties.version,
          }),
        );
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
