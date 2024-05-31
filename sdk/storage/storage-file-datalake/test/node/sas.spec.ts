// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder, delay } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

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
  StorageSharedKeyCredential,
  UserDelegationKey,
  SASQueryParameters,
  FileSystemListPathsResponse,
} from "../../src";
import { DataLakeFileClient } from "../../src/";
import { DirectorySASPermissions } from "../../src/sas/DirectorySASPermissions";
import { SASProtocol } from "../../src/sas/SASQueryParameters";
import {
  getDataLakeServiceClient,
  getDataLakeServiceClientWithDefaultCredential,
  getEncryptionScope,
  getUniqueName,
  recorderEnvSetup,
  configureStorageClient,
  uriSanitizers,
} from "../utils";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    // make sure we add the sanitizers on playback for SAS strings
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    serviceClient = getDataLakeServiceClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

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
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(sasClient, newPipeline());
    configureStorageClient(recorder, serviceClientWithSAS);

    await serviceClientWithSAS.listFileSystems().next();
  });

  it("generateAccountSASQueryParameters with encryptionscope should work", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2020-12-06",
        encryptionScope: encryptionScopeName,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(sasClient, newPipeline());
    configureStorageClient(recorder, serviceClientWithSAS);

    const filesystemClient = await serviceClientWithSAS.getFileSystemClient(
      recorder.variable("filesystem", getUniqueName("filesystem")),
    );
    await filesystemClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });
    await filesystemClient.delete();
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("wd"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, serviceClientWithSAS);

    let error;
    try {
      await serviceClientWithSAS.listFileSystems().next();
    } catch (err: any) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("tqf").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, serviceClientWithSAS);

    let error;
    try {
      await serviceClientWithSAS.listFileSystems().next();
    } catch (err: any) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

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
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, serviceClientWithSAS);

    let error;
    try {
      await serviceClientWithSAS.listFileSystems().next();
    } catch (err: any) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateDataLakeSASQueryParameters should work for filesystem", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
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
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileSystemClientwithSAS);

    const result = (await fileSystemClientwithSAS.listPaths().byPage().next()).value;
    assert.deepStrictEqual(result.pathItems.length, 0);
    await fileSystemClient.deleteIfExists();
  });

  it("generateDataLakeSASQueryParameters with encryptionscope should work for filesystem", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdl"),
        version: "2020-12-06",
        encryptionScope: encryptionScopeName,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(sasClient, newPipeline());
    configureStorageClient(recorder, fileSystemClientwithSAS);

    const result = (await fileSystemClientwithSAS.listPaths().byPage().next()).value;
    assert.deepStrictEqual(result.pathItems.length, 0);
    await fileSystemClient.deleteIfExists();
  });

  it("generateDataLakeSASQueryParameters should work for file with previous API version", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original",
      },
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
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileClientWithSAS);

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.deleteIfExists();
  });

  it("generateDataLakeSASQueryParameters should work for file", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original",
      },
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
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileClientWithSAS);

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.deleteIfExists();
  });

  it("generateDataLakeSASQueryParameters with encryptionscope should work for file", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });

    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileClient = fileSystemClient.getFileClient(fileName);

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        pathName: fileClient.name,
        fileSystemName: fileClient.fileSystemName,
        expiresOn: tmr,
        permissions: DataLakeSASPermissions.parse("racwd"),
        encryptionScope: encryptionScopeName,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(sasURL, newPipeline());
    configureStorageClient(recorder, fileClientWithSAS);

    await fileClientWithSAS.create();

    await fileSystemClient.deleteIfExists();
  });

  it("generateDataLakeSASQueryParameters should work for file with special namings", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const fileSystemName = recorder.variable(
      "filesystem-with-dash",
      getUniqueName("filesystem-with-dash"),
    );
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
    const fileName = recorder.variable(
      "uniqueName",
      getUniqueName(
        "./a/../Upper file empty another 汉字 ру́сский язы́к ру́сский язы́к عرعربى にっぽんごにほんご . special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'",
      ),
    );
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original",
      },
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
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileClientWithSAS);

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.deleteIfExists();
  });

  it("generateDataLakeSASQueryParameters should work for fileSystem with access policy", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();

    const id = "unique-id";
    await fileSystemClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: FileSystemSASPermissions.parse("racwdl").toString(),
          startsOn: now,
        },
        id,
      },
    ]);

    /*
     * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(30 * 1000);

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName,
        identifier: id,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileClientWithSAS);

    await fileClientWithSAS.getProperties();
    await fileSystemClient.deleteIfExists();
  });

  it("generateDataLakeSASQueryParameters should work for file with access policy", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sharedKeyCredential = serviceClient.credential;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();

    const id = "unique-id";
    await fileSystemClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: DataLakeSASPermissions.parse("racwd").toString(),
          startsOn: now,
        },
        id,
      },
    ]);

    /*
     * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(30 * 1000);

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName,
        pathName: fileName,
        identifier: id,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileClientWithSAS);

    await fileClientWithSAS.getProperties();
    await fileSystemClient.deleteIfExists();
  });

  it("GenerateUserDelegationSAS should work for filesystem with all configurations", async function (this: Context) {
    // Try to get DataLakeServiceClient object with DefaultCredential
    // when AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getDataLakeServiceClientWithDefaultCredential(recorder);
    } catch {
      this.skip();
    }

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = serviceClient.credential as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
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
        version: "2019-02-02",
      },
      userDelegationKey,
      accountName,
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileSystemClientwithSAS);

    const result = (await fileSystemClientwithSAS.listPaths().byPage().next()).value;
    assert.deepStrictEqual(result.pathItems.length, 0);
    await fileSystemClient.deleteIfExists();
  });

  it("GenerateUserDelegationSAS should work for filesystem with minimum parameters", async function (this: Context) {
    // Try to get DataLakeServiceClient object with DefaultCredential
    // when AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getDataLakeServiceClientWithDefaultCredential(recorder);
    } catch {
      this.skip();
    }

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = serviceClient.credential as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdl"),
      },
      userDelegationKey,
      accountName,
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileSystemClientwithSAS);

    const result = (await fileSystemClientwithSAS.listPaths().byPage().next()).value;
    assert.deepStrictEqual(result.pathItems.length, 0);
    await fileSystemClient.deleteIfExists();
  });

  it("GenerateUserDelegationSAS should work for file", async function (this: Context) {
    // Try to get serviceClient object with DefaultCredential
    // when AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getDataLakeServiceClientWithDefaultCredential(recorder);
    } catch {
      this.skip();
    }

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = serviceClient.credential as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original",
      },
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
      },
      userDelegationKey,
      accountName,
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileClientWithSAS);

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.deleteIfExists();
  });

  it("GenerateUserDelegationSAS should work for file for 2019-12-12", async function (this: Context) {
    // Try to get serviceClient object with DefaultCredential
    // when AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getDataLakeServiceClientWithDefaultCredential(recorder);
    } catch {
      this.skip();
    }

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = serviceClient.credential as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original",
      },
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
        version: "2019-12-12",
      },
      userDelegationKey,
      accountName,
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileClientWithSAS);

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.delete();
  });

  it("construct SASQueryParameters with a option bag", async () => {
    // no option and optional parameters
    const sasQP = new SASQueryParameters("2020-02-10", "signature");
    assert.equal(sasQP.toString(), "sv=2020-02-10&sig=signature");

    const sasQP2 = new SASQueryParameters("2020-02-10", "signature", {
      permissions: "permissions",
      correlationId: "correlationId",
      directoryDepth: 2,
      preauthorizedAgentObjectId: "preauthorizedAgentObjectId",
    });
    assert.equal(
      sasQP2.toString(),
      "sv=2020-02-10&sp=permissions&sig=signature&sdd=2&saoid=preauthorizedAgentObjectId&scid=correlationId",
    );

    const sasQP3 = new SASQueryParameters(
      "2020-02-10",
      "signature",
      "permissions",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      2,
      "preauthorizedAgentObjectId",
      undefined,
      "correlationId",
    );
    assert.equal(
      sasQP3.toString(),
      "sv=2020-02-10&sp=permissions&sig=signature&sdd=2&saoid=preauthorizedAgentObjectId&scid=correlationId",
    );
  });

  it("DataLakeServiceClient.generateAccountSasUrl() should work with all parameters set", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sasURL = serviceClient.generateAccountSasUrl(
      tmr,
      AccountSASPermissions.parse("rwdlacup"),
      AccountSASResourceTypes.parse("sco").toString(),
      {
        version: "2016-05-31",
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      },
    );
    const serviceClientWithSAS = new DataLakeServiceClient(sasURL);
    configureStorageClient(recorder, serviceClientWithSAS);
    await serviceClientWithSAS.listFileSystems().next();

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      serviceClientWithSAS.generateAccountSasUrl();
    } catch (err: any) {
      assert.ok(err instanceof RangeError);
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("DataLakeServiceClient.generateAccountSasUrl() should work with default parameters", async () => {
    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const sasURL = serviceClient.generateAccountSasUrl();
    const serviceClientWithSAS = new DataLakeServiceClient(sasURL);
    configureStorageClient(recorder, serviceClientWithSAS);
    await serviceClientWithSAS.getFileSystemClient(fileSystemName).getProperties();

    await fileSystemClient.delete();
  });

  it("DataLakeServiceClient.generateAccountSasUrl() with encryptionscope should work", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sasURL = serviceClient.generateAccountSasUrl(
      tmr,
      AccountSASPermissions.parse("racwdl"),
      "sco",
      {
        encryptionScope: encryptionScopeName,
      },
    );
    const serviceClientWithSAS = new DataLakeServiceClient(sasURL);
    configureStorageClient(recorder, serviceClientWithSAS);

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClientWithSAS.getFileSystemClient(fileSystemName);
    await fileSystemClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });

    await fileSystemClient.delete();
  });

  it("DataLakeFileSystemClient.generateSasUrl() should work", async () => {
    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sasURL = await fileSystemClient.generateSasUrl({
      version: "2016-05-31",
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      expiresOn: tmr,
      permissions: FileSystemSASPermissions.parse("racwdl"),
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      cacheControl: "cache-control-override",
      contentDisposition: "content-disposition-override",
      contentEncoding: "content-encoding-override",
      contentLanguage: "content-language-override",
      contentType: "content-type-override",
    });

    const fileSystemClientWithSAS = new DataLakeFileSystemClient(sasURL);
    configureStorageClient(recorder, fileSystemClientWithSAS);
    await fileSystemClientWithSAS.listPaths().next();

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      await fileSystemClientWithSAS.generateSasUrl({});
    } catch (err: any) {
      assert.ok(err instanceof RangeError);
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    await fileSystemClient.deleteIfExists();
  });

  it("DataLakeFileSystemClient.generateSasUrl() with encryptionscope should work", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });
    const result = await fileSystemClient.getProperties();
    assert.equal(result.defaultEncryptionScope, encryptionScopeName);

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const sasURL = await fileSystemClient.generateSasUrl({
      version: "2020-12-06",
      startsOn: now,
      expiresOn: tmr,
      permissions: FileSystemSASPermissions.parse("racwdl"),
      encryptionScope: encryptionScopeName,
    });

    const fileSystemClientWithSAS = new DataLakeFileSystemClient(sasURL);
    configureStorageClient(recorder, fileSystemClientWithSAS);
    const fileClient = fileSystemClientWithSAS.getFileClient(
      recorder.variable(`file`, getUniqueName(`file`)),
    );
    await fileClient.create();

    const dirClient = fileSystemClientWithSAS.getFileClient(
      recorder.variable(`dir`, getUniqueName(`dir`)),
    );
    await dirClient.create();

    const listResult = (await fileSystemClientWithSAS.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    assert.equal(listResult.pathItems!.length, 2);
    assert.equal(listResult.pathItems![0].encryptionScope, encryptionScopeName);
    assert.equal(listResult.pathItems![1].encryptionScope, encryptionScopeName);

    await fileClient.delete();
    await dirClient.delete();

    await fileSystemClient.deleteIfExists();
  });

  it("DataLakeDirectoryClient.generateSasUrl() with encryptionscope should work", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const directoryClient = fileSystemClient.getDirectoryClient(
      recorder.variable("directory", getUniqueName("directory")),
    );
    const sasURL = await directoryClient.generateSasUrl({
      expiresOn: tmr,
      permissions: DirectorySASPermissions.parse("racwdlmeop"),
      encryptionScope: encryptionScopeName,
    });

    const directoryClientWithSAS = new DataLakeDirectoryClient(sasURL);
    configureStorageClient(recorder, directoryClientWithSAS);
    await directoryClientWithSAS.create();
    assert.ok(await directoryClientWithSAS.exists());
  });

  it("DataLakeFileClient.generateSasUrl() with encryptionscope should work", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }
    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    const fileClient = fileSystemClient.getFileClient(
      recorder.variable("file", getUniqueName("file")),
    );
    const sasURL = await fileClient.generateSasUrl({
      expiresOn: tmr,
      permissions: DataLakeSASPermissions.parse("racwdmeop"),
      encryptionScope: encryptionScopeName,
    });

    const fileClientWithSAS = new DataLakeFileClient(sasURL);
    configureStorageClient(recorder, fileClientWithSAS);
    await fileClientWithSAS.create();
    assert.ok(await fileClientWithSAS.exists());
  });
});

describe("SAS generation Node.js only for directory SAS", () => {
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
      execute: false,
    },
    group: {
      read: true,
      write: false,
      execute: true,
    },
    other: {
      read: false,
      write: true,
      execute: false,
    },
  };

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    // make sure we add the sanitizers on playback for SAS strings
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    serviceClient = getDataLakeServiceClient(recorder);

    const fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();

    const directoryName = recorder.variable("directory", getUniqueName("directory"));
    directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();

    const fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = directoryClient.getFileClient(fileName);
    await fileClient.create();

    now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server
    tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 10);

    sharedKeyCredential = serviceClient.credential as StorageSharedKeyCredential;
  });

  afterEach(async function () {
    await fileSystemClient.deleteIfExists();
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
        permissions: DirectorySASPermissions.parse("racwdlmeop"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-02-10",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );
    const sasURL = `${directoryClient.url}?${directorySAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, directoryClientwithSAS);

    // e
    await directoryClientwithSAS.getAccessControl();

    // p
    await directoryClientwithSAS.setPermissions(permissions);
  });

  it("generateDataLakeSASQueryParameters for root directory should work", async () => {
    const rootDirName = "";
    const rootDirectoryClient = fileSystemClient.getDirectoryClient(rootDirName);

    const directorySAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: rootDirectoryClient.name,
        isDirectory: true,
        directoryDepth: 1,
        expiresOn: tmr,
        permissions: DirectorySASPermissions.parse("racwdlmeop"),
        version: "2020-02-10",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );
    const sasURL = `${rootDirectoryClient.url}?${directorySAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(sasURL);
    configureStorageClient(recorder, directoryClientwithSAS);

    await directoryClientwithSAS.getAccessControl();
  });

  function getDefualtDirctorySAS(directoryName: string): SASQueryParameters {
    return generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: directoryName,
        isDirectory: true,
        expiresOn: tmr,
        permissions: DirectorySASPermissions.parse("racwdlmeop"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-02-10",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );
  }

  it("generateDataLakeSASQueryParameters could calculate directory depth", async () => {
    const directorySAS = getDefualtDirctorySAS(directoryClient.name);
    assert.equal(directorySAS.directoryDepth, 1);
    const directoryClientwithSAS = new DataLakeDirectoryClient(
      `${directoryClient.url}?${directorySAS}`,
    );
    configureStorageClient(recorder, directoryClientwithSAS);
    await directoryClientwithSAS.setPermissions(permissions);

    // root directory, depth = 0
    const directorySAS2 = getDefualtDirctorySAS("");
    assert.equal(directorySAS2.directoryDepth, 0);
    const directoryClientwithSAS2 = new DataLakeDirectoryClient(
      `${directoryClient.url}?${directorySAS2}`,
    );
    configureStorageClient(recorder, directoryClientwithSAS2);
    await directoryClientwithSAS2.setPermissions(permissions);

    // "/d1/d2/", "d1/d2", "/d1/d2" depth = 2
    const directorySAS3 = getDefualtDirctorySAS("/d1/d2/");
    assert.equal(directorySAS3.directoryDepth, 2);

    const directorySAS4 = getDefualtDirctorySAS("d1/d2");
    assert.equal(directorySAS4.directoryDepth, 2);

    const directorySAS5 = getDefualtDirctorySAS("/d1/d2");
    assert.equal(directorySAS5.directoryDepth, 2);
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
        version: "2020-02-10",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );
    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, fileClientWithSAS);

    // o
    const guid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    await fileClientWithSAS.setAccessControl([], { owner: guid });

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
        version: "2020-02-10",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );
    const sasURL = `${directoryClient.url}?${fileSystemSAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, directoryClientwithSAS);

    // e
    await directoryClientwithSAS.getAccessControl();

    // p
    await directoryClientwithSAS.setPermissions(permissions);
  });

  it("DataLakeDirectoryClient.generateSasUrl() should work", async () => {
    const sasURL = await directoryClient.generateSasUrl({
      expiresOn: tmr,
      permissions: DirectorySASPermissions.parse("racwdlmeop"),
    });

    const sas = generateDataLakeSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: DirectorySASPermissions.parse("racwdlmeop"),
        fileSystemName: fileSystemClient.name,
        pathName: directoryClient.name,
        isDirectory: true,
      },
      sharedKeyCredential,
    ).toString();
    assert.deepStrictEqual(sasURL, directoryClient.url + "?" + sas);

    const directoryClientWithSAS = new DataLakeDirectoryClient(sasURL);
    configureStorageClient(recorder, directoryClientWithSAS);
    await directoryClientWithSAS.getAccessControl();

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      await directoryClientWithSAS.generateSasUrl({});
    } catch (err: any) {
      assert.ok(err instanceof RangeError);
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("DataLakeFileClient.generateSasUrl() should work", async () => {
    const sasURL = await fileClient.generateSasUrl({
      expiresOn: tmr,
      permissions: DataLakeSASPermissions.parse("racwdmeop"),
    });

    const sas = generateDataLakeSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: DirectorySASPermissions.parse("racwdmeop"),
        fileSystemName: fileSystemClient.name,
        pathName: fileClient.name,
      },
      sharedKeyCredential,
    ).toString();
    assert.deepStrictEqual(sasURL, fileClient.url + "?" + sas);

    const fileClientWithSAS = new DataLakeFileClient(sasURL);
    configureStorageClient(recorder, fileClientWithSAS);
    await fileClientWithSAS.getAccessControl();

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      await fileClientWithSAS.generateSasUrl({});
    } catch (err: any) {
      assert.ok(err instanceof RangeError);
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("generateDataLakeSASQueryParameters should work for directory with access policy", async () => {
    const id = "unique-id";
    await fileSystemClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: DataLakeSASPermissions.parse("racwd").toString(),
          startsOn: now,
        },
        id,
      },
    ]);

    /*
     * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(30 * 1000);

    const directorySAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: directoryClient.name,
        isDirectory: true,
        identifier: id,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasClient = `${fileClient.url}?${directorySAS}`;
    const fileClientWithSAS = new DataLakeFileClient(sasClient);
    configureStorageClient(recorder, fileClientWithSAS);

    await fileClientWithSAS.getProperties();
  });
});

describe("SAS generation Node.js only for delegation SAS", () => {
  let recorder: Recorder;
  let oauthServiceClient: DataLakeServiceClient;
  let fileSystemClient: DataLakeFileSystemClient;
  let directoryClient: DataLakeDirectoryClient;
  let fileClient: DataLakeFileClient;
  let userDelegationKey: UserDelegationKey;
  let now: Date;
  let tmr: Date;
  let accountName: string;
  let fileSystemName: string;

  const permissions: PathPermissions = {
    extendedAcls: false,
    stickyBit: true,
    owner: {
      read: true,
      write: true,
      execute: false,
    },
    group: {
      read: true,
      write: false,
      execute: true,
    },
    other: {
      read: false,
      write: true,
      execute: false,
    },
  };

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    // make sure we add the sanitizers on playback for SAS strings
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    accountName = process.env["DFS_ACCOUNT_NAME"] || "";
    try {
      oauthServiceClient = getDataLakeServiceClientWithDefaultCredential(recorder);
    } catch (err: any) {
      console.log(err);
      this.skip();
    }

    now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 5);
    userDelegationKey = await oauthServiceClient.getUserDelegationKey(now, tmr);

    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = oauthServiceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();

    const directoryName = recorder.variable("directory", getUniqueName("directory"));
    directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();

    const fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = directoryClient.getFileClient(fileName);
    await fileClient.create();
  });

  afterEach(async function () {
    if (fileSystemClient) {
      await fileSystemClient.deleteIfExists();
    }
    await recorder.stop();
  });

  it("GenerateUserDelegationSAS for directory should work for permissions m, e, o, p", async () => {
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: directoryClient.name,
        isDirectory: true,
        expiresOn: tmr,
        permissions: DataLakeSASPermissions.parse("racwdmeop"),
      },
      userDelegationKey,
      accountName,
    );

    const sasURL = `${directoryClient.url}?${fileSystemSAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(sasURL);
    configureStorageClient(recorder, directoryClientwithSAS);
    // e
    await directoryClientwithSAS.getAccessControl();

    // p
    await directoryClientwithSAS.setPermissions(permissions);
  });

  it("GenerateUserDelegationSAS should work with agentObjectId, preauthorizedAgentObjectId", async () => {
    const authorizedGuid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    const rootDirectoryClient = fileSystemClient.getDirectoryClient("/");
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: authorizedGuid,
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true,
        },
      },
    ];
    await rootDirectoryClient.setAccessControl(acl);
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        agentObjectId: authorizedGuid,
      },
      userDelegationKey,
      accountName,
    );

    const newFileName = recorder.variable("newFile", getUniqueName("newFile"));
    const newFileClient = fileSystemClient.getFileClient(newFileName);
    const newFileClientWithSAS = new DataLakeFileClient(`${newFileClient.url}?${fileSystemSAS}`);
    configureStorageClient(recorder, newFileClientWithSAS);
    await newFileClientWithSAS.createIfNotExists();

    const unauthoriziedGuid = "7d53815c-1b73-49ab-b44d-002bfb890633";

    // suoid for an unauthoriziedGuid
    const fileSystemSAS2 = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        agentObjectId: unauthoriziedGuid,
      },
      userDelegationKey,
      accountName,
    );

    const newFileClientWithSAS2 = new DataLakeFileClient(`${newFileClient.url}?${fileSystemSAS2}`);
    configureStorageClient(recorder, newFileClientWithSAS2);
    try {
      await newFileClientWithSAS2.createIfNotExists();
      assert.fail("Expected createdIfNotExists to fail");
    } catch (err: any) {
      assert.deepStrictEqual(err.details.errorCode, "AuthorizationPermissionMismatch");
    }

    // saoid for an unauthoriziedGuid
    const fileSystemSAS3 = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        preauthorizedAgentObjectId: unauthoriziedGuid,
      },
      userDelegationKey,
      accountName,
    );
    const newFileClientWithSAS3 = new DataLakeFileClient(`${newFileClient.url}?${fileSystemSAS3}`);
    configureStorageClient(recorder, newFileClientWithSAS3);
    await newFileClientWithSAS3.createIfNotExists();
  });

  it("GenerateUserDelegationSAS should work with correlationId", async () => {
    const guid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        correlationId: guid,
      },
      userDelegationKey,
      accountName,
    );

    const fileSystemClientWithSAS = new DataLakeFileSystemClient(
      `${fileSystemClient.url}?${fileSystemSAS}`,
    );
    configureStorageClient(recorder, fileSystemClientWithSAS);

    await fileSystemClientWithSAS.listPaths().byPage().next();
  });
});
