// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.EndpointTests`.

import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type {
  AzureMultiCloudConnectorEndpointProperties,
  AzureStorageNfsFileShareEndpointProperties,
  S3WithHmacEndpointProperties,
  StorageMoverClient,
} from "../../src/index.js";
import {
  AWS_S3_BUCKET_ID,
  CONTAINER_NAME,
  MULTI_CLOUD_CONNECTOR_ID,
  createStorageMover,
  deleteResourceGroup,
  getSubscriptionId,
  nameFor,
  provisionResourceGroup,
  setupRecorder,
  storageAccountResourceIdFor,
} from "./testHelper.js";

const RESOURCE_GROUP_NAME = "testsmrg-js-endpoint";
const FILE_SHARE_NAME = "testfileshare";
const NFS_FILE_SHARE_NAME = "testnfsfileshare";
const SHARE_NAME = "testshare";

describe("EndpointTests", () => {
  let recorder: Recorder;
  let client: StorageMoverClient;
  let subscriptionId: string;
  /**
   * Per-file shared storage mover. The .NET tests all use a single
   * `testsm1` mover for endpoint scenarios; we mirror that here to keep test
   * bodies focused on endpoint semantics.
   */
  let storageMoverName: string;

  beforeAll(async () => {
    subscriptionId = getSubscriptionId();
    await provisionResourceGroup(subscriptionId, RESOURCE_GROUP_NAME);
  });

  afterAll(async () => {
    await deleteResourceGroup(subscriptionId, RESOURCE_GROUP_NAME);
  });

  beforeEach(async (ctx) => {
    ({ recorder, client } = await setupRecorder(ctx));
    storageMoverName = nameFor(recorder, "storageMoverName", "testsm-");
    await createStorageMover(client, RESOURCE_GROUP_NAME, storageMoverName);
  });

  afterEach(async () => {
    // Best-effort: try to delete the per-test mover (and all its endpoints).
    try {
      const poller = client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName);
      await poller.pollUntilDone();
    } catch {
      // Recorder might already be stopped or the mover might not exist; swallow.
    }
    if (recorder) {
      await recorder.stop();
    }
  });

  function accountResourceId(): string {
    return storageAccountResourceIdFor(subscriptionId, RESOURCE_GROUP_NAME);
  }

  // --------------------------------------------------------------------------
  // 1. CreateUpdateGetDelete — covers blob + NFS-mount + SMB-mount + SMB file
  //    share. SMB update uses the `identity: { type: "None" }` workaround.
  // --------------------------------------------------------------------------
  it("creates, gets, updates, and deletes blob/nfs/smb/file-share endpoints", async () => {
    const cEndpointName = nameFor(recorder, "cEndpointName", "conendpoint-");
    const nfsEndpointName = nameFor(recorder, "nfsEndpointName", "nfsendpoint-");
    const smbEndpointName = nameFor(recorder, "smbEndpointName", "smbendpoint-");
    const fsEndpointName = nameFor(recorder, "fsEndpointName", "fsendpoint-");

    // --- Blob container endpoint ---
    let cEndpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      cEndpointName,
      {
        properties: {
          endpointType: "AzureStorageBlobContainer",
          storageAccountResourceId: accountResourceId(),
          blobContainerName: CONTAINER_NAME,
          description: "New container endpoint",
        },
      },
    );
    assert.equal(cEndpoint.name, cEndpointName);
    assert.equal(cEndpoint.properties.endpointType, "AzureStorageBlobContainer");

    cEndpoint = await client.endpoints.get(RESOURCE_GROUP_NAME, storageMoverName, cEndpointName);
    assert.equal(cEndpoint.name, cEndpointName);
    assert.equal(cEndpoint.properties.endpointType, "AzureStorageBlobContainer");

    // --- NFS mount endpoint ---
    let nfsEndpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      nfsEndpointName,
      {
        properties: {
          endpointType: "NfsMount",
          host: "10.0.0.1",
          export: "/",
          description: "New NFS endpoint",
        },
      },
    );
    assert.equal(nfsEndpoint.name, nfsEndpointName);
    assert.equal(nfsEndpoint.properties.endpointType, "NfsMount");

    nfsEndpoint = await client.endpoints.get(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      nfsEndpointName,
    );
    assert.equal(nfsEndpoint.properties.endpointType, "NfsMount");

    // --- SMB mount endpoint (create + update + delete) ---
    const usernameUri = "https://examples-azureKeyVault.vault.azure.net/secrets/examples-username";
    const passwordUri = "https://examples-azureKeyVault.vault.azure.net/secrets/examples-password";
    let smbEndpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      smbEndpointName,
      {
        properties: {
          endpointType: "SmbMount",
          host: "10.0.0.1",
          shareName: SHARE_NAME,
          description: "New Smb mount endpoint",
          credentials: {
            type: "AzureKeyVaultSmb",
            usernameUri,
            passwordUri,
          },
        },
      },
    );
    assert.equal(smbEndpoint.name, smbEndpointName);
    assert.equal(smbEndpoint.properties.endpointType, "SmbMount");

    // SMB update — playbook says the RP (api-version 2025-12-01) requires
    // `identity` at the top level on PATCH or it returns 400. JS-generated
    // `EndpointBaseUpdateParameters` exposes `identity?: ManagedServiceIdentity`
    // (see src/models/models.ts:1503-1519), so we can pass it through the typed
    // surface; no `pathUnchecked` workaround needed.
    smbEndpoint = await client.endpoints.update(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      smbEndpointName,
      {
        identity: { type: "None" },
        properties: {
          endpointType: "SmbMount",
          description: "Update endpoint",
          credentials: { type: "AzureKeyVaultSmb", usernameUri: "", passwordUri: "" },
        },
      },
    );
    assert.equal(smbEndpoint.name, smbEndpointName);
    assert.equal(smbEndpoint.properties.endpointType, "SmbMount");

    const smbDelete = client.endpoints.delete(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      smbEndpointName,
    );
    await smbDelete.pollUntilDone();

    // --- SMB file share endpoint ---
    let fsEndpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      fsEndpointName,
      {
        properties: {
          endpointType: "AzureStorageSmbFileShare",
          storageAccountResourceId: accountResourceId(),
          fileShareName: FILE_SHARE_NAME,
          description: "new file share endpoint",
        },
      },
    );
    assert.equal(fsEndpoint.name, fsEndpointName);
    assert.equal(fsEndpoint.properties.endpointType, "AzureStorageSmbFileShare");

    fsEndpoint = await client.endpoints.get(RESOURCE_GROUP_NAME, storageMoverName, fsEndpointName);
    assert.equal(fsEndpoint.properties.endpointType, "AzureStorageSmbFileShare");

    // --- List + exists ---
    const names = new Set<string>();
    for await (const e of client.endpoints.list(RESOURCE_GROUP_NAME, storageMoverName)) {
      if (e.name) names.add(e.name);
    }
    assert.ok(
      names.has(cEndpointName) && names.has(nfsEndpointName) && names.has(fsEndpointName),
      `expected blob, NFS, and file-share endpoints in list; got ${[...names].join(",")}`,
    );
    assert.ok(!names.has(smbEndpointName), "SMB endpoint should have been deleted");
  });

  // --------------------------------------------------------------------------
  // 2. MultiCloudConnectorEndpointCreateGetDelete
  // --------------------------------------------------------------------------
  it("creates, gets, and deletes a multi-cloud connector endpoint", async () => {
    const endpointName = nameFor(recorder, "endpointName", "mcc-");

    let endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "AzureMultiCloudConnector",
          multiCloudConnectorId: MULTI_CLOUD_CONNECTOR_ID,
          awsS3BucketId: AWS_S3_BUCKET_ID,
          description: "Test multi-cloud connector endpoint",
        },
      },
    );
    assert.equal(endpoint.name, endpointName);
    assert.equal(endpoint.properties.endpointType, "AzureMultiCloudConnector");

    endpoint = await client.endpoints.get(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    assert.equal(endpoint.name, endpointName);
    if (endpoint.properties.endpointType === "AzureMultiCloudConnector") {
      const mccProps = endpoint.properties as AzureMultiCloudConnectorEndpointProperties;
      assert.ok(mccProps.multiCloudConnectorId);
      assert.ok(mccProps.awsS3BucketId);
    }

    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });

  // --------------------------------------------------------------------------
  // 3. S3WithHmacEndpointCreateGetDelete — NOT skipped per playbook; placeholder
  //    URIs are accepted by the RP at metadata level (the .NET `[Ignore]` is
  //    incorrect).
  // --------------------------------------------------------------------------
  it("creates, gets, and deletes an S3-with-HMAC endpoint", async () => {
    const endpointName = nameFor(recorder, "endpointName", "s3hmac-");

    let endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "S3WithHMAC",
          sourceUri: "https://s3.example.com/bucket",
          sourceType: "MINIO",
          description: "Test S3 with HMAC endpoint",
          credentials: {
            type: "AzureKeyVaultS3WithHMAC",
            accessKeyUri:
              "https://examples-azureKeyVault.vault.azure.net/secrets/examples-accesskey",
            secretKeyUri:
              "https://examples-azureKeyVault.vault.azure.net/secrets/examples-secretkey",
          },
        },
      },
    );
    assert.equal(endpoint.name, endpointName);
    assert.equal(endpoint.properties.endpointType, "S3WithHMAC");

    endpoint = await client.endpoints.get(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    if (endpoint.properties.endpointType === "S3WithHMAC") {
      const s3Props = endpoint.properties as S3WithHmacEndpointProperties;
      assert.equal(s3Props.sourceUri, "https://s3.example.com/bucket");
      assert.equal(s3Props.sourceType, "MINIO");
    }

    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });

  // --------------------------------------------------------------------------
  // EndpointKind validation — valid kinds (7 tests).
  // --------------------------------------------------------------------------
  it("creates an NFS-mount endpoint with kind=Source", async () => {
    const endpointName = nameFor(recorder, "endpointName", "nfs-src-");
    const endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "NfsMount",
          host: "10.0.0.1",
          export: "/",
          endpointKind: "Source",
        },
      },
    );
    assert.equal(endpoint.properties.endpointKind, "Source");
    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });

  it("creates an SMB-mount endpoint with kind=Source", async () => {
    const endpointName = nameFor(recorder, "endpointName", "smb-src-");
    const endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "SmbMount",
          host: "10.0.0.1",
          shareName: SHARE_NAME,
          endpointKind: "Source",
        },
      },
    );
    assert.equal(endpoint.properties.endpointKind, "Source");
    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });

  it("creates a multi-cloud connector endpoint with kind=Source", async () => {
    const endpointName = nameFor(recorder, "endpointName", "mcc-src-");
    const endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "AzureMultiCloudConnector",
          multiCloudConnectorId: MULTI_CLOUD_CONNECTOR_ID,
          awsS3BucketId: AWS_S3_BUCKET_ID,
          endpointKind: "Source",
        },
      },
    );
    assert.equal(endpoint.properties.endpointKind, "Source");
    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });

  it("creates a blob container endpoint with kind=Source", async () => {
    const endpointName = nameFor(recorder, "endpointName", "blob-src-");
    const endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "AzureStorageBlobContainer",
          storageAccountResourceId: accountResourceId(),
          blobContainerName: CONTAINER_NAME,
          endpointKind: "Source",
        },
      },
    );
    assert.equal(endpoint.properties.endpointKind, "Source");
    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });

  it("creates a blob container endpoint with kind=Target", async () => {
    const endpointName = nameFor(recorder, "endpointName", "blob-tgt-");
    const endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "AzureStorageBlobContainer",
          storageAccountResourceId: accountResourceId(),
          blobContainerName: CONTAINER_NAME,
          endpointKind: "Target",
        },
      },
    );
    assert.equal(endpoint.properties.endpointKind, "Target");
    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });

  it("creates an SMB file share endpoint with kind=Target", async () => {
    const endpointName = nameFor(recorder, "endpointName", "smbfs-tgt-");
    const endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "AzureStorageSmbFileShare",
          storageAccountResourceId: accountResourceId(),
          fileShareName: FILE_SHARE_NAME,
          endpointKind: "Target",
        },
      },
    );
    assert.equal(endpoint.properties.endpointKind, "Target");
    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });

  it("creates an NFS file share endpoint with kind=Target", async () => {
    const endpointName = nameFor(recorder, "endpointName", "nfsfs-tgt-");
    const endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "AzureStorageNfsFileShare",
          storageAccountResourceId: accountResourceId(),
          fileShareName: NFS_FILE_SHARE_NAME,
          endpointKind: "Target",
        },
      },
    );
    assert.equal(endpoint.properties.endpointKind, "Target");
    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });

  // --------------------------------------------------------------------------
  // EndpointKind validation — invalid kinds (5 tests). Each must reject.
  // --------------------------------------------------------------------------
  it("rejects an NFS-mount endpoint with kind=Target", async () => {
    const endpointName = nameFor(recorder, "endpointName", "nfs-tgt-");
    await expect(
      client.endpoints.createOrUpdate(RESOURCE_GROUP_NAME, storageMoverName, endpointName, {
        properties: {
          endpointType: "NfsMount",
          host: "10.0.0.1",
          export: "/",
          endpointKind: "Target",
        },
      }),
    ).rejects.toThrow();
  });

  it("rejects an SMB-mount endpoint with kind=Target", async () => {
    const endpointName = nameFor(recorder, "endpointName", "smb-tgt-");
    await expect(
      client.endpoints.createOrUpdate(RESOURCE_GROUP_NAME, storageMoverName, endpointName, {
        properties: {
          endpointType: "SmbMount",
          host: "10.0.0.1",
          shareName: SHARE_NAME,
          endpointKind: "Target",
        },
      }),
    ).rejects.toThrow();
  });

  it("rejects a multi-cloud connector endpoint with kind=Target", async () => {
    const endpointName = nameFor(recorder, "endpointName", "mcc-tgt-");
    await expect(
      client.endpoints.createOrUpdate(RESOURCE_GROUP_NAME, storageMoverName, endpointName, {
        properties: {
          endpointType: "AzureMultiCloudConnector",
          multiCloudConnectorId: MULTI_CLOUD_CONNECTOR_ID,
          awsS3BucketId: AWS_S3_BUCKET_ID,
          endpointKind: "Target",
        },
      }),
    ).rejects.toThrow();
  });

  it("rejects an SMB file share endpoint with kind=Source", async () => {
    const endpointName = nameFor(recorder, "endpointName", "smbfs-src-");
    await expect(
      client.endpoints.createOrUpdate(RESOURCE_GROUP_NAME, storageMoverName, endpointName, {
        properties: {
          endpointType: "AzureStorageSmbFileShare",
          storageAccountResourceId: accountResourceId(),
          fileShareName: FILE_SHARE_NAME,
          endpointKind: "Source",
        },
      }),
    ).rejects.toThrow();
  });

  it("rejects an NFS file share endpoint with kind=Source", async () => {
    const endpointName = nameFor(recorder, "endpointName", "nfsfs-src-");
    await expect(
      client.endpoints.createOrUpdate(RESOURCE_GROUP_NAME, storageMoverName, endpointName, {
        properties: {
          endpointType: "AzureStorageNfsFileShare",
          storageAccountResourceId: accountResourceId(),
          fileShareName: NFS_FILE_SHARE_NAME,
          endpointKind: "Source",
        },
      }),
    ).rejects.toThrow();
  });

  // --------------------------------------------------------------------------
  // NfsFileShareEndpointCreateGetDelete (trivial).
  // --------------------------------------------------------------------------
  it("creates, gets, and deletes an NFS file share endpoint", async () => {
    const endpointName = nameFor(recorder, "endpointName", "nfsfs-");

    let endpoint = await client.endpoints.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      endpointName,
      {
        properties: {
          endpointType: "AzureStorageNfsFileShare",
          storageAccountResourceId: accountResourceId(),
          fileShareName: NFS_FILE_SHARE_NAME,
          description: "Test NFS file share endpoint",
        },
      },
    );
    assert.equal(endpoint.name, endpointName);
    assert.equal(endpoint.properties.endpointType, "AzureStorageNfsFileShare");

    endpoint = await client.endpoints.get(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    if (endpoint.properties.endpointType === "AzureStorageNfsFileShare") {
      const nfsProps = endpoint.properties as AzureStorageNfsFileShareEndpointProperties;
      assert.equal(nfsProps.fileShareName, NFS_FILE_SHARE_NAME);
      assert.equal(nfsProps.description, "Test NFS file share endpoint");
    }

    const poller = client.endpoints.delete(RESOURCE_GROUP_NAME, storageMoverName, endpointName);
    await poller.pollUntilDone();
  });
});
