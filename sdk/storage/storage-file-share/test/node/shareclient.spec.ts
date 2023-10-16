// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { record, Recorder } from "@azure-tools/test-recorder";

import {
  getFileServiceAccountAudience,
  newPipeline,
  ShareClient,
  SignedIdentifier,
  StorageSharedKeyCredential,
} from "../../src";
import {
  getAccountName,
  getBSU,
  getConnectionStringFromEnvironment,
  recorderEnvSetup,
} from "../utils";
import { DefaultAzureCredential } from "@azure/identity";

describe("ShareClient Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function () {
    await shareClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    const directoryName = recorder.getUniqueName("dir");
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.ok(cResp.filePermissionKey);

    const shareClientWithOAuthToken = new ShareClient(
      shareClient.url,
      new DefaultAzureCredential(),
      { fileRequestIntent: "backup" }
    );
    const getPermissionResp = await shareClientWithOAuthToken.getPermission(
      cResp.filePermissionKey!
    );
    assert.ok(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
  });

  it("Customized audience should work", async () => {
    const directoryName = recorder.getUniqueName("dir");
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.ok(cResp.filePermissionKey);

    const shareClientWithOAuthToken = new ShareClient(
      shareClient.url,
      new DefaultAzureCredential(),
      {
        audience: getFileServiceAccountAudience(getAccountName()),
        fileRequestIntent: "backup",
      }
    );
    const getPermissionResp = await shareClientWithOAuthToken.getPermission(
      cResp.filePermissionKey!
    );
    assert.ok(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
  });

  it("Bad audience should fail", async () => {
    const directoryName = recorder.getUniqueName("dir");
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.ok(cResp.filePermissionKey);

    const shareClientWithOAuthToken = new ShareClient(
      shareClient.url,
      new DefaultAzureCredential(),
      {
        audience: "https://badaudience.file.core.windows.net/.default",
        fileRequestIntent: "backup",
      }
    );
    try {
      await shareClientWithOAuthToken.getPermission(cResp.filePermissionKey!);
      assert.fail("Should fail with 403");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 403);
    }
  });

  it("setAccessPolicy", async () => {
    const yesterday = recorder.newDate("now");
    const tomorrow = recorder.newDate("now");
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const identifiers: SignedIdentifier[] = [
      {
        accessPolicy: {
          expiresOn: tomorrow,
          permissions: "rwd",
          startsOn: yesterday,
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    await shareClient.setAccessPolicy(identifiers);
    const getAccessPolicyResponse = await shareClient.getAccessPolicy();

    assert.equal(getAccessPolicyResponse.signedIdentifiers[0].id, identifiers[0].id);
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.expiresOn.getTime(),
      identifiers[0].accessPolicy.expiresOn.getTime()
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.startsOn.getTime(),
      identifiers[0].accessPolicy.startsOn.getTime()
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.permissions,
      identifiers[0].accessPolicy.permissions
    );
  });

  it("getAccessPolicy", (done) => {
    // create() with default parameters has been tested in setAccessPolicy
    done();
  });

  it("setAccessPolicy and getAccessPolicy with empty SignedIdentifier", async () => {
    const identifiers: any = [
      {
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    await shareClient.setAccessPolicy(identifiers);
    const getAccessPolicyResponse = await shareClient.getAccessPolicy();

    assert.equal(getAccessPolicyResponse.signedIdentifiers[0].id, identifiers[0].id);
    assert.deepStrictEqual(getAccessPolicyResponse.signedIdentifiers[0].accessPolicy, undefined);
  });

  it("can be created with a url and a credential", async () => {
    const factories = (shareClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new ShareClient(shareClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (shareClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new ShareClient(shareClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (shareClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ShareClient(shareClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a connection string and a share name", async () => {
    const newClient = new ShareClient(getConnectionStringFromEnvironment(), shareName);
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a connection string and a share name and an option bag", async () => {
    const newClient = new ShareClient(getConnectionStringFromEnvironment(), shareName, {
      retryOptions: {
        maxTries: 5,
      },
    });
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });
});
