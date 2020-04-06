import * as assert from "assert";

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
  StorageSharedKeyCredential,
  newPipeline
} from "../../src";
import { SASProtocol } from "../../src/SASQueryParameters";
import { getBSU, getTokenBSU, recorderEnvSetup } from "../utils";
import { delay, record } from "@azure/test-utils-recorder";
import { SERVICE_VERSION } from "../../src/utils/constants";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  let recorder: any;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
  });

  afterEach(function() {
    recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    await serviceClientWithSAS.getAccountInfo();
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("wdlcup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString()
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("tqf").toString()
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${blobServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new BlobServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateBlobSASQueryParameters should work for container", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: ContainerSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${containerClient.url}?${containerSAS}`;
    const containerClientwithSAS = new ContainerClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    (
      await containerClientwithSAS
        .listBlobsFlat()
        .byPage()
        .next()
    ).value;
    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob with previous API version", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const blobName = recorder.getUniqueName("blob");
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original"
      }
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
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: BlobSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));

    const properties = await blobClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = recorder.getUniqueName("blob");
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original"
      }
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
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: BlobSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${blobClient.url}?${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));

    const properties = await blobClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob snapshot", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = recorder.getUniqueName("blob");
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original"
      }
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
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: BlobSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        snapshotTime: response.snapshot
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${blobClient.withSnapshot(response.snapshot!).url}&${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));

    const properties = await blobClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob with special namings", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = recorder.getUniqueName("container-with-dash");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
    const blobName = recorder.getUniqueName(
      "////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'"
    );
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original"
      }
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
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: BlobSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));

    const properties = await blobClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob with container SAS using access policy", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = recorder.getUniqueName("blob");
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024);

    const id = "unique-id";
    await containerClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: tmr,
          startsOn: now
        },
        id
      }
    ]);

    /*
     * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(30 * 1000);

    const blobSAS = generateBlobSASQueryParameters(
      {
        containerName,
        permissions: ContainerSASPermissions.parse("racwdl"),
        identifier: id
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));

    await blobClientwithSAS.getProperties();
    await containerClient.delete();
  });

  it("generateBlobSASQueryParameters should work for blob with blob SAS using access policy", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = recorder.getUniqueName("blob");
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024);

    const id = "unique-id";
    await containerClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: ContainerSASPermissions.parse("racwdl").toString(),
          startsOn: now
        },
        id
      }
    ]);

    /*
     * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(30 * 1000);

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName: blobName,
        containerName: containerName,
        identifier: id
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));

    await blobClientwithSAS.getProperties();
    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for container with all configurations", async function() {
    // Try to get BlobServiceClient object with TokenCredential
    // when ACCOUNT_TOKEN environment variable is set
    let blobServiceClientWithToken: BlobServiceClient | undefined;
    try {
      blobServiceClientWithToken = getTokenBSU();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (blobServiceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: ContainerSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: SERVICE_VERSION
      },
      userDelegationKey,
      accountName
    );

    const sasClient = `${containerClient.url}?${containerSAS}`;
    const containerClientwithSAS = new ContainerClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    (
      await containerClientwithSAS
        .listBlobsFlat()
        .byPage()
        .next()
    ).value;
    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for container with minimum parameters", async function() {
    // Try to get BlobServiceClient object with TokenCredential
    // when ACCOUNT_TOKEN environment variable is set
    let blobServiceClientWithToken: BlobServiceClient | undefined;
    try {
      blobServiceClientWithToken = getTokenBSU();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (blobServiceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        expiresOn: tmr,
        permissions: ContainerSASPermissions.parse("racwdl")
      },
      userDelegationKey,
      accountName
    );

    const sasClient = `${containerClient.url}?${containerSAS}`;
    const containerClientwithSAS = new ContainerClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    (
      await containerClientwithSAS
        .listBlobsFlat()
        .byPage()
        .next()
    ).value;
    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for blob", async function() {
    // Try to get blobServiceClient object with TokenCredential
    // when ACCOUNT_TOKEN environment variable is set
    let blobServiceClientWithToken: BlobServiceClient | undefined;
    try {
      blobServiceClientWithToken = getTokenBSU();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (blobServiceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = recorder.getUniqueName("blob");
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original"
      }
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
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: BlobSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now
      },
      userDelegationKey,
      accountName
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(sasClient, newPipeline(new AnonymousCredential()));

    const properties = await blobClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });

  it("GenerateUserDelegationSAS should work for blob snapshot", async function() {
    // Try to get blobServiceClient object with TokenCredential
    // when ACCOUNT_TOKEN environment variable is set
    let blobServiceClientWithToken: BlobServiceClient | undefined;
    try {
      blobServiceClientWithToken = getTokenBSU();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (blobServiceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (blobServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const containerName = recorder.getUniqueName("container");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const blobName = recorder.getUniqueName("blob");
    const blobClient = containerClient.getPageBlobClient(blobName);
    await blobClient.create(1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original"
      }
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
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: BlobSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        snapshotTime: response.snapshot
      },
      userDelegationKey,
      accountName
    );

    const sasURL = `${blobClient.withSnapshot(response.snapshot!).url}&${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(sasURL, newPipeline(new AnonymousCredential()));

    const properties = await blobClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete();
  });
});
