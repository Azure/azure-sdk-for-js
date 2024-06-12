// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getBSU, getTokenBSU, getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils";
import { ShareClient, ShareDirectoryClient, FileSystemAttributes } from "../src";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { DirectoryCreateResponse } from "../src/generated/src/models";
import { truncatedISO8061Date } from "../src/utils/utils.common";
import { assert, getYieldedValue } from "@azure-tools/test-utils";
import { isBrowser } from "@azure/core-util";
import { Context } from "mocha";

describe("DirectoryClient", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let defaultDirCreateResp: DirectoryCreateResponse;
  let recorder: Recorder;
  const fullDirAttributes = new FileSystemAttributes();
  fullDirAttributes.readonly = true;
  fullDirAttributes.hidden = true;
  fullDirAttributes.system = true;
  fullDirAttributes.directory = true;
  fullDirAttributes.archive = true;
  fullDirAttributes.offline = true;
  fullDirAttributes.notContentIndexed = true;
  fullDirAttributes.noScrubData = true;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source", "x-ms-copy-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"],
    );
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir"));
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();
    assert.equal(defaultDirCreateResp.errorCode, undefined);
    assert.equal(defaultDirCreateResp.fileAttributes!, "Directory");
    assert.ok(defaultDirCreateResp.fileChangeOn!);
    assert.ok(defaultDirCreateResp.fileCreatedOn!);
    assert.ok(defaultDirCreateResp.fileId!);
    assert.ok(defaultDirCreateResp.fileLastWriteOn!);
    assert.ok(defaultDirCreateResp.fileParentId!);
    assert.ok(defaultDirCreateResp.filePermissionKey!);
  });

  afterEach(async function () {
    await shareClient.delete();
    await recorder.stop();
  });

  it("Get directory client under another directory", async () => {
    const directoryName1 = recorder.variable("dir1", getUniqueName("dir1"));
    const directoryName2 = recorder.variable("dir2", getUniqueName("dir2"));
    const dir1Client = dirClient.getDirectoryClient(directoryName1);
    await dir1Client.create();

    const dir2Client = dir1Client.getDirectoryClient(directoryName2);
    await dir2Client.create();

    const subDirClient = dirClient.getDirectoryClient(`${directoryName1}/${directoryName2}`);
    assert.equal(subDirClient.name, dir2Client.name);
    await subDirClient.getProperties();
  });

  it("Get file client under another directory", async () => {
    const subDirName = recorder.variable("subdir", getUniqueName("subdir"));
    const fileName = recorder.variable("file", getUniqueName("file"));
    const subDirClient = dirClient.getDirectoryClient(subDirName);
    await subDirClient.create();

    const fileUnderSubDirClient = subDirClient.getFileClient(fileName);
    await fileUnderSubDirClient.create(1024);
    await fileUnderSubDirClient.getProperties();

    const fileUnderSubDirClient_another = dirClient.getFileClient(`${subDirName}/${fileName}`);
    assert.equal(fileUnderSubDirClient_another.path, fileUnderSubDirClient.path);
    await fileUnderSubDirClient_another.getProperties();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    try {
      await dirClient.setMetadata(metadata);

      const result = await dirClient.getProperties();
      assert.deepEqual(result.metadata, metadata);
    } catch (err: any) {
      console.log(err);
    }
  });

  it("getProperties", async () => {
    const result = await dirClient.getProperties();
    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("create with default parameters", (done) => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters configured setting filePermissionKey", async () => {
    const dirClient2 = shareClient.getDirectoryClient(
      recorder.variable(dirName, getUniqueName(dirName)),
    );
    const metadata = { key: "value" };
    const now = new Date(recorder.variable("now", new Date().toISOString()));

    await dirClient2.create({
      metadata: metadata,
      creationTime: now,
      lastWriteTime: now,
      changeTime: now,
      filePermissionKey: defaultDirCreateResp.filePermissionKey,
      fileAttributes: fullDirAttributes,
    });

    const result = await dirClient2.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
    assert.equal(result.errorCode, undefined);
    const respFileAttributes = FileSystemAttributes.parse(result.fileAttributes!);
    assert.ok(respFileAttributes.readonly);
    assert.ok(respFileAttributes.hidden);
    assert.ok(respFileAttributes.system);
    assert.ok(respFileAttributes.directory);
    assert.ok(respFileAttributes.archive);
    assert.ok(respFileAttributes.offline);
    assert.ok(respFileAttributes.notContentIndexed);
    assert.ok(respFileAttributes.noScrubData);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("create with all parameters configured setting filePermission", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!,
    );

    const dirClient2 = shareClient.getDirectoryClient(
      recorder.variable(dirName, getUniqueName(dirName)),
    );
    const metadata = { key: "value" };
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    await dirClient2.create({
      metadata: metadata,
      creationTime: now,
      lastWriteTime: now,
      filePermission: getPermissionResp.permission,
      fileAttributes: fullDirAttributes,
    });

    const result = await dirClient2.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
    assert.equal(result.errorCode, undefined);
    const respFileAttributes = FileSystemAttributes.parse(result.fileAttributes!);
    assert.ok(respFileAttributes.readonly);
    assert.ok(respFileAttributes.hidden);
    assert.ok(respFileAttributes.system);
    assert.ok(respFileAttributes.directory);
    assert.ok(respFileAttributes.archive);
    assert.ok(respFileAttributes.offline);
    assert.ok(respFileAttributes.notContentIndexed);
    assert.ok(respFileAttributes.noScrubData);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("createIfNotExists", async () => {
    const res = await dirClient.createIfNotExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ResourceAlreadyExists");

    const dirClient2 = shareClient.getDirectoryClient(
      recorder.variable(dirName, getUniqueName(dirName)),
    );
    const res2 = await dirClient2.createIfNotExists();
    assert.ok(res2.succeeded);

    await dirClient2.delete();
  });

  it("deleteIfExists", async () => {
    const dirClient2 = shareClient.getDirectoryClient(
      recorder.variable(dirName, getUniqueName(dirName)),
    );
    const res = await dirClient2.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await dirClient2.create();
    const res2 = await dirClient2.deleteIfExists();
    assert.ok(res2.succeeded);
  });

  it("deleteIfExists when parent not exists ", async () => {
    const subDirName = recorder.variable("subdir", getUniqueName("subdir"));
    const dirClient2 = dirClient.getDirectoryClient(subDirName);
    const dirClient3 = dirClient2.getDirectoryClient(subDirName);
    const res = await dirClient3.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ParentNotFound");
  });

  it("exists", async () => {
    assert.ok(await dirClient.exists());
    const dirClient2 = shareClient.getDirectoryClient(
      recorder.variable(dirName, getUniqueName(dirName)),
    );
    assert.ok(!(await dirClient2.exists()));
  });

  it("setProperties with default parameters", async () => {
    await dirClient.setProperties();

    const result = await dirClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, defaultDirCreateResp.fileAttributes!);
    assert.equal(
      truncatedISO8061Date(result.fileCreatedOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileCreatedOn!),
    );
    assert.equal(
      truncatedISO8061Date(result.fileLastWriteOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileLastWriteOn!),
    );
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("setProperties with all parameters configured setting filePermission", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!,
    );

    const now = new Date(recorder.variable("now", new Date().toISOString()));

    await dirClient.setProperties({
      creationTime: now,
      lastWriteTime: now,
      changeTime: now,
      filePermission: getPermissionResp.permission,
      fileAttributes: fullDirAttributes,
    });

    const result = await dirClient.getProperties();
    assert.equal(result.errorCode, undefined);
    const respFileAttributes = FileSystemAttributes.parse(result.fileAttributes!);
    assert.ok(respFileAttributes.readonly);
    assert.ok(respFileAttributes.hidden);
    assert.ok(respFileAttributes.system);
    assert.ok(respFileAttributes.directory);
    assert.ok(respFileAttributes.archive);
    assert.ok(respFileAttributes.offline);
    assert.ok(respFileAttributes.notContentIndexed);
    assert.ok(respFileAttributes.noScrubData);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("listFilesAndDirectories - empty prefix should not cause an error", async () => {
    const subDirClients = [];

    for (let i = 0; i < 3; i++) {
      const subDirClient = dirClient.getDirectoryClient(
        recorder.variable(`dir${i}`, getUniqueName(`dir${i}`)),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = dirClient.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (await dirClient.listFilesAndDirectories({ prefix: "" }).byPage().next()).value;

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareClient.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);

    let i = 0;
    for (const entry of result.segment.directoryItems) {
      assert.ok(subDirClients[i++].url.indexOf(entry.name) > 0);
    }

    i = 0;
    for (const entry of result.segment.fileItems) {
      assert.ok(subFileClients[i++].url.indexOf(entry.name) > 0);
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("listFilesAndDirectories - with all attributes", async () => {
    const subDirClients = [];

    for (let i = 0; i < 3; i++) {
      const subDirClient = dirClient.getDirectoryClient(
        recorder.variable(`dir${i}`, getUniqueName(`dir${i}`)),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = dirClient.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (
      await dirClient
        .listFilesAndDirectories({
          prefix: "",
          includeTimestamps: true,
          includeEtag: true,
          includeAttributes: true,
          includePermissionKey: true,
          includeExtendedInfo: true,
        })
        .byPage()
        .next()
    ).value;

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareClient.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);

    let i = 0;
    for (const entry of result.segment.directoryItems) {
      assert.ok(subDirClients[i++].url.indexOf(entry.name) > 0);
      assert.ok(entry.fileId);
      assert.ok(entry.attributes);
      assert.ok(entry.permissionKey);
      assert.ok(entry.properties.creationTime);
      assert.ok(entry.properties.lastAccessTime);
      assert.ok(entry.properties.changeTime);
      assert.ok(entry.properties.lastModified);
      assert.ok(entry.properties.etag);
    }

    i = 0;
    for (const entry of result.segment.fileItems) {
      assert.ok(subFileClients[i++].url.indexOf(entry.name) > 0);
      assert.ok(entry.fileId);
      assert.ok(entry.attributes);
      assert.ok(entry.permissionKey);
      assert.ok(entry.properties.creationTime);
      assert.ok(entry.properties.lastAccessTime);
      assert.ok(entry.properties.changeTime);
      assert.ok(entry.properties.lastModified);
      assert.ok(entry.properties.etag);
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("listFilesAndDirectories - with invalid char", async function (this: Context) {
    if (isBrowser && isLiveMode()) {
      // Skipped for now as the generating new version SAS token is not supported in pipeline yet.
      this.skip();
    }
    const subDirClients = [];
    const subDirNames = [];

    const dirNameWithInvalidChar = recorder.variable("dir1", getUniqueName("dir1\uFFFE"));
    const dirWithInvalidChar = shareClient.getDirectoryClient(dirNameWithInvalidChar);
    await dirWithInvalidChar.create();

    for (let i = 0; i < 3; i++) {
      const subDirClient = dirWithInvalidChar.getDirectoryClient(
        recorder.variable(`dir${i}-1`, getUniqueName(`dir\uFFFE${i}-1`)),
      );
      if (await subDirClient.exists()) {
        await subDirClient.delete();
      }
      await subDirClient.create();
      subDirClients.push(subDirClient);
      subDirNames.push(subDirClient.name);
    }

    const subFileClients = [];
    const subFileNames = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = dirWithInvalidChar.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file\uFFFE${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
      subFileNames.push(subFileClient.name);
    }

    // List all
    let result = (
      await dirWithInvalidChar
        .listFilesAndDirectories({
          prefix: "",
          includeTimestamps: true,
          includeEtag: true,
          includeAttributes: true,
          includePermissionKey: true,
          includeExtendedInfo: true,
        })
        .byPage()
        .next()
    ).value;

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareClient.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);
    assert.deepStrictEqual(result.directoryPath, dirNameWithInvalidChar);

    let resultDirNames = [];
    for (const entry of result.segment.directoryItems) {
      resultDirNames.push(entry.name);
      assert.ok(entry.fileId);
      assert.ok(entry.attributes);
      assert.ok(entry.permissionKey);
      assert.ok(entry.properties.creationTime);
      assert.ok(entry.properties.lastAccessTime);
      assert.ok(entry.properties.changeTime);
      assert.ok(entry.properties.lastModified);
      assert.ok(entry.properties.etag);
    }

    for (const subDirName of subDirNames) {
      assert.ok(resultDirNames.includes(subDirName));
    }

    let resultFileNames = [];
    for (const entry of result.segment.fileItems) {
      resultFileNames.push(entry.name);
      assert.ok(entry.fileId);
      assert.ok(entry.attributes);
      assert.ok(entry.permissionKey);
      assert.ok(entry.properties.creationTime);
      assert.ok(entry.properties.lastAccessTime);
      assert.ok(entry.properties.changeTime);
      assert.ok(entry.properties.lastModified);
      assert.ok(entry.properties.etag);
    }

    for (const subFileName of subFileNames) {
      assert.ok(resultFileNames.includes(subFileName));
    }

    // List with dir prefix
    result = (
      await dirWithInvalidChar
        .listFilesAndDirectories({
          prefix: "dir\uFFFE",
          includeTimestamps: true,
          includeEtag: true,
          includeAttributes: true,
          includePermissionKey: true,
          includeExtendedInfo: true,
        })
        .byPage()
        .next()
    ).value;

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareClient.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, 0);
    assert.deepStrictEqual(result.prefix, "dir\uFFFE");
    assert.deepStrictEqual(result.directoryPath, dirNameWithInvalidChar);

    resultDirNames = [];
    for (const entry of result.segment.directoryItems) {
      resultDirNames.push(entry.name);
      assert.ok(entry.fileId);
      assert.ok(entry.attributes);
      assert.ok(entry.permissionKey);
      assert.ok(entry.properties.creationTime);
      assert.ok(entry.properties.lastAccessTime);
      assert.ok(entry.properties.changeTime);
      assert.ok(entry.properties.lastModified);
      assert.ok(entry.properties.etag);
    }

    for (const subDirName of subDirNames) {
      assert.ok(resultDirNames.includes(subDirName));
    }

    // List with file prefix
    result = (
      await dirWithInvalidChar
        .listFilesAndDirectories({
          prefix: "file\uFFFE",
          includeTimestamps: true,
          includeEtag: true,
          includeAttributes: true,
          includePermissionKey: true,
          includeExtendedInfo: true,
        })
        .byPage()
        .next()
    ).value;

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareClient.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, 0);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);
    assert.deepStrictEqual(result.prefix, "file\uFFFE");
    assert.deepStrictEqual(result.directoryPath, dirNameWithInvalidChar);

    resultFileNames = [];
    for (const entry of result.segment.fileItems) {
      resultFileNames.push(entry.name);
      assert.ok(entry.fileId);
      assert.ok(entry.attributes);
      assert.ok(entry.permissionKey);
      assert.ok(entry.properties.creationTime);
      assert.ok(entry.properties.lastAccessTime);
      assert.ok(entry.properties.changeTime);
      assert.ok(entry.properties.lastModified);
      assert.ok(entry.properties.etag);
    }

    for (const subFileName of subFileNames) {
      assert.ok(resultFileNames.includes(subFileName));
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }

    dirWithInvalidChar.delete();
  });

  it("listFilesAndDirectories under root directory", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.getDirectoryClient("");

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    const variableName = `pre${now.getTime().toString()}`;
    const prefix = recorder.variable(variableName, getUniqueName(variableName));
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.variable(`${prefix}dir${i}`, getUniqueName(`${prefix}dir${i}`)),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.variable(`${prefix}file${i}`, getUniqueName(`${prefix}file${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (await rootDirClient.listFilesAndDirectories({ prefix }).byPage().next()).value;

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareClient.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);

    let i = 0;
    for (const entry of result.segment.directoryItems) {
      assert.ok(subDirClients[i++].url.indexOf(entry.name) > 0);
    }

    i = 0;
    for (const entry of result.segment.fileItems) {
      assert.ok(subFileClients[i++].url.indexOf(entry.name) > 0);
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("listFilesAndDirectories with all parameters confirgured", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.getDirectoryClient("");
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    const variableName = `pre${now.getTime().toString()}`;
    const prefix = recorder.variable(variableName, getUniqueName(variableName));
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.variable(`${prefix}dir${i}`, getUniqueName(`${prefix}dir${i}`)),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.variable(`${prefix}file${i}`, getUniqueName(`${prefix}file${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const firstRequestSize = Math.ceil((subDirClients.length + subFileClients.length) / 2);
    const secondRequestSize = subDirClients.length + subFileClients.length - firstRequestSize;

    const firstResult = (
      await rootDirClient
        .listFilesAndDirectories({ prefix })
        .byPage({ maxPageSize: firstRequestSize })
        .next()
    ).value;

    assert.deepStrictEqual(
      firstResult.segment.directoryItems.length + firstResult.segment.fileItems.length,
      firstRequestSize,
    );
    assert.notDeepEqual(firstResult.continuationToken, undefined);

    const secondResult = (
      await rootDirClient
        .listFilesAndDirectories({ prefix })
        .byPage({
          continuationToken: firstResult.continuationToken,
          maxPageSize: firstRequestSize + secondRequestSize,
        })
        .next()
    ).value;
    assert.deepStrictEqual(
      secondResult.segment.directoryItems.length + secondResult.segment.fileItems.length,
      secondRequestSize,
    );

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator for listFilesAndDirectories", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.getDirectoryClient("");

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    const variableName = `pre${now.getTime().toString()}`;
    const prefix = recorder.variable(variableName, getUniqueName(variableName));
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.variable(`${prefix}dir${i}`, getUniqueName(`${prefix}dir${i}`)),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.variable(`${prefix}file${i}`, getUniqueName(`${prefix}file${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    for await (const entity of rootDirClient.listFilesAndDirectories({ prefix })) {
      assert.ok(entity.name.startsWith(prefix));
      if (entity.kind === "file") {
        assert.deepEqual(entity.properties.contentLength, 1024);
      }
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for listFilesAndDirectories", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.getDirectoryClient("");

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    const variableName = `pre${now.getTime().toString()}`;
    const prefix = recorder.variable(variableName, getUniqueName(variableName));
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.variable(`${prefix}dir${i}`, getUniqueName(`${prefix}dir${i}`)),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.variable(`${prefix}file${i}`, getUniqueName(`${prefix}file${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const iter = rootDirClient.listFilesAndDirectories({ prefix });
    let entity = getYieldedValue(await iter.next());
    assert.ok(entity.name.startsWith(prefix));
    if (entity.kind === "file") {
      assert.deepEqual(entity.properties.contentLength, 1024);
    }

    entity = getYieldedValue(await iter.next());
    assert.ok(entity.name.startsWith(prefix));
    if (entity.kind === "file") {
      assert.deepEqual(entity.properties.contentLength, 1024);
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listFilesAndDirectories", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.getDirectoryClient("");

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    const variableName = `pre${now.getTime().toString()}`;
    const prefix = recorder.variable(variableName, getUniqueName(variableName));
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.variable(`${prefix}dir${i}`, getUniqueName(`${prefix}dir${i}`)),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.variable(`${prefix}file${i}`, getUniqueName(`${prefix}file${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    for await (const response of rootDirClient
      .listFilesAndDirectories({
        prefix,
      })
      .byPage({ maxPageSize: 2 })) {
      for (const fileItem of response.segment.fileItems) {
        assert.ok(fileItem.name.startsWith(prefix));
        assert.deepEqual(fileItem.properties.contentLength, 1024);
      }
      for (const dirItem of response.segment.directoryItems) {
        assert.ok(dirItem.name.startsWith(prefix));
      }
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listFilesAndDirectories", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.getDirectoryClient("");

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    const variableName = `pre${now.getTime().toString()}`;
    const prefix = recorder.variable(variableName, getUniqueName(variableName));
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.variable(`${prefix}dir${i}`, getUniqueName(`${prefix}dir${i}`)),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.variable(`${prefix}file${i}`, getUniqueName(`${prefix}file${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const firstRequestSize = Math.ceil((subDirClients.length + subFileClients.length) / 2);
    const secondRequestSize = subDirClients.length + subFileClients.length - firstRequestSize;

    let iter = await rootDirClient
      .listFilesAndDirectories({
        prefix,
      })
      .byPage({ maxPageSize: firstRequestSize });
    let response = (await iter.next()).value;

    assert.deepStrictEqual(
      response.segment.directoryItems.length + response.segment.fileItems.length,
      firstRequestSize,
    );
    assert.notDeepEqual(response.continuationToken, undefined);

    iter = await rootDirClient
      .listFilesAndDirectories({
        prefix,
      })
      .byPage({
        continuationToken: response.continuationToken,
        maxPageSize: firstRequestSize + secondRequestSize,
      });
    response = (await iter.next()).value;
    assert.deepStrictEqual(
      response.segment.directoryItems.length + response.segment.fileItems.length,
      secondRequestSize,
    );

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("createSubDirectory and deleteSubDirectory", async () => {
    const directoryName = recorder.variable("directory", getUniqueName("directory"));
    const metadata = { key: "value" };

    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName, {
      metadata,
    });
    const result = await subDirClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await dirClient.deleteSubdirectory(directoryName);
    try {
      await subDirClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("createFile and deleteFile", async () => {
    const directoryName = recorder.variable("directory", getUniqueName("directory"));
    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName);
    const fileName = recorder.variable("file", getUniqueName("file"));
    const metadata = { key: "value" };
    const { fileClient } = await subDirClient.createFile(fileName, 256, { metadata });
    const result = await fileClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await subDirClient.deleteFile(fileName);
    try {
      await fileClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.ok((error.statusCode as number) === 404);
    }
    await subDirClient.delete();
  });

  it("createFile and deleteFile with tracing", async () => {
    await assert.supportsTracing(
      async (options) => {
        const directoryName = recorder.variable("directory", getUniqueName("directory"));
        const { directoryClient: subDirClient } = await dirClient.createSubdirectory(
          directoryName,
          options,
        );
        const fileName = recorder.variable("file", getUniqueName("file"));
        const metadata = { key: "value" };
        const { fileClient } = await subDirClient.createFile(fileName, 256, {
          metadata,
          ...options,
        });
        const result = await fileClient.getProperties(options);
        assert.deepEqual(result.metadata, metadata);

        await subDirClient.deleteFile(fileName, options);
        try {
          await fileClient.getProperties(options);
          assert.fail(
            "Expecting an error in getting properties from a deleted block blob but didn't get one.",
          );
        } catch (error: any) {
          assert.ok((error.statusCode as number) === 404);
          assert.equal(
            error.details.errorCode,
            "ResourceNotFound",
            "Error does not contain details property",
          );
        }
        await subDirClient.delete(options);
      },
      [
        "ShareDirectoryClient-createSubdirectory",
        "ShareDirectoryClient-createFile",
        "ShareFileClient-getProperties",
        "ShareDirectoryClient-deleteFile",
        "ShareDirectoryClient-delete",
      ],
    );
  });

  it("listHandles should work", async () => {
    // TODO: Open or create a handle manually with access rights of Read, Write and Delete; No REST APIs for creating handles
    const result = (await dirClient.listHandles().byPage().next()).value;

    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      assert.notDeepEqual(handle.handleId, undefined);
      assert.notDeepEqual(handle.path, undefined);
      assert.notDeepEqual(handle.fileId, undefined);
      assert.notDeepEqual(handle.sessionId, undefined);
      assert.notDeepEqual(handle.clientIp, undefined);
      assert.notDeepEqual(handle.openTime, undefined);
      assert.notDeepEqual(handle.clientName, undefined);
      assert.deepEqual(handle.accessRightList, ["Read", "Write", "Delete"]);
    }
  });

  it("listHandles for directory with Invalid Char should work", async function (this: Context) {
    if (isBrowser && isLiveMode()) {
      // Skipped for now as the generating new version SAS token is not supported in pipeline yet.
      this.skip();
    }

    const dirNameWithInvalidChar = recorder.variable("dir2", getUniqueName("dir2\uFFFE"));
    const dirWithInvalidChar = shareClient.getDirectoryClient(dirNameWithInvalidChar);
    await dirWithInvalidChar.create();

    const result = (await dirWithInvalidChar.listHandles().byPage().next()).value;

    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      assert.notDeepEqual(handle.handleId, undefined);
      assert.notDeepEqual(handle.path, undefined);
      assert.notDeepEqual(handle.fileId, undefined);
      assert.notDeepEqual(handle.sessionId, undefined);
      assert.notDeepEqual(handle.clientIp, undefined);
      assert.notDeepEqual(handle.openTime, undefined);
      assert.notDeepEqual(handle.clientName, undefined);
    }
  });

  it("forceCloseAllHandles should work", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles - Has to be tested locally

    assert.deepStrictEqual(
      await dirClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles",
    );
  });

  it("forceCloseHandle should work", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    const result = (await dirClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("forceCloseAllHandles return correct closeFailureCount", async () => {
    const closeRes = await dirClient.forceCloseAllHandles();
    assert.equal(
      closeRes.closeFailureCount,
      0,
      "The closeFailureCount is not set to 0 as default.",
    );
  });

  // STG81
  it("rename", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const result = await dirClient.rename(destDirName);
    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();

    try {
      await dirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename with metadata", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const metadata = {
      key1: "vala",
      key2: "valb",
    };

    const result = await dirClient.rename(destDirName, {
      metadata: metadata,
    });
    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    const propertiesResult = await result.destinationDirectoryClient.getProperties();
    assert.deepStrictEqual(propertiesResult.metadata, metadata, "Metadata should be expected.");

    try {
      await dirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename to under a different directory", async () => {
    const sourceParentDirName = recorder.variable(
      "sourceParentdir",
      getUniqueName("sourceParentdir"),
    );
    const sourceParentDir = shareClient.getDirectoryClient(sourceParentDirName);
    await sourceParentDir.create();

    const sourceDirName = recorder.variable("sourcedir", getUniqueName("sourcedir"));
    const sourceDir = sourceParentDir.getDirectoryClient(sourceDirName);
    await sourceDir.create();

    const destParentDirName = recorder.variable("destParentdir", getUniqueName("destParentdir"));
    const destParentDir = shareClient.getDirectoryClient(destParentDirName);
    await destParentDir.create();

    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const destDirPath = destParentDirName + "/" + destDirName;

    const result = await sourceDir.rename(destDirPath);
    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();

    try {
      await sourceDir.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - replaceIfExists = true ", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    await shareClient.getDirectoryClient("").getFileClient(destDirName).create(1024);
    const result = await dirClient.rename(destDirName, {
      replaceIfExists: true,
    });

    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();

    try {
      await dirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - replaceIfExists = false", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destDirName);
    await targetFileClient.create(1024);
    try {
      await dirClient.rename(destDirName);
      assert.fail("Should got conflict error when trying to overwrite an exiting file");
    } catch (err: any) {
      assert.ok(
        (err.statusCode as number) === 409,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await dirClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.ok(properties.contentLength === 1024, "The origin file should still exist");
  });

  it("rename - ignoreReadOnly = true", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destDirName);
    await targetFileClient.create(1024, {
      fileAttributes: FileSystemAttributes.parse("ReadOnly"),
    });

    const result = await dirClient.rename(destDirName, {
      ignoreReadOnly: true,
      replaceIfExists: true,
    });

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();

    try {
      await dirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - ignoreReadOnly = false", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destDirName);
    await targetFileClient.create(1024, {
      fileAttributes: FileSystemAttributes.parse("ReadOnly"),
    });

    try {
      await dirClient.rename(destDirName, {
        ignoreReadOnly: false,
        replaceIfExists: true,
      });
      assert.fail("Should got conflict error when trying to overwrite an exiting file");
    } catch (err: any) {
      assert.ok(
        (err.statusCode as number) === 409,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await dirClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.ok(properties.contentLength === 1024, "The origin file should still exist");
  });

  it("rename - destination leased", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destDirName);
    await targetFileClient.create(1024);

    const guid = "e9890485-bf47-4d9a-b3d0-aceb18506124";
    const leaseClient = targetFileClient.getShareLeaseClient(guid);
    const leaseResult = await leaseClient.acquireLease(-1);

    const result = await dirClient.rename(destDirName, {
      replaceIfExists: true,
      destinationLeaseAccessConditions: {
        leaseId: leaseResult.leaseId,
      },
    });

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();

    try {
      await dirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - destination leased - no lease condition", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destDirName);
    await targetFileClient.create(1024);

    const guid = "e9890485-bf47-4d9a-b3d0-aceb18506124";
    const leaseClient = targetFileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease(-1);

    try {
      await dirClient.rename(destDirName, {
        replaceIfExists: true,
      });
      assert.fail("Should got conflict error when trying to overwrite a leased file");
    } catch (err: any) {
      assert.ok("Should got conflict error when trying to overwrite a leased file");
    }

    await dirClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.ok(properties.contentLength === 1024, "The origin file should still exist");
  });

  it("rename - Non-ASCII source and destination", async () => {
    const destName = "汉字. dest ~!@#$%^&()_+`1234567890-={}[];','";
    const destDirName = recorder.variable(destName, getUniqueName(destName));

    const sourceName = "汉字. source ~!@#$%^&()_+`1234567890-={}[];','";
    const sourceDirName = recorder.variable(sourceName, getUniqueName(sourceName));
    const sourceDirClient = shareClient.getDirectoryClient(sourceDirName);
    await sourceDirClient.create();

    const result = await sourceDirClient.rename(destDirName);
    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    await result.destinationDirectoryClient.getProperties();

    try {
      await sourceDirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - with file permission", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";

    const sourceDirName = recorder.variable("sourcedir", getUniqueName("sourcedir"));
    const sourceDirClient = shareClient.getDirectoryClient(sourceDirName);
    await sourceDirClient.create();

    const result = await sourceDirClient.rename(destDirName, {
      filePermission: filePermission,
    });

    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    const properties = await result.destinationDirectoryClient.getProperties();
    assert.ok(properties.filePermissionKey, "File permission should have been set to destination");

    try {
      await sourceDirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - SMB properties", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";
    const permissionResponse = await shareClient.createPermission(filePermission);

    const fileAttributesInstance = new FileSystemAttributes();
    fileAttributesInstance.directory = true;
    fileAttributesInstance.readonly = true;

    const creationDate = new Date("05 October 2019 14:48 UTC");
    const lastwriteTime = new Date("15 October 2019 14:48 UTC");
    const changedTime = new Date("25 October 2019 14:48 UTC");

    const copyFileSMBInfo = {
      fileAttributes: fileAttributesInstance.toString(),
      fileCreationTime: truncatedISO8061Date(creationDate),
      fileLastWriteTime: truncatedISO8061Date(lastwriteTime),
      fileChangeTime: truncatedISO8061Date(changedTime),
    };

    const sourceDirName = recorder.variable("sourcedir", getUniqueName("sourcedir"));
    const sourceDirClient = shareClient.getDirectoryClient(sourceDirName);
    await sourceDirClient.create();

    const result = await sourceDirClient.rename(destDirName, {
      filePermissionKey: permissionResponse.filePermissionKey,
      copyFileSmbInfo: copyFileSMBInfo,
    });

    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    const properties = await result.destinationDirectoryClient.getProperties();
    assert.ok(properties.filePermissionKey, "File permission should have been set to destination");
    assert.ok(
      truncatedISO8061Date(properties.fileCreatedOn!) === truncatedISO8061Date(creationDate),
      "Creation time should be expected",
    );
    assert.ok(
      truncatedISO8061Date(properties.fileLastWriteOn!) === truncatedISO8061Date(lastwriteTime),
      "Last write time should be expected",
    );
    assert.ok(
      truncatedISO8061Date(properties.fileChangeOn!) === truncatedISO8061Date(changedTime),
      "Changed time should be expected",
    );
    const fileSystemAttributes = FileSystemAttributes.parse(properties.fileAttributes!);
    assert.ok(
      fileSystemAttributes.readonly && fileSystemAttributes.directory,
      "File attributes should be expected",
    );

    try {
      await sourceDirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });
});

describe("ShareDirectoryClient - Verify Name Properties", () => {
  const accountName = "myaccount";
  const shareName = "shareName";
  const dirPath = "dir1/dir2";
  const baseName = "baseName";

  function verifyNameProperties(url: string) {
    const newClient = new ShareDirectoryClient(url);
    assert.equal(newClient.shareName, shareName, "Share name is not the same as the one provided.");
    assert.equal(
      newClient.path,
      dirPath + "/" + baseName,
      "DirPath is not the same as the one provided.",
    );
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided.",
    );
    assert.equal(
      newClient.name,
      baseName,
      "DirectoryClient name is not the same as the baseName of the provided directory URI",
    );
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(
      `https://${accountName}.file.core.windows.net/${shareName}/${dirPath}/${baseName}`,
    );
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://192.0.0.10:1900/${accountName}/${shareName}/${dirPath}/${baseName}`,
    );
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${shareName}/${dirPath}/${baseName}`,
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${shareName}/${dirPath}/${baseName}`);
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new ShareDirectoryClient(
      `https://customdomain.com/${shareName}/${dirPath}/${baseName}`,
    );

    assert.equal(newClient.accountName, "", "Account name is not the same as the one provided.");
    assert.equal(newClient.shareName, shareName, "Share name is not the same as the one provided.");
    assert.equal(
      newClient.path,
      dirPath + "/" + baseName,
      "DirPath is not the same as the one provided.",
    );
    assert.equal(
      newClient.name,
      baseName,
      "DirectoryClient name is not the same as the baseName of the provided directory URI",
    );
  });
});

describe("DirectoryClient - OAuth", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let shareClientWithKeyCredential: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let defaultDirCreateResp: DirectoryCreateResponse;
  let recorder: Recorder;
  const fullDirAttributes = new FileSystemAttributes();
  fullDirAttributes.readonly = true;
  fullDirAttributes.hidden = true;
  fullDirAttributes.system = true;
  fullDirAttributes.directory = true;
  fullDirAttributes.archive = true;
  fullDirAttributes.offline = true;
  fullDirAttributes.notContentIndexed = true;
  fullDirAttributes.noScrubData = true;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source", "x-ms-copy-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"],
    );
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClientWithKeyCredential = getBSU(recorder).getShareClient(shareName);
    await shareClientWithKeyCredential.create();

    try {
      shareClient = getTokenBSU(recorder, "", "", { fileRequestIntent: "backup" }).getShareClient(
        shareName,
      );
    } catch (err) {
      this.skip();
    }

    dirName = recorder.variable("dir", getUniqueName("dir"));
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();
    assert.equal(defaultDirCreateResp.errorCode, undefined);
    assert.equal(defaultDirCreateResp.fileAttributes!, "Directory");
    assert.ok(defaultDirCreateResp.fileChangeOn!);
    assert.ok(defaultDirCreateResp.fileCreatedOn!);
    assert.ok(defaultDirCreateResp.fileId!);
    assert.ok(defaultDirCreateResp.fileLastWriteOn!);
    assert.ok(defaultDirCreateResp.fileParentId!);
    assert.ok(defaultDirCreateResp.filePermissionKey!);
  });

  afterEach(async function () {
    await shareClientWithKeyCredential.delete();
    await recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    try {
      await dirClient.setMetadata(metadata);

      const result = await dirClient.getProperties();
      assert.deepEqual(result.metadata, metadata);
    } catch (err: any) {
      console.log(err);
    }
  });

  it("getProperties", async () => {
    const result = await dirClient.getProperties();
    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("create", (done) => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("createIfNotExists", async () => {
    const res = await dirClient.createIfNotExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ResourceAlreadyExists");

    const dirClient2 = shareClient.getDirectoryClient(
      recorder.variable(dirName, getUniqueName(dirName)),
    );
    const res2 = await dirClient2.createIfNotExists();
    assert.ok(res2.succeeded);

    await dirClient2.delete();
  });

  it("deleteIfExists", async () => {
    const dirClient2 = shareClient.getDirectoryClient(
      recorder.variable(dirName, getUniqueName(dirName)),
    );
    const res = await dirClient2.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await dirClient2.create();
    const res2 = await dirClient2.deleteIfExists();
    assert.ok(res2.succeeded);
  });

  it("exists", async () => {
    assert.ok(await dirClient.exists());
    const dirClient2 = shareClient.getDirectoryClient(
      recorder.variable(dirName, getUniqueName(dirName)),
    );
    assert.ok(!(await dirClient2.exists()));
  });

  it("setProperties and getProperties", async () => {
    await dirClient.setProperties();

    const result = await dirClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, defaultDirCreateResp.fileAttributes!);
    assert.equal(
      truncatedISO8061Date(result.fileCreatedOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileCreatedOn!),
    );
    assert.equal(
      truncatedISO8061Date(result.fileLastWriteOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileLastWriteOn!),
    );
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("setProperties with all parameters configured setting filePermission", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!,
    );

    const now = new Date(recorder.variable("now", new Date().toISOString()));

    await dirClient.setProperties({
      creationTime: now,
      lastWriteTime: now,
      changeTime: now,
      filePermission: getPermissionResp.permission,
      fileAttributes: fullDirAttributes,
    });

    const result = await dirClient.getProperties();
    assert.equal(result.errorCode, undefined);
    const respFileAttributes = FileSystemAttributes.parse(result.fileAttributes!);
    assert.ok(respFileAttributes.readonly);
    assert.ok(respFileAttributes.hidden);
    assert.ok(respFileAttributes.system);
    assert.ok(respFileAttributes.directory);
    assert.ok(respFileAttributes.archive);
    assert.ok(respFileAttributes.offline);
    assert.ok(respFileAttributes.notContentIndexed);
    assert.ok(respFileAttributes.noScrubData);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("listFilesAndDirectories", async () => {
    const subDirClients = [];

    for (let i = 0; i < 3; i++) {
      const subDirClient = dirClient.getDirectoryClient(
        recorder.variable(`dir${i}`, getUniqueName(`dir${i}`)),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = dirClient.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file${i}`)),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (await dirClient.listFilesAndDirectories().byPage().next()).value;

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareClient.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);

    let i = 0;
    for (const entry of result.segment.directoryItems) {
      assert.ok(subDirClients[i++].url.indexOf(entry.name) > 0);
    }

    i = 0;
    for (const entry of result.segment.fileItems) {
      assert.ok(subFileClients[i++].url.indexOf(entry.name) > 0);
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("createSubDirectory and deleteSubDirectory", async () => {
    const directoryName = recorder.variable("directory", getUniqueName("directory"));
    const metadata = { key: "value" };

    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName, {
      metadata,
    });
    const result = await subDirClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await dirClient.deleteSubdirectory(directoryName);
    assert.equal(await subDirClient.exists(), false);
  });

  it("createFile and deleteFile", async () => {
    const directoryName = recorder.variable("directory", getUniqueName("directory"));
    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName);
    const fileName = recorder.variable("file", getUniqueName("file"));
    const metadata = { key: "value" };
    const { fileClient } = await subDirClient.createFile(fileName, 256, { metadata });
    const result = await fileClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await subDirClient.deleteFile(fileName);
    assert.equal(await fileClient.exists(), false);
  });

  it("listHandles", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    const result = (await dirClient.listHandles().byPage().next()).value;

    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      assert.notDeepEqual(handle.handleId, undefined);
      assert.notDeepEqual(handle.path, undefined);
      assert.notDeepEqual(handle.fileId, undefined);
      assert.notDeepEqual(handle.sessionId, undefined);
      assert.notDeepEqual(handle.clientIp, undefined);
      assert.notDeepEqual(handle.openTime, undefined);
    }
  });

  it("forceCloseAllHandles", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles - Has to be tested locally

    assert.deepStrictEqual(
      await dirClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles",
    );
  });

  it("forceCloseHandle", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    const result = (await dirClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("rename", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const result = await dirClient.rename(destDirName);
    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();
    assert.equal(await dirClient.exists(), false);

    const firstDestClient = result.destinationDirectoryClient;
    const anotherDestDirName = recorder.variable("destdir1", getUniqueName("destdir1"));
    const anotherResult = await firstDestClient.rename(anotherDestDirName);

    // Validate destination existence.
    await anotherResult.destinationDirectoryClient.getProperties();
    assert.equal(await firstDestClient.exists(), false);
  });
});

describe("DirectoryClient - AllowingTrailingDots - True", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let defaultDirCreateResp: DirectoryCreateResponse;
  let dirClient: ShareDirectoryClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source", "x-ms-copy-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"],
    );
    const serviceClient = getBSU(recorder, {
      allowTrailingDot: true,
      allowSourceTrailingDot: true,
    });
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir")) + ".";
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();
  });

  afterEach(async function () {
    await shareClient.delete();
    await recorder.stop();
  });

  it("create and delete", async () => {
    const dirName1 = recorder.variable("dir1", getUniqueName("dir1"));
    const dirNameWithDots = dirName1 + "...";
    const dirClient1 = shareClient.getDirectoryClient(dirNameWithDots);
    await dirClient1.create();

    // make sure
    let foundDir = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === dirNameWithDots) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dot is created.");
    await dirClient1.delete();

    assert.equal(await dirClient1.exists(), false);
  });

  it("createIfNotExists - Exists", async () => {
    const response = await dirClient.createIfNotExists();
    assert.ok(!response.succeeded, "Directory should already exists");
  });

  it("createIfNotExists - New", async () => {
    const dirName1 = recorder.variable("dir1", getUniqueName("dir1")) + "...";
    const dirClient1 = shareClient.getDirectoryClient(dirName1);
    await dirClient1.createIfNotExists();

    // directory has already been created in beforeEach
    let foundDir = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === dirName1) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dot is created.");
  });

  it("setProperties and getProperties", async () => {
    await dirClient.setProperties();

    const result = await dirClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, defaultDirCreateResp.fileAttributes!);
    assert.equal(
      truncatedISO8061Date(result.fileCreatedOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileCreatedOn!),
    );
    assert.equal(
      truncatedISO8061Date(result.fileLastWriteOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileLastWriteOn!),
    );
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("createSubDirectory and deleteSubDirectory", async () => {
    const subDirName = recorder.variable("subdir", getUniqueName("subdir")) + ".";

    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(subDirName);
    await subDirClient.getProperties();

    await dirClient.deleteSubdirectory(subDirName);
    assert.equal(await subDirClient.exists(), false);
  });

  it("createFile and delete file", async () => {
    const fileName = recorder.variable("file", getUniqueName("file")) + ".";

    const { fileClient: fileClient } = await dirClient.createFile(fileName, 1024);
    await fileClient.getProperties();

    await dirClient.deleteFile(fileName);
    assert.equal(await fileClient.exists(), false);
  });

  it("listHandles", async () => {
    const result = (await dirClient.listHandles().byPage().next()).value;

    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      assert.notDeepEqual(handle.handleId, undefined);
      assert.notDeepEqual(handle.path, undefined);
      assert.notDeepEqual(handle.fileId, undefined);
      assert.notDeepEqual(handle.sessionId, undefined);
      assert.notDeepEqual(handle.clientIp, undefined);
      assert.notDeepEqual(handle.openTime, undefined);
    }
  });

  it("exists", async () => {
    assert.ok(await dirClient.exists(), "The directory with trailing dot should exists");
  });

  it("deleteIfExists", async () => {
    const dirName1 = recorder.variable("dir1", getUniqueName("dir1"));
    const dirNameWithDots = dirName1 + "...";
    const dirClient1 = shareClient.getDirectoryClient(dirNameWithDots);

    await dirClient1.create();
    let deleteResponse = await dirClient1.deleteIfExists();
    assert.ok(deleteResponse.succeeded, "Deletion should succeeded.");
    deleteResponse = await dirClient1.deleteIfExists();
    assert.ok(!deleteResponse.succeeded, "Directory should not exist anymore.");
  });

  it("setMetadata", async () => {
    await dirClient.setMetadata({});
    let properties = await dirClient.getProperties();
    assert.deepStrictEqual(properties.metadata, {});

    const metadata = { key1: "Value1" };
    await dirClient.setMetadata(metadata);
    properties = await dirClient.getProperties();
    assert.deepStrictEqual(properties.metadata, metadata);
  });

  it("listFilesAndDirectories", async () => {
    const fileName = recorder.variable("file", getUniqueName("file")) + "...";
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === fileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.ok(foundFile, "Should found the file.");
  });

  it("forceCloseHandle", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    const result = (await dirClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("forceCloseAllHandles", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles - Has to be tested locally

    assert.deepStrictEqual(
      await dirClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles",
    );
  });

  it("rename", async () => {
    const destDirName = recorder.variable("destdir", getUniqueName("destdir")) + "....";
    const result = await dirClient.rename(destDirName);
    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();
    assert.equal(await dirClient.exists(), false);

    // make sure
    let foundDir = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === destDirName) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dot exists.");

    const firstDestClient = result.destinationDirectoryClient;
    const anotherDestDirName = recorder.variable("destdir1", getUniqueName("destdir1")) + "....";
    const anotherResult = await firstDestClient.rename(anotherDestDirName);

    // Validate destination existence.
    await anotherResult.destinationDirectoryClient.getProperties();
    assert.equal(await firstDestClient.exists(), false);

    // make sure
    foundDir = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === anotherDestDirName) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dot exists.");
  });
});

describe("DirectoryClient - AllowingTrailingDots - False", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let recorder: Recorder;
  let defaultDirCreateResp: DirectoryCreateResponse;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source", "x-ms-copy-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"],
    );
    const serviceClient = getBSU(recorder, {
      allowTrailingDot: false,
      allowSourceTrailingDot: false,
    });
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir")) + ".";
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();
  });

  afterEach(async function () {
    await shareClient.delete();
    await recorder.stop();
  });

  it("create and delete", async () => {
    const dirName1 = recorder.variable("dir1", getUniqueName("dir1"));
    const dirNameWithDots = dirName1 + "...";
    const dirClient1 = shareClient.getDirectoryClient(dirNameWithDots);
    await dirClient1.create();

    // make sure
    let foundDir = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === dirName1) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dot trimmed is created.");
    await dirClient1.delete();

    assert.equal(await dirClient1.exists(), false);
  });

  it("createIfNotExists - Exists", async () => {
    const response = await dirClient.createIfNotExists();
    assert.ok(!response.succeeded, "Directory should already exists");
  });

  it("createIfNotExists - New", async () => {
    const dirName1 = recorder.variable("dir1", getUniqueName("dir1"));
    const dirNameWithDots = dirName1 + "...";
    const dirClient1 = shareClient.getDirectoryClient(dirNameWithDots);
    await dirClient1.createIfNotExists();

    let foundDir = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === dirName1) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dot trimmed is created.");
  });

  it("setProperties and getProperties", async () => {
    await dirClient.setProperties();

    const result = await dirClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, defaultDirCreateResp.fileAttributes!);
    assert.equal(
      truncatedISO8061Date(result.fileCreatedOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileCreatedOn!),
    );
    assert.equal(
      truncatedISO8061Date(result.fileLastWriteOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileLastWriteOn!),
    );
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("createSubDirectory and deleteSubDirectory", async () => {
    const subDirName = recorder.variable("subdir", getUniqueName("subdir"));
    const subDirNameWithDots = subDirName + ".";

    const { directoryClient: subDirClient } =
      await dirClient.createSubdirectory(subDirNameWithDots);

    let foundDir = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === subDirName) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dot trimmed should have been created.");
    await subDirClient.getProperties();

    await dirClient.deleteSubdirectory(subDirNameWithDots);
    assert.equal(await subDirClient.exists(), false);
  });

  it("createFile and deleteFile", async () => {
    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileNameWithDots = fileName + ".";

    const { fileClient: fileClient } = await dirClient.createFile(fileNameWithDots, 1024);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === fileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.ok(foundFile, "The file with trailing dots trimmed should have been created.");

    await fileClient.getProperties();

    await dirClient.deleteFile(fileNameWithDots);
    assert.equal(await fileClient.exists(), false);
  });

  it("listHandles", async () => {
    const result = (await dirClient.listHandles().byPage().next()).value;

    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      assert.notDeepEqual(handle.handleId, undefined);
      assert.notDeepEqual(handle.path, undefined);
      assert.notDeepEqual(handle.fileId, undefined);
      assert.notDeepEqual(handle.sessionId, undefined);
      assert.notDeepEqual(handle.clientIp, undefined);
      assert.notDeepEqual(handle.openTime, undefined);
    }
  });

  it("exists", async () => {
    assert.ok(await dirClient.exists(), "The directory with trailing dot should exists");
  });

  it("deleteIfExists", async () => {
    const dirName1 = recorder.variable("dir1", getUniqueName("dir1"));
    const dirNameWithDots = dirName1 + "...";
    const dirClient1 = shareClient.getDirectoryClient(dirName1);
    await dirClient1.create();

    const dirClientWithTrailingDots = shareClient.getDirectoryClient(dirNameWithDots);
    let deleteResponse = await dirClientWithTrailingDots.deleteIfExists();
    assert.ok(deleteResponse.succeeded, "Deletion should succeeded.");
    deleteResponse = await dirClient1.deleteIfExists();
    assert.ok(!deleteResponse.succeeded, "Directory should not exist anymore.");
  });

  it("setMetadata", async () => {
    await dirClient.setMetadata({});
    let properties = await dirClient.getProperties();
    assert.deepStrictEqual(properties.metadata, {});

    const metadata = { key1: "Value1" };
    await dirClient.setMetadata(metadata);
    properties = await dirClient.getProperties();
    assert.deepStrictEqual(properties.metadata, metadata);
  });

  it("listFilesAndDirectories", async () => {
    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileNameWithTrailingDots = fileName + "...";
    const fileClient = dirClient.getFileClient(fileNameWithTrailingDots);
    await fileClient.create(1024);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === fileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
      if (item.name === fileNameWithTrailingDots) {
        assert.fail("File name with trailing dots should not exist");
      }
    }

    assert.ok(foundFile, "Should found the file.");
  });

  it("forceCloseHandle", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    const result = (await dirClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("forceCloseAllHandles", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles - Has to be tested locally

    assert.deepStrictEqual(
      await dirClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles",
    );
  });

  it("rename", async () => {
    const destDirBaseName = recorder.variable("destdir", getUniqueName("destdir"));
    const destDirName = destDirBaseName + "....";
    const result = await dirClient.rename(destDirName);
    assert.ok(
      result.destinationDirectoryClient.name === destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();
    assert.equal(await dirClient.exists(), false);

    // make sure
    let foundDir = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === destDirBaseName) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dots trimmed should exist.");

    const firstDestClient = result.destinationDirectoryClient;
    const anotherDestDirBaseName = recorder.variable("destdir1", getUniqueName("destdir1"));
    const anotherDestDirName = anotherDestDirBaseName + "....";
    const anotherResult = await firstDestClient.rename(anotherDestDirName);

    // Validate destination existence.
    await anotherResult.destinationDirectoryClient.getProperties();
    assert.equal(await firstDestClient.exists(), false);

    // make sure
    foundDir = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === anotherDestDirBaseName) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dot exists.");
  });
});

describe("DirectoryClient - AllowingTrailingDots - Default", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source", "x-ms-copy-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"],
    );
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir")) + ".";
    dirClient = shareClient.getDirectoryClient(dirName);

    await dirClient.create();
  });

  afterEach(async function () {
    await shareClient.delete();
    await recorder.stop();
  });

  it("create and delete", async () => {
    const dirName1 = recorder.variable("dir1", getUniqueName("dir1"));
    const dirNameWithDots = dirName1 + "...";
    const dirClient1 = shareClient.getDirectoryClient(dirNameWithDots);
    await dirClient1.create();

    // make sure
    let foundDir = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === dirName1) {
        assert.equal(item.kind, "directory");
        foundDir = true;
      }
    }

    assert.ok(foundDir, "The directory with trailing dot is created.");
    await dirClient1.delete();

    assert.equal(await dirClient1.exists(), false);
  });
});
