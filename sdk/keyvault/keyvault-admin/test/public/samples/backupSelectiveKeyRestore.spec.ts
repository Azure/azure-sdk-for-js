// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a BackupClient to backup and restore a specific key in an Azure Key Vault Managed HSM using Azure Storage Blob.
 */

import { KeyVaultBackupClient } from "../../../src/index.js";
import { KeyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("backupSelectiveKeyRestore", () => {
  let recorder: Recorder;
  let client: KeyVaultBackupClient;
  let keyClient: KeyClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        AZURE_MANAGEDHSM_URI: "https://azure_managedhsm.managedhsm.azure.net/",
        BLOB_CONTAINER_NAME: "uri",
        BLOB_STORAGE_SAS_TOKEN: "blob_storage_sas_token",
        BLOB_STORAGE_URI: "https://uri.blob.core.windows.net/",
      },
      removeCentralSanitizers: ["AZSDK3493", "AZSDK3430", "AZSDK3444"],
    });

    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    const url = forPublishing(
      assertEnvironmentVariable("AZURE_MANAGEDHSM_URI"),
      () => process.env["AZURE_MANAGEDHSM_URI"] || "<managedhsm-url>",
    );
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());

    client = forPublishing(
      new KeyVaultBackupClient(
        url,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new KeyVaultBackupClient(url, credential),
    );
    keyClient = forPublishing(
      new KeyClient(
        url,
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new KeyClient(url, credential),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("begin selective key restore with SAS", async () => {
    // @snippet ReadmeSampleBeginSelectiveKeyRestore_SAS
    const blobStorageUri = `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`;
    const sasToken = forPublishing(
      assertEnvironmentVariable("BLOB_STORAGE_SAS_TOKEN"),
      () => "<sas-token>",
    );
    const keyName = forPublishing(
      recorder.variable("keyName", `key-${Date.now()}`),
      () => "<key-name>",
    );
    await keyClient.createRsaKey(keyName);
    const backupPoller = await client.beginBackup(blobStorageUri);
    const backupResult = await backupPoller.pollUntilDone();
    const backupFolderUri = forPublishing(backupResult.folderUri!, () => "<blob-storage-uri>");
    const poller = await forPublishing(
      client.beginSelectiveKeyRestore(keyName, backupFolderUri),
      () => client.beginSelectiveKeyRestore(keyName, backupFolderUri, sasToken),
    );
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await forPublishing(
      client.beginSelectiveKeyRestore(keyName, backupFolderUri, { resumeFrom: serialized }),
      () =>
        client.beginSelectiveKeyRestore(keyName, backupFolderUri, sasToken, {
          resumeFrom: serialized,
        }),
    );
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
    // @snippet-end ReadmeSampleBeginSelectiveKeyRestore_SAS
  });

  it("begin selective key restore without SAS", async () => {
    // @snippet ReadmeSampleBeginSelectiveKeyRestore_NonSAS
    const blobStorageUri = `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`;
    const keyName = forPublishing(
      recorder.variable("keyName", `key-${Date.now()}`),
      () => "<key-name>",
    );
    await keyClient.createRsaKey(keyName);
    const backupPoller = await client.beginBackup(blobStorageUri);
    const backupResult = await backupPoller.pollUntilDone();
    const backupFolderUri = forPublishing(backupResult.folderUri!, () => "<blob-storage-uri>");
    const poller = await client.beginSelectiveKeyRestore(keyName, backupFolderUri);
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginSelectiveKeyRestore(keyName, backupFolderUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
    // @snippet-end ReadmeSampleBeginSelectiveKeyRestore_NonSAS
  });

  it("backup and selective key restore (integration)", async () => {
    const keyName = forPublishing(
      recorder.variable("keyName", `key-${Date.now()}`),
      () => "key-name",
    );
    const key = await keyClient.createRsaKey(keyName);

    const sasToken = forPublishing(
      assertEnvironmentVariable("BLOB_STORAGE_SAS_TOKEN"),
      () => process.env["BLOB_STORAGE_SAS_TOKEN"] || "<blob-storage-sas-token>",
    );

    /**
     * Helper function to construct a valid blob container URI from its parts.
     */
    function buildBlobContainerUri(): string {
      const blobStorageUri = process.env["BLOB_STORAGE_URI"];
      if (!blobStorageUri) {
        throw new Error("Missing environment variable BLOB_STORAGE_URI.");
      }

      const blobContainerName = process.env["BLOB_CONTAINER_NAME"];
      if (!blobContainerName) {
        throw new Error("Missing environment variable BLOB_CONTAINER_NAME.");
      }

      // If there are trailing slashes, remove them before building the URI.
      return `${blobStorageUri.replace(/\/$/, "")}/${blobContainerName}`;
    }

    // Create a Uri with the storage container path.
    const blobContainerUri = buildBlobContainerUri();

    // Start the backup and wait for its completion.
    const backupPoller = await forPublishing(client.beginBackup(blobContainerUri), () =>
      client.beginBackup(blobContainerUri, sasToken),
    );
    const backupResult = await backupPoller.pollUntilDone();
    console.log("backupResult", backupResult);

    // Finally, start and wait for the restore operation using the folderUri returned from a previous backup operation.
    const selectiveKeyRestorePoller = await forPublishing(
      client.beginSelectiveKeyRestore(key.name, backupResult.folderUri!),
      () => client.beginSelectiveKeyRestore(key.name, backupResult.folderUri!, sasToken),
    );
    const restoreResult = await selectiveKeyRestorePoller.pollUntilDone();
    console.log("restoreResult", restoreResult);
  });
});
