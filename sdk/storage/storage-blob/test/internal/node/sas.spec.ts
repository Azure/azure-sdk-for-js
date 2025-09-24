// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, assert, beforeEach, describe, it } from "vitest";
import { getSignatureFromSasUrl } from "../../public/node/utils/utils.js";
import { UserDelegationKeyCredential } from "$internal/credentials/UserDelegationKeyCredential.js";
import {
  getAccountKey,
  getEncryptionScope1,
  getImmutableContainerName,
} from "../../utils/injectables.js";
import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  BlobClient,
  type BlobImmutabilityPolicyMode,
  BlobSASPermissions,
  BlobServiceClient,
  ContainerClient,
  ContainerSASPermissions,
  generateAccountSASQueryParameters,
  generateBlobSASQueryParameters,
  newPipeline,
  PageBlobClient,
  SASProtocol,
  type StorageSharedKeyCredential,
  type UserDelegationKey,
} from "@azure/storage-blob";
import { Recorder } from "@azure-tools/test-recorder";
import { createBlobServiceClient } from "../../public/node/utils/clients.js";
import { getUniqueName } from "../../public/utils/utils.js";
import { ensureClientRecording } from "../../public/utils/recorder.js";
import { SERVICE_VERSION } from "../../public/utils/constants.js";

describe.runIf(getAccountKey())(
  "Shared Access Signature (SAS) generation Node.js Only - ImmutabilityPolicy",
  () => {
    let blobServiceClient: BlobServiceClient;
    let containerClient: ContainerClient;
    let blobName: string;
    let blobClient: BlobClient;
    const content = "Hello World";
    let recorder: Recorder;
    const containerName = getImmutableContainerName();

    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      const blobServiceClientOrUndefined = await createBlobServiceClient("AccountKey", {
        recorder,
      });
      assert.isDefined(blobServiceClientOrUndefined);
      blobServiceClient = blobServiceClientOrUndefined;
      containerClient = blobServiceClient.getContainerClient(containerName);
      blobName = getUniqueName("blob", { recorder });
      blobClient = containerClient.getBlobClient(blobName);
    });

    afterEach(async () => {
      const listResult = (
        await containerClient
          .listBlobsFlat({
            includeImmutabilityPolicy: true,
          })
          .byPage()
          .next()
      ).value;

      for (let i = 0; i < listResult.segment.blobItems!.length; ++i) {
        const deleteBlobClient = containerClient.getBlobClient(
          listResult.segment.blobItems[i].name,
        );
        await deleteBlobClient.setLegalHold(false);
        await deleteBlobClient.deleteImmutabilityPolicy();
        await deleteBlobClient.delete();
      }
      await recorder.stop();
    });

    it("Account sas - set immutability policy and legalhold with account SAS should work", async () => {
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload(content, content.length);

      const aDayLater = new Date(recorder.variable("aDayLater", new Date().toISOString()));
      aDayLater.setDate(aDayLater.getDate() + 1);

      const sas = generateAccountSASQueryParameters(
        {
          expiresOn: aDayLater,
          // ipRange: {
          //   start: "0000:0000:0000:0000:0000:000:000:0000",
          //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
          // },
          permissions: AccountSASPermissions.parse("rwdlacupi"),
          protocol: SASProtocol.HttpsAndHttp,
          resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
          services: AccountSASServices.parse("btqf").toString(),
          version: "2020-08-04",
        },
        blobServiceClient.credential as StorageSharedKeyCredential,
      ).toString();

      const sasClient = `${blobServiceClient.url}?${sas}`;
      const accountSASServiceClient = new BlobServiceClient(sasClient, newPipeline());
      ensureClientRecording(recorder, accountSASServiceClient);

      const sasBlobClient = accountSASServiceClient
        .getContainerClient(containerName)
        .getBlobClient(blobName);

      const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
      minutesLater.setMinutes(minutesLater.getMinutes() + 5);

      const result = await sasBlobClient.setImmutabilityPolicy({
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      });

      assert.ok(result.immutabilityPolicyExpiry);
      assert.equal(
        result.immutabilityPolicyMode,
        "unlocked" as BlobImmutabilityPolicyMode | undefined,
      );

      const setLegalHoldResult = await sasBlobClient.setLegalHold(true);
      assert.ok(setLegalHoldResult.legalHold);

      const propertiesResult = await blobClient.getProperties();

      assert.ok(propertiesResult.immutabilityPolicyExpiresOn);
      assert.equal(
        propertiesResult.immutabilityPolicyMode,
        "unlocked" as BlobImmutabilityPolicyMode | undefined,
      );
      assert.ok(propertiesResult.legalHold);
    });

    it("Container sas - set immutability policy and legalhold with container SAS should work", async () => {
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload(content, content.length);

      const aDayLater = new Date(recorder.variable("aDayLater", new Date().toISOString()));
      aDayLater.setDate(aDayLater.getDate() + 1);
      const containerSAS = generateBlobSASQueryParameters(
        {
          containerName: containerClient.containerName,
          expiresOn: aDayLater,
          // ipRange: {
          //   start: "0000:0000:0000:0000:0000:000:000:0000",
          //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
          // },
          permissions: ContainerSASPermissions.parse("i"),
          protocol: SASProtocol.HttpsAndHttp,
          version: "2020-08-04",
        },
        blobServiceClient.credential as StorageSharedKeyCredential,
      );
      const sasContainerClient = new ContainerClient(`${containerClient.url}?${containerSAS}`);
      ensureClientRecording(recorder, sasContainerClient);
      const sasBlobClient = sasContainerClient.getBlobClient(blobName);

      const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
      minutesLater.setMinutes(minutesLater.getMinutes() + 5);

      const result = await sasBlobClient.setImmutabilityPolicy({
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      });

      assert.ok(result.immutabilityPolicyExpiry);
      assert.equal(
        result.immutabilityPolicyMode,
        "unlocked" as BlobImmutabilityPolicyMode | undefined,
      );

      const setLegalHoldResult = await sasBlobClient.setLegalHold(true);
      assert.ok(setLegalHoldResult.legalHold);

      const propertiesResult = await blobClient.getProperties();

      assert.ok(propertiesResult.immutabilityPolicyExpiresOn);
      assert.equal(
        propertiesResult.immutabilityPolicyMode,
        "unlocked" as BlobImmutabilityPolicyMode | undefined,
      );
      assert.ok(propertiesResult.legalHold);
    });

    it("Blob sas - set immutability policy and legalhold with blob SAS should work", async () => {
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload(content, content.length);

      const aDayLater = new Date(recorder.variable("aDayLater", new Date().toISOString()));
      aDayLater.setDate(aDayLater.getDate() + 1);
      const blobSAS = generateBlobSASQueryParameters(
        {
          blobName: blobClient.name,
          containerName: blobClient.containerName,
          expiresOn: aDayLater,
          permissions: BlobSASPermissions.parse("i"),
          version: "2020-08-04",
        },
        blobServiceClient.credential as StorageSharedKeyCredential,
      );
      const sasBlobClient = new BlobClient(`${blobClient.url}?${blobSAS}`);
      ensureClientRecording(recorder, sasBlobClient);

      const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
      minutesLater.setMinutes(minutesLater.getMinutes() + 5);

      const result = await sasBlobClient.setImmutabilityPolicy({
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      });

      assert.ok(result.immutabilityPolicyExpiry);
      assert.equal(
        result.immutabilityPolicyMode,
        "unlocked" as BlobImmutabilityPolicyMode | undefined,
      );

      const setLegalHoldResult = await sasBlobClient.setLegalHold(true);
      assert.ok(setLegalHoldResult.legalHold);

      const propertiesResult = await blobClient.getProperties();

      assert.ok(propertiesResult.immutabilityPolicyExpiresOn);
      assert.equal(
        propertiesResult.immutabilityPolicyMode,
        "unlocked" as BlobImmutabilityPolicyMode | undefined,
      );
      assert.ok(propertiesResult.legalHold);
    });
  },
);

describe("Generation for user delegation SAS against container Node.js only", () => {
  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  let containerClient: ContainerClient;
  let now: Date;
  let tmr: Date;
  let userDelegationKey: UserDelegationKey;
  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    const containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    userDelegationKey = await blobServiceClient.getUserDelegationKey(now, tmr);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("generateUserDelegationSasUrl should work with all configurations", async () => {
    const generateSASOptions = {
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: ContainerSASPermissions.parse("racwdl"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      version: SERVICE_VERSION,
    };

    const containerSasUrl = await containerClient.generateUserDelegationSasUrl(
      generateSASOptions,
      userDelegationKey,
    );

    const containerClientWithSAS = new ContainerClient(
      containerSasUrl,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, containerClientWithSAS);

    const result = (await containerClientWithSAS.listBlobsFlat().byPage().next()).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.deepStrictEqual(result.continuationToken, "");

    const stringToSign = containerClient.generateUserDelegationSasStringToSign(
      generateSASOptions,
      userDelegationKey,
    );

    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(containerSasUrl));
  });

  it("generateUserDelegationSasUrl should work with minimum parameters", async () => {
    const generateSasOptions = {
      expiresOn: tmr,
      permissions: ContainerSASPermissions.parse("racwdl"),
    };

    const containerSasUrl = await containerClient.generateUserDelegationSasUrl(
      generateSasOptions,
      userDelegationKey,
    );

    const containerClientWithSAS = new ContainerClient(
      containerSasUrl,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, containerClientWithSAS);

    const result = (await containerClientWithSAS.listBlobsFlat().byPage().next()).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.deepStrictEqual(result.continuationToken, "");

    const stringToSign = containerClient.generateUserDelegationSasStringToSign(
      generateSasOptions,
      userDelegationKey,
    );

    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(containerSasUrl));
  });

  it("SAS permission m, e for container should work", async () => {
    const generateSasOptions = {
      expiresOn: tmr,
      permissions: ContainerSASPermissions.parse("racwdltxme"),
      version: "2020-02-10",
    };

    const containerSasUrl = await containerClient.generateUserDelegationSasUrl(
      generateSasOptions,
      userDelegationKey,
    );
    const containerClientWithSAS = new ContainerClient(containerSasUrl);
    ensureClientRecording(recorder, containerClientWithSAS);
    await containerClientWithSAS.listBlobsFlat().byPage().next();

    const stringToSign = containerClient.generateUserDelegationSasStringToSign(
      generateSasOptions,
      userDelegationKey,
    );

    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(containerSasUrl));
  });
});

describe("Generation for user delegation SAS against blob Node.js only", () => {
  let recorder: Recorder;
  let blobServiceClient: BlobServiceClient;
  let userDelegationKey: UserDelegationKey;
  let now: Date;
  let tmr: Date;
  let containerClient: ContainerClient;
  let blobClient: BlobClient;
  const encryptionScopeName = getEncryptionScope1();

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });

    now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 5);
    userDelegationKey = await blobServiceClient.getUserDelegationKey(now, tmr);

    const containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("generateUserDelegationSasUrl should work", async () => {
    const blobName = getUniqueName("pageBlob", { recorder });
    const pageBlobClient = containerClient.getPageBlobClient(blobName);
    await pageBlobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const generateSasOptions = {
      cacheControl: "cache-control-override",
      contentDisposition: "content-disposition-override",
      contentEncoding: "content-encoding-override",
      contentLanguage: "content-language-override",
      contentType: "content-type-override",
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: BlobSASPermissions.parse("racwd"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
    };

    const sasUrl = await pageBlobClient.generateUserDelegationSasUrl(
      generateSasOptions,
      userDelegationKey,
    );

    const blobClientWithSAS = new PageBlobClient(sasUrl, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    const stringToSign = pageBlobClient.generateUserDelegationSasStringToSign(
      generateSasOptions,
      userDelegationKey,
    );
    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(sasUrl));
  });

  it("generateUserDelegationSasUrl should work with permanentDelete permssion", async () => {
    const generateSasOptions = {
      cacheControl: "cache-control-override",
      contentDisposition: "content-disposition-override",
      contentEncoding: "content-encoding-override",
      contentLanguage: "content-language-override",
      contentType: "content-type-override",
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: BlobSASPermissions.parse("racwdy"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
    };

    const blobSasUrl = await blobClient.generateUserDelegationSasUrl(
      generateSasOptions,
      userDelegationKey,
    );
    const blobClientWithSAS = new BlobClient(blobSasUrl, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const stringToSign = blobClient.generateUserDelegationSasStringToSign(
      generateSasOptions,
      userDelegationKey,
    );
    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(blobSasUrl));

    await blobClientWithSAS.delete();
  });

  it("generateUserDelegationSasUrl should work with encryption scope", async () => {
    const blobName = getUniqueName("pageBlob", { recorder });
    const pageBlobClient = containerClient.getPageBlobClient(blobName);

    const generateSasOptions = {
      cacheControl: "cache-control-override",
      contentDisposition: "content-disposition-override",
      contentEncoding: "content-encoding-override",
      contentLanguage: "content-language-override",
      contentType: "content-type-override",
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: BlobSASPermissions.parse("racwdy"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      encryptionScope: encryptionScopeName,
    };

    const blobSasUrl = await pageBlobClient.generateUserDelegationSasUrl(
      generateSasOptions,
      userDelegationKey,
    );
    const blobClientWithSAS = new PageBlobClient(
      blobSasUrl,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.create(1024, {
      encryptionScope: encryptionScopeName,
    });

    const stringToSign = pageBlobClient.generateUserDelegationSasStringToSign(
      generateSasOptions,
      userDelegationKey,
    );
    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(blobSasUrl));

    await blobClientWithSAS.delete();
  });

  it("generateUserDelegationSasUrl should work for blob snapshot", async () => {
    const response = await blobClient.createSnapshot();
    const blobClientWithSnapshot = blobClient.withSnapshot(response.snapshot!);

    const generateSasOptions = {
      cacheControl: "cache-control-override",
      contentDisposition: "content-disposition-override",
      contentEncoding: "content-encoding-override",
      contentLanguage: "content-language-override",
      contentType: "content-type-override",
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: BlobSASPermissions.parse("racwd"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
    };

    const blobSasUrl = await blobClientWithSnapshot.generateUserDelegationSasUrl(
      generateSasOptions,
      userDelegationKey,
    );

    const blobClientWithSAS = new BlobClient(blobSasUrl, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    const stringToSign = blobClientWithSnapshot.generateUserDelegationSasStringToSign(
      generateSasOptions,
      userDelegationKey,
    );
    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(blobSasUrl));
  });

  it("generateUserDelegationSasUrl should work with permanentDelete permission for blob snapshot", async () => {
    const response = await blobClient.createSnapshot();
    const blobClientWithSnapshot = blobClient.withSnapshot(response.snapshot!);

    const generateSasOptions = {
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: BlobSASPermissions.parse("racwdy"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      snapshotTime: response.snapshot,
    };

    const blobSasUrl = await blobClientWithSnapshot.generateUserDelegationSasUrl(
      generateSasOptions,
      userDelegationKey,
    );
    const blobClientWithSAS = new BlobClient(blobSasUrl, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.delete();

    const stringToSign = blobClientWithSnapshot.generateUserDelegationSasStringToSign(
      generateSasOptions,
      userDelegationKey,
    );
    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(blobSasUrl));
  });

  it("generateUserDelegationSasUrl with permission m, e should work", async () => {
    const generateSasOptions = {
      expiresOn: tmr,
      permissions: BlobSASPermissions.parse("racwdxtme"),
      version: "2020-02-10",
    };

    const blobSasUrl = await blobClient.generateUserDelegationSasUrl(
      generateSasOptions,
      userDelegationKey,
    );
    const blobClientWithSAS = new BlobClient(blobSasUrl);
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.getProperties();

    const stringToSign = blobClient.generateUserDelegationSasStringToSign(
      generateSasOptions,
      userDelegationKey,
    );
    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(blobSasUrl));
  });

  it("generateUserDelegationSasUrl with saoid and scid should work", async () => {
    const guid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    const authorizedGuid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    const generateSasOptions = {
      expiresOn: tmr,
      permissions: BlobSASPermissions.parse("racwdxtme"),
      version: "2020-02-10",
      preauthorizedAgentObjectId: authorizedGuid,
      correlationId: guid,
    };

    const blobSasUrl = await blobClient.generateUserDelegationSasUrl(
      generateSasOptions,
      userDelegationKey,
    );
    const blobClientWithSAS = new BlobClient(blobSasUrl);
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.getProperties();

    const stringToSign = blobClient.generateUserDelegationSasStringToSign(
      generateSasOptions,
      userDelegationKey,
    );
    const userDelegationKeyCredential = new UserDelegationKeyCredential(
      blobServiceClient.accountName,
      userDelegationKey,
    );
    const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(blobSasUrl));
  });
});
