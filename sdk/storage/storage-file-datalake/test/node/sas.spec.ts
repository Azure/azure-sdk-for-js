import { UserDelegationKey } from "@azure/storage-blob";
import { record, Recorder } from "@azure/test-utils-recorder";
import * as assert from "assert";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  DataLakeDirectoryClient,
  DataLakeFileSystemClient,
  DataLakeSASPermissions,
  DataLakeServiceClient,
  FileSystemSASPermissions,
  generateAccountSASQueryParameters,
  generateDataLakeSASQueryParameters,
  newPipeline,
  PathAccessControlItem,
  PathPermissions,
  StorageSharedKeyCredential
} from "../../src";
import { DataLakeFileClient } from "../../src/";
import { SASProtocol } from "../../src/sas/SASQueryParameters";
import {
  getDataLakeServiceClient,
  // getDataLakeServiceClientWithDefualtCredential,
  getTokenDataLakeServiceClient,
  recorderEnvSetup
} from "../utils";

import { setLogLevel } from "@azure/logger";
setLogLevel("info");

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(function() {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

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
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(sasClient, newPipeline());

    await serviceClientWithSAS.listFileSystems().next();
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("wd"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString()
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.listFileSystems().next();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
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

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.listFileSystems().next();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

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
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.listFileSystems().next();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateDataLakeSASQueryParameters should work for filesystem", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSystemSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    (
      await fileSystemClientwithSAS
        .listPaths()
        .byPage()
        .next()
    ).value;
    await fileSystemClient.delete();
  });

  it("generateDataLakeSASQueryParameters should work for file with previous API version", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    const fileName = recorder.getUniqueName("file");
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original"
      }
    });

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        pathName: fileClient.name,
        cacheControl: "cache-control-override",
        fileSystemName: fileClient.fileSystemName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.delete();
  });

  it("generateDataLakeSASQueryParameters should work for file", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original"
      }
    });

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        pathName: fileClient.name,
        cacheControl: "cache-control-override",
        fileSystemName: fileClient.fileSystemName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.delete();
  });

  it("generateDataLakeSASQueryParameters should work for file with special namings", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem-with-dash");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
    const fileName = recorder.getUniqueName(
      "Upper file empty another 汉字 ру́сский язы́к ру́сский язы́к عرعربى にっぽんごにほんご . special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'"
    );
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original"
      }
    });
    const fileSAS = generateDataLakeSASQueryParameters(
      {
        pathName: fileClient.name,
        cacheControl: "cache-control-override",
        fileSystemName: fileClient.fileSystemName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.delete();
  });

  it("generateDataLakeSASQueryParameters should work for file with access policy", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();

    const id = "unique-id";
    await fileSystemClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: FileSystemSASPermissions.parse("racwdl").toString(),
          startsOn: now
        },
        id
      }
    ]);

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName,
        identifier: id
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    await fileClientWithSAS.getProperties();
    await fileSystemClient.delete();
  });

  it("GenerateUserDelegationSAS should work for filesystem with all configurations", async function() {
    // Try to get DataLakeServiceClient object with TokenCredential
    // when DFS_ACCOUNT_TOKEN environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getTokenDataLakeServiceClient();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSystemSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2019-02-02"
      },
      userDelegationKey,
      accountName
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    (
      await fileSystemClientwithSAS
        .listPaths()
        .byPage()
        .next()
    ).value;
    await fileSystemClient.delete();
  });

  it("GenerateUserDelegationSAS should work for filesystem with minimum parameters", async function() {
    // Try to get DataLakeServiceClient object with TokenCredential
    // when DFS_ACCOUNT_TOKEN environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getTokenDataLakeServiceClient();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdl")
      },
      userDelegationKey,
      accountName
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    (
      await fileSystemClientwithSAS
        .listPaths()
        .byPage()
        .next()
    ).value;
    await fileSystemClient.delete();
  });

  it("GenerateUserDelegationSAS should work for file", async function() {
    // Try to get serviceClient object with TokenCredential
    // when DFS_ACCOUNT_TOKEN environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getTokenDataLakeServiceClient();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original"
      }
    });

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        pathName: fileClient.name,
        cacheControl: "cache-control-override",
        fileSystemName: fileClient.fileSystemName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now
      },
      userDelegationKey,
      accountName
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.delete();
  });
});

describe("Shared Access Signature (SAS) generation Node.js only for permissions m, e, o, p", () => {
  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;
  let fileSystemClient: DataLakeFileSystemClient;
  let directoryClient: DataLakeDirectoryClient;
  let fileClient: DataLakeFileClient;
  let sharedKeyCredential: StorageSharedKeyCredential;
  let now: Date;
  let tmr: Date;

  const permissions: PathPermissions = {
    extendedAcls: false,
    stickyBit: true,
    owner: {
      read: true,
      write: true,
      execute: false
    },
    group: {
      read: true,
      write: false,
      execute: true
    },
    other: {
      read: false,
      write: true,
      execute: false
    }
  };

  // const acl: PathAccessControlItem[] = [
  //   {
  //     accessControlType: "user",
  //     entityId: "",
  //     defaultScope: false,
  //     permissions: {
  //       read: true,
  //       write: true,
  //       execute: true
  //     }
  //   },
  //   {
  //     accessControlType: "group",
  //     entityId: "",
  //     defaultScope: false,
  //     permissions: {
  //       read: true,
  //       write: false,
  //       execute: true
  //     }
  //   },
  //   {
  //     accessControlType: "other",
  //     entityId: "",
  //     defaultScope: false,
  //     permissions: {
  //       read: false,
  //       write: true,
  //       execute: false
  //     }
  //   }
  // ];

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();

    const fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const directoryName = recorder.getUniqueName("directory");
    directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();

    const fileName = recorder.getUniqueName("file");
    fileClient = directoryClient.getFileClient(fileName);
    await fileClient.create();

    now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server
    tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    sharedKeyCredential = factories[factories.length - 1];
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    await recorder.stop();
  });

  it("generateDataLakeSASQueryParameters for directory should work for permissions m, e, o, p", async () => {
    const directorySAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: directoryClient.name,
        isDirectory: true,
        directoryDepth: 1,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-02-10"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );
    const sasURL = `${directoryClient.url}?${directorySAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    // Does not work yet.
    // m
    // const newFileName = recorder.getUniqueName("newfile");
    // await directoryClientwithSAS.move(newFileName);

    // o
    // const guid = "ca761232ed4211cebacd00aa0057b223";
    // await directoryClientwithSAS.setAccessControl(acl, { owner: guid });

    // e
    await directoryClientwithSAS.getAccessControl();

    // p
    await directoryClientwithSAS.setPermissions(permissions);
  });

  it("generateDataLakeSASQueryParameters for file should work for permissions m, e, o, p", async () => {
    const fileSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: fileClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwdmeop"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-02-10"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );
    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    // Does not work yet.
    // m
    // const newFileName = recorder.getUniqueName("newfile");
    // await fileClientWithSAS.move(newFileName);

    // o
    // const guid = "ca761232ed4211cebacd00aa0057b223";
    // await fileClientWithSAS.setAccessControl(acl, { owner: guid });

    // e
    await fileClientWithSAS.getAccessControl();

    // p
    await fileClientWithSAS.setPermissions(permissions);
  });

  it("generateDataLakeSASQueryParameters for filesystem should work for permissions m, e, o, p", async () => {
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-02-10"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );
    const sasURL = `${directoryClient.url}?${fileSystemSAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    // Does not work yet.
    // m
    // const newFileName = recorder.getUniqueName("newfile");
    // await directoryClientwithSAS.move(newFileName);

    // o
    // const guid = "ca761232ed4211cebacd00aa0057b223";
    // await directoryClientwithSAS.setAccessControl(acl, { owner: guid });

    // e
    await directoryClientwithSAS.getAccessControl();

    // p
    await directoryClientwithSAS.setPermissions(permissions);
  });
});

describe("Shared Access Signature (SAS) generation Node.js only for delegation SAS", () => {
  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;
  let fileSystemClient: DataLakeFileSystemClient;
  let directoryClient: DataLakeDirectoryClient;
  let fileClient: DataLakeFileClient;
  let userDelegationKey: UserDelegationKey;
  let now: Date;
  let tmr: Date;
  let accountName: string;

  const permissions: PathPermissions = {
    extendedAcls: false,
    stickyBit: true,
    owner: {
      read: true,
      write: true,
      execute: false
    },
    group: {
      read: true,
      write: false,
      execute: true
    },
    other: {
      read: false,
      write: true,
      execute: false
    }
  };

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    accountName = process.env["DFS_ACCOUNT_NAME"] || "";
    try {
      serviceClient = getTokenDataLakeServiceClient();
    } catch (err) {
      this.skip();
    }

    now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 5);
    userDelegationKey = await serviceClient.getUserDelegationKey(now, tmr);

    const fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const directoryName = recorder.getUniqueName("directory");
    directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();

    const fileName = recorder.getUniqueName("file");
    fileClient = directoryClient.getFileClient(fileName);
    await fileClient.create();
  });

  afterEach(async function() {
    if (fileSystemClient) {
      await fileSystemClient.delete();
    }
    await recorder.stop();
  });

  it.only("GenerateUserDelegationSAS for directory should work for permissions m, e, o, p", async () => {
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop")
      },
      userDelegationKey,
      accountName
    );

    const sasURL = `${directoryClient.url}?${fileSystemSAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(sasURL);

    // Does not work yet.
    // // m
    // const newFileName = recorder.getUniqueName("newfile");
    // await directoryClientwithSAS.move(newFileName);

    // // o
    // const guid = "ca761232ed4211cebacd00aa0057b223";
    // await directoryClientwithSAS.setAccessControl([], { owner: guid });

    // e
    await directoryClientwithSAS.getAccessControl();

    // p
    await directoryClientwithSAS.setPermissions(permissions);
  });

  it("GenerateUserDelegationSAS should work with unauthorizedUserObjectId", async () => {
    const guid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        unauthorizedUserObjectId: guid
      },
      userDelegationKey,
      accountName
    );

    // const sasURL = `${fileClient.url}?${fileSystemSAS}`;
    // const fileClientWithSAS = new DataLakeDirectoryClient(sasURL);

    // try {
    //   await fileClientWithSAS.exists();
    // } catch (err) {
    //   assert.deepStrictEqual(err.details.errorCode, "AuthorizationPermissionMismatch");
    // }

    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: guid,
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true
        }
      }
    ];
    await directoryClient.setAccessControl(acl);

    console.log(await directoryClient.getAccessControl());
    const newfileClient = directoryClient.getFileClient(recorder.getUniqueName("newfile"));
    const SASURL = `${newfileClient.url}?${fileSystemSAS}`;
    const newFileClientWithSAS = new DataLakeFileClient(SASURL);
    await newFileClientWithSAS.createIfNotExists();
  });
});
