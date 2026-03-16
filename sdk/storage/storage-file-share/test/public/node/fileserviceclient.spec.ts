// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ShareItem } from "../../../src/index.js";
import { type ShareServiceClient, newPipeline } from "../../../src/index.js";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createShareServiceClient, getSharedKeyCredential } from "../../utils/node/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { getAccountKey, getStorageConnectionStringWithSas } from "../../utils/injectables.js";

describe("FileServiceClient Node.js only", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it.runIf(getAccountKey())("can be created with a url and a credential", async () => {
    const serviceClient = await createShareServiceClient("SharedKeyCredential", { recorder });
    assert.isDefined(serviceClient);

    const result = await serviceClient!.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
  });

  it.runIf(getAccountKey())(
    "can be created with a url and a credential and an option bag",
    async () => {
      const serviceClient = await createShareServiceClient("SharedKeyCredential", {
        recorder,
        options: { retryOptions: { maxTries: 5 } },
      });
      assert.isDefined(serviceClient);

      const result = await serviceClient.getProperties();

      assert.isDefined(result.requestId);
      assert.isAbove(result.requestId!.length, 0);
      assert.isDefined(result.version);
      assert.isAbove(result.version!.length, 0);
    },
  );

  it.runIf(getAccountKey())("can be created with a url and a pipeline", async () => {
    const credential = getSharedKeyCredential();
    assert.isDefined(credential);

    const pipeline = newPipeline(credential!);
    const serviceClient = await createShareServiceClient("Pipeline", { recorder, pipeline });
    assert.isDefined(serviceClient);

    const result = await serviceClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
  });

  it.runIf(getStorageConnectionStringWithSas())(
    "can be created from a connection string",
    async () => {
      const serviceClient = await createShareServiceClient("SasConnectionString", { recorder });
      assert.isDefined(serviceClient);

      const result = await serviceClient.getProperties();

      assert.isDefined(result.requestId);
      assert.isAbove(result.requestId!.length, 0);
    },
  );

  it.runIf(getStorageConnectionStringWithSas())(
    "can be created from a connection string and an option bag",
    async () => {
      const serviceClient = await createShareServiceClient("SasConnectionString", {
        recorder,
        options: {
          retryOptions: {
            maxTries: 5,
          },
        },
      });
      assert.isDefined(serviceClient);

      const result = await serviceClient.getProperties();

      assert.isDefined(result.requestId);
      assert.isAbove(result.requestId!.length, 0);
    },
  );
});

describe("FileServiceClient Node.js only - OAuth", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("ListShares with default parameters", async () => {
    const serviceClient = await createShareServiceClient("TokenCredential", { recorder });

    const result = (await serviceClient.listShares().byPage().next()).value;

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.isAtLeast(result.shareItems!.length, 0);

    if (result.shareItems!.length > 0) {
      const share = result.shareItems![0];
      assert.isAbove(share.name.length, 0);
      assert.isAbove(share.properties.etag.length, 0);
      assert.isDefined(share.properties.lastModified);
    }
  });

  it("Undelete should work", async () => {
    const serviceClient = await createShareServiceClient("TokenCredential", {
      recorder,
      account: "softDelete",
    });
    const shareClient = serviceClient.getShareClient(getUniqueName("share", { recorder }));
    await shareClient.create();
    await shareClient.delete();

    let found = false;
    let shareDeleted: ShareItem | undefined;
    for await (const share of serviceClient.listShares({ includeDeleted: true })) {
      if (share.name === shareClient.name) {
        found = true;
        assert.isDefined(share.version);
        assert.isDefined(share.deleted);
        assert.isDefined(share.properties.deletedTime);
        assert.isDefined(share.properties.remainingRetentionDays);

        shareDeleted = share;
      }
    }
    assert.isTrue(found);
    assert.isDefined(shareDeleted);

    // Await share to be deleted.
    await delay(60 * 1000);

    const restoredShareClient = await serviceClient.undeleteShare(
      shareDeleted!.name,
      shareDeleted!.version!,
    );
    await restoredShareClient.getProperties();

    await restoredShareClient.delete();
  });

  it("GetProperties", async () => {
    const serviceClient = await createShareServiceClient("TokenCredential", { recorder });
    const result = await serviceClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);

    if (result.cors && result.cors!.length > 0) {
      assert.isAbove(result.cors![0].allowedHeaders.length, 0);
      assert.isAbove(result.cors![0].allowedMethods.length, 0);
      assert.isAbove(result.cors![0].allowedOrigins.length, 0);
      assert.isAbove(result.cors![0].exposedHeaders.length, 0);
      assert.isAtLeast(result.cors![0].maxAgeInSeconds, 0);
    }
  });

  it("SetProperties", async () => {
    const serviceClient = await createShareServiceClient("TokenCredential", { recorder });

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
    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });
});

describe("FileServiceClient Premium Node.js only", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);

    serviceClient = await createShareServiceClient("TokenCredential", {
      recorder,
      account: "premiumFile",
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Paid Bursting", async function () {
    const shareName = getUniqueName("share", { recorder });
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
