// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-http";
import { record, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

import {
  DataLakeFileSystemClient,
  DataLakeServiceClient,
  FileSystemSASPermissions,
  newPipeline,
  StorageSharedKeyCredential,
} from "../../src";
import { getDataLakeServiceAccountAudience, PublicAccessType } from "../../src/models";
import { getDataLakeServiceClient, recorderEnvSetup, SimpleTokenCredential } from "../utils";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { DefaultAzureCredential } from "@azure/identity";

describe("DataLakeFileSystemClient Node.js only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let serviceClient: DataLakeServiceClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async function () {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("DataLakeFileSystemClient default audience should work", async () => {
    const fileSystemClientWithOAuthToken = new DataLakeFileSystemClient(
      fileSystemClient.url,
      new DefaultAzureCredential()
    );
    const exist = await fileSystemClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("DataLakeFileSystemClient customized audience should work", async () => {
    const fileSystemClientWithOAuthToken = new DataLakeFileSystemClient(
      fileSystemClient.url,
      new DefaultAzureCredential(),
      { audience: getDataLakeServiceAccountAudience(serviceClient.accountName) }
    );
    const exist = await fileSystemClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("DataLakeFileSystemClient bearer token challenge should work", async () => {
    // Validate that bad audience should fail first.
    const authToken = await new DefaultAzureCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default"
    );
    const fileSystemClientWithPlainOAuthToken = new DataLakeFileSystemClient(
      fileSystemClient.url,
      new SimpleTokenCredential(authToken.token)
    );

    try {
      await fileSystemClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const fileSystemClientWithOAuthToken = new DataLakeFileSystemClient(
      fileSystemClient.url,
      new DefaultAzureCredential(),
      { audience: "https://badaudience.dfs.core.windows.net/.default" }
    );
    const exist = await fileSystemClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("getAccessPolicy", async () => {
    const result = await fileSystemClient.getAccessPolicy();
    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.clientRequestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("setAccessPolicy", async () => {
    const access: PublicAccessType = "file";
    const acl = [
      {
        accessPolicy: {
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: FileSystemSASPermissions.parse("rwd").toString(),
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    await fileSystemClient.setAccessPolicy(access, acl);
    const result = await fileSystemClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, acl);
    assert.deepEqual(result.publicAccess, access);
  });

  it("setAccessPolicy should work when expiry and start undefined", async () => {
    const access: PublicAccessType = "file";
    const acl = [
      {
        accessPolicy: {
          permissions: FileSystemSASPermissions.parse("rwd").toString(),
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    await fileSystemClient.setAccessPolicy(access, acl);
    const result = await fileSystemClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, acl);
    assert.deepEqual(result.publicAccess, access);
  });

  it("can be created with a url and a credential", async () => {
    const factories = (fileSystemClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new DataLakeFileSystemClient(fileSystemClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(!result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
    assert.ok(!result.publicAccess);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (fileSystemClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new DataLakeFileSystemClient(fileSystemClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(!result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
    assert.ok(!result.publicAccess);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = new DataLakeFileSystemClient(fileSystemClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (fileSystemClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new DataLakeFileSystemClient(fileSystemClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(!result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
    assert.ok(!result.publicAccess);
  });
});
