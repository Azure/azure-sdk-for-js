import { TokenCredential } from "@azure/core-http";
import { record } from "@azure/test-utils-recorder";
import * as assert from "assert";

import {
  DataLakeFileSystemClient,
  FileSystemSASPermissions,
  newPipeline,
  StorageSharedKeyCredential
} from "../../src";
import { PublicAccessType } from "../../src/models";
import { getDataLakeServiceClient, recorderEnvSetup } from "../utils";
import { assertClientUsesTokenCredential } from "../utils/assert";

describe("DataLakeFileSystemClient Node.js only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let recorder: any;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    await recorder.stop();
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
          startsOn: new Date("2017-12-31T11:22:33.4567890Z")
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      }
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
          permissions: FileSystemSASPermissions.parse("rwd").toString()
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      }
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
        maxTries: 5
      }
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
          expiresOnTimestamp: 12345
        })
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
