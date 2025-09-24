// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageSharedKeyCredential, Tags, UserDelegationKey } from "@azure/storage-blob";
import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  BlobSASPermissions,
  ContainerSASPermissions,
  ContainerClient,
  generateAccountSASQueryParameters,
  generateBlobSASQueryParameters,
  PageBlobClient,
  BlobServiceClient,
  newPipeline,
  BlobClient,
  SASProtocol,
  BlobBatch,
} from "@azure/storage-blob";
import { delay, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "./utils/clients.js";
import { ensureClientRecording } from "../utils/recorder.js";
import { getUniqueName } from "../utils/utils.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { getAccountKey, getAccountName, getEncryptionScope1 } from "../../utils/injectables.js";
import { SERVICE_VERSION } from "../utils/constants.js";

describe.runIf(getAccountKey())("Shared Access Signature (SAS) generation Node.js only", () => {
  let recorder: Recorder;
  let blobServiceClient: BlobServiceClient;
  const encryptionScopeName = getEncryptionScope1();

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const blobServiceClientOrUndefined = await createBlobServiceClient("AccountKey", { recorder });
    assert.isDefined(blobServiceClientOrUndefined);
    blobServiceClient = blobServiceClientOrUndefined;
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(sasClient, newPipeline());
    ensureClientRecording(recorder, serviceClientWithSAS);
    await serviceClientWithSAS.getAccountInfo();
  });

  it("generateAccountSASQueryParameters should work with permanentDelete permission", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: AccountSASPermissions.parse("rwdlacupy"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
      },
      sharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(sasClient, newPipeline());
    ensureClientRecording(recorder, serviceClientWithSAS);
    const containerName = getUniqueName("container", { recorder });
    const containerClient = serviceClientWithSAS.getContainerClient(containerName);
    await containerClient.create();
    const blobName = getUniqueName("blobname", { recorder });
    const appendBlobClient = containerClient.getAppendBlobClient(blobName);
    await appendBlobClient.create();
    await appendBlobClient.delete();
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("wdlcup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
      },
      sharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, serviceClientWithSAS);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("tqf").toString(),
      },
      sharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, serviceClientWithSAS);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31",
      },
      sharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, serviceClientWithSAS);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should work with encryption scope", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        encryptionScope: encryptionScopeName,
      },
      sharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(sasClient, newPipeline());
    ensureClientRecording(recorder, serviceClientWithSAS);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const appendBlobName = getUniqueName("appendblob", { recorder });
    const appendBlobClient = serviceClientWithSAS
      .getContainerClient(containerName)
      .getAppendBlobClient(appendBlobName);
    await appendBlobClient.create({
      encryptionScope: encryptionScopeName,
    });

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for container", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: ContainerSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential,
    );

    const sasClient = `${containerClient.url}?${containerSAS}`;
    const containerClientWithSAS = new ContainerClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, containerClientWithSAS);

    const result = (await containerClientWithSAS.listBlobsFlat().byPage().next()).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.deepStrictEqual(result.continuationToken, "");
    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work with encryption scope for container", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: ContainerSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-12-06",
        encryptionScope: encryptionScopeName,
      },
      sharedKeyCredential,
    );

    const sasClient = `${containerClient.url}?${containerSAS}`;
    const containerClientWithSAS = new ContainerClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, containerClientWithSAS);

    const appendBlobName = getUniqueName("appendblob", { recorder });
    const appendBlobClient = containerClientWithSAS.getAppendBlobClient(appendBlobName);
    await appendBlobClient.create({
      encryptionScope: encryptionScopeName,
    });
    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob with previous API version", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
        version: "2016-05-31",
      },
      sharedKeyCredential,
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob with permanentDelete permission", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024);

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdy"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.delete();

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work with encryption scope for blob", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
      encryptionScope: encryptionScopeName,
    });

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob tags", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdt"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const tags = {
      tag1: "val1",
      tag2: "val2",
    };
    await blobClientWithSAS.setTags(tags);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for container for blob tags", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const blobSAS = generateBlobSASQueryParameters(
      {
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdt"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const tags = {
      tag1: "val1",
      tag2: "val2",
    };
    await blobClientWithSAS.setTags(tags);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob snapshot", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const response = await blobClient.createSnapshot();

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
        snapshotTime: response.snapshot,
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.withSnapshot(response.snapshot!).url}&${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob snapshot with permanentDelete permission", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024);

    const response = await blobClient.createSnapshot();

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
        snapshotTime: response.snapshot,
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.withSnapshot(response.snapshot!).url}&${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    await blobClientWithSAS.delete();
    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob with special namings", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container-with-dash", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
    const blobName = getUniqueName(
      "////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'",
      { recorder },
    );
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });
    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
        version: "2016-05-31",
      },
      sharedKeyCredential,
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob with container SAS using access policy", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024);

    const id = "unique-id";
    await containerClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: tmr,
          startsOn: now,
        },
        id,
      },
    ]);

    /*
     * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://learn.microsoft.com/rest/api/storageservices/set-container-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(30 * 1000);

    const blobSAS = generateBlobSASQueryParameters(
      {
        containerName,
        permissions: ContainerSASPermissions.parse("racwdl"),
        identifier: id,
      },
      sharedKeyCredential,
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    await blobClientWithSAS.getProperties();
    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob with blob SAS using access policy", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024);

    const id = "unique-id";
    await containerClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: ContainerSASPermissions.parse("racwdl").toString(),
          startsOn: now,
        },
        id,
      },
    ]);

    /*
     * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://learn.microsoft.com/rest/api/storageservices/set-container-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(30 * 1000);

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobName,
        containerName: containerName,
        identifier: id,
      },
      sharedKeyCredential,
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    await blobClientWithSAS.getProperties();
    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for container with all configurations", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: ContainerSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: SERVICE_VERSION,
      },
      userDelegationKey,
      accountName,
    );

    const sasClient = `${containerClient.url}?${containerSAS}`;
    const containerClientWithSAS = new ContainerClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, containerClientWithSAS);

    const result = (await containerClientWithSAS.listBlobsFlat().byPage().next()).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.deepStrictEqual(result.continuationToken, "");
    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for container with minimum parameters", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        permissions: ContainerSASPermissions.parse("racwdl"),
      },
      userDelegationKey,
      accountName,
    );

    const sasClient = `${containerClient.url}?${containerSAS}`;
    const containerClientWithSAS = new ContainerClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, containerClientWithSAS);

    const result = (await containerClientWithSAS.listBlobsFlat().byPage().next()).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.deepStrictEqual(result.continuationToken, "");
    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for blob", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
      },
      userDelegationKey,
      accountName,
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for blob with permanentDelete permssion", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
      },
      userDelegationKey,
      accountName,
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    await blobClientWithSAS.delete();
    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work with encryption scope for blob", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
      },
      userDelegationKey,
      accountName,
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.create(1024, {
      encryptionScope: encryptionScopeName,
    });

    await blobClientWithSAS.delete();
    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for blob snapshot", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const response = await blobClient.createSnapshot();

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        cacheControl: "cache-control-override",
        containerName: blobClient.containerName,
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
        snapshotTime: response.snapshot,
      },
      userDelegationKey,
      accountName,
    );

    const sasURL = `${blobClient.withSnapshot(response.snapshot!).url}&${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work with permanentDelete permission for blob snapshot", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const response = await blobClient.createSnapshot();

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdy"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        snapshotTime: response.snapshot,
      },
      userDelegationKey,
      accountName,
    );

    const sasURL = `${blobClient.withSnapshot(response.snapshot!).url}&${blobSAS}`;
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    await blobClientWithSAS.delete();
    await containerClient.delete();
  });

  it("generateAccountSASQueryParameters should work for blob version delete", async () => {
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);

    // generate SAS
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const future = new Date();
    future.setDate(future.getDate() + 1000);

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: future,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: AccountSASPermissions.parse("rwdlacupx"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2019-10-10",
      },
      blobServiceClient.credential as StorageSharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, serviceClientWithSAS);
    const containerClientWithSAS = serviceClientWithSAS.getContainerClient(containerName);
    await containerClientWithSAS.deleteBlob(blobName, { versionId: uploadRes.versionId });
    await containerClientWithSAS.delete();
  });

  it("generateAccountSASQueryParameters should work for blob version delete with permanentDelete permission", async () => {
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);

    // generate SAS
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const future = new Date();
    future.setDate(future.getDate() + 1000);

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: future,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: AccountSASPermissions.parse("rwdlacupxy"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2019-10-10",
      },
      blobServiceClient.credential as StorageSharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, serviceClientWithSAS);
    const containerClientWithSAS = serviceClientWithSAS.getContainerClient(containerName);
    await containerClientWithSAS.deleteBlob(blobName, { versionId: uploadRes.versionId });
    await containerClientWithSAS.delete();
  });

  it("generateBlobSASQueryParameters should work for blob version delete", async () => {
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);

    // generate SAS
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        startsOn: now,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdx"),
        protocol: SASProtocol.HttpsAndHttp,
        versionId: uploadRes.versionId,
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.withVersion(uploadRes.versionId!).url}&${blobSAS}`;
    const blobClientWithSAS = new BlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.delete();
    assert.ok(!(await blobClientWithSAS.exists()));

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob version delete with permanentDelete permission", async () => {
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);

    // generate SAS
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        startsOn: now,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdxy"),
        protocol: SASProtocol.HttpsAndHttp,
        versionId: uploadRes.versionId,
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.withVersion(uploadRes.versionId!).url}&${blobSAS}`;
    const blobClientWithSAS = new BlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.delete();
    assert.ok(!(await blobClientWithSAS.exists()));

    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for blob version delete", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);

    // generate SAS
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        startsOn: now,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdx"),
        protocol: SASProtocol.HttpsAndHttp,
        versionId: uploadRes.versionId,
        version: "2019-12-12",
      },
      userDelegationKey,
      accountName,
    );

    const sasURL = `${blobClient.withVersion(uploadRes.versionId!).url}&${blobSAS}`;
    const blobClientWithSAS = new BlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.delete();
    assert.ok(!(await blobClientWithSAS.exists()));

    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for 2020-12-06", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);

    // generate SAS
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        startsOn: now,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdx"),
        protocol: SASProtocol.HttpsAndHttp,
        versionId: uploadRes.versionId,
        version: "2020-12-06",
      },
      userDelegationKey,
      accountName,
    );

    const sasURL = `${blobClient.withVersion(uploadRes.versionId!).url}&${blobSAS}`;
    const blobClientWithSAS = new BlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.delete();
    assert.ok(!(await blobClientWithSAS.exists()));

    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work with permanentDelete permission for blob version delete", async () => {
    const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);

    // generate SAS
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        startsOn: now,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdxy"),
        protocol: SASProtocol.HttpsAndHttp,
        versionId: uploadRes.versionId,
      },
      userDelegationKey,
      accountName,
    );

    const sasURL = `${blobClient.withVersion(uploadRes.versionId!).url}&${blobSAS}`;
    const blobClientWithSAS = new BlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.delete();
    assert.ok(!(await blobClientWithSAS.exists()));

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob version delete and blob tags", async () => {
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);

    // generate SAS
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        startsOn: now,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: BlobSASPermissions.parse("racwdxt"),
        protocol: SASProtocol.HttpsAndHttp,
        versionId: uploadRes.versionId,
      },
      sharedKeyCredential,
    );

    const sasURL = `${blobClient.withVersion(uploadRes.versionId!).url}&${blobSAS}`;
    const blobClientWithSAS = new BlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const tags = {
      tag1: "val1",
      tag2: "val2",
    };
    await blobClientWithSAS.setTags(tags);

    await blobClientWithSAS.delete();
    assert.ok(!(await blobClientWithSAS.exists()));

    await containerClient.delete();
  });

  it("account SAS permission f, t for blob tags should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: AccountSASPermissions.parse("rwdlacupft"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2019-12-12",
      },
      sharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, serviceClientWithSAS);

    // prepare
    const containerName = getUniqueName("container1", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const key1 = getUniqueName("key", { recorder });
    const key2 = getUniqueName("key2", { recorder });

    const blobName1 = getUniqueName("blobname1", { recorder });
    const appendBlobClient1 = containerClient.getAppendBlobClient(blobName1);
    const tags1: Tags = {};
    tags1[key1] = getUniqueName("val1", { recorder });
    tags1[key2] = "default";
    await appendBlobClient1.create({ tags: tags1 });

    const blobName2 = getUniqueName("blobname2", { recorder });
    const appendBlobClient2 = containerClient.getAppendBlobClient(blobName2);
    const tags2: Tags = {};
    tags2[key1] = getUniqueName("val2", { recorder });
    tags2[key2] = "default";
    await appendBlobClient2.create({ tags: tags2 });

    // Wait for indexing tags
    await delay(2 * 1000);

    const expectedTags1: Tags = {};
    expectedTags1[key1] = tags1[key1];
    for await (const blob of serviceClientWithSAS.findBlobsByTags(`${key1}='${tags1[key1]}'`)) {
      assert.deepStrictEqual(blob.containerName, containerName);
      assert.deepStrictEqual(blob.name, blobName1);
      assert.deepStrictEqual(blob.tags, expectedTags1);
    }
    await containerClient.delete();
  });

  it("account SAS permission x for blob version delete should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: AccountSASPermissions.parse("rwdlacupx"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2019-12-12",
      },
      sharedKeyCredential,
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, serviceClientWithSAS);

    // create version
    const containerName = getUniqueName("container", { recorder });
    const containerClient = serviceClientWithSAS.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);

    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    await blobVersionClient.delete();
    assert.ok(!(await blobVersionClient.exists()));

    await containerClient.delete();
  });

  it("SAS permission m, e for blob should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024);

    const sas = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        expiresOn: tmr,
        permissions: BlobSASPermissions.parse("racwdxtme"),
        version: "2020-02-10",
      },
      sharedKeyCredential,
    );

    const blobClientWithSAS = new BlobClient(`${blobClient.url}?${sas}`);
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.getProperties();
  });

  it("SAS permission m, e for container should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const sas = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        permissions: ContainerSASPermissions.parse("racwdltxme"),
        version: "2020-02-10",
      },
      sharedKeyCredential,
    );

    const containerClientWithSAS = new ContainerClient(`${containerClient.url}?${sas}`);
    ensureClientRecording(recorder, containerClientWithSAS);
    await containerClientWithSAS.listBlobsFlat().byPage().next();
  });

  it("generateAccountSasUrl", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sasURL = blobServiceClient.generateAccountSasUrl(
      tmr,
      AccountSASPermissions.parse("r"),
      AccountSASResourceTypes.parse("s").toString(),
      {
        protocol: SASProtocol.HttpsAndHttp,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        startsOn: now,
      },
    );
    const serviceClientWithSAS = new BlobServiceClient(sasURL);
    ensureClientRecording(recorder, serviceClientWithSAS);
    await serviceClientWithSAS.getAccountInfo();

    const defaultSasURL = blobServiceClient.generateAccountSasUrl();
    const serviceClientWithDefaultSAS = new BlobServiceClient(defaultSasURL);
    ensureClientRecording(recorder, serviceClientWithDefaultSAS);
    await serviceClientWithDefaultSAS.getProperties();
  });

  it("generateAccountSasUrl with encryption scope", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const sasURL = blobServiceClient.generateAccountSasUrl(
      tmr,
      AccountSASPermissions.parse("rwdlacupx"),
      AccountSASResourceTypes.parse("sco").toString(),
      {
        protocol: SASProtocol.HttpsAndHttp,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        startsOn: now,
        encryptionScope: encryptionScopeName,
      },
    );

    const serviceClientWithSAS = new BlobServiceClient(sasURL);
    ensureClientRecording(recorder, serviceClientWithSAS);
    const blobName = getUniqueName("appendblob", { recorder });
    const blobClientWithSAS = serviceClientWithSAS
      .getContainerClient(containerName)
      .getAppendBlobClient(blobName);
    await blobClientWithSAS.create({
      encryptionScope: encryptionScopeName,
    });

    await containerClient.delete();
  });

  it("generateAccountSasUrl with permanentDelete permission", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const sasURL = blobServiceClient.generateAccountSasUrl(
      tmr,
      AccountSASPermissions.parse("rwdlacupxy"),
      AccountSASResourceTypes.parse("sco").toString(),
      {
        protocol: SASProtocol.HttpsAndHttp,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        startsOn: now,
      },
    );

    const serviceClientWithSAS = new BlobServiceClient(sasURL);
    ensureClientRecording(recorder, serviceClientWithSAS);
    const blobName = getUniqueName("appendblob", { recorder });
    const blobClientWithSAS = serviceClientWithSAS
      .getContainerClient(containerName)
      .getAppendBlobClient(blobName);
    await blobClientWithSAS.create();
    await blobClientWithSAS.delete();

    await containerClient.delete();
  });

  it("ContainerClient.generateSasUrl", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const sasURL = await containerClient.generateSasUrl({
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: ContainerSASPermissions.parse("racwdl"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
    });

    const containerClientWithSAS = new ContainerClient(sasURL);
    ensureClientRecording(recorder, containerClientWithSAS);
    const result = (await containerClientWithSAS.listBlobsFlat().byPage().next()).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.deepStrictEqual(result.continuationToken, "");

    try {
      await containerClientWithSAS.generateSasUrl({});
    } catch (err: any) {
      assert.ok(err instanceof RangeError);
    }

    await containerClient.delete();
  });

  it("ContainerClient.generateSasUrl with encryption scope", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const sasURL = await containerClient.generateSasUrl({
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: ContainerSASPermissions.parse("racwdl"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      encryptionScope: encryptionScopeName,
    });

    const containerClientWithSAS = new ContainerClient(sasURL);
    ensureClientRecording(recorder, containerClientWithSAS);

    const appendBlobName = getUniqueName("appendblob", { recorder });
    const appendBlobClient = containerClientWithSAS.getAppendBlobClient(appendBlobName);
    await appendBlobClient.create({
      encryptionScope: encryptionScopeName,
    });

    await containerClient.delete();
  });

  it("ContainerClient.generateSasUrl should work with filtertag permission", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const tags = {
      tag1: "val1",
      tag2: "val2",
    };

    const appendBlobName = getUniqueName("appendblob", { recorder });
    const appendBlobClient = containerClient.getAppendBlobClient(appendBlobName);
    await appendBlobClient.create({ tags: tags });

    // Wait for indexing tags
    await delay(2 * 1000);

    const sasURL = await containerClient.generateSasUrl({
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: ContainerSASPermissions.parse("racwdlf"),
      protocol: SASProtocol.HttpsAndHttp,
    });

    const containerClientWithSAS = new ContainerClient(sasURL);
    ensureClientRecording(recorder, containerClientWithSAS);

    const expectedTags1: Tags = {
      tag1: "val1",
    };

    for await (const blob of containerClientWithSAS.findBlobsByTags(`tag1='val1'`)) {
      assert.deepStrictEqual(blob.name, appendBlobName);
      assert.deepStrictEqual(blob.tags, expectedTags1);
      assert.deepStrictEqual(blob.tagValue, "val1");
    }

    await containerClient.delete();
  });

  it("BlobClient.generateSasUrl should work for blob", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const sasURL = await blobClient.generateSasUrl({
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
    });
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    const properties = await blobClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("BlobClient.generateSasUrl should work with encryption scope for blob", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);

    const sasURL = await blobClient.generateSasUrl({
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: BlobSASPermissions.parse("racwd"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      encryptionScope: encryptionScopeName,
    });
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    await blobClientWithSAS.create(1024, {
      encryptionScope: encryptionScopeName,
    });

    await containerClient.delete();
  });

  it("BlobClient.generateSasUrl should work with permanentDelete permission for blob", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);

    const sasURL = await blobClient.generateSasUrl({
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: BlobSASPermissions.parse("racwdy"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
    });
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    await blobClientWithSAS.create(1024);
    await blobClientWithSAS.delete();

    await containerClient.delete();
  });

  it("BlobClient.generateSasUrl should work for blob snapshot", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const createSnapshotRes = await blobClient.createSnapshot();
    const blobClientWithSnapshot = blobClient.withSnapshot(createSnapshotRes.snapshot!);

    await blobClient.setHTTPHeaders({
      blobContentType: "content-type-original1",
    });

    const sasURL = await blobClientWithSnapshot.generateSasUrl({
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
    });

    const blobClientWithSnapshotAndSAS = new PageBlobClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, blobClientWithSnapshotAndSAS);

    const properties = await blobClientWithSnapshotAndSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");
    assert.equal(properties.etag, createSnapshotRes.etag);

    await containerClient.delete();
  });

  it("BlobClient.generateSasUrl should work for blob version", async () => {
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);
    const blobClientWithVersion = blockBlobClient.withVersion(uploadRes.versionId!);

    // generate SAS
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const sasURL = await blobClientWithVersion.generateSasUrl({
      expiresOn: tmr,
      permissions: BlobSASPermissions.parse("racwdx"),
    });
    const blobClientWithVersionIdAndSAS = new PageBlobClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, blobClientWithVersionIdAndSAS);

    const properties = await blobClientWithVersionIdAndSAS.getProperties();
    assert.deepStrictEqual(properties.versionId, uploadRes.versionId);

    // delete version
    await blobClientWithVersionIdAndSAS.delete();
    assert.ok(!(await blobClientWithVersionIdAndSAS.exists()));
    assert.ok(await blockBlobClient.exists());
    await containerClient.delete();
  });

  it("BlobClient.generateSasUrl should work for blob snapshot with permanentDelete permission", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const blobName = getUniqueName("blob", { recorder });
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original",
      },
    });

    const createSnapshotRes = await blobClient.createSnapshot();
    const blobClientWithSnapshot = blobClient.withSnapshot(createSnapshotRes.snapshot!);

    await blobClient.setHTTPHeaders({
      blobContentType: "content-type-original1",
    });

    const sasURL = await blobClientWithSnapshot.generateSasUrl({
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
    });

    const blobClientWithSnapshotAndSAS = new PageBlobClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, blobClientWithSnapshotAndSAS);

    await blobClientWithSnapshotAndSAS.delete();
    await containerClient.delete();
  });

  it("BlobClient.generateSasUrl should work for blob version with permanentDelete permission", async () => {
    // create versions
    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const content = "Hello World";
    const blobName = getUniqueName("blob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadRes = await blockBlobClient.upload(content, content.length);
    await blockBlobClient.upload("", 0);
    const blobClientWithVersion = blockBlobClient.withVersion(uploadRes.versionId!);

    // generate SAS
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const sasURL = await blobClientWithVersion.generateSasUrl({
      expiresOn: tmr,
      permissions: BlobSASPermissions.parse("racwdxy"),
    });
    const blobClientWithVersionIdAndSAS = new PageBlobClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    ensureClientRecording(recorder, blobClientWithVersionIdAndSAS);

    const properties = await blobClientWithVersionIdAndSAS.getProperties();
    assert.deepStrictEqual(properties.versionId, uploadRes.versionId);

    // delete version
    await blobClientWithVersionIdAndSAS.delete();
    assert.ok(!(await blobClientWithVersionIdAndSAS.exists()));
    assert.ok(await blockBlobClient.exists());
    await containerClient.delete();
  });

  it("BlobClient.generateSasUrl should work for blob with special namings", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const containerName = getUniqueName("container-with-dash", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
    const blobName = getUniqueName(
      "////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'+%2F'%25%",
      { recorder },
    );
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024);

    const sasURL = await blobClient.generateSasUrl({
      expiresOn: tmr,
      permissions: BlobSASPermissions.parse("racwd"),
    });
    const blobClientWithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.getProperties();

    await containerClient.delete();
  });

  it("SAS permission parse from raw object should work", async () => {
    const orderedBlobPermissionStr = "racwdxtme";
    const blobPermission = BlobSASPermissions.parse(orderedBlobPermissionStr);
    assert.deepStrictEqual(
      BlobSASPermissions.from(blobPermission).toString(),
      orderedBlobPermissionStr,
    );

    const orderedContainerPermissionStr = "racwdxltme";
    const containerPermission = ContainerSASPermissions.parse(orderedContainerPermissionStr);
    assert.deepStrictEqual(
      ContainerSASPermissions.from(containerPermission).toString(),
      orderedContainerPermissionStr,
    );

    const orderedAccountPermissionStr = "rwdxftlacup";
    const accountPermission = AccountSASPermissions.parse(orderedAccountPermissionStr);
    assert.deepStrictEqual(
      AccountSASPermissions.from(accountPermission).toString(),
      orderedAccountPermissionStr,
    );
  });

  it.runIf(isLiveMode())("Batch operation should work with container sas", async () => {
    // generate container sas
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = blobServiceClient.credential as StorageSharedKeyCredential;

    const containerName = getUniqueName("container", { recorder });
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        permissions: ContainerSASPermissions.parse("racwdl"),
      },
      sharedKeyCredential,
    );

    const sasClient = `${containerClient.url}?${containerSAS}`;
    const containerClientWithSAS = new ContainerClient(sasClient);
    ensureClientRecording(recorder, containerClientWithSAS);

    // upload blobs
    const blockBlobCount = 3;
    const blockBlobClients = new Array(blockBlobCount);
    const content = "Hello World";
    for (let i = 0; i < blockBlobCount - 1; i++) {
      const tmpBlobName = `blob${i}`;
      const tmpBlockBlobClient = containerClientWithSAS.getBlockBlobClient(tmpBlobName);
      blockBlobClients[i] = tmpBlockBlobClient;
    }
    const specialBlobName = `å ä ö`;
    const tmpBlockBlobClient = containerClientWithSAS.getBlockBlobClient(specialBlobName);
    blockBlobClients[blockBlobCount - 1] = tmpBlockBlobClient;
    for (let i = 0; i < blockBlobCount; i++) {
      await blockBlobClients[i].upload(content, content.length);
    }

    // Assemble batch delete request.
    const batchDeleteRequest = new BlobBatch();
    for (let i = 0; i < blockBlobCount; i++) {
      await batchDeleteRequest.deleteBlob(blockBlobClients[i]);
    }

    // Submit batch request and verify response.
    const containerScopedBatchClient = containerClientWithSAS.getBlobBatchClient();
    const resp = await containerScopedBatchClient.submitBatch(batchDeleteRequest, {});
    assert.equal(resp.subResponses.length, blockBlobCount);
    assert.equal(resp.subResponsesSucceededCount, blockBlobCount);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < blockBlobCount; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 202);
      assert.ok(resp.subResponses[i].statusMessage !== "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(resp.subResponses[i]._request.url, blockBlobClients[i].url);
    }

    // Verify blobs deleted.
    const resp2 = (await containerClient.listBlobsFlat({}).byPage({ maxPageSize: 1 }).next()).value;
    assert.equal(resp2.segment.blobItems.length, 0);

    await containerClient.delete();
  });

  it("create container with invalid SAS should fail", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() - 1);

    const sharedKeyCredential = blobServiceClient["credential"];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasURL = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(sasURL, newPipeline());
    ensureClientRecording(recorder, serviceClientWithSAS);

    const containerName = getUniqueName("container", { recorder });
    const containerClient = serviceClientWithSAS.getContainerClient(containerName);
    try {
      await containerClient.create();
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.ok((err.details as any).authenticationErrorDetail.startsWith("Signed expiry time"));
    }
  });
});

describe("Generation for user delegation SAS Node.js only", () => {
  let recorder: Recorder;
  let blobServiceClient: BlobServiceClient;
  let userDelegationKey: UserDelegationKey;
  let now: Date;
  let tmr: Date;
  let containerClient: ContainerClient;
  let blobClient: BlobClient;
  const accountName = getAccountName();

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const blobServiceClientOrUndefined = await createBlobServiceClient("TokenCredential", {
      recorder,
    });
    assert.isDefined(blobServiceClientOrUndefined);
    blobServiceClient = blobServiceClientOrUndefined;

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

  it("user delegation SAS permission m, e for blob should work", async () => {
    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        expiresOn: tmr,
        permissions: BlobSASPermissions.parse("racwdxtme"),
        version: "2020-02-10",
      },
      userDelegationKey,
      accountName,
    );

    const blobClientWithSAS = new BlobClient(`${blobClient.url}?${blobSAS}`);
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.getProperties();
  });

  it("SAS permission m, e for container should work", async () => {
    const sas = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        permissions: ContainerSASPermissions.parse("racwdltxme"),
        version: "2020-02-10",
      },
      userDelegationKey,
      accountName,
    );

    const containerClientWithSAS = new ContainerClient(`${containerClient.url}?${sas}`);
    ensureClientRecording(recorder, containerClientWithSAS);
    await containerClientWithSAS.listBlobsFlat().byPage().next();
  });

  it("saoid and scid should work", async () => {
    const guid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    const authorizedGuid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobClient.name,
        containerName: blobClient.containerName,
        expiresOn: tmr,
        permissions: BlobSASPermissions.parse("racwdxtme"),
        version: "2020-02-10",
        preauthorizedAgentObjectId: authorizedGuid,
        correlationId: guid,
      },
      userDelegationKey,
      accountName,
    );

    const blobClientWithSAS = new BlobClient(`${blobClient.url}?${blobSAS}`);
    ensureClientRecording(recorder, blobClientWithSAS);
    await blobClientWithSAS.getProperties();
  });
});
