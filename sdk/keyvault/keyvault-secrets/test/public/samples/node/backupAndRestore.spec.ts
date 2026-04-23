// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Backs up an Azure Key Vault secret to a local file and restores from it.
 */

import { SecretClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { retryWithBackoff } from "./utils.js";
import { describe, it, beforeEach, afterEach } from "vitest";
import { readFile, writeFile } from "node:fs/promises";
// Load the .env file if it exists
import "dotenv/config";

describe("backupAndRestore", () => {
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
          process.env["KEYVAULT_URI"] || "<keyvault-url>",
          new DefaultAzureCredential(),
        ),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("backup and restore a secret", async () => {
    const secretName = forPublishing(
      recorder.variable("backupRestoreSecretName", `sample-backup-secret-${Date.now()}`),
      () => "MySecretName",
    );

    // Create our secret
    await client.setSecret(secretName, "XYZ789");

    // @snippet ReadmeSampleBackupSecret
    // Backup secret
    const backupResult = await client.backupSecret(secretName);
    // @snippet-end ReadmeSampleBackupSecret

    // Write the backup to a file
    await writeFile("secret_backup.dat", backupResult!);

    // Delete the secret
    const deletePoller = await client.beginDeleteSecret(secretName);
    await deletePoller.pollUntilDone();

    // Purge the deleted secret
    await client.purgeDeletedSecret(secretName);

    // @snippet ReadmeSampleRestoreSecret
    // Read our backup from a file
    const backupContents = await readFile("secret_backup.dat");
    // @ts-preserve-whitespace
    // Restore the secret
    const result = await retryWithBackoff(() => client.restoreSecretBackup(backupContents));
    console.log("Restored secret: ", result);
    // @snippet-end ReadmeSampleRestoreSecret

    // If we don't want to purge the secret later, we don't need to wait until this finishes
    await client.beginDeleteSecret(secretName);
  });
});
