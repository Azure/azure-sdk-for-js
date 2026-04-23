// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Deletes a secret and then recovers a deleted secret (this sample requires soft-delete to run).
 */

import { SecretClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("deleteAndRecover", () => {
  let recorder: Recorder;
  let client: SecretClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
      },
      removeCentralSanitizers: ["AZSDK3430"],
    });
    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    client = forPublishing(
      new SecretClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        createTestCredential(),
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () =>
        new SecretClient(
          process.env["KEYVAULT_URI"],
          new DefaultAzureCredential(),
        ),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create secrets", async () => {
    const bankAccountSecretName = forPublishing(
      recorder.variable("createSecretsBankName", `sample-bank-secret-${Date.now()}`),
      () => "bankSecret",
    );
    const storageAccountSecretName = forPublishing(
      recorder.variable("createSecretsStorageName", `sample-storage-secret-${Date.now()}`),
      () => "storageSecret",
    );

    // Create our secrets
    console.log("Creating our secrets");
    await client.setSecret(bankAccountSecretName, "ABC123");
    await client.setSecret(storageAccountSecretName, "XYZ789");
  });

  it("delete and recover a secret", async () => {
    const bankAccountSecretName = forPublishing(
      recorder.variable("recoverSecretName", `sample-recover-secret-${Date.now()}`),
      () => "bankSecret",
    );
    await client.setSecret(bankAccountSecretName, "ABC123");

    // @snippet ReadmeSampleRecoverDeletedSecret
    // Oops, what happens if we delete the wrong one?
    console.log("Deleting secret: ", bankAccountSecretName);
    const deletePoller = await client.beginDeleteSecret(bankAccountSecretName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    console.log("Recovering secret");
    const recoverPoller = await client.beginRecoverDeletedSecret(bankAccountSecretName);
    const recoveredSecret = await recoverPoller.pollUntilDone();
    console.log(recoveredSecret);
    // @snippet-end ReadmeSampleRecoverDeletedSecret
  });

  it("delete and purge a secret", async () => {
    const bankAccountSecretName = forPublishing(
      recorder.variable("purgeSecretName", `sample-purge-secret-${Date.now()}`),
      () => "bankSecret",
    );
    await client.setSecret(bankAccountSecretName, "ABC123");

    // @snippet ReadmeSamplePurgeDeletedSecret
    // To actually delete it, we delete and then purge the secret
    // Delete the secret
    console.log("about to delete");
    const deletePoller = await client.beginDeleteSecret(bankAccountSecretName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    // Purge the deleted secret
    console.log("about to purge");
    await client.purgeDeletedSecret(bankAccountSecretName);
    // @snippet-end ReadmeSamplePurgeDeletedSecret

    for await (const deletedSecret of client.listDeletedSecrets()) {
      console.log(deletedSecret);
    }
  });

  it("get a deleted secret", async () => {
    const secretName = forPublishing(
      recorder.variable("getDeletedSecretName", `sample-get-deleted-secret-${Date.now()}`),
      () => "MySecretName",
    );
    await client.setSecret(secretName, "MySecretValue");
    const deletePoller = await client.beginDeleteSecret(secretName);
    await deletePoller.pollUntilDone();

    // @snippet ReadmeSampleGetDeletedSecret
    const result = await client.getDeletedSecret(secretName);
    // @snippet-end ReadmeSampleGetDeletedSecret
    console.log(result);
  });

  it("soft delete lifecycle", async () => {
    const secretName = forPublishing(
      recorder.variable("softDeleteSecretName", `sample-soft-delete-secret-${Date.now()}`),
      () => "MySoftDeleteSecret",
    );
    await client.setSecret(secretName, "MySecretValue");

    // @snippet ReadmeSampleDeleteSecretSoftDelete
    const poller = await client.beginDeleteSecret(secretName);
    // @ts-preserve-whitespace
    // You can use the deleted secret immediately:
    const deletedSecret = poller.getResult();
    // @ts-preserve-whitespace
    // The secret is being deleted. Only wait for it if you want to restore it or purge it.
    await poller.pollUntilDone();
    // @ts-preserve-whitespace
    // You can also get the deleted secret this way:
    await client.getDeletedSecret(secretName);
    // @ts-preserve-whitespace
    // Deleted secrets can also be recovered or purged.
    // @ts-preserve-whitespace
    // recoverDeletedSecret returns a poller, just like beginDeleteSecret.
    const recoverPoller = await client.beginRecoverDeletedSecret(secretName);
    await recoverPoller.pollUntilDone();
    // @ts-preserve-whitespace
    const purgePoller = await client.beginDeleteSecret(secretName);
    await purgePoller.pollUntilDone();
    // @ts-preserve-whitespace
    // And then, to purge the deleted secret:
    await client.purgeDeletedSecret(secretName);
    // @snippet-end ReadmeSampleDeleteSecretSoftDelete
  });

  it("delete and wait", async () => {
    const secretName = forPublishing(
      recorder.variable("deleteWaitSecretName", `sample-delete-wait-secret-${Date.now()}`),
      () => "MyDeleteWaitSecret",
    );
    await client.setSecret(secretName, "MySecretValue");

    // @snippet ReadmeSampleDeleteSecretWait
    const poller = await client.beginDeleteSecret(secretName);
    // @ts-preserve-whitespace
    // You can use the deleted secret immediately:
    let deletedSecret = poller.getResult();
    // @ts-preserve-whitespace
    // Or you can wait until the secret finishes being deleted:
    deletedSecret = await poller.pollUntilDone();
    console.log(deletedSecret);
    // @snippet-end ReadmeSampleDeleteSecretWait
  });

  it("delete and poll individually", async () => {
    const secretName = forPublishing(
      recorder.variable("deletePollSecretName", `sample-delete-poll-secret-${Date.now()}`),
      () => "MyDeletePollSecret",
    );
    await client.setSecret(secretName, "MySecretValue");

    // @snippet ReadmeSampleDeleteSecretWaitIndividually
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteSecret(secretName);
    while (!poller.isDone()) {
      await poller.poll();
      await delay(5000);
    }
    // @ts-preserve-whitespace
    console.log(`The secret ${secretName} is fully deleted`);
    // @snippet-end ReadmeSampleDeleteSecretWaitIndividually
  });
});
