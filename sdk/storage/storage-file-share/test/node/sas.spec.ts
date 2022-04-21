// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  generateAccountSASQueryParameters,
  SASProtocol,
  ShareClient,
  ShareFileClient,
  ShareServiceClient,
  StorageSharedKeyCredential,
} from "../../src";
import { FileSASPermissions } from "../../src/FileSASPermissions";
import { generateFileSASQueryParameters } from "../../src/FileSASSignatureValues";
import { newPipeline } from "../../src/Pipeline";
import { ShareSASPermissions } from "../../src/ShareSASPermissions";
import { getBSU, recorderEnvSetup } from "../utils";
import { delay, record, Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;

  beforeEach(function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getBSU();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("now");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
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
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ShareServiceClient(sasURL, newPipeline());

    const result = (await serviceClientWithSAS.listShares().byPage().next()).value;
    assert.ok(result.shareItems!.length >= 0);
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = recorder.newDate("now");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("wdlcup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ShareServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err: any) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = recorder.newDate("now");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btq").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ShareServiceClient(sasURL);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err: any) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = recorder.newDate("now");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ShareServiceClient(sasURL);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err: any) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateFileSASQueryParameters should work for share", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("now");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = recorder.getUniqueName("share");
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const shareSAS = generateFileSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: ShareSASPermissions.parse("rcwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: shareClient.name,
        startsOn: now,
        version: "2018-03-28",
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${shareClient.url}?${shareSAS}`;
    const shareClientwithSAS = new ShareClient(sasURL);

    const dirURLwithSAS = shareClientwithSAS.getDirectoryClient("");
    const result = (await dirURLwithSAS.listFilesAndDirectories().byPage().next()).value;
    assert.ok(result.segment.directoryItems!.length >= 0);
    assert.ok(result.segment.fileItems!.length >= 0);

    await shareClient.delete();
  });

  it("generateFileSASQueryParameters should work for file", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("now");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = recorder.getUniqueName("share");
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const dirName = recorder.getUniqueName("dir");
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024, {
      fileHttpHeaders: {
        fileContentType: "content-type-original",
      },
    });

    const fileSAS = generateFileSASQueryParameters(
      {
        cacheControl: "cache-control-override",
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        filePath: fileClient.path,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSASPermissions.parse("rcwd"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: fileClient.shareName,
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientwithSAS = new ShareFileClient(sasURL);

    const properties = await fileClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await shareClient.delete();
  });

  it("generateFileSASQueryParameters should work for share with access policy", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = recorder.getUniqueName("share");
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const dirName = recorder.getUniqueName("dir");
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024, {
      fileHttpHeaders: {
        fileContentType: "content-type-original",
      },
    });

    const id = "unique-id";
    await shareClient.setAccessPolicy([
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: ShareSASPermissions.parse("rcwdl").toString(),
          startsOn: now,
        },
        id,
      },
    ]);

    /*
     * When you establish a stored access policy on a share, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(30 * 1000);

    const shareSAS = generateFileSASQueryParameters(
      {
        identifier: id,
        shareName,
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${shareClient.url}?${shareSAS}`;
    const shareClientwithSAS = new ShareClient(sasURL, newPipeline(new AnonymousCredential()));

    const dirClientwithSAS = shareClientwithSAS.getDirectoryClient("");
    const result = (await dirClientwithSAS.listFilesAndDirectories().byPage().next()).value;
    assert.ok(result.segment.directoryItems!.length >= 0);
    assert.ok(result.segment.fileItems!.length >= 0);
    await shareClient.delete();
  });

  it("generateFileSASQueryParameters should work for file with access policy", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);
    const sharedKeyCredential = serviceClient["credential"];

    const shareName = recorder.getUniqueName("share");
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const dirName = recorder.getUniqueName("dir");
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024, {
      fileHttpHeaders: {
        fileContentType: "content-type-original",
      },
    });

    const id = "unique-id";
    await shareClient.setAccessPolicy([
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: FileSASPermissions.parse("rcwd").toString(),
          startsOn: now,
        },
        id,
      },
    ]);

    /*
     * When you establish a stored access policy on a share, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(30 * 1000);

    const fileSAS = generateFileSASQueryParameters(
      {
        identifier: id,
        shareName,
        filePath: fileClient.path,
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new ShareFileClient(sasURL, newPipeline(new AnonymousCredential()));
    await fileClientWithSAS.getProperties();

    await shareClient.delete();
  });

  it("ShareServiceClient.generateAccountSasUrl should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("f").toString(),
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();
    const sasURL1 = `${serviceClient.url}?${sas}`;

    const sasURL = serviceClient.generateAccountSasUrl(
      tmr,
      AccountSASPermissions.parse("rwdlacup"),
      AccountSASResourceTypes.parse("sco").toString(),
      {
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31",
      }
    );
    assert.deepStrictEqual(sasURL, sasURL1);

    const serviceClientWithSAS = new ShareServiceClient(sasURL);
    const result = (await serviceClientWithSAS.listShares().byPage().next()).value;
    assert.ok(result.shareItems!.length >= 0);
  });

  it("ShareServiceClient.generateAccountSasUrl should work with default parameters", async () => {
    const sasURL = serviceClient.generateAccountSasUrl();
    const serviceClientWithSAS = new ShareServiceClient(sasURL);
    await serviceClientWithSAS.getProperties();

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      await serviceClientWithSAS.generateAccountSasUrl();
    } catch (err: any) {
      assert.ok(err instanceof RangeError);
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("ShareCleint.generateSasUrl should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const shareName = recorder.getUniqueName("share");
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const shareSAS = generateFileSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: ShareSASPermissions.parse("rcwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: shareClient.name,
        startsOn: now,
        version: "2018-03-28",
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL1 = `${shareClient.url}?${shareSAS}`;
    const sasURL = shareClient.generateSasUrl({
      expiresOn: tmr,
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: ShareSASPermissions.parse("rcwdl"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      version: "2018-03-28",
    });
    assert.deepStrictEqual(sasURL, sasURL1);

    const shareClientwithSAS = new ShareClient(sasURL);
    const dirURLwithSAS = shareClientwithSAS.getDirectoryClient("");
    const result = (await dirURLwithSAS.listFilesAndDirectories().byPage().next()).value;
    assert.ok(result.segment.directoryItems!.length >= 0);
    assert.ok(result.segment.fileItems!.length >= 0);

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      shareClient.generateSasUrl({});
    } catch (err: any) {
      assert.ok(err instanceof RangeError);
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    await shareClient.delete();
  });

  it("ShareFileClient.generateSasUrl should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const shareName = recorder.getUniqueName("share");
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const dirName = recorder.getUniqueName("dir");
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024, {
      fileHttpHeaders: {
        fileContentType: "content-type-original",
      },
    });

    const fileSAS = generateFileSASQueryParameters(
      {
        cacheControl: "cache-control-override",
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        filePath: fileClient.path,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSASPermissions.parse("rcwd"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: fileClient.shareName,
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );
    const sasURL1 = `${fileClient.url}?${fileSAS}`;

    const sasURL = fileClient.generateSasUrl({
      cacheControl: "cache-control-override",
      contentDisposition: "content-disposition-override",
      contentEncoding: "content-encoding-override",
      contentLanguage: "content-language-override",
      contentType: "content-type-override",
      expiresOn: tmr,
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: FileSASPermissions.parse("rcwd"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      version: "2016-05-31",
    });
    assert.deepStrictEqual(sasURL1, sasURL);

    const fileClientwithSAS = new ShareFileClient(sasURL);
    const properties = await fileClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      fileClient.generateSasUrl({});
    } catch (err: any) {
      assert.ok(err instanceof RangeError);
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    await shareClient.delete();
  });

  it("rename file - source and destination with different SAS", async () => {
    const shareName = recorder.getUniqueName("share");
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);
    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const sourceUrl = shareClient.generateSasUrl({
      permissions: ShareSASPermissions.parse("r"),
      expiresOn: tmr,
    });

    const sasShareClient = new ShareClient(sourceUrl);
    const sasSourceFileClient = sasShareClient.getDirectoryClient("").getFileClient(sourceFileName);

    const destFileName = recorder.getUniqueName("destfile");
    const destFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await destFileClient.create(2048);

    const sharedKeyCredential = serviceClient["credential"];
    const destSAS = generateFileSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: FileSASPermissions.parse("w"),
        shareName: shareName,
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const result = await sasSourceFileClient.rename(destFileName + "?" + destSAS, {
      replaceIfExists: true,
    });

    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected"
    );

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename directory - source and destination with different SAS", async () => {
    const shareName = recorder.getUniqueName("share");
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);
    const sourceDirName = recorder.getUniqueName("sourcedir");
    const sourceDirClient = shareClient.getDirectoryClient(sourceDirName);
    await sourceDirClient.create();

    const shareSASUrl = shareClient.generateSasUrl({
      permissions: ShareSASPermissions.parse("r"),
      expiresOn: tmr,
    });

    const sasShareClient = new ShareClient(shareSASUrl);
    const sasSourceDirClient = sasShareClient.getDirectoryClient(sourceDirName);

    const destFileName = recorder.getUniqueName("destfile");
    const destFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await destFileClient.create(2048);

    const sharedKeyCredential = serviceClient["credential"];
    const destSAS = generateFileSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: FileSASPermissions.parse("w"),
        shareName: shareName,
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const result = await sasSourceDirClient.rename(destFileName + "?" + destSAS, {
      replaceIfExists: true,
    });

    assert.ok(
      result.destinationDirectoryClient.name === destFileName,
      "Destination name should be expected"
    );

    assert.isFalse(await sourceDirClient.exists(), "Source directory should not exist anymore");
  });
});
