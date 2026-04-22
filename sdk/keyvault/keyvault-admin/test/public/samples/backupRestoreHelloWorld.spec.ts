// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a BackupClient to backup and fully restore an Azure Key Vault Managed HSM using Azure Storage Blob.
 */

import { KeyVaultBackupClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("backupRestoreHelloWorld", () => {
  let recorder: Recorder;
  let client: KeyVaultBackupClient;

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
    client = forPublishing(
      new KeyVaultBackupClient(
        assertEnvironmentVariable("AZURE_MANAGEDHSM_URI"),
        createTestCredential(),
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () =>
        new KeyVaultBackupClient(
          process.env["AZURE_MANAGEDHSM_URI"] || "<managedhsm-url>",
          new DefaultAzureCredential(),
        ),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("begin pre-backup with SAS", async () => {
    // @snippet ReadmeSampleBeginPreBackup_SAS
    const blobStorageUri = forPublishing(
      `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`,
      () => "<blob-storage-uri>",
    ); // <Blob storage URL>/<folder name>
    const sasToken = forPublishing(
      assertEnvironmentVariable("BLOB_STORAGE_SAS_TOKEN"),
      () => "<sas-token>",
    );
    const poller = await forPublishing(client.beginPreBackup(blobStorageUri), () =>
      client.beginPreBackup(blobStorageUri, sasToken),
    );
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await forPublishing(client.beginPreBackup(blobStorageUri, { resumeFrom: serialized }), () =>
      client.beginPreBackup(blobStorageUri, sasToken, { resumeFrom: serialized }),
    );
    // @ts-preserve-whitespace
    // Waiting until it's done
    const result = await poller.pollUntilDone();
    console.log(result);
    // @snippet-end ReadmeSampleBeginPreBackup_SAS
  });

  it("begin pre-backup without SAS", async () => {
    // @snippet ReadmeSampleBeginPreBackup_NonSAS
    const blobStorageUri = forPublishing(
      `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`,
      () => "<blob-storage-uri>",
    ); // <Blob storage URL>/<folder name>
    const poller = await client.beginPreBackup(blobStorageUri);
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginPreBackup(blobStorageUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    const result = await poller.pollUntilDone();
    console.log(result);
    // @snippet-end ReadmeSampleBeginPreBackup_NonSAS
  });

  it("begin backup with SAS", async () => {
    // @snippet ReadmeSampleBeginBackup_SAS
    const blobStorageUri = forPublishing(
      `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`,
      () => "<blob-storage-uri>",
    ); // <Blob storage URL>/<folder name>
    const sasToken = forPublishing(
      assertEnvironmentVariable("BLOB_STORAGE_SAS_TOKEN"),
      () => "<sas-token>",
    );
    const poller = await forPublishing(client.beginBackup(blobStorageUri), () =>
      client.beginBackup(blobStorageUri, sasToken),
    );
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await forPublishing(client.beginBackup(blobStorageUri, { resumeFrom: serialized }), () =>
      client.beginBackup(blobStorageUri, sasToken, { resumeFrom: serialized }),
    );
    // @ts-preserve-whitespace
    // Waiting until it's done
    const backupUri = await poller.pollUntilDone();
    console.log(backupUri);
    // @snippet-end ReadmeSampleBeginBackup_SAS
  });

  it("begin backup without SAS", async () => {
    // @snippet ReadmeSampleBeginBackup_NonSAS
    const blobStorageUri = forPublishing(
      `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`,
      () => "<blob-storage-uri>",
    ); // <Blob storage URL>/<folder name>
    const poller = await client.beginBackup(blobStorageUri);
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginBackup(blobStorageUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    const backupUri = await poller.pollUntilDone();
    console.log(backupUri);
    // @snippet-end ReadmeSampleBeginBackup_NonSAS
  });

  it("begin restore with SAS", async () => {
    // @snippet ReadmeSampleBeginRestore_SAS
    const blobStorageUri = forPublishing(
      `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`,
      () => "<blob-storage-uri>",
    );
    const sasToken = forPublishing(
      assertEnvironmentVariable("BLOB_STORAGE_SAS_TOKEN"),
      () => "<sas-token>",
    );
    const backupResult = await client.beginBackup(blobStorageUri);
    const blobStorageFolderUri = forPublishing(
      (await backupResult.pollUntilDone()).folderUri!,
      () => "<blob-storage-uri>",
    ); // <Blob storage URL>/<folder name>
    const poller = await forPublishing(client.beginRestore(blobStorageFolderUri), () =>
      client.beginRestore(blobStorageFolderUri, sasToken),
    );
    // @ts-preserve-whitespace
    // The poller can be serialized with:
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await forPublishing(client.beginRestore(blobStorageFolderUri, { resumeFrom: serialized }), () =>
      client.beginRestore(blobStorageFolderUri, sasToken, { resumeFrom: serialized }),
    );
    // @ts-preserve-whitespace
    // Waiting until it's done
    const backupUri = await poller.pollUntilDone();
    console.log(backupUri);
    // @snippet-end ReadmeSampleBeginRestore_SAS
  });

  it("begin restore without SAS", async () => {
    // @snippet ReadmeSampleBeginRestore_NonSAS
    const blobStorageUri = forPublishing(
      `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`,
      () => "<blob-storage-uri>",
    );
    const backupResult = await client.beginBackup(blobStorageUri);
    const blobStorageFolderUri = forPublishing(
      (await backupResult.pollUntilDone()).folderUri!,
      () => "<blob-storage-uri>",
    ); // <Blob storage URL>/<folder name>
    const poller = await client.beginRestore(blobStorageFolderUri);
    // @ts-preserve-whitespace
    // The poller can be serialized with:
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginRestore(blobStorageFolderUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
    // @snippet-end ReadmeSampleBeginRestore_NonSAS
  });

  it("begin pre-restore with SAS", async () => {
    // @snippet ReadmeSampleBeginPreRestore_SAS
    const blobStorageUri = forPublishing(
      `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`,
      () => "<blob-storage-uri>",
    );
    const sasToken = forPublishing(
      assertEnvironmentVariable("BLOB_STORAGE_SAS_TOKEN"),
      () => "<sas-token>",
    );
    const backupResult = await client.beginBackup(blobStorageUri);
    const blobStorageFolderUri = forPublishing(
      (await backupResult.pollUntilDone()).folderUri!,
      () => "<blob-storage-uri>",
    ); // <Blob storage URL>/<folder name>
    const poller = await forPublishing(client.beginPreRestore(blobStorageFolderUri), () =>
      client.beginPreRestore(blobStorageFolderUri, sasToken),
    );
    // @ts-preserve-whitespace
    // The poller can be serialized with:
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await forPublishing(
      client.beginPreRestore(blobStorageFolderUri, { resumeFrom: serialized }),
      () => client.beginPreRestore(blobStorageFolderUri, sasToken, { resumeFrom: serialized }),
    );
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
    // @snippet-end ReadmeSampleBeginPreRestore_SAS
  });

  it("begin pre-restore without SAS", async () => {
    // @snippet ReadmeSampleBeginPreRestore_NonSAS
    const blobStorageUri = forPublishing(
      `${assertEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "")}/${assertEnvironmentVariable("BLOB_CONTAINER_NAME")}`,
      () => "<blob-storage-uri>",
    );
    const backupResult = await client.beginBackup(blobStorageUri);
    const blobStorageFolderUri = forPublishing(
      (await backupResult.pollUntilDone()).folderUri!,
      () => "<blob-storage-uri>",
    ); // <Blob storage URL>/<folder name>
    const poller = await client.beginPreRestore(blobStorageFolderUri);
    // @ts-preserve-whitespace
    // The poller can be serialized with:
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginPreRestore(blobStorageFolderUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
    // @snippet-end ReadmeSampleBeginPreRestore_NonSAS
  });

  it("backup and restore (integration)", async () => {
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

    // Finally, start and wait for the restore operation using the folderUri returned from a previous backup operation.
    const restorePoller = await forPublishing(client.beginRestore(backupResult.folderUri!), () =>
      client.beginRestore(backupResult.folderUri!, sasToken),
    );
    await restorePoller.pollUntilDone();
  });
});
