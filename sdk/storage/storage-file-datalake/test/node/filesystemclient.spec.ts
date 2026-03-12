// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { Recorder } from "@azure-tools/test-recorder";
import {
  SimpleTokenCredential,
  configureStorageClient,
  getDataLakeServiceClient,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils/index.js";
import type { DataLakeServiceClient } from "../../src/index.js";
import {
  DataLakeFileSystemClient,
  FileSystemSASPermissions,
  newPipeline,
} from "../../src/index.js";
import type { PublicAccessType } from "../../src/models.js";
import { getDataLakeServiceAccountAudience } from "../../src/models.js";
import { assertClientUsesTokenCredential } from "../utils/assert.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { aclIdForTest } from "../utils/fakeTestSecrets.js";

describe("DataLakeFileSystemClient Node.js only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let serviceClient: DataLakeServiceClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    // make sure we add the sanitizers on playback for SAS strings
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    serviceClient = getDataLakeServiceClient(recorder);
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("DataLakeFileSystemClient default audience should work", async () => {
    const fileSystemClientWithOAuthToken = new DataLakeFileSystemClient(
      fileSystemClient.url,
      createTestCredential(),
    );
    configureStorageClient(recorder, fileSystemClientWithOAuthToken);
    const exist = await fileSystemClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("DataLakeFileSystemClient customized audience should work", async () => {
    const fileSystemClientWithOAuthToken = new DataLakeFileSystemClient(
      fileSystemClient.url,
      createTestCredential(),
      { audience: getDataLakeServiceAccountAudience(serviceClient.accountName) },
    );
    configureStorageClient(recorder, fileSystemClientWithOAuthToken);
    const exist = await fileSystemClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("DataLakeFileSystemClient bearer token challenge should work", async () => {
    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const fileSystemClientWithPlainOAuthToken = new DataLakeFileSystemClient(
      fileSystemClient.url,
      new SimpleTokenCredential(authToken!.token),
    );
    configureStorageClient(recorder, fileSystemClientWithPlainOAuthToken);

    try {
      await fileSystemClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const fileSystemClientWithOAuthToken = new DataLakeFileSystemClient(
      fileSystemClient.url,
      createTestCredential(),
      { audience: "https://badaudience.dfs.core.windows.net/.default" },
    );
    configureStorageClient(recorder, fileSystemClientWithOAuthToken);
    const exist = await fileSystemClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("getAccessPolicy", async () => {
    const result = await fileSystemClient.getAccessPolicy();
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.clientRequestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
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
        id: aclIdForTest,
      },
    ];

    await fileSystemClient.setAccessPolicy(access, acl);
    const result = await fileSystemClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, acl);
    assert.deepEqual(result.publicAccess, access);
  });

  it("setAccessPolicy with OAuth", async () => {
    const fileSystemClientWithOAuthToken = new DataLakeFileSystemClient(
      fileSystemClient.url,
      createTestCredential(),
    );
    configureStorageClient(recorder, fileSystemClientWithOAuthToken);

    const acl = [
      {
        accessPolicy: {
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: FileSystemSASPermissions.parse("rwd").toString(),
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: aclIdForTest,
      },
    ];

    await fileSystemClient.setAccessPolicy(undefined, acl);
    const result = await fileSystemClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, acl);
    assert.deepEqual(result.publicAccess, undefined);
  });

  it("setAccessPolicy should work when expiry and start undefined", async () => {
    const access: PublicAccessType = "file";
    const acl = [
      {
        accessPolicy: {
          permissions: FileSystemSASPermissions.parse("rwd").toString(),
        },
        id: aclIdForTest,
      },
    ];

    await fileSystemClient.setAccessPolicy(access, acl);
    const result = await fileSystemClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, acl);
    assert.deepEqual(result.publicAccess, access);
  });

  it("can be created with a url and a credential", async () => {
    const credential = fileSystemClient.credential;
    const newClient = new DataLakeFileSystemClient(fileSystemClient.url, credential);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.publicAccess);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const credential = fileSystemClient.credential;
    const newClient = new DataLakeFileSystemClient(fileSystemClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.publicAccess);
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
    const credential = fileSystemClient.credential;
    const pipeline = newPipeline(credential);
    const newClient = new DataLakeFileSystemClient(fileSystemClient.url, pipeline);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.publicAccess);
  });
});
