// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FilePosixProperties, ShareClient } from "@azure/storage-file-share";
import { ShareDirectoryClient, FileSystemAttributes } from "@azure/storage-file-share";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type { DirectoryCreateResponse } from "$internal/generatedModels.js";
import { truncatedISO8061Date } from "$internal/utils/utils.common.js";
import { getYieldedValue } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeEach, afterEach, expect } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import type { OperationOptions } from "@azure/core-client";
import { createShareServiceClient } from "../../utils/node/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { getAccountKey, getPremiumFileAccountKey } from "../../utils/injectables.js";

expect.extend({ toSupportTracing });

describe.runIf(getAccountKey())("DirectoryClient", () => {
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
  const filePermissionInBinaryFormat =
    "AQAUhGwAAACIAAAAAAAAABQAAAACAFgAAwAAAAAAFAD/AR8AAQEAAAAAAAUSAAAAAAAYAP8BHwABAgAAAAAABSAAAAAgAgAAAAAkAKkAEgABBQAAAAAABRUAAABZUbgXZnJdJWRjOwuMmS4AAQUAAAAAAAUVAAAAoGXPfnhLm1/nfIdwr/1IAQEFAAAAAAAFFQAAAKBlz354S5tf53yHcAECAAA=";

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("SharedKeyCredential", { recorder });
    assert.isDefined(serviceClient);
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir", { recorder });
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();
    assert.equal(defaultDirCreateResp.errorCode, undefined);
    assert.equal(defaultDirCreateResp.fileAttributes!, "Directory");
    assert.isDefined(defaultDirCreateResp.fileChangeOn!);
    assert.isDefined(defaultDirCreateResp.fileCreatedOn!);
    assert.isDefined(defaultDirCreateResp.fileId!);
    assert.isDefined(defaultDirCreateResp.fileLastWriteOn!);
    assert.isDefined(defaultDirCreateResp.fileParentId!);
    assert.isDefined(defaultDirCreateResp.filePermissionKey!);
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("Get directory client under another directory", async () => {
    const directoryName1 = getUniqueName("dir1", { recorder });
    const directoryName2 = getUniqueName("dir2", { recorder });
    const dir1Client = dirClient.getDirectoryClient(directoryName1);
    await dir1Client.create();

    const dir2Client = dir1Client.getDirectoryClient(directoryName2);
    await dir2Client.create();

    const subDirClient = dirClient.getDirectoryClient(`${directoryName1}/${directoryName2}`);
    assert.equal(subDirClient.name, dir2Client.name);
    await subDirClient.getProperties();
  });

  it("Get file client under another directory", async () => {
    const subDirName = getUniqueName("subdir", { recorder });
    const fileName = getUniqueName("file", { recorder });
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
    await dirClient.setMetadata(metadata);

    const result = await dirClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("getProperties", async () => {
    const result = await dirClient.getProperties();
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("create with default parameters", () => {
    // create() with default parameters has been tested in beforeEach
  });

  it("create with all parameters configured setting filePermissionKey", async () => {
    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
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
    assert.isDefined(respFileAttributes.readonly);
    assert.isDefined(respFileAttributes.hidden);
    assert.isDefined(respFileAttributes.system);
    assert.isDefined(respFileAttributes.directory);
    assert.isDefined(respFileAttributes.archive);
    assert.isDefined(respFileAttributes.offline);
    assert.isDefined(respFileAttributes.notContentIndexed);
    assert.isDefined(respFileAttributes.noScrubData);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
  });

  it("create with all parameters configured setting filePermission", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!,
    );

    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
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
    assert.isDefined(respFileAttributes.readonly);
    assert.isDefined(respFileAttributes.hidden);
    assert.isDefined(respFileAttributes.system);
    assert.isDefined(respFileAttributes.directory);
    assert.isDefined(respFileAttributes.archive);
    assert.isDefined(respFileAttributes.offline);
    assert.isDefined(respFileAttributes.notContentIndexed);
    assert.isDefined(respFileAttributes.noScrubData);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.isDefined(result.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
  });

  it("create with all parameters configured setting filePermission format", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!,
      {
        filePermissionFormat: "Binary",
      },
    );

    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
    const metadata = { key: "value" };
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    await dirClient2.create({
      metadata: metadata,
      creationTime: now,
      lastWriteTime: now,
      filePermissionFormat: "Binary",
      filePermission: getPermissionResp.permission,
      fileAttributes: fullDirAttributes,
    });

    const result = await dirClient2.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
    assert.equal(result.errorCode, undefined);
    const respFileAttributes = FileSystemAttributes.parse(result.fileAttributes!);
    assert.isDefined(respFileAttributes.readonly);
    assert.isDefined(respFileAttributes.hidden);
    assert.isDefined(respFileAttributes.system);
    assert.isDefined(respFileAttributes.directory);
    assert.isDefined(respFileAttributes.archive);
    assert.isDefined(respFileAttributes.offline);
    assert.isDefined(respFileAttributes.notContentIndexed);
    assert.isDefined(respFileAttributes.noScrubData);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.isDefined(result.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
  });

  it("create with filePermission with Sddl format", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!,
      {
        filePermissionFormat: "Sddl",
      },
    );

    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
    await dirClient2.create({
      filePermissionFormat: "Sddl",
      filePermission: getPermissionResp.permission,
    });

    const result = await dirClient2.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.isDefined(result.filePermissionKey!);
  });

  it("createIfNotExists", async () => {
    const res = await dirClient.createIfNotExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ResourceAlreadyExists");

    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
    const res2 = await dirClient2.createIfNotExists();
    assert.isTrue(res2.succeeded);

    await dirClient2.delete();
  });

  it("deleteIfExists", async () => {
    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
    const res = await dirClient2.deleteIfExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await dirClient2.create();
    const res2 = await dirClient2.deleteIfExists();
    assert.isTrue(res2.succeeded);
  });

  it("deleteIfExists when parent not exists ", async () => {
    const subDirName = getUniqueName("subdir", { recorder });
    const dirClient2 = dirClient.getDirectoryClient(subDirName);
    const dirClient3 = dirClient2.getDirectoryClient(subDirName);
    const res = await dirClient3.deleteIfExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ParentNotFound");
  });

  it("exists", async () => {
    assert.isTrue(await dirClient.exists());
    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
    assert.isFalse(await dirClient2.exists());
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
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
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
    assert.isDefined(respFileAttributes.readonly);
    assert.isDefined(respFileAttributes.hidden);
    assert.isDefined(respFileAttributes.system);
    assert.isDefined(respFileAttributes.directory);
    assert.isDefined(respFileAttributes.archive);
    assert.isDefined(respFileAttributes.offline);
    assert.isDefined(respFileAttributes.notContentIndexed);
    assert.isDefined(respFileAttributes.noScrubData);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.isDefined(result.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
  });

  it("setProperties with binary permissions", async () => {
    await dirClient.setProperties({
      filePermissionFormat: "Binary",
      filePermission: filePermissionInBinaryFormat,
    });
    const result = await dirClient.getProperties();
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isDefined(result.filePermissionKey);
  });

  it("delete", () => {});

  it("listFilesAndDirectories - empty prefix should not cause an error", async () => {
    const subDirClients = [];

    for (let i = 0; i < 3; i++) {
      const subDirClient = dirClient.getDirectoryClient(getUniqueName(`dir${i}`, { recorder }));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = dirClient.getFileClient(getUniqueName(`file${i}`, { recorder }));
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (await dirClient.listFilesAndDirectories({ prefix: "" }).byPage().next()).value;

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(shareClient.url.indexOf(result.shareName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);

    let i = 0;
    for (const entry of result.segment.directoryItems) {
      assert.isAbove(subDirClients[i++].url.indexOf(entry.name), 0);
    }

    i = 0;
    for (const entry of result.segment.fileItems) {
      assert.isAbove(subFileClients[i++].url.indexOf(entry.name), 0);
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
      const subDirClient = dirClient.getDirectoryClient(getUniqueName(`dir${i}`, { recorder }));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = dirClient.getFileClient(getUniqueName(`file${i}`, { recorder }));
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

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(shareClient.url.indexOf(result.shareName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);

    let i = 0;
    for (const entry of result.segment.directoryItems) {
      assert.isAbove(subDirClients[i++].url.indexOf(entry.name), 0);
      assert.isDefined(entry.fileId);
      assert.isDefined(entry.attributes);
      assert.isDefined(entry.permissionKey);
      assert.isDefined(entry.properties.creationTime);
      assert.isDefined(entry.properties.lastAccessTime);
      assert.isDefined(entry.properties.changeTime);
      assert.isDefined(entry.properties.lastModified);
      assert.isDefined(entry.properties.etag);
    }

    i = 0;
    for (const entry of result.segment.fileItems) {
      assert.isAbove(subFileClients[i++].url.indexOf(entry.name), 0);
      assert.isDefined(entry.fileId);
      assert.isDefined(entry.attributes);
      assert.isDefined(entry.permissionKey);
      assert.isDefined(entry.properties.creationTime);
      assert.isDefined(entry.properties.lastAccessTime);
      assert.isDefined(entry.properties.changeTime);
      assert.isDefined(entry.properties.lastModified);
      assert.isDefined(entry.properties.etag);
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it.runIf(isLiveMode())("listFilesAndDirectories - with invalid char", async function () {
    const subDirClients = [];
    const subDirNames = [];

    const dirNameWithInvalidChar = getUniqueName("dir1\uFFFE", { recorder });
    const dirWithInvalidChar = shareClient.getDirectoryClient(dirNameWithInvalidChar);
    await dirWithInvalidChar.create();

    for (let i = 0; i < 3; i++) {
      const subDirClient = dirWithInvalidChar.getDirectoryClient(
        getUniqueName(`dir\uFFFE${i}-1`, { recorder }),
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
        getUniqueName(`file\uFFFE${i}`, { recorder }),
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

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(shareClient.url.indexOf(result.shareName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);
    assert.deepStrictEqual(result.directoryPath, dirNameWithInvalidChar);

    let resultDirNames = [];
    for (const entry of result.segment.directoryItems) {
      resultDirNames.push(entry.name);
      assert.isDefined(entry.fileId);
      assert.isDefined(entry.attributes);
      assert.isDefined(entry.permissionKey);
      assert.isDefined(entry.properties.creationTime);
      assert.isDefined(entry.properties.lastAccessTime);
      assert.isDefined(entry.properties.changeTime);
      assert.isDefined(entry.properties.lastModified);
      assert.isDefined(entry.properties.etag);
    }

    for (const subDirName of subDirNames) {
      assert.include(resultDirNames, subDirName);
    }

    let resultFileNames = [];
    for (const entry of result.segment.fileItems) {
      resultFileNames.push(entry.name);
      assert.isDefined(entry.fileId);
      assert.isDefined(entry.attributes);
      assert.isDefined(entry.permissionKey);
      assert.isDefined(entry.properties.creationTime);
      assert.isDefined(entry.properties.lastAccessTime);
      assert.isDefined(entry.properties.changeTime);
      assert.isDefined(entry.properties.lastModified);
      assert.isDefined(entry.properties.etag);
    }

    for (const subFileName of subFileNames) {
      assert.include(resultFileNames, subFileName);
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

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(shareClient.url.indexOf(result.shareName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, 0);
    assert.deepStrictEqual(result.prefix, "dir\uFFFE");
    assert.deepStrictEqual(result.directoryPath, dirNameWithInvalidChar);

    resultDirNames = [];
    for (const entry of result.segment.directoryItems) {
      resultDirNames.push(entry.name);
      assert.isDefined(entry.fileId);
      assert.isDefined(entry.attributes);
      assert.isDefined(entry.permissionKey);
      assert.isDefined(entry.properties.creationTime);
      assert.isDefined(entry.properties.lastAccessTime);
      assert.isDefined(entry.properties.changeTime);
      assert.isDefined(entry.properties.lastModified);
      assert.isDefined(entry.properties.etag);
    }

    for (const subDirName of subDirNames) {
      assert.include(resultDirNames, subDirName);
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

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(shareClient.url.indexOf(result.shareName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, 0);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);
    assert.deepStrictEqual(result.prefix, "file\uFFFE");
    assert.deepStrictEqual(result.directoryPath, dirNameWithInvalidChar);

    resultFileNames = [];
    for (const entry of result.segment.fileItems) {
      resultFileNames.push(entry.name);
      assert.isDefined(entry.fileId);
      assert.isDefined(entry.attributes);
      assert.isDefined(entry.permissionKey);
      assert.isDefined(entry.properties.creationTime);
      assert.isDefined(entry.properties.lastAccessTime);
      assert.isDefined(entry.properties.changeTime);
      assert.isDefined(entry.properties.lastModified);
      assert.isDefined(entry.properties.etag);
    }

    for (const subFileName of subFileNames) {
      assert.include(resultFileNames, subFileName);
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
    const prefix = getUniqueName(variableName, { recorder });
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        getUniqueName(`${prefix}dir${i}`, { recorder }),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        getUniqueName(`${prefix}file${i}`, { recorder }),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (await rootDirClient.listFilesAndDirectories({ prefix }).byPage().next()).value;

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(shareClient.url.indexOf(result.shareName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);

    let i = 0;
    for (const entry of result.segment.directoryItems) {
      assert.isAbove(subDirClients[i++].url.indexOf(entry.name), 0);
    }

    i = 0;
    for (const entry of result.segment.fileItems) {
      assert.isAbove(subFileClients[i++].url.indexOf(entry.name), 0);
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
    const prefix = getUniqueName(variableName, { recorder });
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        getUniqueName(`${prefix}dir${i}`, { recorder }),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        getUniqueName(`${prefix}file${i}`, { recorder }),
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
    const prefix = getUniqueName(variableName, { recorder });
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        getUniqueName(`${prefix}dir${i}`, { recorder }),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        getUniqueName(`${prefix}file${i}`, { recorder }),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    for await (const entity of rootDirClient.listFilesAndDirectories({ prefix })) {
      assert.isTrue(entity.name.startsWith(prefix));
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
    const prefix = getUniqueName(variableName, { recorder });
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        getUniqueName(`${prefix}dir${i}`, { recorder }),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        getUniqueName(`${prefix}file${i}`, { recorder }),
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const iter = rootDirClient.listFilesAndDirectories({ prefix });
    let entity = getYieldedValue(await iter.next());
    assert.isTrue(entity.name.startsWith(prefix));
    if (entity.kind === "file") {
      assert.deepEqual(entity.properties.contentLength, 1024);
    }

    entity = getYieldedValue(await iter.next());
    assert.isTrue(entity.name.startsWith(prefix));
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
    const prefix = getUniqueName(variableName, { recorder });
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        getUniqueName(`${prefix}dir${i}`, { recorder }),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        getUniqueName(`${prefix}file${i}`, { recorder }),
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
        assert.isTrue(fileItem.name.startsWith(prefix));
        assert.deepEqual(fileItem.properties.contentLength, 1024);
      }
      for (const dirItem of response.segment.directoryItems) {
        assert.isTrue(dirItem.name.startsWith(prefix));
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
    const prefix = getUniqueName(variableName, { recorder });
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        getUniqueName(`${prefix}dir${i}`, { recorder }),
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        getUniqueName(`${prefix}file${i}`, { recorder }),
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
    const directoryName = getUniqueName("directory", { recorder });
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
      assert.strictEqual(error.statusCode as number, 404);
    }
  });

  it("createFile and deleteFile", async () => {
    const directoryName = getUniqueName("directory", { recorder });
    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName);
    const fileName = getUniqueName("file", { recorder });
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
      assert.strictEqual(error.statusCode as number, 404);
    }
    await subDirClient.delete();
  });

  it("createFile and deleteFile with tracing", async () => {
    await expect(async (options: OperationOptions) => {
      const directoryName = getUniqueName("directory", { recorder });
      const { directoryClient: subDirClient } = await dirClient.createSubdirectory(
        directoryName,
        options,
      );
      const fileName = getUniqueName("file", { recorder });
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
        assert.strictEqual(error.statusCode as number, 404);
        assert.equal(
          error.details.errorCode,
          "ResourceNotFound",
          "Error does not contain details property",
        );
      }
      await subDirClient.delete(options);
    }).toSupportTracing([
      "ShareDirectoryClient-createSubdirectory",
      "ShareDirectoryClient-createFile",
      "ShareFileClient-getProperties",
      "ShareDirectoryClient-deleteFile",
      "ShareDirectoryClient-delete",
    ]);
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

  it("listHandles for directory with Invalid Char should work", async function () {
    const dirNameWithInvalidChar = getUniqueName("dir2\uFFFE", { recorder });
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
    const destDirName = getUniqueName("destdir", { recorder });
    const result = await dirClient.rename(destDirName);
    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();

    try {
      await dirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename with metadata", async () => {
    const destDirName = getUniqueName("destdir", { recorder });
    const metadata = {
      key1: "vala",
      key2: "valb",
    };

    const result = await dirClient.rename(destDirName, {
      metadata: metadata,
    });
    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    const propertiesResult = await result.destinationDirectoryClient.getProperties();
    assert.deepStrictEqual(propertiesResult.metadata, metadata, "Metadata should be expected.");

    try {
      await dirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename to under a different directory", async () => {
    const sourceParentDirName = getUniqueName("sourceParentdir", { recorder });
    const sourceParentDir = shareClient.getDirectoryClient(sourceParentDirName);
    await sourceParentDir.create();

    const sourceDirName = getUniqueName("sourcedir", { recorder });
    const sourceDir = sourceParentDir.getDirectoryClient(sourceDirName);
    await sourceDir.create();

    const destParentDirName = getUniqueName("destParentdir", { recorder });
    const destParentDir = shareClient.getDirectoryClient(destParentDirName);
    await destParentDir.create();

    const destDirName = getUniqueName("destdir", { recorder });
    const destDirPath = destParentDirName + "/" + destDirName;

    const result = await sourceDir.rename(destDirPath);
    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();

    try {
      await sourceDir.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename - replaceIfExists = true ", async () => {
    const destDirName = getUniqueName("destdir", { recorder });
    await shareClient.getDirectoryClient("").getFileClient(destDirName).create(1024);
    const result = await dirClient.rename(destDirName, {
      replaceIfExists: true,
    });

    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();

    try {
      await dirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename - replaceIfExists = false", async () => {
    const destDirName = getUniqueName("destdir", { recorder });
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destDirName);
    await targetFileClient.create(1024);
    try {
      await dirClient.rename(destDirName);
      assert.fail("Should got conflict error when trying to overwrite an exiting file");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        409,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await dirClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.strictEqual(properties.contentLength, 1024, "The origin file should still exist");
  });

  it("rename - ignoreReadOnly = true", async () => {
    const destDirName = getUniqueName("destdir", { recorder });
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
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename - ignoreReadOnly = false", async () => {
    const destDirName = getUniqueName("destdir", { recorder });
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
      assert.strictEqual(
        err.statusCode as number,
        409,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await dirClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.strictEqual(properties.contentLength, 1024, "The origin file should still exist");
  });

  it("rename - destination leased", async () => {
    const destDirName = getUniqueName("destdir", { recorder });
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
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename - destination leased - no lease condition", async () => {
    const destDirName = getUniqueName("destdir", { recorder });
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
      assert.equal(err.code, "LeaseIdMissing");
    }

    await dirClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.strictEqual(properties.contentLength, 1024, "The origin file should still exist");
  });

  it("rename - Non-ASCII source and destination", async () => {
    const destName = "汉字. dest ~!@#$%^&()_+`1234567890-={}[];','";
    const destDirName = getUniqueName(destName, { recorder });

    const sourceName = "汉字. source ~!@#$%^&()_+`1234567890-={}[];','";
    const sourceDirName = getUniqueName(sourceName, { recorder });
    const sourceDirClient = shareClient.getDirectoryClient(sourceDirName);
    await sourceDirClient.create();

    const result = await sourceDirClient.rename(destDirName);
    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
      "Destination name should be expected",
    );

    await result.destinationDirectoryClient.getProperties();

    try {
      await sourceDirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename - with file permission", async () => {
    const destDirName = getUniqueName("destdir", { recorder });
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";

    const sourceDirName = getUniqueName("sourcedir", { recorder });
    const sourceDirClient = shareClient.getDirectoryClient(sourceDirName);
    await sourceDirClient.create();

    const result = await sourceDirClient.rename(destDirName, {
      filePermission: filePermission,
    });

    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
      "Destination name should be expected",
    );

    const properties = await result.destinationDirectoryClient.getProperties();
    assert.isDefined(
      properties.filePermissionKey,
      "File permission should have been set to destination",
    );

    try {
      await sourceDirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename - with binary permission", async () => {
    const destDirName = getUniqueName("destdir", { recorder });

    const sourceDirName = getUniqueName("sourcedir", { recorder });
    const sourceDirClient = shareClient.getDirectoryClient(sourceDirName);
    await sourceDirClient.create();

    const result = await sourceDirClient.rename(destDirName, {
      filePermissionFormat: "Binary",
      filePermission: filePermissionInBinaryFormat,
    });

    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
      "Destination name should be expected",
    );

    const properties = await result.destinationDirectoryClient.getProperties();
    assert.isDefined(
      properties.filePermissionKey,
      "File permission should have been set to destination",
    );

    try {
      await sourceDirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename - SMB properties", async () => {
    const destDirName = getUniqueName("destdir", { recorder });
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

    const sourceDirName = getUniqueName("sourcedir", { recorder });
    const sourceDirClient = shareClient.getDirectoryClient(sourceDirName);
    await sourceDirClient.create();

    const result = await sourceDirClient.rename(destDirName, {
      filePermissionKey: permissionResponse.filePermissionKey,
      copyFileSmbInfo: copyFileSMBInfo,
    });

    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
      "Destination name should be expected",
    );

    const properties = await result.destinationDirectoryClient.getProperties();
    assert.isDefined(
      properties.filePermissionKey,
      "File permission should have been set to destination",
    );
    assert.strictEqual(
      truncatedISO8061Date(properties.fileCreatedOn!),
      truncatedISO8061Date(creationDate),
      "Creation time should be expected",
    );
    assert.strictEqual(
      truncatedISO8061Date(properties.fileLastWriteOn!),
      truncatedISO8061Date(lastwriteTime),
      "Last write time should be expected",
    );
    assert.strictEqual(
      truncatedISO8061Date(properties.fileChangeOn!),
      truncatedISO8061Date(changedTime),
      "Changed time should be expected",
    );
    const fileSystemAttributes = FileSystemAttributes.parse(properties.fileAttributes!);
    assert.isTrue(
      fileSystemAttributes.readonly && fileSystemAttributes.directory,
      "File attributes should be expected",
    );

    try {
      await sourceDirClient.getProperties();
      assert.fail("Source directory should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });
});

describe("ShareDirectoryClient - Verify Name Properties", () => {
  const accountName = "myaccount";
  const shareName = "shareName";
  const dirPath = "dir1/dir2";
  const baseName = "baseName";

  function verifyNameProperties(url: string): void {
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

describe.runIf(getAccountKey())("DirectoryClient - OAuth", () => {
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

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const keyServiceClient = await createShareServiceClient("SharedKeyCredential", { recorder });
    assert.isDefined(keyServiceClient);
    shareName = getUniqueName("share", { recorder });
    shareClientWithKeyCredential = keyServiceClient.getShareClient(shareName);
    await shareClientWithKeyCredential.create();

    const tokenServiceClient = await createShareServiceClient("TokenCredential", {
      recorder,
      clientOptions: { fileRequestIntent: "backup" },
    });
    shareClient = tokenServiceClient.getShareClient(shareName);

    dirName = getUniqueName("dir", { recorder });
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();
    assert.equal(defaultDirCreateResp.errorCode, undefined);
    assert.equal(defaultDirCreateResp.fileAttributes!, "Directory");
    assert.isDefined(defaultDirCreateResp.fileChangeOn!);
    assert.isDefined(defaultDirCreateResp.fileCreatedOn!);
    assert.isDefined(defaultDirCreateResp.fileId!);
    assert.isDefined(defaultDirCreateResp.fileLastWriteOn!);
    assert.isDefined(defaultDirCreateResp.fileParentId!);
    assert.isDefined(defaultDirCreateResp.filePermissionKey!);
  });

  afterEach(async () => {
    await shareClientWithKeyCredential.delete();
    await recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await dirClient.setMetadata(metadata);

    const result = await dirClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("getProperties", async () => {
    const result = await dirClient.getProperties();
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("create", () => {
    // create() with default parameters has been tested in beforeEach
  });

  it("createIfNotExists", async () => {
    const res = await dirClient.createIfNotExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ResourceAlreadyExists");

    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
    const res2 = await dirClient2.createIfNotExists();
    assert.isTrue(res2.succeeded);

    await dirClient2.delete();
  });

  it("deleteIfExists", async () => {
    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
    const res = await dirClient2.deleteIfExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await dirClient2.create();
    const res2 = await dirClient2.deleteIfExists();
    assert.isTrue(res2.succeeded);
  });

  it("exists", async () => {
    assert.isTrue(await dirClient.exists());
    const dirClient2 = shareClient.getDirectoryClient(getUniqueName(dirName, { recorder }));
    assert.isFalse(await dirClient2.exists());
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
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
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
    assert.isDefined(respFileAttributes.readonly);
    assert.isDefined(respFileAttributes.hidden);
    assert.isDefined(respFileAttributes.system);
    assert.isDefined(respFileAttributes.directory);
    assert.isDefined(respFileAttributes.archive);
    assert.isDefined(respFileAttributes.offline);
    assert.isDefined(respFileAttributes.notContentIndexed);
    assert.isDefined(respFileAttributes.noScrubData);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.isDefined(result.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
  });

  it("delete", () => {
    // delete() with default parameters has been tested in afterEach
  });

  it("listFilesAndDirectories", async () => {
    const subDirClients = [];

    for (let i = 0; i < 3; i++) {
      const subDirClient = dirClient.getDirectoryClient(getUniqueName(`dir${i}`, { recorder }));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = dirClient.getFileClient(getUniqueName(`file${i}`, { recorder }));
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (await dirClient.listFilesAndDirectories().byPage().next()).value;

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(shareClient.url.indexOf(result.shareName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirClients.length);
    assert.deepStrictEqual(result.segment.fileItems.length, subFileClients.length);

    let i = 0;
    for (const entry of result.segment.directoryItems) {
      assert.isAbove(subDirClients[i++].url.indexOf(entry.name), 0);
    }

    i = 0;
    for (const entry of result.segment.fileItems) {
      assert.isAbove(subFileClients[i++].url.indexOf(entry.name), 0);
    }

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("createSubDirectory and deleteSubDirectory", async () => {
    const directoryName = getUniqueName("directory", { recorder });
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
    const directoryName = getUniqueName("directory", { recorder });
    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName);
    const fileName = getUniqueName("file", { recorder });
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
    const destDirName = getUniqueName("destdir", { recorder });
    const result = await dirClient.rename(destDirName);
    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationDirectoryClient.getProperties();
    assert.equal(await dirClient.exists(), false);

    const firstDestClient = result.destinationDirectoryClient;
    const anotherDestDirName = getUniqueName("destdir1", { recorder });
    const anotherResult = await firstDestClient.rename(anotherDestDirName);

    // Validate destination existence.
    await anotherResult.destinationDirectoryClient.getProperties();
    assert.equal(await firstDestClient.exists(), false);
  });
});

describe.runIf(getAccountKey())("DirectoryClient - AllowingTrailingDots - True", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let defaultDirCreateResp: DirectoryCreateResponse;
  let dirClient: ShareDirectoryClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("SharedKeyCredential", {
      recorder,
      clientOptions: {
        allowTrailingDot: true,
        allowSourceTrailingDot: true,
      },
    });
    assert.isDefined(serviceClient);
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir", { recorder }) + ".";
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("create and delete", async () => {
    const dirName1 = getUniqueName("dir1", { recorder });
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

    assert.isTrue(foundDir, "The directory with trailing dot is created.");
    await dirClient1.delete();

    assert.equal(await dirClient1.exists(), false);
  });

  it("createIfNotExists - Exists", async () => {
    const response = await dirClient.createIfNotExists();
    assert.isFalse(response.succeeded, "Directory should already exists");
  });

  it("createIfNotExists - New", async () => {
    const dirName1 = getUniqueName("dir1", { recorder }) + "...";
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

    assert.isTrue(foundDir, "The directory with trailing dot is created.");
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
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
  });

  it("createSubDirectory and deleteSubDirectory", async () => {
    const subDirName = getUniqueName("subdir", { recorder }) + ".";

    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(subDirName);
    await subDirClient.getProperties();

    await dirClient.deleteSubdirectory(subDirName);
    assert.equal(await subDirClient.exists(), false);
  });

  it("createFile and delete file", async () => {
    const fileName = getUniqueName("file", { recorder }) + ".";

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
    assert.isTrue(await dirClient.exists(), "The directory with trailing dot should exists");
  });

  it("deleteIfExists", async () => {
    const dirName1 = getUniqueName("dir1", { recorder });
    const dirNameWithDots = dirName1 + "...";
    const dirClient1 = shareClient.getDirectoryClient(dirNameWithDots);

    await dirClient1.create();
    let deleteResponse = await dirClient1.deleteIfExists();
    assert.isTrue(deleteResponse.succeeded, "Deletion should succeeded.");
    deleteResponse = await dirClient1.deleteIfExists();
    assert.isFalse(deleteResponse.succeeded, "Directory should not exist anymore.");
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
    const fileName = getUniqueName("file", { recorder }) + "...";
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === fileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "Should found the file.");
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
    const destDirName = getUniqueName("destdir", { recorder }) + "....";
    const result = await dirClient.rename(destDirName);
    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
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

    assert.isTrue(foundDir, "The directory with trailing dot exists.");

    const firstDestClient = result.destinationDirectoryClient;
    const anotherDestDirName = getUniqueName("destdir1", { recorder }) + "....";
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

    assert.isTrue(foundDir, "The directory with trailing dot exists.");
  });
});

describe.runIf(getAccountKey())("DirectoryClient - AllowingTrailingDots - False", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let recorder: Recorder;
  let defaultDirCreateResp: DirectoryCreateResponse;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("SharedKeyCredential", {
      recorder,
      clientOptions: {
        allowTrailingDot: false,
        allowSourceTrailingDot: false,
      },
    });
    assert.isDefined(serviceClient);
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir", { recorder }) + ".";
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("create and delete", async () => {
    const dirName1 = getUniqueName("dir1", { recorder });
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

    assert.isTrue(foundDir, "The directory with trailing dot trimmed is created.");
    await dirClient1.delete();

    assert.equal(await dirClient1.exists(), false);
  });

  it("createIfNotExists - Exists", async () => {
    const response = await dirClient.createIfNotExists();
    assert.isFalse(response.succeeded, "Directory should already exists");
  });

  it("createIfNotExists - New", async () => {
    const dirName1 = getUniqueName("dir1", { recorder });
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

    assert.isTrue(foundDir, "The directory with trailing dot trimmed is created.");
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
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
  });

  it("createSubDirectory and deleteSubDirectory", async () => {
    const subDirName = getUniqueName("subdir", { recorder });
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

    assert.isTrue(foundDir, "The directory with trailing dot trimmed should have been created.");
    await subDirClient.getProperties();

    await dirClient.deleteSubdirectory(subDirNameWithDots);
    assert.equal(await subDirClient.exists(), false);
  });

  it("createFile and deleteFile", async () => {
    const fileName = getUniqueName("file", { recorder });
    const fileNameWithDots = fileName + ".";

    const { fileClient: fileClient } = await dirClient.createFile(fileNameWithDots, 1024);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === fileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "The file with trailing dots trimmed should have been created.");

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
    assert.isTrue(await dirClient.exists(), "The directory with trailing dot should exists");
  });

  it("deleteIfExists", async () => {
    const dirName1 = getUniqueName("dir1", { recorder });
    const dirNameWithDots = dirName1 + "...";
    const dirClient1 = shareClient.getDirectoryClient(dirName1);
    await dirClient1.create();

    const dirClientWithTrailingDots = shareClient.getDirectoryClient(dirNameWithDots);
    let deleteResponse = await dirClientWithTrailingDots.deleteIfExists();
    assert.isTrue(deleteResponse.succeeded, "Deletion should succeeded.");
    deleteResponse = await dirClient1.deleteIfExists();
    assert.isFalse(deleteResponse.succeeded, "Directory should not exist anymore.");
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
    const fileName = getUniqueName("file", { recorder });
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

    assert.isTrue(foundFile, "Should found the file.");
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
    const destDirBaseName = getUniqueName("destdir", { recorder });
    const destDirName = destDirBaseName + "....";
    const result = await dirClient.rename(destDirName);
    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destDirName,
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

    assert.isTrue(foundDir, "The directory with trailing dots trimmed should exist.");

    const firstDestClient = result.destinationDirectoryClient;
    const anotherDestDirBaseName = getUniqueName("destdir1", { recorder });
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

    assert.isTrue(foundDir, "The directory with trailing dot exists.");
  });
});

describe.runIf(getAccountKey())("DirectoryClient - AllowingTrailingDots - Default", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("SharedKeyCredential", { recorder });
    assert.isDefined(serviceClient);
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir", { recorder }) + ".";
    dirClient = shareClient.getDirectoryClient(dirName);

    await dirClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("create and delete", async () => {
    const dirName1 = getUniqueName("dir1", { recorder });
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

    assert.isTrue(foundDir, "The directory with trailing dot is created.");
    await dirClient1.delete();

    assert.equal(await dirClient1.exists(), false);
  });
});

describe.runIf(getPremiumFileAccountKey())("DirectoryClient - NFS", () => {
  let recorder: Recorder;
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("SharedKeyCredential", {
      recorder,
      account: "premiumFile",
    });
    assert.isDefined(serviceClient);
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create({
      protocols: {
        nfsEnabled: true,
      },
    });

    dirName = getUniqueName("dir", { recorder });
    dirClient = shareClient.getDirectoryClient(dirName);
  });

  afterEach(async () => {
    if (shareClient) {
      await shareClient.delete({ deleteSnapshots: "include" });
    }
    await recorder.stop();
  });

  it("create with nfs properties", async () => {
    const posixProperties: FilePosixProperties = {
      owner: "123",
      group: "654",
      fileMode: {
        owner: {
          read: true,
          write: true,
          execute: true,
        },
        group: {
          read: true,
          write: false,
          execute: true,
        },
        other: {
          read: true,
          write: false,
          execute: true,
        },
        effectiveUserIdentity: false,
        effectiveGroupIdentity: false,
        stickyBit: false,
      },
    };
    const cResp = await dirClient.create({
      posixProperties: posixProperties,
    });

    assert.equal(cResp.errorCode, undefined);
    assert.deepEqual(cResp.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(cResp.posixProperties?.group, posixProperties.group);
    assert.deepEqual(cResp.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(cResp.posixProperties?.fileType, "Directory");
    assert.isDefined(cResp.fileChangeOn!);
    assert.isDefined(cResp.fileCreatedOn!);
    assert.isDefined(cResp.fileId!);
    assert.isDefined(cResp.fileLastWriteOn!);
    assert.isDefined(cResp.fileParentId!);
  });

  it("set&get nfs properties", async () => {
    const posixProperties: FilePosixProperties = {
      owner: "123",
      group: "654",
      fileMode: {
        owner: {
          read: true,
          write: true,
          execute: true,
        },
        group: {
          read: true,
          write: false,
          execute: true,
        },
        other: {
          read: true,
          write: false,
          execute: true,
        },
        effectiveUserIdentity: false,
        effectiveGroupIdentity: false,
        stickyBit: false,
      },
    };
    const cResp = await dirClient.create();
    assert.deepEqual(cResp.posixProperties?.owner, "0");
    assert.deepEqual(cResp.posixProperties?.group, "0");
    assert.isDefined(cResp.posixProperties?.fileMode);
    assert.isDefined(cResp.posixProperties?.fileType);

    const setResp = await dirClient.setProperties({ posixProperties });
    assert.deepEqual(setResp.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(setResp.posixProperties?.group, posixProperties.group);
    assert.deepEqual(setResp.posixProperties?.fileMode, posixProperties.fileMode);

    const getResp = await dirClient.getProperties();
    assert.deepEqual(getResp.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(getResp.posixProperties?.group, posixProperties.group);
    assert.deepEqual(getResp.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(getResp.posixProperties?.fileType, "Directory");
    assert.isDefined(getResp.fileChangeOn!);
    assert.isDefined(getResp.fileCreatedOn!);
    assert.isDefined(getResp.fileId!);
    assert.isDefined(getResp.fileLastWriteOn!);
    assert.isDefined(getResp.fileParentId!);
  });
});
