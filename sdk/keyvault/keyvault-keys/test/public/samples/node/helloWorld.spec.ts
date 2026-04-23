// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates, reads, lists, and deletes keys.
 */

import { KeyClient } from "../../../src/index.js";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { retryWithBackoff } from "./utils.js";
import { createRsaKey, stringToUint8Array } from "./crypto.js";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("helloWorld", () => {
  let recorder: Recorder;
  let client: KeyClient;
  let hsmClient: KeyClient | undefined;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
        AZURE_MANAGEDHSM_URI: "https://azure_managedhsm.managedhsm.azure.net/",
        AZURE_KEYVAULT_ATTESTATION_URI: "https://azure_attestation.azurewebsites.net/",
      },
      removeCentralSanitizers: ["AZSDK3430"],
    });
    await recorder.setMatcher("BodilessMatcher");
    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    client = forPublishing(
      new KeyClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new KeyClient(process.env["KEYVAULT_URI"] || "<keyvault-url>", credential),
    );

    if (
      forPublishing(Boolean(process.env["AZURE_MANAGEDHSM_URI"]) || isPlaybackMode(), () =>
        Boolean(process.env["AZURE_MANAGEDHSM_URI"]),
      )
    ) {
      hsmClient = forPublishing(
        new KeyClient(
          assertEnvironmentVariable("AZURE_MANAGEDHSM_URI"),
          credential,
          recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
        ),
        () => new KeyClient(process.env["AZURE_MANAGEDHSM_URI"] || "<managedhsm-url>", credential),
      );
    } else {
      hsmClient = undefined;
    }
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create and get a key", async () => {
    // Create unique names for keys we will use in this sample
    const uniqueString = forPublishing(
      recorder.variable("uniqueString", `${Date.now()}`),
      () => `${Date.now()}`,
    );
    const keyName = `sample-key-${uniqueString}`;
    const ecKeyName = `sample-ec-key-${uniqueString}`;
    const rsaKeyName = `sample-rsa-key-${uniqueString}`;

    // You can create keys using the general method
    const result = await client.createKey(keyName, "EC");
    console.log("key: ", result);

    // Or using specialized key creation methods
    const ecResult = await client.createEcKey(ecKeyName, { curve: "P-256" });
    const rsaResult = await client.createRsaKey(rsaKeyName, { keySize: 2048 });
    console.log("Elliptic curve key: ", ecResult);
    console.log("RSA Key: ", rsaResult);

    // Get a specific key
    const key = await client.getKey(keyName);
    console.log("key: ", key);
  });

  it("list keys", async () => {
    // Or list the keys we have
    for await (const keyProperties of client.listPropertiesOfKeys()) {
      const innerKey = await client.getKey(keyProperties.name);
      console.log("key: ", innerKey);
    }
  });

  it("update and delete keys", async () => {
    const uniqueString = forPublishing(
      recorder.variable("uniqueString2", `${Date.now()}`),
      () => `${Date.now()}`,
    );
    const keyName = `sample-key-${uniqueString}`;

    const result = await client.createKey(keyName, "EC");

    // Update the key
    const updatedKey = await client.updateKeyProperties(keyName, result.properties.version!, {
      enabled: false,
    });
    console.log("updated key: ", updatedKey);

    // Delete the key - the key is soft-deleted but not yet purged
    const deletePoller = await client.beginDeleteKey(keyName);
    await deletePoller.pollUntilDone();

    // The `getDeletedKey` method can be used to retrieve any soft-deleted key
    const deletedKey = await client.getDeletedKey(keyName);
    console.log("deleted key: ", deletedKey);

    // Purge the key - the key is permanently deleted
    // This operation could take some time to complete
    console.time("purge a single key");
    await client.purgeDeletedKey(keyName);
    console.timeEnd("purge a single key");
  });

  it("create a key", async () => {
    // @snippet ReadmeSampleCreateKey
    const keyName = "MyKeyName";
    const result = await client.createKey(keyName, "RSA");
    console.log("result: ", result);
    // @snippet-end ReadmeSampleCreateKey
  });

  it("create an EC key", async () => {
    // @snippet ReadmeSampleCreateEcKey
    const keyName = "MyEcKeyName";
    const result = await client.createEcKey(keyName, { curve: "P-256" });
    console.log("result: ", result);
    // @snippet-end ReadmeSampleCreateEcKey
  });

  it("create an RSA key", async () => {
    // @snippet ReadmeSampleCreateRsaKey
    const keyName = "MyRsaKeyName";
    const result = await client.createRsaKey(keyName, { keySize: 2048 });
    console.log("result: ", result);
    // @snippet-end ReadmeSampleCreateRsaKey
  });

  it("create an OCT key", async () => {
    if (!forPublishing(Boolean(hsmClient), () => Boolean(hsmClient))) {
      return; // No HSM configured — skipping this sample.
    }

    // @snippet ReadmeSampleCreateOctKey
    const keyName = forPublishing(
      recorder.variable("octKeyName", `sample-oct-key-${Date.now()}`),
      () => "MyOctKeyName",
    );
    const result = await hsmClient!.createOctKey(keyName, { hsm: true });
    console.log("result: ", result);
    // @snippet-end ReadmeSampleCreateOctKey
  });

  it("import a key", async () => {
    // @snippet ReadmeSampleImportKey
    const keyName = forPublishing(
      recorder.variable("importKeyName", `sample-import-key-${Date.now()}`),
      () => "MyKey",
    );
    const jsonWebKey = createRsaKey();
    // @ts-preserve-whitespace
    const result = await client.importKey(keyName, jsonWebKey);
    // @snippet-end ReadmeSampleImportKey
  });

  it("get a cryptography client", async () => {
    // @snippet ReadmeSampleGetCryptographyClient
    // Get a cryptography client for a given key
    const cryptographyClient = client.getCryptographyClient("MyKey");
    // @snippet-end ReadmeSampleGetCryptographyClient
  });

  it("get a key", async () => {
    const keyName = forPublishing(
      recorder.variable("getKeyName", `sample-get-key-${Date.now()}`),
      () => "MyGetKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleGetKey
    const latestKey = await client.getKey(keyName);
    console.log(`Latest version of the key ${keyName}: `, latestKey);
    // @ts-preserve-whitespace
    const specificKey = await client.getKey(keyName, { version: latestKey.properties.version! });
    console.log(
      `The key ${keyName} at the version ${latestKey.properties.version!}: `,
      specificKey,
    );
    // @snippet-end ReadmeSampleGetKey
  });

  it("get key attestation", async () => {
    if (!forPublishing(Boolean(hsmClient), () => Boolean(hsmClient))) {
      return; // No HSM configured — skipping this sample.
    }

    const keyName = forPublishing(
      recorder.variable("attestKeyName", `sample-attest-key-${Date.now()}`),
      () => "MyAttestKeyName",
    );
    await hsmClient!.createRsaKey(keyName, { hsm: true });

    // @snippet ReadmeSampleGetKeyAttestation
    const latestKey = await hsmClient!.getKeyAttestation(keyName);
    console.log(`Latest version of the key ${keyName}: `, latestKey);
    // @ts-preserve-whitespace
    const specificKey = await hsmClient!.getKeyAttestation(keyName, {
      version: latestKey.properties.version!,
    });
    console.log(
      `The key ${keyName} at the version ${latestKey.properties.version!}: `,
      specificKey,
    );
    // @snippet-end ReadmeSampleGetKeyAttestation
  });

  it("create a key with attributes", async () => {
    // @snippet ReadmeSampleCreateKeyWithAttributes
    const keyName = "MyAttrKeyName";
    // @ts-preserve-whitespace
    const result = await client.createKey(keyName, "RSA", {
      enabled: false,
    });
    console.log("result: ", result);
    // @snippet-end ReadmeSampleCreateKeyWithAttributes
  });

  it("update key properties", async () => {
    // @snippet ReadmeSampleUpdateKeyProperties
    const keyName = "MyUpdateKeyName";
    // @ts-preserve-whitespace
    const result = await client.createKey(keyName, "RSA");
    await client.updateKeyProperties(keyName, result.properties.version, {
      enabled: false,
    });
    // @snippet-end ReadmeSampleUpdateKeyProperties
  });

  it("delete a key", async () => {
    const keyName = forPublishing(
      recorder.variable("deleteKeyName", `sample-del-key-${Date.now()}`),
      () => "MyDeleteKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleDeleteKey
    const poller = await client.beginDeleteKey(keyName);
    await poller.pollUntilDone();
    // @snippet-end ReadmeSampleDeleteKey
  });

  it("release a key", async () => {
    if (!forPublishing(Boolean(hsmClient), () => Boolean(hsmClient))) {
      return; // No HSM configured — skipping this sample.
    }

    const keyName = forPublishing(
      recorder.variable("releaseKeyName", `sample-release-key-${Date.now()}`),
      () => "myKey",
    );
    const attestationAuthority = forPublishing(
      assertEnvironmentVariable("AZURE_KEYVAULT_ATTESTATION_URI"),
      () => "<attestation-uri>",
    );
    const encodedReleasePolicy = stringToUint8Array(
      JSON.stringify({
        anyOf: [
          { anyOf: [{ claim: "sdk-test", equals: "true" }], authority: attestationAuthority },
        ],
        version: "1.0.0",
      }),
    );
    await hsmClient!.createRsaKey(keyName, {
      exportable: true,
      hsm: true,
      keyOps: ["encrypt", "decrypt"],
      releasePolicy: { encodedPolicy: encodedReleasePolicy },
    });
    // Fetch the attestation token from your Azure Attestation Service endpoint.
    // Example: const attestation = await fetch(attestationUri).then((r) => r.text());
    const attestation = forPublishing(
      await (async () => {
        if (!isPlaybackMode()) {
          const response = await createDefaultHttpClient().sendRequest(
            createPipelineRequest({ url: `${attestationAuthority}/generate-test-token` }),
          );
          const token = JSON.parse(response.bodyAsText!).token as string;
          recorder.variable("attestation", token);
          return token;
        }
        return recorder.variable("attestation", "");
      })(),
      () => "<attestation-token>",
    );

    // @snippet ReadmeSampleReleaseKey
    // @ts-preserve-whitespace
    const result = await hsmClient!.releaseKey(keyName, attestation);
    console.log("result: ", result);
    // @snippet-end ReadmeSampleReleaseKey
  });

  it("get a deleted key", async () => {
    const keyName = forPublishing(
      recorder.variable("getDeletedKeyName", `sample-getdel-key-${Date.now()}`),
      () => "MyGetDeletedKeyName",
    );
    await client.createKey(keyName, "RSA");
    const deletePoller = await client.beginDeleteKey(keyName);
    await deletePoller.pollUntilDone();

    // @snippet ReadmeSampleGetDeletedKey
    await client.getDeletedKey(keyName);
    // @snippet-end ReadmeSampleGetDeletedKey
  });

  it("purge a deleted key", async () => {
    const keyName = forPublishing(
      recorder.variable("purgeKeyName", `sample-purge-key-${Date.now()}`),
      () => "MyPurgeKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSamplePurgeDeletedKey
    const deletePoller = await client.beginDeleteKey(keyName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    await client.purgeDeletedKey(keyName);
    // @snippet-end ReadmeSamplePurgeDeletedKey
  });

  it("recover a deleted key", async () => {
    const keyName = forPublishing(
      recorder.variable("recoverKeyName", `sample-recover-key-${Date.now()}`),
      () => "MyRecoverKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleRecoverDeletedKey
    const deletePoller = await client.beginDeleteKey(keyName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    const recoverPoller = await client.beginRecoverDeletedKey(keyName);
    const recoveredKey = await recoverPoller.pollUntilDone();
    console.log("recoveredKey: ", recoveredKey);
    // @snippet-end ReadmeSampleRecoverDeletedKey
  });

  it("back up a key", async () => {
    const keyName = forPublishing(
      recorder.variable("backupKeyName", `sample-backup-key-${Date.now()}`),
      () => "MyBackupKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleBackupKey
    const backupContents = await client.backupKey(keyName);
    // @snippet-end ReadmeSampleBackupKey
  });

  it("restore a key from backup", async () => {
    const keyName = forPublishing(
      recorder.variable("restoreKeyName", `sample-restore-key-${Date.now()}`),
      () => "MyRestoreKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleRestoreKeyBackup
    const backupContents = await client.backupKey(keyName);
    // @ts-preserve-whitespace
    const deletePoller = await client.beginDeleteKey(keyName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    await client.purgeDeletedKey(keyName);
    // @ts-preserve-whitespace
    await retryWithBackoff(() => client.restoreKeyBackup(backupContents));
    // @snippet-end ReadmeSampleRestoreKeyBackup
  });

  it("get random bytes", async () => {
    if (!forPublishing(Boolean(hsmClient), () => Boolean(hsmClient))) {
      return; // No HSM configured — skipping this sample.
    }

    // @snippet ReadmeSampleGetRandomBytes
    const bytes = await hsmClient!.getRandomBytes(10);
    console.log("bytes: ", bytes);
    // @snippet-end ReadmeSampleGetRandomBytes
  });

  it("delete a key with soft delete", async () => {
    const keyName = forPublishing(
      recorder.variable("softDeleteKeyName", `sample-softdel-key-${Date.now()}`),
      () => "MySoftDeleteKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleDeleteKeySoftDelete
    const poller = await client.beginDeleteKey(keyName);
    // @ts-preserve-whitespace
    // You can use the deleted key immediately:
    const deletedKey = poller.getResult();
    // @ts-preserve-whitespace
    // The key is being deleted. Only wait for it if you want to restore it or purge it.
    await poller.pollUntilDone();
    // @ts-preserve-whitespace
    // You can also get the deleted key this way:
    await client.getDeletedKey(keyName);
    // @ts-preserve-whitespace
    // Deleted keys can also be recovered or purged:
    // @ts-preserve-whitespace
    // recoverDeletedKey also returns a poller, just like beginDeleteKey.
    const recoverPoller = await client.beginRecoverDeletedKey(keyName);
    await recoverPoller.pollUntilDone();
    // @ts-preserve-whitespace
    // If you recover the key, delete it again before purging it.
    const purgePoller = await client.beginDeleteKey(keyName);
    await purgePoller.pollUntilDone();
    // @ts-preserve-whitespace
    // And here is how to purge a deleted key
    await client.purgeDeletedKey(keyName);
    // @snippet-end ReadmeSampleDeleteKeySoftDelete
  });

  it("delete a key and wait for completion", async () => {
    const keyName = forPublishing(
      recorder.variable("deleteWaitKeyName", `sample-delwait-key-${Date.now()}`),
      () => "MyDeleteWaitKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleDeleteKeyWait
    const poller = await client.beginDeleteKey(keyName);
    // @ts-preserve-whitespace
    // You can use the deleted key immediately:
    let deletedKey = poller.getResult();
    // @ts-preserve-whitespace
    // Or you can wait until the key finishes being deleted:
    deletedKey = await poller.pollUntilDone();
    console.log(deletedKey);
    // @snippet-end ReadmeSampleDeleteKeyWait
  });

  it("delete a key and poll individually", async () => {
    const keyName = forPublishing(
      recorder.variable("deleteIndivKeyName", `sample-delindiv-key-${Date.now()}`),
      () => "MyDeletePollKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleDeleteKeyWaitIndividually
    const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteKey(keyName);
    // @ts-preserve-whitespace
    while (!poller.isDone()) {
      await poller.poll();
      await delay(5000);
    }
    // @ts-preserve-whitespace
    console.log(`The key ${keyName} is fully deleted`);
    // @snippet-end ReadmeSampleDeleteKeyWaitIndividually
  });

  it("list all keys", async () => {
    const keyName = forPublishing(
      recorder.variable("listAllKeysName", `sample-listall-key-${Date.now()}`),
      () => "MyListAllKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleListKeys
    for await (const keyProperties of client.listPropertiesOfKeys()) {
      console.log("Key properties: ", keyProperties);
    }
    // @ts-preserve-whitespace
    for await (const deletedKey of client.listDeletedKeys()) {
      console.log("Deleted: ", deletedKey);
    }
    // @ts-preserve-whitespace
    for await (const versionProperties of client.listPropertiesOfKeyVersions(keyName)) {
      console.log("Version properties: ", versionProperties);
    }
    // @snippet-end ReadmeSampleListKeys
  });

  it("list keys by page", async () => {
    const keyName = forPublishing(
      recorder.variable("listByPageKeysName", `sample-listpage-key-${Date.now()}`),
      () => "MyListPageKeyName",
    );
    await client.createKey(keyName, "RSA");

    // @snippet ReadmeSampleListKeysByPage
    for await (const page of client.listPropertiesOfKeys().byPage()) {
      for (const keyProperties of page) {
        console.log("Key properties: ", keyProperties);
      }
    }
    // @ts-preserve-whitespace
    for await (const page of client.listDeletedKeys().byPage()) {
      for (const deletedKey of page) {
        console.log("Deleted key: ", deletedKey);
      }
    }
    // @ts-preserve-whitespace
    for await (const page of client.listPropertiesOfKeyVersions(keyName).byPage()) {
      for (const versionProperties of page) {
        console.log("Version: ", versionProperties);
      }
    }
    // @snippet-end ReadmeSampleListKeysByPage
  });
});
