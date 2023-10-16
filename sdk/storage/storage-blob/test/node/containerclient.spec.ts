// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import {
  configureBlobStorageClient,
  SimpleTokenCredential,
  getBSU,
  getConnectionStringFromEnvironment,
  getUniqueName,
  recorderEnvSetup,
} from "../utils";
import { PublicAccessType, getBlobServiceAccountAudience } from "../../src";
import {
  ContainerClient,
  newPipeline,
  StorageSharedKeyCredential,
  ContainerSASPermissions,
  BlobServiceClient,
} from "../../src";
import { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";

describe("ContainerClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async function () {
    await containerClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    const containerClientWithOAuthToken = new ContainerClient(
      containerClient.url,
      createTestCredential(),
    );
    configureBlobStorageClient(recorder, containerClientWithOAuthToken);
    const exists = await containerClientWithOAuthToken.exists();
    assert.strictEqual(true, exists);
  });

  it("Customized audience should work", async () => {
    const containerClientWithOAuthToken = new ContainerClient(
      containerClient.url,
      createTestCredential(),
      {
        audience: [getBlobServiceAccountAudience(blobServiceClient.accountName)],
      }
    );
    configureBlobStorageClient(recorder, containerClientWithOAuthToken);
    const exists = await containerClientWithOAuthToken.exists();
    assert.strictEqual(true, exists);
  });

  it("Bearer token challenge should work", async () => {
    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default"
    );
    assert.isNotNull(authToken);
    const containerClientWithPlainOAuthToken = new ContainerClient(
      containerClient.url,
      new SimpleTokenCredential(authToken!.token)
    );
    configureBlobStorageClient(recorder, containerClientWithPlainOAuthToken);

    try {
      await containerClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }
    const containerClientWithOAuthToken = new ContainerClient(
      containerClient.url,
      createTestCredential(),
      {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      }
    );
    configureBlobStorageClient(recorder, containerClientWithOAuthToken);
    await containerClientWithOAuthToken.getProperties();
  });

  it("getAccessPolicy", async () => {
    const result = await containerClient.getAccessPolicy();
    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.clientRequestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("setAccessPolicy", async function () {
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

  it("can be created with a url and a credential", async function () {
    const credential = (containerClient as any).credential as StorageSharedKeyCredential;
    const newClient = new ContainerClient(containerClient.url, credential);
    configureBlobStorageClient(recorder, newClient);

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

  it("can be created with a url and a credential and an option bag", async function () {
    const credential = (containerClient as any).credential as StorageSharedKeyCredential;
    const newClient = new ContainerClient(containerClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureBlobStorageClient(recorder, newClient);

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

  it("can be created with a url and a TokenCredential", async function () {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = new ContainerClient(containerClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async function () {
    const credential = (containerClient as any).credential as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ContainerClient(containerClient.url, pipeline);
    configureBlobStorageClient(recorder, newClient);

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

  it("can be created with a connection string", async function () {
    const newClient = new ContainerClient(getConnectionStringFromEnvironment(), containerName);
    configureBlobStorageClient(recorder, newClient);

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

  it("can be created with a connection string and a container name and an option bag", async function () {
    const newClient = new ContainerClient(getConnectionStringFromEnvironment(), containerName, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureBlobStorageClient(recorder, newClient);

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
});
