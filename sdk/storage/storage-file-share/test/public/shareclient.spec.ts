// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ShareItem, ShareServiceClient, SignedIdentifier } from "../../src/index.js";
import { getFileServiceAccountAudience, ShareClient } from "../../src/index.js";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import type {
  Pipeline,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { createShareServiceClient, createShareClient } from "./utils/clients.js";
import { getUniqueName } from "./utils/utils.js";
import { getAccountName } from "../utils/injectables.js";
import { SimpleTokenCredential } from "./utils/simpleToken.js";

describe("ShareClient", () => {
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    serviceClient = await createShareServiceClient("TokenCredential", {
      recorder,
      options: { fileRequestIntent: "backup" },
    });
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await shareClient.setMetadata(metadata);

    const result = await shareClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Default audience should work", async () => {
    const directoryName = getUniqueName("dir", { recorder });
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.isDefined(cResp.filePermissionKey);

    const shareClientWithOAuthToken = await createShareClient("TokenCredential", {
      shareName,
      recorder,
      options: {
        fileRequestIntent: "backup",
      },
    });

    const getPermissionResp = await shareClientWithOAuthToken.getPermission(
      cResp.filePermissionKey!,
    );
    assert.isDefined(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
  });

  it("Customized audience should work", async () => {
    const directoryName = getUniqueName("dir", { recorder });
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.isDefined(cResp.filePermissionKey);

    const shareClientWithOAuthToken = await createShareClient("TokenCredential", {
      shareName,
      recorder,
      options: {
        fileRequestIntent: "backup",
        audience: getFileServiceAccountAudience(getAccountName()),
      },
    });

    const getPermissionResp = await shareClientWithOAuthToken.getPermission(
      cResp.filePermissionKey!,
    );
    assert.isDefined(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
  });

  it("Bad audience should work", async () => {
    const directoryName = getUniqueName("dir", { recorder });
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.isDefined(cResp.filePermissionKey);

    const token = await createTestCredential().getToken(
      "https://badaudience.file.core.windows.net/.default",
    );

    const shareClientWithSimpleOAuthToken = await createShareClient("Custom", {
      shareName,
      recorder,
      credential: new SimpleTokenCredential(token!.token, new Date(token!.expiresOnTimestamp)),
      options: {
        fileRequestIntent: "backup",
      },
    });

    try {
      await shareClientWithSimpleOAuthToken.getPermission(cResp.filePermissionKey!);
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const shareClientWithOAuthToken = await createShareClient("TokenCredential", {
      shareName,
      recorder,
      options: {
        fileRequestIntent: "backup",
        audience: "https://badaudience.file.core.windows.net/.default",
      },
    });
    const getPermissionResp = await shareClientWithOAuthToken.getPermission(
      cResp.filePermissionKey!,
    );
    assert.isDefined(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
  });

  it("exists", async () => {
    assert.isTrue(await shareClient.exists());

    const shareClient2 = serviceClient.getShareClient(getUniqueName(shareName, { recorder }));
    assert.isFalse(await shareClient2.exists());
  });

  it("getProperties", async () => {
    const result = await shareClient.getProperties();
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("create with default parameters", () => {
    // create() with default parameters has been tested in beforeEach
  });

  it("create with all parameters configured", async () => {
    const shareClient2 = serviceClient.getShareClient(getUniqueName(shareName, { recorder }));
    const metadata = { key: "value" };
    await shareClient2.create({ metadata });
    const result = await shareClient2.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("createIfNotExists", async () => {
    const shareClient2 = serviceClient.getShareClient(getUniqueName(shareName, { recorder }));
    const res = await shareClient2.createIfNotExists();
    assert.isTrue(res.succeeded);

    const res2 = await shareClient2.createIfNotExists();
    assert.isFalse(res2.succeeded);
    assert.equal(res2.errorCode, "ShareAlreadyExists");

    await shareClient2.delete();
  });

  it("delete", () => {
    // delete() with default parameters has been tested in afterEach
  });

  it("deleteIfExists", async () => {
    const shareClient2 = serviceClient.getShareClient(getUniqueName(shareName, { recorder }));
    await shareClient2.create();

    const snapshotResult = await shareClient2.createSnapshot();
    const snapshotClient = shareClient2.withSnapshot(snapshotResult.snapshot!);
    let snapshotDeleteResult = await snapshotClient.deleteIfExists();
    assert.isTrue(snapshotDeleteResult.succeeded);

    snapshotDeleteResult = await snapshotClient.deleteIfExists();
    assert.isFalse(snapshotDeleteResult.succeeded);
    assert.equal(snapshotDeleteResult.errorCode, "ShareSnapshotNotFound");

    const res = await shareClient2.deleteIfExists();
    assert.isTrue(res.succeeded);

    const shareClient3 = serviceClient.getShareClient(getUniqueName(shareName + "3", { recorder }));
    const res2 = await shareClient3.deleteIfExists();
    assert.isFalse(res2.succeeded);
    assert.equal(res2.errorCode, "ShareNotFound");
  });

  it("setQuota", async () => {
    const quotaInGB = 20;
    await shareClient.setQuota(quotaInGB);
    const propertiesResponse = await shareClient.getProperties();
    assert.equal(propertiesResponse.quota, quotaInGB);
  });

  it("getStatistics", async () => {
    const statisticsResponse = await shareClient.getStatistics();
    assert.notEqual(statisticsResponse.shareUsage, undefined);
  });

  it("create snapshot", async () => {
    const metadata = { key1: "value1", key2: "value2" };
    const createSnapshotResponse = await shareClient.createSnapshot({
      metadata,
    });

    assert.notEqual(createSnapshotResponse.snapshot, undefined);
    const sanpshot = createSnapshotResponse.snapshot!;
    const snapshotShareClient = shareClient.withSnapshot(sanpshot);

    const snapshotProperties = await snapshotShareClient.getProperties();
    assert.deepStrictEqual(snapshotProperties.metadata, metadata);

    const originProperties = await shareClient.getProperties();
    assert.notDeepEqual(originProperties.metadata, metadata);

    await snapshotShareClient.delete({});
  });

  it("createDirectory and deleteDirectory", async () => {
    const dirName = getUniqueName("directory", { recorder });
    const metadata = { key: "value" };

    const { directoryClient } = await shareClient.createDirectory(dirName, { metadata });
    const result = await directoryClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await shareClient.deleteDirectory(dirName);
    try {
      await directoryClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.strictEqual(error.statusCode as number, 404);
    }
  });

  it("createFile and deleteFile under root directory", async () => {
    const fileName = getUniqueName("file", { recorder });
    const metadata = { key: "value" };
    const { fileClient } = await shareClient.createFile(fileName, 256, { metadata });
    const result = await fileClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await shareClient.deleteFile(fileName);
    try {
      await fileClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.strictEqual(error.statusCode as number, 404);
    }
  });

  it("can get a directory client for root directory", async () => {
    const root = await shareClient.rootDirectoryClient;
    const result = await root.getProperties();
    assert.isDefined(result, "Expecting valid properties for the root directory.");
  });

  it("create and get permission", async () => {
    const directoryClient = shareClient.getDirectoryClient("test0");

    const cResp = await directoryClient.create();
    assert.isDefined(cResp.filePermissionKey);

    const getPermissionResp = await shareClient.getPermission(cResp.filePermissionKey!);
    assert.isDefined(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
    assert.isDefined(getPermissionResp.permission);
    assert.notStrictEqual(getPermissionResp.permission, "");
    assert.isDefined(getPermissionResp.requestId!);
    assert.isDefined(getPermissionResp.version!);

    const createPermResp = await shareClient.createPermission(getPermissionResp.permission);
    assert.isDefined(createPermResp.filePermissionKey!);
    assert.isDefined(createPermResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
    assert.isDefined(createPermResp.requestId!);
    assert.isDefined(createPermResp.version!);
  });

  it("create and get binary permission", async () => {
    const filePermission =
      "AQAUhGwAAACIAAAAAAAAABQAAAACAFgAAwAAAAAAFAD/AR8AAQEAAAAAAAUSAAAAAAAYAP8BHwABAgAAAAAABSAAAAAgAgAAAAAkAKkAEgABBQAAAAAABRUAAABZUbgXZnJdJWRjOwuMmS4AAQUAAAAAAAUVAAAAoGXPfnhLm1/nfIdwr/1IAQEFAAAAAAAFFQAAAKBlz354S5tf53yHcAECAAA=";

    const createPermResp = await shareClient.createPermission({
      permission: filePermission,
      format: "Binary",
    });
    assert.isDefined(createPermResp.filePermissionKey!);
    assert.isDefined(createPermResp.date!);
    assert.equal(createPermResp.errorCode, undefined);
    assert.isDefined(createPermResp.requestId!);
    assert.isDefined(createPermResp.version!);

    const getPermissionResp = await shareClient.getPermission(createPermResp.filePermissionKey!, {
      filePermissionFormat: "Binary",
    });
    assert.isDefined(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
    assert.isDefined(getPermissionResp.permission);
    assert.notStrictEqual(getPermissionResp.permission, "");
    assert.isDefined(getPermissionResp.requestId!);
    assert.isDefined(getPermissionResp.version!);
  });

  it("create share specifying accessTier and listShare", async () => {
    const newShareName = getUniqueName("newshare", { recorder });
    const newShareClient = serviceClient.getShareClient(newShareName);
    await newShareClient.create({ accessTier: "Hot" });

    for await (const shareItem of serviceClient.listShares({ prefix: newShareName })) {
      if (shareItem.name === newShareName) {
        assert.deepStrictEqual(shareItem.properties.accessTier, "Hot");
        assert.isDefined(shareItem.properties.accessTierChangeTime);
        break;
      }
    }

    await newShareClient.delete();
  });

  it("setProperties", async () => {
    const accessTier = "Hot";
    const quotaInGB = 20;
    await shareClient.setProperties({ accessTier, quotaInGB });
    const getRes = await shareClient.getProperties();

    assert.deepStrictEqual(getRes.accessTier, accessTier);
    assert.isDefined(getRes.accessTierChangeTime);
    assert.deepStrictEqual(getRes.accessTierTransitionState, "pending-from-transactionOptimized");
    assert.equal(getRes.quota, quotaInGB);
  });
});

describe("ShareDirectoryClient - Verify Name Properties", () => {
  const accountName = "myaccount";
  const shareName = "shareName";

  function verifyNameProperties(url: string): void {
    const newClient = new ShareClient(url);
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided.",
    );
    assert.equal(newClient.name, shareName, "Share name is not the same as the one provided.");
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(`https://${accountName}.file.core.windows.net/${shareName}`);
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(`https://192.0.0.10:1900/${accountName}/${shareName}`);
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${shareName}`,
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${shareName}`);
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new ShareClient(`https://customdomain.com/${shareName}`);

    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
    assert.equal(newClient.name, shareName, "Share name is not the same as the one provided.");
  });
});

describe("ShareClient - OAuth", () => {
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;
  let serviceClientPipeline: ShareServiceClient;
  let shareClientPipeline: ShareClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);

    // TokenCredential mode for OAuth tests
    serviceClient = await createShareServiceClient("TokenCredential", {
      recorder,
      options: { fileRequestIntent: "backup" },
    });
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);

    // Pipeline mode (SAS) to create/delete the share
    serviceClientPipeline = await createShareServiceClient("Pipeline", { recorder });
    shareClientPipeline = serviceClientPipeline.getShareClient(shareName);
    await shareClientPipeline.create();
  });

  afterEach(async () => {
    if (shareClientPipeline) {
      await shareClientPipeline.delete();
    }
    await recorder.stop();
  });

  it("create and get permission", async () => {
    const directoryName = getUniqueName("dir", { recorder });
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.isDefined(cResp.filePermissionKey);

    const getPermissionResp = await shareClient.getPermission(cResp.filePermissionKey!);
    assert.isDefined(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
    assert.isDefined(getPermissionResp.permission);
    assert.notStrictEqual(getPermissionResp.permission, "");
    assert.isDefined(getPermissionResp.requestId!);
    assert.isDefined(getPermissionResp.version!);

    const createPermResp = await shareClient.createPermission(getPermissionResp.permission);
    assert.isDefined(createPermResp.filePermissionKey!);
    assert.isDefined(createPermResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
    assert.isDefined(createPermResp.requestId!);
    assert.isDefined(createPermResp.version!);
  });

  it("create and get access policy", async () => {
    const yesterday = new Date(recorder.variable("now", new Date().toISOString()));
    const tomorrow = new Date(recorder.variable("now", new Date().toISOString()));
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
      identifiers[0].accessPolicy.expiresOn.getTime(),
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.startsOn.getTime(),
      identifiers[0].accessPolicy.startsOn.getTime(),
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.permissions,
      identifiers[0].accessPolicy.permissions,
    );
  });

  it("create and delete directory", async () => {
    const directoryName = getUniqueName("dir", { recorder });

    const { directoryClient } = await shareClient.createDirectory(directoryName);
    assert.deepStrictEqual(directoryClient.name, directoryName);
    assert.isTrue(await directoryClient.exists(), "Directory should have been created.");

    await shareClient.deleteDirectory(directoryName);
    assert.isFalse(await directoryClient.exists(), "Directory should have been deleted.");
  });

  it("create and delete file", async () => {
    const fileName = getUniqueName("file", { recorder });

    const { fileClient } = await shareClient.createFile(fileName, 1024);
    assert.deepStrictEqual(fileClient.name, fileName);
    assert.isTrue(await fileClient.exists(), "File should have been created.");

    await shareClient.deleteFile(fileName);
    assert.isFalse(await fileClient.exists(), "Directory should have been deleted.");
  });
});

describe("Version error test", () => {
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);

    serviceClient = await createShareServiceClient("TokenCredential", {
      recorder,
      options: { fileRequestIntent: "backup" },
    });
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  function XMSVersioninjectorPolicy(version: string): PipelinePolicy {
    return {
      name: "XMSVersioninjectorPolicy",
      async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
        request.headers.set("x-ms-version", version);
        return next(request);
      },
    };
  }

  it("Invalid service version", async () => {
    const injector = XMSVersioninjectorPolicy(`3025-01-01`);

    const pipeline: Pipeline = (shareClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });
    try {
      await shareClient.getProperties();
    } catch (err) {
      assert.isTrue(
        (err as any).message.startsWith(
          "The provided service version is not enabled on this storage account. Please see",
        ),
      );
    }
  });
});

// Provisioned v2 features require a premium file storage account with specific provisioning model enabled.
// The test infrastructure's premiumFileAccount doesn't have this enabled, so these tests are skipped.
describe.skip("ShareClient Provisioned", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);

    serviceClient = await createShareServiceClient("TokenCredential", {
      recorder,
      account: "premiumFile",
      options: { fileRequestIntent: "backup" },
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Create share with Provisioned Max Iops and Bandwidth", async () => {
    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);

    const result = await shareClient.create({
      shareProvisionedIops: 500,
      shareProvisionedBandwidthMibps: 125,
    });
    assert.equal(result.shareProvisionedBandwidthMibps, 125);
    assert.equal(result.shareProvisionedIops, 500);
    assert.isDefined(result.shareIncludedBurstIops);

    const deleteResult = await shareClient.delete();
    assert.isDefined(deleteResult.usageBytes);
    assert.isDefined(deleteResult.snapshotUsageBytes);
  });

  it("setProperties with Provisioned Max Iops and Bandwidth", async () => {
    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);

    await shareClient.create();

    const result = await shareClient.setProperties({
      shareProvisionedIops: 500,
      shareProvisionedBandwidthMibps: 125,
    });

    assert.equal(result.provisionedIops, 500);
    assert.equal(result.provisionedBandwidthMibps, 125);
    assert.isDefined(result.includedBurstIops);
    assert.isDefined(result.quota);
    assert.isDefined(result.maxBurstCreditsForIops);
    assert.isDefined(result.nextAllowedProvisionedBandwidthDowngradeTime);
    assert.isDefined(result.nextAllowedProvisionedIopsDowngradeTime);
    assert.isDefined(result.nextAllowedQuotaDowngradeTime);

    const propertiesResult = await shareClient.getProperties();
    assert.equal(propertiesResult.provisionedIops, 500);
    assert.equal(propertiesResult.provisionedBandwidthMibps, 125);
    assert.isDefined(propertiesResult.includedBurstIops);
    assert.isDefined(propertiesResult.quota);
    assert.isDefined(propertiesResult.maxBurstCreditsForIops);
    assert.isDefined(propertiesResult.nextAllowedProvisionedBandwidthDowngradeTime);
    assert.isDefined(propertiesResult.nextAllowedProvisionedIopsDowngradeTime);
    assert.isDefined(propertiesResult.nextAllowedQuotaDowngradeTime);

    let found = false;
    for await (const item of serviceClient.listShares()) {
      if (item.name === shareName) {
        assert.equal(item.properties.provisionedIops, 500);
        assert.equal(item.properties.provisionedBandwidthMiBps, 125);
        found = true;
      }
      assert.isDefined(item.properties.includedBurstIops);
      assert.isDefined(item.properties.quota);
      assert.isDefined(item.properties.maxBurstCreditsForIops);
      assert.isDefined(item.properties.nextAllowedProvisionedBandwidthDowngradeTime);
      assert.isDefined(item.properties.nextAllowedProvisionedIopsDowngradeTime);
      assert.isDefined(item.properties.nextAllowedQuotaDowngradeTime);
      assert.isDefined(item.properties.includedBurstIops);
    }

    assert.isTrue(found);
    const deleteResult = await shareClient.delete();
    assert.isDefined(deleteResult.usageBytes);
    assert.isDefined(deleteResult.snapshotUsageBytes);
  });

  it("Restore share", async () => {
    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);

    const result = await shareClient.create({
      shareProvisionedIops: 500,
      shareProvisionedBandwidthMibps: 125,
    });
    assert.equal(result.shareProvisionedBandwidthMibps, 125);
    assert.equal(result.shareProvisionedIops, 500);
    assert.isDefined(result.shareIncludedBurstIops);

    const deleteResult = await shareClient.delete();
    assert.isDefined(deleteResult.usageBytes);
    assert.isDefined(deleteResult.snapshotUsageBytes);

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
    await delay(60000);

    await serviceClient.undeleteShare(shareDeleted!.name, shareDeleted!.version!);
  });
});

describe("ShareClient Premium", () => {
  let serviceClient: ShareServiceClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);

    serviceClient = await createShareServiceClient("TokenCredential", {
      recorder,
      account: "premiumFile",
      options: { fileRequestIntent: "backup" },
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create share with premium accessTier and listShare", async () => {
    const newShareName = getUniqueName("newshare", { recorder });
    const newShareClient = serviceClient.getShareClient(newShareName);
    await newShareClient.create({ accessTier: "Premium" });

    for await (const shareItem of serviceClient.listShares({ prefix: newShareName })) {
      if (shareItem.name === newShareName) {
        assert.deepStrictEqual(shareItem.properties.accessTier, "Premium");
        break;
      }
    }

    await newShareClient.delete();
  });

  it("setProperties with premium access tier", async () => {
    const newShareName = getUniqueName("newshare", { recorder });
    const newShareClient = serviceClient.getShareClient(newShareName);
    await newShareClient.create();
    const accessTier = "Premium";
    await newShareClient.setProperties({ accessTier });
    const getRes = await newShareClient.getProperties();

    assert.deepStrictEqual(getRes.accessTier, accessTier);
    await newShareClient.delete();
  });
});
