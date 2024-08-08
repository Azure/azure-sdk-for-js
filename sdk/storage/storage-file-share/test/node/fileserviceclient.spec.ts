// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  configureStorageClient,
  getBSU,
  getConnectionStringFromEnvironment,
  getSoftDeleteBSUWithDefaultCredential,
  getTokenBSUWithDefaultCredential,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils";
import { ShareServiceClient, newPipeline, StorageSharedKeyCredential, ShareItem } from "../../src";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("FileServiceClient Node.js only", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const serviceClient = getBSU(recorder);
    const credential = serviceClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareServiceClient(serviceClient.url, credential);
    configureStorageClient(recorder, newClient);
    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const serviceClient = getBSU(recorder);
    const credential = serviceClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareServiceClient(serviceClient.url, credential, {
      retryOptions: { maxTries: 5 },
    });
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a pipeline", async () => {
    const serviceClient = getBSU(recorder);
    const credential = serviceClient["credential"] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ShareServiceClient(serviceClient.url, pipeline);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created from a connection string", async () => {
    const newClient = ShareServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can be created from a connection string and an option bag", async () => {
    const newClient = ShareServiceClient.fromConnectionString(
      getConnectionStringFromEnvironment(),
      {
        retryOptions: {
          maxTries: 5,
        },
      },
    );

    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });
});

describe("FileServiceClient Node.js only - OAuth", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("ListShares with default parameters", async () => {
    const serviceClient = getTokenBSUWithDefaultCredential(recorder, "", "", {
      fileRequestIntent: "backup",
    });

    const result = (await serviceClient.listShares().byPage().next()).value;

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.shareItems!.length >= 0);

    if (result.shareItems!.length > 0) {
      const share = result.shareItems![0];
      assert.ok(share.name.length > 0);
      assert.ok(share.properties.etag.length > 0);
      assert.ok(share.properties.lastModified);
    }
  });

  it("Undelete should work", async function () {
    const serviceClient = getSoftDeleteBSUWithDefaultCredential(recorder, "", {
      fileRequestIntent: "backup",
    });
    const shareClient = serviceClient.getShareClient(
      recorder.variable("share", getUniqueName("share")),
    );
    await shareClient.create();
    await shareClient.delete();

    let found = false;
    let shareDeleted: ShareItem | undefined;
    for await (const share of serviceClient.listShares({ includeDeleted: true })) {
      if (share.name === shareClient.name) {
        found = true;
        assert.ok(share.version);
        assert.ok(share.deleted);
        assert.ok(share.properties.deletedTime);
        assert.ok(share.properties.remainingRetentionDays);

        shareDeleted = share;
      }
    }
    assert.ok(found);
    assert.ok(shareDeleted);

    // Await share to be deleted.
    await delay(30 * 1000);

    const restoredShareClient = await serviceClient.undeleteShare(
      shareDeleted!.name,
      shareDeleted!.version!,
    );
    await restoredShareClient.getProperties();

    await restoredShareClient.delete();
  });

  it("GetProperties", async () => {
    const serviceClient = getTokenBSUWithDefaultCredential(recorder, "", "", {
      fileRequestIntent: "backup",
    });
    const result = await serviceClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    if (result.cors && result.cors!.length > 0) {
      assert.ok(result.cors![0].allowedHeaders.length > 0);
      assert.ok(result.cors![0].allowedMethods.length > 0);
      assert.ok(result.cors![0].allowedOrigins.length > 0);
      assert.ok(result.cors![0].exposedHeaders.length > 0);
      assert.ok(result.cors![0].maxAgeInSeconds >= 0);
    }
  });

  it("SetProperties", async () => {
    const serviceClient = getTokenBSUWithDefaultCredential(recorder, "", "", {
      fileRequestIntent: "backup",
    });

    const serviceProperties = await serviceClient.getProperties();

    serviceProperties.minuteMetrics = {
      enabled: true,
      includeAPIs: true,
      retentionPolicy: {
        days: 4,
        enabled: true,
      },
      version: "1.0",
    };

    serviceProperties.hourMetrics = {
      enabled: true,
      includeAPIs: true,
      retentionPolicy: {
        days: 3,
        enabled: true,
      },
      version: "1.0",
    };

    const newCORS = {
      allowedHeaders: "*",
      allowedMethods: "GET",
      allowedOrigins: "example.com",
      exposedHeaders: "*",
      maxAgeInSeconds: 8888,
    };
    if (!serviceProperties.cors) {
      serviceProperties.cors = [newCORS];
    } else if (serviceProperties.cors!.length < 5) {
      serviceProperties.cors.push(newCORS);
    }

    // SMB multi-channel is returned by getProperties() even when the feature is not supproted on the account.
    const newServiceProperties = {
      cors: serviceProperties.cors,
      minuteMetrics: serviceProperties.minuteMetrics,
      hourMetrics: serviceProperties.hourMetrics,
    };

    await serviceClient.setProperties(newServiceProperties);
    await delay(5 * 1000);

    const result = await serviceClient.getProperties();
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });
});

describe("FileServiceClient Premium Node.js only", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    try {
      serviceClient = getTokenBSUWithDefaultCredential(recorder, "PREMIUM_FILE_", "", {
        fileRequestIntent: "backup",
      });
    } catch (error: any) {
      console.log(error);
      this.skip();
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // STG95 will enable it when it's enabled on service
  it.skip("Paid Bursting", async function (this: Context) {
    const shareName = recorder.variable("share", getUniqueName("share"));
    const shareClient = serviceClient.getShareClient(shareName);

    // create share
    await shareClient.create({
      paidBurstingEnabled: true,
      paidBurstingMaxIops: 5000,
      paidBurstingMaxBandwidthMibps: 1000,
    });

    // get properties
    const getRes = await shareClient.getProperties();
    assert.equal(getRes.paidBurstingEnabled, true);
    assert.deepStrictEqual(getRes.paidBurstingMaxBandwidthMibps, 1000);
    assert.deepStrictEqual(getRes.paidBurstingMaxIops, 5000);

    // list share
    for await (const share of serviceClient.listShares()) {
      if (share.name === shareName) {
        assert.equal(share.properties.paidBurstingEnabled, true);
        assert.deepStrictEqual(share.properties.paidBurstingMaxBandwidthMibps, 1000);
        assert.deepStrictEqual(share.properties.paidBurstingMaxIops, 5000);
      }
    }

    await shareClient.setProperties({
      paidBurstingEnabled: false,
    });

    const getRes2 = await shareClient.getProperties();
    assert.equal(getRes2.paidBurstingEnabled, false);
    assert.deepStrictEqual(getRes2.paidBurstingMaxBandwidthMibps, undefined);
    assert.deepStrictEqual(getRes2.paidBurstingMaxIops, undefined);

    // list share
    for await (const share of serviceClient.listShares()) {
      if (share.name === shareName) {
        assert.equal(share.properties.paidBurstingEnabled, false);
        assert.deepStrictEqual(share.properties.paidBurstingMaxBandwidthMibps, undefined);
        assert.deepStrictEqual(share.properties.paidBurstingMaxIops, undefined);
      }
    }
  });
});
