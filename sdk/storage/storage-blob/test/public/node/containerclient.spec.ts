// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PublicAccessType, BlobServiceClient } from "@azure/storage-blob";
import { type ContainerClient, ContainerSASPermissions } from "@azure/storage-blob";
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "./utils/clients.js";
import { getUniqueName } from "../utils/utils.js";
import { createContainerClient } from "./utils/clients.js";
import { getStorageConnectionString } from "../../utils/injectables.js";

describe("ContainerClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let recorder: Recorder;
  let blobServiceClient: BlobServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("setAccessPolicy", async () => {
    const access: PublicAccessType = "blob";
    const containerAcl = [
      {
        accessPolicy: {
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: ContainerSASPermissions.parse("rwd").toString(),
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=",
      },
    ];

    await containerClient.setAccessPolicy(access, containerAcl);
    const result = await containerClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, containerAcl);
    assert.deepEqual(result.blobPublicAccess, access);
  });

  it("setAccessPolicy with OAuth", async () => {
    const containerClientWithOAuthToken = await createContainerClient("TokenCredential", {
      recorder,
      containerName,
    });
    const exists = await containerClientWithOAuthToken.exists();
    assert.strictEqual(true, exists);

    const containerAcl = [
      {
        accessPolicy: {
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: ContainerSASPermissions.parse("rwd").toString(),
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=",
      },
    ];

    await containerClientWithOAuthToken.setAccessPolicy(undefined, containerAcl);
    const result = await containerClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, containerAcl);
  });

  it("setAccessPolicy should work when permissions, expiry and start undefined", async () => {
    const access: PublicAccessType = "blob";
    const containerAcl = [
      {
        accessPolicy: {
          permissions: ContainerSASPermissions.parse("rwd").toString(),
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=",
      },
    ];

    await containerClient.setAccessPolicy(access, containerAcl);
    const result = await containerClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, containerAcl);
    assert.deepEqual(result.blobPublicAccess, access);

    const containerAclEmpty = [
      {
        accessPolicy: {},
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=",
      },
    ];

    await containerClient.setAccessPolicy(access, containerAclEmpty);
    const resultEmpty = await containerClient.getAccessPolicy();
    assert.deepEqual(resultEmpty.signedIdentifiers[0].accessPolicy, undefined);
    assert.deepEqual(resultEmpty.blobPublicAccess, access);
  });

  it.runIf(getStorageConnectionString())("can be created with a connection string", async () => {
    const newClient = await createContainerClient("AccountConnectionString", {
      recorder,
      containerName,
    });
    assert.isDefined(newClient);
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(!result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
    assert.ok(!result.blobPublicAccess);
  });

  it.runIf(getStorageConnectionString())(
    "can be created with a connection string and a container name and an option bag",
    async () => {
      const newClient = await createContainerClient("AccountConnectionString", {
        recorder,
        containerName,
        options: {
          retryOptions: {
            maxTries: 5,
          },
        },
      });
      assert.isDefined(newClient);

      const result = await newClient.getProperties();

      assert.ok(result.etag!.length > 0);
      assert.ok(result.lastModified);
      assert.ok(!result.leaseDuration);
      assert.equal(result.leaseState, "available");
      assert.equal(result.leaseStatus, "unlocked");
      assert.ok(result.requestId);
      assert.ok(result.version);
      assert.ok(result.date);
      assert.ok(!result.blobPublicAccess);
    },
  );

  it("throws error if constructor containerName parameter is empty", async () => {
    try {
      await createContainerClient("AccountConnectionString", {
        containerName: "",
        recorder,
      });
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for containerName parameter",
        error.message,
        "Error message is different than expected.",
      );
    }
  });
});
