import * as assert from "assert";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  generateAccountSASQueryParameters,
  FileServiceClient,
  SharedKeyCredential,
  StorageClient,
  SASProtocol
} from "../../src";
import { Aborter } from "../../src/Aborter";
import { DirectoryClient } from "../../src/DirectoryClient";
import { FileSASPermissions } from "../../src/FileSASPermissions";
import { FileClient } from "../../src/FileClient";
import { generateFileSASQueryParameters } from "../../src/IFileSASSignatureValues";
import { ShareSASPermissions } from "../../src/ShareSASPermissions";
import { ShareClient } from "../../src/ShareClient";
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

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new FileServiceClient(
      sasURL,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    await serviceClientWithSAS.listSharesSegment(Aborter.none);
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

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new FileServiceClient(
      sasURL,
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
        services: AccountSASServices.parse("btq").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new FileServiceClient(
      sasURL,
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

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new FileServiceClient(
      sasURL,
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

  it("generateFileSASQueryParameters should work for share", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = getUniqueName("share");
    const shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);
    await shareClient.create(Aborter.none);

    const shareSAS = generateFileSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: ShareSASPermissions.parse("rcwdl").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        shareName,
        startTime: now,
        version: "2018-03-28"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasURL = `${shareClient.url}?${shareSAS}`;
    const shareClientwithSAS = new ShareClient(
      sasURL,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    const dirURLwithSAS = DirectoryClient.fromShareClient(shareClientwithSAS, "");
    await dirURLwithSAS.listFilesAndDirectoriesSegment(Aborter.none);

    await shareClient.delete(Aborter.none);
  });

  it("generateFileSASQueryParameters should work for file", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = getUniqueName("share");
    const shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);
    await shareClient.create(Aborter.none);

    const dirName = getUniqueName("dir");
    const dirClient = DirectoryClient.fromShareClient(shareClient, dirName);
    await dirClient.create(Aborter.none);

    const fileName = getUniqueName("file");
    const fileClient = FileClient.fromDirectoryClient(dirClient, fileName);
    await fileClient.create(Aborter.none, 1024, {
      fileHTTPHeaders: {
        fileContentType: "content-type-original"
      }
    });

    const fileSAS = generateFileSASQueryParameters(
      {
        cacheControl: "cache-control-override",
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiryTime: tmr,
        filePath: `${dirName}/${fileName}`,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSASPermissions.parse("rcwd").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        shareName,
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientwithSAS = new FileClient(
      sasURL,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    const properties = await fileClientwithSAS.getProperties(Aborter.none);
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await shareClient.delete(Aborter.none);
  });

  it("generateFileSASQueryParameters should work for file with access policy", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceClient.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = getUniqueName("share");
    const shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);
    await shareClient.create(Aborter.none);

    const dirName = getUniqueName("dir");
    const dirClient = DirectoryClient.fromShareClient(shareClient, dirName);
    await dirClient.create(Aborter.none);

    const fileName = getUniqueName("file");
    const fileClient = FileClient.fromDirectoryClient(dirClient, fileName);
    await fileClient.create(Aborter.none, 1024, {
      fileHTTPHeaders: {
        fileContentType: "content-type-original"
      }
    });

    const id = "unique-id";
    await shareClient.setAccessPolicy(Aborter.none, [
      {
        accessPolicy: {
          expiry: tmr,
          permission: ShareSASPermissions.parse("rcwdl").toString(),
          start: now
        },
        id
      }
    ]);

    const shareSAS = generateFileSASQueryParameters(
      {
        identifier: id,
        shareName
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasURL = `${shareClient.url}?${shareSAS}`;
    const shareClientwithSAS = new ShareClient(
      sasURL,
      StorageClient.newPipeline(new AnonymousCredential())
    );

    const dirURLwithSAS = DirectoryClient.fromShareClient(shareClientwithSAS, "");
    await dirURLwithSAS.listFilesAndDirectoriesSegment(Aborter.none);
    await shareClient.delete(Aborter.none);
  });
});
