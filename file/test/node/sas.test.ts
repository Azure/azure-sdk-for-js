import * as assert from "assert";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  generateAccountSASQueryParameters,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
} from "../../lib";
import { Aborter } from "../../lib/Aborter";
import { DirectoryURL } from "../../lib/DirectoryURL";
import { FileSASPermissions } from "../../lib/FileSASPermissions";
import { FileURL } from "../../lib/FileURL";
import { generateFileSASQueryParameters } from "../../lib/IFileSASSignatureValues";
import { SASProtocol } from "../../lib/index.browser";
import { ShareSASPermissions } from "../../lib/ShareSASPermissions";
import { ShareURL } from "../../lib/ShareURL";
import { getBSU, getUniqueName } from "../utils";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  const serviceURL = getBSU();

  it("generateAccountSASQueryParameters should work", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
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

    const sasURL = `${serviceURL.url}?${sas}`;
    const serviceURLWithSAS = new ServiceURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    await serviceURLWithSAS.listSharesSegment(Aborter.none);
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
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

    const sasURL = `${serviceURL.url}?${sas}`;
    const serviceURLWithSAS = new ServiceURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceURLWithSAS.getProperties(Aborter.none);
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
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

    const sasURL = `${serviceURL.url}?${sas}`;
    const serviceURLWithSAS = new ServiceURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceURLWithSAS.getProperties(Aborter.none);
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
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

    const sasURL = `${serviceURL.url}?${sas}`;
    const serviceURLWithSAS = new ServiceURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceURLWithSAS.getProperties(Aborter.none);
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
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = getUniqueName("share");
    const shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);

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

    const sasURL = `${shareURL.url}?${shareSAS}`;
    const shareURLwithSAS = new ShareURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    const dirURLwithSAS = DirectoryURL.fromShareURL(shareURLwithSAS, "");
    await dirURLwithSAS.listFilesAndDirectoriesSegment(Aborter.none);

    await shareURL.delete(Aborter.none);
  });

  it("generateFileSASQueryParameters should work for file", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = getUniqueName("share");
    const shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);

    const dirName = getUniqueName("dir");
    const dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);

    const fileName = getUniqueName("file");
    const fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
    await fileURL.create(Aborter.none, 1024, {
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

    const sasURL = `${fileURL.url}?${fileSAS}`;
    const fileURLwithSAS = new FileURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    const properties = await fileURLwithSAS.getProperties(Aborter.none);
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await shareURL.delete(Aborter.none);
  });

  it("generateFileSASQueryParameters should work for file with access policy", async () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const shareName = getUniqueName("share");
    const shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);

    const dirName = getUniqueName("dir");
    const dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);

    const fileName = getUniqueName("file");
    const fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
    await fileURL.create(Aborter.none, 1024, {
      fileHTTPHeaders: {
        fileContentType: "content-type-original"
      }
    });

    const id = "unique-id";
    await shareURL.setAccessPolicy(Aborter.none, [
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

    const sasURL = `${shareURL.url}?${shareSAS}`;
    const shareURLwithSAS = new ShareURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    const dirURLwithSAS = DirectoryURL.fromShareURL(shareURLwithSAS, "");
    await dirURLwithSAS.listFilesAndDirectoriesSegment(Aborter.none);
    await shareURL.delete(Aborter.none);
  });
});
