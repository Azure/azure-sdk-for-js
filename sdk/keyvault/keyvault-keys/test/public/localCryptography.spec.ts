// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { CryptographyClient, KeyClient, KeyVaultKey, SignatureAlgorithm } from "../../src";
import { isNode } from "@azure/core-util";
import { createHash } from "crypto";
import { authenticate, envSetupForPlayback } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { Recorder, env, isLiveMode } from "@azure-tools/test-recorder";
import { ClientSecretCredential } from "@azure/identity";
import { RsaCryptographyProvider } from "../../src/cryptography/rsaCryptographyProvider";
import { getServiceVersion } from "./utils/common";
import { assert } from "@azure/test-utils";

describe("Local cryptography public tests", () => {
  const keyPrefix = `localCrypto${env.KEY_NAME || "KeyName"}`;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;
  let credential: ClientSecretCredential;
  let keySuffix: string;

  if (!isNode) {
    // Local cryptography is only supported in NodeJS
    return;
  }

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(envSetupForPlayback);

    const authentication = await authenticate(getServiceVersion(), recorder);
    client = authentication.client;
    testClient = authentication.testClient;
    credential = authentication.credential;
    keySuffix = authentication.keySuffix;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  describe("When using a local JsonWebToken", function () {
    let customKeyName;
    let customKeyVaultKey: KeyVaultKey;
    let cryptoClientFromKey: CryptographyClient;

    beforeEach(async function (this: Context) {
      customKeyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
      customKeyVaultKey = await client.createKey(customKeyName, "RSA");
      cryptoClientFromKey = new CryptographyClient(customKeyVaultKey.key!);
    });

    it("the CryptographyClient can be created from a local JsonWebKey object", async function () {
      assert.isEmpty(cryptoClientFromKey.vaultUrl);
      assert.equal(cryptoClientFromKey.keyID, customKeyVaultKey.id);
    });

    describe("when using an unsupported algorithm", function () {
      it("throws on encrypt", async function () {
        await assert.isRejected(
          cryptoClientFromKey.encrypt("foo", Buffer.from("bar")),
          /using a local JsonWebKey/
        );
      });

      it("throws on wrapKey", async function () {
        await assert.isRejected(
          cryptoClientFromKey.wrapKey("A128KW", Buffer.from("bar")),
          /using a local JsonWebKey/
        );
      });

      it("throws on sign", async function () {
        await assert.isRejected(
          cryptoClientFromKey.sign("RSA1_5", Buffer.from("bar")),
          /using a local JsonWebKey/
        );
      });

      it("throws on signData", async function () {
        await assert.isRejected(
          cryptoClientFromKey.signData("PS360", Buffer.from("bar")),
          /using a local JsonWebKey/
        );
      });

      it("throws on verify", async function () {
        await assert.isRejected(
          cryptoClientFromKey.verify("PS360", Buffer.from("bar"), Buffer.from("baz")),
          /using a local JsonWebKey/
        );
      });

      it("throws on verifyData", async function () {
        await assert.isRejected(
          cryptoClientFromKey.verifyData("PS360", Buffer.from("bar"), Buffer.from("baz")),
          /using a local JsonWebKey/
        );
      });
    });

    describe("when using an unsupported operation", function () {
      it("throws on decrypt", async function () {
        await assert.isRejected(
          cryptoClientFromKey.decrypt("RSA1_5", Buffer.from("bar")),
          /using a local JsonWebKey/
        );
      });

      it("throws on unwrapKey", async function () {
        await assert.isRejected(
          cryptoClientFromKey.unwrapKey("RSA1_5", Buffer.from("bar")),
          /using a local JsonWebKey/
        );
      });
    });
  });

  it("encrypt & decrypt RSA1_5", async function (this: Context) {
    if (!isLiveMode()) {
      console.log("Skipping test, Local encryption can't be tested on playback");
      this.skip();
    }
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyVaultKey = await client.createKey(keyName, "RSA");
    const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential, {
      disableChallengeResourceVerification: !isLiveMode(),
    });

    const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
    const text = Buffer.from(this.test!.title);
    const encrypted = await localCryptoClient.encrypt("RSA1_5", text);
    const unwrapped = await cryptoClient.decrypt("RSA1_5", encrypted.result);
    assert.deepEqual(unwrapped.result, text);
    await testClient.flushKey(keyName);
  });

  it("encrypt & decrypt RSA-OAEP", async function (this: Context) {
    if (!isLiveMode()) {
      console.log("Skipping test, Local encryption can't be tested on playback");
      this.skip();
    }
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyVaultKey = await client.createKey(keyName, "RSA");
    const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential, {
      disableChallengeResourceVerification: !isLiveMode(),
    });

    const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
    const text = Buffer.from(this.test!.title);
    const encrypted = await localCryptoClient.encrypt("RSA-OAEP", text);
    const unwrapped = await cryptoClient.decrypt("RSA-OAEP", encrypted.result);
    assert.deepEqual(unwrapped.result, text);
    await testClient.flushKey(keyName);
  });

  it("wrapKey & unwrapKey RSA1_5", async function (this: Context) {
    if (!isLiveMode()) {
      console.log("Skipping test, Local encryption can't be tested on playback");
      this.skip();
    }
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyVaultKey = await client.createKey(keyName, "RSA");
    const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential, {
      disableChallengeResourceVerification: !isLiveMode(),
    });

    const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
    const data = Buffer.from("arepa");
    const wrapped = await localCryptoClient.wrapKey("RSA1_5", data);

    // Local Cryptography Client part
    // unwrapKey is not implemented locally yet
    const unwrapped = await cryptoClient.unwrapKey("RSA1_5", wrapped.result);
    assert.deepEqual(unwrapped.result, data);
    await testClient.flushKey(keyName);
  });

  it("wrapKey & unwrapKey RSA-OAEP", async function (this: Context) {
    if (!isLiveMode()) {
      console.log("Skipping test, Local encryption can't be tested on playback");
      this.skip();
    }
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyVaultKey = await client.createKey(keyName, "RSA");
    const cryptoClient = new CryptographyClient(keyVaultKey.id!, credential, {
      disableChallengeResourceVerification: !isLiveMode(),
    });

    const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
    const data = Buffer.from("arepa");
    const wrapped = await localCryptoClient.wrapKey("RSA-OAEP", data);

    // Local Cryptography Client part
    // unwrapKey is not implemented locally yet
    const unwrapped = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
    assert.deepEqual(unwrapped.result, data);
    await testClient.flushKey(keyName);
  });

  describe("verify", () => {
    const rsaProvider = new RsaCryptographyProvider({});
    const localSupportedAlgorithmNames = Object.keys(rsaProvider.signatureAlgorithmToHashAlgorithm);

    for (const localAlgorithmName of localSupportedAlgorithmNames) {
      it(localAlgorithmName, async function (this: Context): Promise<void> {
        if (!isNode) {
          console.log(
            `Skipping test, Local sign of algorithm ${localAlgorithmName} is only supported in NodeJS`
          );
          this.skip();
        }

        const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
        const keyVaultKey = await client.createKey(keyName, "RSA");
        const cryptoClient = new CryptographyClient(
          keyVaultKey.id!,
          credential,
          recorder.configureClientOptions({ disableChallengeResourceVerification: !isLiveMode() })
        );

        // Sign is not implemented yet.
        // This boils down to the JWK to PEM conversion, which doesn't support private keys at the moment.
        const signatureValue = this.test!.title;
        const hash = createHash(rsaProvider.signatureAlgorithmToHashAlgorithm[localAlgorithmName]);
        hash.update(signatureValue);
        const digest = hash.digest();
        const signature = await cryptoClient.sign(localAlgorithmName as SignatureAlgorithm, digest);

        // Local Cryptography Client part
        const localCryptoClient = new CryptographyClient(keyVaultKey.key!);
        const verifyResult = await localCryptoClient.verifyData(
          localAlgorithmName,
          digest,
          signature.result
        );
        assert.ok(verifyResult);

        await testClient.flushKey(keyName);
      });
    }
  });
});
