// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { ClientSecretCredential } from "@azure/identity";

import { CryptographyClient, KeyVaultKey, KeyClient, KnownSignatureAlgorithms } from "../../../src";
import { authenticate } from "../../utils/testAuthentication";
import { stringToUint8Array, uint8ArrayToString } from "../../utils/crypto";
import { getServiceVersion, onVersions } from "../../utils/utils.common";
import crypto from "crypto";

onVersions({ minVer: "7.2" }).describe(
  "CryptographyClient for managed HSM (skipped if MHSM is not deployed)",
  () => {
    let hsmClient: KeyClient;
    let cryptoClient: CryptographyClient;
    let recorder: Recorder;
    let credential: ClientSecretCredential;
    let keyVaultKey: KeyVaultKey;

    beforeEach(async function (this: Context) {
      const authentication = await authenticate(this, getServiceVersion());
      recorder = authentication.recorder;

      if (!authentication.hsmClient) {
        // Managed HSM is not deployed for this run due to service resource restrictions so we skip these tests.
        // This is only necessary while Managed HSM is in preview.
        this.skip();
      }

      hsmClient = authentication.hsmClient;
      credential = authentication.credential;
    });

    afterEach(async function (this: Context) {
      if (!this.test!.isPending()) {
        await recorder.stop();
      }
    });

    describe("with AES crypto algorithms", async function () {
      it("encrypts and decrypts using AES-GCM", async function (this: Context) {
        const keyName = recorder.getUniqueName("aes-gcm-crypto");
        keyVaultKey = await hsmClient.createKey(keyName, "AES", { keySize: 256 });
        cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);
        const text = this.test!.title;
        const encryptResult = await cryptoClient.encrypt({
          algorithm: "A256GCM",
          plaintext: stringToUint8Array(text),
        });
        assert.exists(encryptResult.iv);
        assert.exists(encryptResult.authenticationTag);

        const decryptResult = await cryptoClient.decrypt({
          algorithm: "A256GCM",
          ciphertext: encryptResult.result!,
          iv: encryptResult.iv!,
          authenticationTag: encryptResult.authenticationTag!,
        });
        assert.equal(text, uint8ArrayToString(decryptResult.result));
      });

      it("encrypts and decrypts using AES-CBC", async function (this: Context) {
        const keyName = recorder.getUniqueName("aes-cbc-crypto");
        keyVaultKey = await hsmClient.createKey(keyName, "AES", { keySize: 256 });
        cryptoClient = new CryptographyClient(keyVaultKey.id!, credential);
        const text = this.test!.title;
        // We are using a predictable IV to support our recorded tests; however, you should use a cryptographically secure IV or omit it and
        // let the client library generate it for you.
        const iv = stringToUint8Array("xxxxxxxxxxxxxxxx");
        const encryptResult = await cryptoClient.encrypt({
          algorithm: "A256CBCPAD",
          plaintext: stringToUint8Array(text),
          iv,
        });

        const decryptResult = await cryptoClient.decrypt({
          algorithm: "A256CBCPAD",
          ciphertext: encryptResult.result!,
          iv,
        });
        assert.equal(uint8ArrayToString(decryptResult.result), text);
      });
    });

    onVersions({ minVer: "7.3-preview" }).describe("with OKP keys", () => {
      it("supports sign and verify", async () => {
        const keyName = recorder.getUniqueName("okp-sign-verify");
        keyVaultKey = await hsmClient.createOkpKey(keyName);
        cryptoClient = hsmClient.getCryptographyClient(keyName);
        const message = stringToUint8Array("Hello, world!");
        const digest = crypto.createHash("SHA256").update(message).digest();

        const signResult = await cryptoClient.sign(KnownSignatureAlgorithms.EdDSA, digest);
        assert.equal(KnownSignatureAlgorithms.EdDSA, signResult.algorithm);
        assert.exists(signResult.result);
        assert.equal(signResult.keyID, keyVaultKey.id);

        const verifyResult = await cryptoClient.verify(
          KnownSignatureAlgorithms.EdDSA,
          digest,
          signResult.result
        );
        assert.isTrue(verifyResult.result);
      });

      it("supports signData and verifyData", async () => {
        const keyName = recorder.getUniqueName("okp-sign-verify");
        keyVaultKey = await hsmClient.createOkpKey(keyName);
        cryptoClient = hsmClient.getCryptographyClient(keyName);
        const message = stringToUint8Array("Hello, world!");

        const signResult = await cryptoClient.signData(KnownSignatureAlgorithms.EdDSA, message);
        assert.equal(KnownSignatureAlgorithms.EdDSA, signResult.algorithm);
        assert.exists(signResult.result);
        assert.equal(signResult.keyID, keyVaultKey.id);
        assert.equal("SHA256", signResult.hashAlgorithm);

        const verifyResult = await cryptoClient.verifyData(
          KnownSignatureAlgorithms.EdDSA,
          message,
          signResult.result
        );
        assert.isTrue(verifyResult.result);
        assert.equal("SHA256", verifyResult.hashAlgorithm);
      });

      it("supports signData and verifyData with a specified hash function", async () => {
        const keyName = recorder.getUniqueName("okp-sign-verify");
        keyVaultKey = await hsmClient.createOkpKey(keyName);
        cryptoClient = hsmClient.getCryptographyClient(keyName);
        const message = stringToUint8Array("Hello, world!");

        const signResult = await cryptoClient.signData(KnownSignatureAlgorithms.EdDSA, message, {
          hashAlgorithm: "SHA224",
        });
        assert.equal(KnownSignatureAlgorithms.EdDSA, signResult.algorithm);
        assert.exists(signResult.result);
        assert.equal(signResult.keyID, keyVaultKey.id);
        assert.equal("SHA224", signResult.hashAlgorithm);

        const verifyResult = await cryptoClient.verifyData(
          KnownSignatureAlgorithms.EdDSA,
          message,
          signResult.result,
          { hashAlgorithm: "SHA224" }
        );
        assert.isTrue(verifyResult.result);
        assert.equal("SHA224", signResult.hashAlgorithm);
      });
    });
  }
);
