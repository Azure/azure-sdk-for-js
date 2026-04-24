// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Uses an Azure Key Vault key to sign/verify, encrypt/decrypt, and wrap/unwrap data.
 */

import { CryptographyClient, KeyClient } from "../../../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createHash } from "node:crypto";
// Load the .env file if it exists
import "dotenv/config";

describe("cryptography", () => {
  let recorder: Recorder;
  let client: KeyClient;
  let credential: TokenCredential;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
      },
      removeCentralSanitizers: ["AZSDK3430"],
    });
    // Crypto operations produce non-deterministic request bodies (e.g. RSA padding),
    // so we disable body matching during playback.
    await recorder.setMatcher("CustomDefaultMatcher", { compareBodies: false });
    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    // Connection to Azure Key Vault
    client = forPublishing(
      new KeyClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new KeyClient(process.env["KEYVAULT_URI"]!, credential),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("encrypt and decrypt", async () => {
    const keyName = forPublishing(
      recorder.variable("cryptoKeyName", `crypto-sample-key${Date.now()}`),
      () => `crypto-sample-key${Date.now()}`,
    );

    // Connection to Azure Key Vault Cryptography functionality
    const myWorkKey = await client.createKey(keyName, "RSA");

    const cryptoClient = forPublishing(
      new CryptographyClient(
        myWorkKey.id!, // You can use either the key or the key Id i.e. its url to create a CryptographyClient.
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myWorkKey, credential),
    );
    const encrypt = await cryptoClient.encrypt({
      algorithm: "RSA-OAEP-256",
      plaintext: Buffer.from("My Message"),
    });
    console.log("encrypt result: ", encrypt);

    const decrypt = await cryptoClient.decrypt({
      algorithm: "RSA-OAEP-256",
      ciphertext: encrypt.result,
    });
    console.log("decrypt: ", decrypt.result.toString());
  });

  it("sign and verify", async () => {
    const keyName = forPublishing(
      recorder.variable("signKeyName", `crypto-sign-key${Date.now()}`),
      () => `crypto-sample-key${Date.now()}`,
    );

    // Connection to Azure Key Vault Cryptography functionality
    const myWorkKey = await client.createKey(keyName, "RSA");
    const cryptoClient = forPublishing(
      new CryptographyClient(
        myWorkKey.id!, // You can use either the key or the key Id i.e. its url to create a CryptographyClient.
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myWorkKey, credential),
    );

    // Sign and Verify
    const message = "MyMessage";
    const hash = createHash("sha256");
    const digest = hash.update(message).digest();
    console.log("digest: ", digest);

    const signature = await cryptoClient.sign("RS256", digest);
    console.log("sign result: ", signature);

    const verifyResult = await cryptoClient.verify("RS256", digest, signature.result);
    console.log("verify result: ", verifyResult);
  });

  it("wrap and unwrap key", async () => {
    const keyName = forPublishing(
      recorder.variable("wrapKeyName", `crypto-wrap-key${Date.now()}`),
      () => `crypto-sample-key${Date.now()}`,
    );

    const myWorkKey = await client.createKey(keyName, "RSA");
    const cryptoClient = forPublishing(
      new CryptographyClient(
        myWorkKey.id!, // You can use either the key or the key Id i.e. its url to create a CryptographyClient.
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myWorkKey, credential),
    );

    // Wrap and unwrap
    const wrapped = await cryptoClient.wrapKey("RSA-OAEP-256", Buffer.from("My Message"));
    console.log("wrap result: ", wrapped);

    const unwrapped = await cryptoClient.unwrapKey("RSA-OAEP-256", wrapped.result);
    console.log("unwrap result: ", unwrapped);
  });

  it("encrypt data", async () => {
    const keyName = forPublishing(
      recorder.variable("encryptKeyName", `crypto-encrypt-key${Date.now()}`),
      () => `sample-key-${Date.now()}`,
    );
    const myKey = await client.createKey(keyName, "RSA");
    const cryptographyClient = forPublishing(
      new CryptographyClient(
        myKey.id!,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myKey, credential),
    );

    // @snippet ReadmeSampleEncrypt
    const encryptResult = await cryptographyClient.encrypt({
      algorithm: "RSA1_5",
      plaintext: Buffer.from("My Message"),
    });
    console.log("encrypt result: ", encryptResult.result);
    // @snippet-end ReadmeSampleEncrypt
  });

  it("decrypt data", async () => {
    const keyName = forPublishing(
      recorder.variable("decryptKeyName", `crypto-decrypt-key${Date.now()}`),
      () => `sample-key-${Date.now()}`,
    );
    const myKey = await client.createKey(keyName, "RSA");
    const cryptographyClient = forPublishing(
      new CryptographyClient(
        myKey.id!,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myKey, credential),
    );

    // @snippet ReadmeSampleDecrypt
    const encryptResult = await cryptographyClient.encrypt({
      algorithm: "RSA1_5",
      plaintext: Buffer.from("My Message"),
    });
    console.log("encrypt result: ", encryptResult.result);
    // @ts-preserve-whitespace
    const decryptResult = await cryptographyClient.decrypt({
      algorithm: "RSA1_5",
      ciphertext: encryptResult.result,
    });
    console.log("decrypt result: ", decryptResult.result.toString());
    // @snippet-end ReadmeSampleDecrypt
  });

  it("sign a digest", async () => {
    const keyName = forPublishing(
      recorder.variable("signKeyName2", `crypto-sign-key2${Date.now()}`),
      () => `sample-key-${Date.now()}`,
    );
    const myKey = await client.createKey(keyName, "RSA");
    const cryptographyClient = forPublishing(
      new CryptographyClient(
        myKey,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myKey, credential),
    );

    // @snippet ReadmeSampleSign
    const message = "MyMessage";
    const hash = createHash("sha256");
    // @ts-preserve-whitespace
    const digest = hash.update(message).digest();
    console.log("digest: ", digest);
    // @ts-preserve-whitespace
    const signResult = await cryptographyClient.sign("RS256", digest);
    console.log("sign result: ", signResult.result);
    // @snippet-end ReadmeSampleSign
  });

  it("sign data", async () => {
    const keyName = forPublishing(
      recorder.variable("signDataKeyName", `crypto-signdata-key${Date.now()}`),
      () => `sample-key-${Date.now()}`,
    );
    const myKey = await client.createKey(keyName, "RSA");
    const cryptographyClient = forPublishing(
      new CryptographyClient(
        myKey,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myKey, credential),
    );

    // @snippet ReadmeSampleSignData
    const signResult = await cryptographyClient.signData("RS256", Buffer.from("My Message"));
    console.log("sign result: ", signResult.result);
    // @snippet-end ReadmeSampleSignData
  });

  it("verify a digest signature", async () => {
    const keyName = forPublishing(
      recorder.variable("verifyKeyName", `crypto-verify-key${Date.now()}`),
      () => `sample-key-${Date.now()}`,
    );
    const myKey = await client.createKey(keyName, "RSA");
    const cryptographyClient = forPublishing(
      new CryptographyClient(
        myKey,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myKey, credential),
    );

    // @snippet ReadmeSampleVerify
    const hash = createHash("sha256");
    hash.update("My Message");
    const digest = hash.digest();
    // @ts-preserve-whitespace
    const signResult = await cryptographyClient.sign("RS256", digest);
    console.log("sign result: ", signResult.result);
    // @ts-preserve-whitespace
    const verifyResult = await cryptographyClient.verify("RS256", digest, signResult.result);
    console.log("verify result: ", verifyResult.result);
    // @snippet-end ReadmeSampleVerify
  });

  it("verify a data signature", async () => {
    const keyName = forPublishing(
      recorder.variable("verifyDataKeyName", `crypto-verifydata-key${Date.now()}`),
      () => `sample-key-${Date.now()}`,
    );
    const myKey = await client.createKey(keyName, "RSA");
    const cryptographyClient = forPublishing(
      new CryptographyClient(
        myKey,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myKey, credential),
    );

    // @snippet ReadmeSampleVerifyData
    const buffer = Buffer.from("My Message");
    // @ts-preserve-whitespace
    const signResult = await cryptographyClient.signData("RS256", buffer);
    console.log("sign result: ", signResult.result);
    // @ts-preserve-whitespace
    const verifyResult = await cryptographyClient.verifyData("RS256", buffer, signResult.result);
    console.log("verify result: ", verifyResult.result);
    // @snippet-end ReadmeSampleVerifyData
  });

  it("wrap a key", async () => {
    const keyName = forPublishing(
      recorder.variable("wrapKeyName2", `crypto-wrap-key2${Date.now()}`),
      () => `sample-key-${Date.now()}`,
    );
    const myKey = await client.createKey(keyName, "RSA");
    const cryptographyClient = forPublishing(
      new CryptographyClient(
        myKey,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myKey, credential),
    );

    // @snippet ReadmeSampleWrapKey
    const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", Buffer.from("My Key"));
    console.log("wrap result:", wrapResult.result);
    // @snippet-end ReadmeSampleWrapKey
  });

  it("unwrap a key", async () => {
    const keyName = forPublishing(
      recorder.variable("unwrapKeyName", `crypto-unwrap-key${Date.now()}`),
      () => `sample-key-${Date.now()}`,
    );
    const myKey = await client.createKey(keyName, "RSA");
    const cryptographyClient = forPublishing(
      new CryptographyClient(
        myKey,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new CryptographyClient(myKey, credential),
    );

    // @snippet ReadmeSampleUnwrapKey
    const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", Buffer.from("My Key"));
    console.log("wrap result:", wrapResult.result);
    // @ts-preserve-whitespace
    const unwrapResult = await cryptographyClient.unwrapKey("RSA-OAEP", wrapResult.result);
    console.log("unwrap result: ", unwrapResult.result);
    // @snippet-end ReadmeSampleUnwrapKey
  });
});
