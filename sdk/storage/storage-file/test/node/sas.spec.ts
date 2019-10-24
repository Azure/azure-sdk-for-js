import * as assert from "assert";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  FileServiceClient,
  generateAccountSASQueryParameters,
  SASProtocol,
  SharedKeyCredential
} from "../../src";
import { FileClient } from "../../src/FileClient";
import { FileSASPermissions } from "../../src/FileSASPermissions";
import { generateFileSASQueryParameters } from "../../src/FileSASSignatureValues";
import { newPipeline } from "../../src/Pipeline";
import { ShareClient } from "../../src/ShareClient";
import { ShareSASPermissions } from "../../src/ShareSASPermissions";
import { getBSU } from "../utils";
import { record } from "../utils/recorder";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  const serviceClient = getBSU();

  let recorder: any;

  beforeEach(function() {
    recorder = record(this);
  });

  afterEach(function() {
    recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = recorder.newDate();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
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
      newPipeline(new AnonymousCredential())
    );

    (await serviceClientWithSAS
      .listShares()
      .byPage()
      .next()).value;
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = recorder.newDate();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        permissions: AccountSASPermissions.parse("wdlcup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new FileServiceClient(
      sasURL,
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
    const tmr = recorder.newDate();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btq").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new FileServiceClient(sasURL);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = recorder.newDate();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new FileServiceClient(sasURL);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateFileSASQueryParameters should work for share", async () => {
    const now = recorder.newDate();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = recorder.getUniqueName("share");
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const shareSAS = generateFileSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: ShareSASPermissions.parse("rcwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: shareClient.shareName,
        startTime: now,
        version: "2018-03-28"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasURL = `${shareClient.url}?${shareSAS}`;
    const shareClientwithSAS = new ShareClient(sasURL);

    const dirURLwithSAS = shareClientwithSAS.getDirectoryClient("");
    (await dirURLwithSAS
      .listFilesAndDirectories()
      .byPage()
      .next()).value;

    await shareClient.delete();
  });

  it("generateFileSASQueryParameters should work for file", async () => {
    const now = recorder.newDate();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate();
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
        filePath: fileClient.path,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSASPermissions.parse("rcwd"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: fileClient.shareName,
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientwithSAS = new FileClient(sasURL);

    const properties = await fileClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await shareClient.delete();
  });

  it("generateFileSASQueryParameters should work for file with access policy", async () => {
    const now = recorder.newDate();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate();
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
        fileContentType: "content-type-original"
      }
    });

    const id = "unique-id";
    await shareClient.setAccessPolicy([
      {
        accessPolicy: {
          expiry: tmr,
          permissions: ShareSASPermissions.parse("rcwdl").toString(),
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
    const shareClientwithSAS = new ShareClient(sasURL, newPipeline(new AnonymousCredential()));

    const dirClientwithSAS = shareClientwithSAS.getDirectoryClient("");
    (await dirClientwithSAS
      .listFilesAndDirectories()
      .byPage()
      .next()).value;
    await shareClient.delete();
  });
});
