import * as assert from "assert";

import {
  Aborter,
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
  ServiceClient,
  SharedKeyCredential,
  StorageClient
} from "../../src";
import { SASProtocol } from "../../src/SASQueryParameters";
import { getBSU, getUniqueName } from "../utils";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  const serviceClient = getBSU();

  it("generateAccountSASQueryParameters should work", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ServiceClient(
      sasClient,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    await serviceClientWithSAS.getAccountInfo(Aborter.none);
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        permissions: AccountSASPermissions.parse("wdlcup").toString(),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ServiceClient(
      sasClient,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.getProperties(Aborter.none);
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup").toString(),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("tqf").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ServiceClient(
      sasClient,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.getProperties(Aborter.none);
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ServiceClient(
      sasClient,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.getProperties(Aborter.none);
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateBlobSASQueryParameters should work for container", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = getUniqueName("container");
    const containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName,
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: ContainerSASPermissions.parse("racwdl").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasClient = `${containerClient.url}?${containerSAS}`;
    const containerClientwithSAS = new ContainerClient(
      sasClient,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    await containerClientwithSAS.listBlobFlatSegment(Aborter.none);
    await containerClient.delete(Aborter.none);
  });

  it("generateBlobSASQueryParameters should work for blob", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = getUniqueName("container");
    const containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);

    const blobName = getUniqueName("blob");
    const blobClient = PageBlobClient.fromContainerClient(containerClient, blobName);
    await blobClient.create(Aborter.none, 1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original"
      }
    });

    const blobSAS = generateBlobSASQueryParameters(
      {
        blobName,
        cacheControl: "cache-control-override",
        containerName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: BlobSASPermissions.parse("racwd").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(
      sasClient,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    const properties = await blobClientwithSAS.getProperties(Aborter.none);
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete(Aborter.none);
  });

  it("generateBlobSASQueryParameters should work for blob with special namings", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = getUniqueName("container-with-dash");
    const containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);

    const blobName = getUniqueName(
      "////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'"
    );
    const blobClient = PageBlobClient.fromContainerClient(containerClient, blobName);
    await blobClient.create(Aborter.none, 1024, {
      blobHTTPHeaders: {
        blobContentType: "content-type-original"
      }
    });

    const blobSAS = generateBlobSASQueryParameters(
      {
        // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
        blobName: blobName.replace(/\\/g, "/"),
        cacheControl: "cache-control-override",
        containerName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: BlobSASPermissions.parse("racwd").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(
      sasClient,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    const properties = await blobClientwithSAS.getProperties(Aborter.none);
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await containerClient.delete(Aborter.none);
  });

  it("generateBlobSASQueryParameters should work for blob with access policy", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const containerName = getUniqueName("container");
    const containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);

    const blobName = getUniqueName("blob");
    const blobClient = PageBlobClient.fromContainerClient(containerClient, blobName);
    await blobClient.create(Aborter.none, 1024);

    const id = "unique-id";
    await containerClient.setAccessPolicy(Aborter.none, undefined, [
      {
        accessPolicy: {
          expiry: tmr,
          permission: ContainerSASPermissions.parse("racwdl").toString(),
          start: now
        },
        id
      }
    ]);

    const blobSAS = generateBlobSASQueryParameters(
      {
        containerName,
        identifier: id
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasClient = `${blobClient.url}?${blobSAS}`;
    const blobClientwithSAS = new PageBlobClient(
      sasClient,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    await blobClientwithSAS.getProperties(Aborter.none);
    await containerClient.delete(Aborter.none);
  });
});
