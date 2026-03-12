// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isNodeLike, isBrowser } from "@azure/core-util";
import { delay, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type {
  FilePosixProperties,
  FileStartCopyOptions,
  NfsFileMode,
  ShareClient,
  ShareDirectoryClient,
  ShareServiceClient,
} from "../src/index.js";
import { ShareFileClient } from "../src/index.js";
import { FileSystemAttributes } from "../src/FileSystemAttributes.js";
import type { DirectoryCreateResponse } from "../src/generatedModels.js";
import { FILE_MAX_SIZE_BYTES } from "../src/utils/constants.js";
import {
  parseOctalFileMode,
  parseSymbolicFileMode,
  toOctalFileMode,
  toSymbolicFileMode,
} from "../src/index.js";
import { truncatedISO8061Date } from "../src/utils/utils.common.js";
import {
  bodyToString,
  compareBodyWithUint8Array,
  getBSU,
  getGenericBSU,
  getTokenBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils/index.js";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import type { OperationOptions } from "@azure/core-client";

expect.extend({ toSupportTracing });

describe("FileClient", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let defaultDirCreateResp: DirectoryCreateResponse;
  let fileName: string;
  let fileClient: ShareFileClient;
  const content = "Hello World";
  const filePermissionInSDDL =
    "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513" +
    "D:(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";
  const filePermissionInBinaryFormat =
    "AQAUhGwAAACIAAAAAAAAABQAAAACAFgAAwAAAAAAFAD/AR8AAQEAAAAAAAUSAAAAAAAYAP8BHwABAgAAAAAABSAAAAAgAgAAAAAkAKkAEgABBQAAAAAABRUAAABZUbgXZnJdJWRjOwuMmS4AAQUAAAAAAAUVAAAAoGXPfnhLm1/nfIdwr/1IAQEFAAAAAAAFFQAAAKBlz354S5tf53yHcAECAAA=";
  let recorder: Recorder;

  const fullFileAttributes = new FileSystemAttributes();
  fullFileAttributes.readonly = true;
  fullFileAttributes.hidden = true;
  fullFileAttributes.system = true;
  fullFileAttributes.archive = true;
  fullFileAttributes.temporary = true;
  fullFileAttributes.offline = true;
  fullFileAttributes.notContentIndexed = true;
  fullFileAttributes.noScrubData = true;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
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

    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = dirClient.getFileClient(fileName);
  });

  afterEach(async () => {
    if (shareClient) {
      await shareClient.delete({ deleteSnapshots: "include" });
    }
    await recorder.stop();
  });

  it("create with default parameters", async () => {
    const cResp = await fileClient.create(content.length);
    assert.equal(cResp.errorCode, undefined);
    assert.equal(cResp.fileAttributes!, "Archive");
    assert.isDefined(cResp.fileChangeOn!);
    assert.isDefined(cResp.fileCreatedOn!);
    assert.isDefined(cResp.fileId!);
    assert.isDefined(cResp.fileLastWriteOn!);
    assert.isDefined(cResp.fileParentId!);
    assert.isDefined(cResp.filePermissionKey!);

    const result = await fileClient.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, content.length),
      "\u0000".repeat(content.length),
    );
  });

  it("create with all parameters configured setting filePermissionKey", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));

    const options = {
      fileHttpHeaders: {
        fileCacheControl: "fileCacheControl",
        fileContentDisposition: "fileContentDisposition",
        fileContentEncoding: "fileContentEncoding",
        fileContentLanguage: "fileContentLanguage",
        fileContentType: "fileContentType",
      },
      metadata: {
        key1: "vala",
        key2: "valb",
      },
      creationTime: now,
      lastWriteTime: now,
      changeTime: now,
      filePermissionKey: defaultDirCreateResp.filePermissionKey,
      fileAttributes: fullFileAttributes,
    };
    await fileClient.create(512, options);

    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
    const respFileAttributesFromDownload = FileSystemAttributes.parse(result.fileAttributes!);
    assert.isDefined(respFileAttributesFromDownload.readonly);
    assert.isDefined(respFileAttributesFromDownload.hidden);
    assert.isDefined(respFileAttributesFromDownload.system);
    assert.isDefined(respFileAttributesFromDownload.archive);
    assert.isDefined(respFileAttributesFromDownload.offline);
    assert.isDefined(respFileAttributesFromDownload.notContentIndexed);
    assert.isDefined(respFileAttributesFromDownload.noScrubData);
    assert.isDefined(respFileAttributesFromDownload.temporary);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);

    const properties = await fileClient.getProperties();
    assert.equal(properties.cacheControl, options.fileHttpHeaders.fileCacheControl);
    assert.equal(properties.contentDisposition, options.fileHttpHeaders.fileContentDisposition);
    assert.equal(properties.contentEncoding, options.fileHttpHeaders.fileContentEncoding);
    assert.equal(properties.contentLanguage, options.fileHttpHeaders.fileContentLanguage);
    assert.equal(properties.contentType, options.fileHttpHeaders.fileContentType);
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
    assert.equal(properties.errorCode, undefined);
    const respFileAttributes = FileSystemAttributes.parse(properties.fileAttributes!);
    assert.isDefined(respFileAttributes.readonly);
    assert.isDefined(respFileAttributes.hidden);
    assert.isDefined(respFileAttributes.system);
    assert.isDefined(respFileAttributes.archive);
    assert.isDefined(respFileAttributes.offline);
    assert.isDefined(respFileAttributes.notContentIndexed);
    assert.isDefined(respFileAttributes.noScrubData);
    assert.isDefined(respFileAttributes.temporary);
    assert.equal(truncatedISO8061Date(properties.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(properties.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.equal(properties.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.isDefined(properties.fileChangeOn!);
    assert.isDefined(properties.fileId!);
    assert.isDefined(properties.fileParentId!);
  });

  it("create with sddl permission format", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!,
      {
        filePermissionFormat: "Sddl",
      },
    );

    await fileClient.create(512, {
      filePermissionFormat: "Sddl",
      filePermission: getPermissionResp.permission,
      fileAttributes: fullFileAttributes,
    });

    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
    assert.isDefined(result.filePermissionKey!);

    const properties = await fileClient.getProperties();
    assert.equal(properties.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
  });

  it("create with binary permission format", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!,
      {
        filePermissionFormat: "Binary",
      },
    );

    await fileClient.create(512, {
      filePermissionFormat: "Binary",
      filePermission: getPermissionResp.permission,
      fileAttributes: fullFileAttributes,
    });

    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
    assert.isDefined(result.filePermissionKey!);

    const properties = await fileClient.getProperties();
    assert.equal(properties.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
  });

  it("create largest file", async () => {
    const fileSize = FILE_MAX_SIZE_BYTES;
    const cResp = await fileClient.create(fileSize);
    assert.equal(cResp.errorCode, undefined);

    await fileClient.resize(fileSize);
    const updatedProperties = await fileClient.getProperties();
    assert.deepStrictEqual(updatedProperties.contentLength, fileSize);

    await fileClient.uploadRange(content, fileSize - content.length, content.length);
  });

  it("create file - name with directory dots", async () => {
    const fileBaseName = recorder.variable("filename", getUniqueName("filename"));
    const fileNameWithDots = "./a/../" + fileBaseName;
    const fileClientWithDirDots = dirClient.getFileClient(fileNameWithDots);
    await fileClientWithDirDots.create(content.length);

    let foundFile = false;
    for await (const fileItem of dirClient.listFilesAndDirectories({ prefix: fileBaseName })) {
      if (fileItem.name === fileBaseName && fileItem.kind === "file") {
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "The file should have been created.");

    await fileClientWithDirDots.delete();

    const fileShouldInRootDir = "./a/../../" + fileBaseName;
    const fileClientShouldInRootDir = shareClient
      .getDirectoryClient("anydir")
      .getFileClient(fileShouldInRootDir);
    await fileClientShouldInRootDir.create(content.length);

    foundFile = false;
    for await (const fileItem of shareClient
      .getDirectoryClient("")
      .listFilesAndDirectories({ prefix: fileBaseName })) {
      if (fileItem.name === fileBaseName && fileItem.kind === "file") {
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "The file should have been created.");

    await fileClientShouldInRootDir.delete();
  });

  it("create directory - name with directory dots", async () => {
    const dirBaseName = recorder.variable("dirname1", getUniqueName("dirname1"));
    const dirNameWithDots = "./a/../" + dirBaseName;
    const dirClientWithDirDots = dirClient.getDirectoryClient(dirNameWithDots);
    await dirClientWithDirDots.create();

    let foundDir = false;
    for await (const fileItem of dirClient.listFilesAndDirectories({ prefix: dirBaseName })) {
      if (fileItem.name === dirBaseName && fileItem.kind === "directory") {
        foundDir = true;
      }
    }

    assert.isTrue(foundDir, "The directory should have been created.");

    await dirClientWithDirDots.delete();

    const dirShouldInRootDir = "./a/../../" + dirBaseName;
    const dirClientShouldInRootDir = shareClient
      .getDirectoryClient("anydir")
      .getDirectoryClient(dirShouldInRootDir);
    await dirClientShouldInRootDir.create();

    foundDir = false;
    for await (const fileItem of shareClient
      .getDirectoryClient("")
      .listFilesAndDirectories({ prefix: dirBaseName })) {
      if (fileItem.name === dirBaseName && fileItem.kind === "directory") {
        foundDir = true;
      }
    }

    assert.isTrue(foundDir, "The file should have been created.");

    await dirClientShouldInRootDir.delete();
  });

  it("setProperties with default parameters", async () => {
    await fileClient.create(content.length);
    await fileClient.setProperties();

    const result = await fileClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, "Archive");
    assert.isDefined(result.fileCreatedOn!);
    assert.isDefined(result.fileLastWriteOn!);
    assert.isDefined(result.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isUndefined(result.cacheControl);
    assert.isUndefined(result.contentType);
    assert.isUndefined(result.contentMD5);
    assert.isUndefined(result.contentEncoding);
    assert.isUndefined(result.contentLanguage);
    assert.isUndefined(result.contentDisposition);
  });

  it("setProperties with all parameters configured setting filePermission", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!,
    );

    const now = new Date(recorder.variable("now", new Date().toISOString()));

    const options = {
      fileHttpHeaders: {
        fileCacheControl: "fileCacheControl",
        fileContentDisposition: "fileContentDisposition",
        fileContentEncoding: "fileContentEncoding",
        fileContentLanguage: "fileContentLanguage",
        fileContentType: "fileContentType",
      },
      metadata: {
        key1: "vala",
        key2: "valb",
      },
      creationTime: now,
      lastWriteTime: now,
      changeTime: now,
      filePermission: getPermissionResp.permission,
      fileAttributes: fullFileAttributes,
    };

    await fileClient.create(content.length);
    await fileClient.setProperties(options);

    const result = await fileClient.getProperties();
    assert.equal(result.errorCode, undefined);
    const respFileAttributes = FileSystemAttributes.parse(result.fileAttributes!);
    assert.isDefined(respFileAttributes.readonly);
    assert.isDefined(respFileAttributes.hidden);
    assert.isDefined(respFileAttributes.system);
    assert.isDefined(respFileAttributes.archive);
    assert.isDefined(respFileAttributes.offline);
    assert.isDefined(respFileAttributes.notContentIndexed);
    assert.isDefined(respFileAttributes.noScrubData);
    assert.isDefined(respFileAttributes.temporary);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.isDefined(result.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
  });

  it("setMetadata with new metadata set", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata);
    const result = await fileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata);
    const result = await fileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);

    await fileClient.setMetadata();
    const result2 = await fileClient.getProperties();
    assert.deepStrictEqual(result2.metadata, {});
  });

  it("setHTTPHeaders with default parameters", async () => {
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders({});
    const result = await fileClient.getProperties();

    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isUndefined(result.cacheControl);
    assert.isUndefined(result.contentType);
    assert.isUndefined(result.contentMD5);
    assert.isUndefined(result.contentEncoding);
    assert.isUndefined(result.contentLanguage);
    assert.isUndefined(result.contentDisposition);
  });

  it("setHTTPHeaders with all parameters set", async () => {
    await fileClient.create(content.length);
    const headers = {
      fileCacheControl: "fileCacheControl",
      fileContentDisposition: "fileContentDisposition",
      fileContentEncoding: "fileContentEncoding",
      fileContentLanguage: "fileContentLanguage",
      fileContentMD5: isNodeLike ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      fileContentType: "fileContentType",
    };
    await fileClient.setHttpHeaders(headers);
    const result = await fileClient.getProperties();
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.deepStrictEqual(result.cacheControl, headers.fileCacheControl);
    assert.deepStrictEqual(result.contentType, headers.fileContentType);
    assert.deepStrictEqual(result.contentMD5, headers.fileContentMD5);
    assert.deepStrictEqual(result.contentEncoding, headers.fileContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, headers.fileContentLanguage);
    assert.deepStrictEqual(result.contentDisposition, headers.fileContentDisposition);
  });

  it("setHTTPHeaders with permissions", async () => {
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders(
      {},
      {
        filePermission: filePermission,
      },
    );
    const result = await fileClient.getProperties();
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isDefined(result.filePermissionKey);
  });

  it("setHTTPHeaders with sddl permissions", async () => {
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders(
      {},
      {
        filePermissionFormat: "Sddl",
        filePermission: filePermission,
      },
    );
    const result = await fileClient.getProperties();
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isDefined(result.filePermissionKey);
  });

  it("setHTTPHeaders with binary permissions", async () => {
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders(
      {},
      {
        filePermissionFormat: "Binary",
        filePermission: filePermissionInBinaryFormat,
      },
    );
    const result = await fileClient.getProperties();
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isDefined(result.filePermissionKey);
  });

  it("startCopy - with sddl file permission", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url, {
      filePermissionFormat: "Sddl",
      filePermission: filePermissionInSDDL,
      copyFileSmbInfo: {
        filePermissionCopyMode: "override",
      },
    });
    assert.isDefined(result.copyId);

    const properties = await newFileClient.getProperties();
    assert.isDefined(properties.lastModified);
    assert.isDefined(properties.filePermissionKey);
  });

  it("startCopy - with binary file permission", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url, {
      filePermissionFormat: "Binary",
      filePermission: filePermissionInBinaryFormat,
      copyFileSmbInfo: {
        filePermissionCopyMode: "override",
      },
    });
    assert.isDefined(result.copyId);

    const properties = await newFileClient.getProperties();
    assert.isDefined(properties.lastModified);
    assert.isDefined(properties.filePermissionKey);
  });

  it("delete", async () => {
    await fileClient.create(content.length);
    await fileClient.delete();
  });

  it("deleteIfExists", async () => {
    const res = await fileClient.deleteIfExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await fileClient.create(content.length);
    const res2 = await fileClient.deleteIfExists();
    assert.isTrue(res2.succeeded);
  });

  it("deleteIfExists when parent not exists", async () => {
    const newDirectoryClient = shareClient.getDirectoryClient(
      recorder.variable("newdir", getUniqueName("newdir")),
    );
    const newFileClient = newDirectoryClient.getFileClient(fileName);
    const res = await newFileClient.deleteIfExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ParentNotFound");
  });

  it("exists", async () => {
    assert.isFalse(await fileClient.exists());
    await fileClient.create(content.length);
    assert.isTrue(await fileClient.exists());
  });

  it("startCopyFromURL", async (ctx) => {
    if (!isNodeLike && !isLiveMode()) {
      ctx.skip();
    }
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.isDefined(result.copyId);

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    // we don't record this header so we can't find it during playback
    if (isLiveMode()) {
      // A service feature is being rolling out which will sanitize the sig field
      // so we remove it before comparing urls.
      assert.isDefined(properties2.copySource, "Expecting valid 'properties2.copySource");

      const sanitizedActualUrl = new URL(properties2.copySource!);
      sanitizedActualUrl.searchParams.delete("sig");

      const sanitizedExpectedUrl = new URL(fileClient.url);
      sanitizedExpectedUrl.searchParams.delete("sig");

      assert.strictEqual(
        sanitizedActualUrl.toString(),
        sanitizedExpectedUrl.toString(),
        "copySource does not match original source",
      );
    }
  });

  it("startCopyFromURL ignore readonly", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    await newFileClient.create(2048, {
      fileAttributes: FileSystemAttributes.parse("ReadOnly"),
    });

    const options: FileStartCopyOptions = {
      filePermission: filePermissionInSDDL,
      copyFileSmbInfo: {
        filePermissionCopyMode: "override",
        ignoreReadOnly: true,
        fileLastWriteTime: "source",
        setArchiveAttribute: false,
      },
    };

    const result = await newFileClient.startCopyFromURL(fileClient.url, options);
    assert.isDefined(result.copyId);
    const sourceProperties = await fileClient.getProperties();
    const targetProperties = await newFileClient.getProperties();

    assert.equal(targetProperties.contentLength, 1024);
    assert.deepStrictEqual(targetProperties.fileLastWriteOn, sourceProperties.fileLastWriteOn);
  });

  it("startCopyFromURL with smb options", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );

    const fileAttributesInstance = new FileSystemAttributes();
    fileAttributesInstance.hidden = true;
    fileAttributesInstance.system = true;
    const fileAttributes = fileAttributesInstance.toString();

    const fileCreationDate = new Date("05 October 2011 14:48 UTC");
    const fileCreationTime = truncatedISO8061Date(fileCreationDate);
    const fileChangeDate = new Date("05 October 2011 14:48 UTC");
    const fileChangeTime = truncatedISO8061Date(fileChangeDate);
    const options: FileStartCopyOptions = {
      filePermission: filePermissionInSDDL,
      copyFileSmbInfo: {
        filePermissionCopyMode: "override",
        ignoreReadOnly: false,
        fileAttributes,
        fileCreationTime,
        fileLastWriteTime: "source",
        fileChangeTime,
        setArchiveAttribute: false,
      },
    };

    const result = await newFileClient.startCopyFromURL(fileClient.url, options);
    assert.isDefined(result.copyId);
    const sourceProperties = await fileClient.getProperties();
    const targetProperties = await newFileClient.getProperties();

    assert.deepStrictEqual(
      FileSystemAttributes.parse(targetProperties.fileAttributes!),
      fileAttributesInstance,
    );
    assert.deepStrictEqual(targetProperties.fileLastWriteOn, sourceProperties.fileLastWriteOn);
    assert.deepStrictEqual(targetProperties.fileCreatedOn, fileCreationDate);
    assert.deepStrictEqual(targetProperties.fileChangeOn, fileChangeDate);
  });

  it("startCopyFromURL with smb options: filePermissionKey", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );

    const createPermResp = await shareClient.createPermission(filePermissionInSDDL);
    const fileAttributesInstance = new FileSystemAttributes();
    fileAttributesInstance.hidden = true;
    fileAttributesInstance.system = true;
    const fileAttributes = fileAttributesInstance.toString();

    const fileCreationDate = new Date("05 October 2011 14:48 UTC");
    const fileCreationTime = truncatedISO8061Date(fileCreationDate);
    const options: FileStartCopyOptions = {
      filePermissionKey: createPermResp.filePermissionKey,
      copyFileSmbInfo: {
        filePermissionCopyMode: "override",
        ignoreReadOnly: false,
        fileAttributes,
        fileCreationTime,
        fileLastWriteTime: "source",
        setArchiveAttribute: true,
      },
    };

    const result = await newFileClient.startCopyFromURL(fileClient.url, options);
    assert.isDefined(result.copyId);
    const sourceProperties = await fileClient.getProperties();
    const targetProperties = await newFileClient.getProperties();

    fileAttributesInstance.archive = true;
    assert.deepStrictEqual(
      FileSystemAttributes.parse(targetProperties.fileAttributes!),
      fileAttributesInstance,
    );
    assert.deepStrictEqual(targetProperties.fileLastWriteOn, sourceProperties.fileLastWriteOn);
    assert.deepStrictEqual(targetProperties.fileCreatedOn, fileCreationDate);
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    await fileClient.create(content.length);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.isDefined(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation.",
      );
    } catch (err: any) {
      // Expected - test passes if exception is thrown
    }
  });

  it("resize", async () => {
    await fileClient.create(content.length);
    const properties = await fileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, content.length);

    await fileClient.resize(1);
    const updatedProperties = await fileClient.getProperties();
    assert.deepStrictEqual(updatedProperties.contentLength, 1);
  });

  it("resize with all parameters", async () => {
    await fileClient.create(content.length);
    const properties = await fileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, content.length);

    const creationDate = new Date("05 October 2019 14:48 UTC");
    const lastwriteTime = new Date("15 October 2019 14:48 UTC");
    const changedTime = new Date("25 October 2019 14:48 UTC");

    const options = {
      creationTime: creationDate,
      lastWriteTime: lastwriteTime,
      changeTime: changedTime,
      fileAttributes: fullFileAttributes,
    };

    await fileClient.resize(1, options);
    const updatedProperties = await fileClient.getProperties();
    assert.deepStrictEqual(updatedProperties.contentLength, 1);
    const respFileAttributes = FileSystemAttributes.parse(updatedProperties.fileAttributes!);
    assert.isDefined(respFileAttributes.readonly);
    assert.isDefined(respFileAttributes.hidden);
    assert.isDefined(respFileAttributes.system);
    assert.isDefined(respFileAttributes.archive);
    assert.isDefined(respFileAttributes.offline);
    assert.isDefined(respFileAttributes.notContentIndexed);
    assert.isDefined(respFileAttributes.noScrubData);
    assert.isDefined(respFileAttributes.temporary);
    assert.equal(
      truncatedISO8061Date(updatedProperties.fileCreatedOn!),
      truncatedISO8061Date(creationDate),
    );
    assert.equal(
      truncatedISO8061Date(updatedProperties.fileLastWriteOn!),
      truncatedISO8061Date(lastwriteTime),
    );
    assert.equal(
      truncatedISO8061Date(updatedProperties.fileChangeOn!),
      truncatedISO8061Date(changedTime),
    );
  });

  it("uploadData", async () => {
    await fileClient.create(10);
    await fileClient.uploadData(isNodeLike ? Buffer.from(content) : new Blob([content]));
    const response = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(response), content);
  });

  it("uploadData should work with ArrayBuffer and ArrayBufferView", async () => {
    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    await fileClient.uploadData(arrayBuf);
    const res = await fileClient.download();
    assert.isTrue(await compareBodyWithUint8Array(res, uint8Array));

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    await fileClient.uploadData(uint8ArrayPartial);
    const res1 = await fileClient.download();
    assert.isTrue(await compareBodyWithUint8Array(res1, uint8ArrayPartial));

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    await fileClient.uploadData(uint16Array);
    const res2 = await fileClient.download();
    assert.isTrue(
      await compareBodyWithUint8Array(
        res2,
        new Uint8Array(arrayBuf, uint16Array.byteOffset, uint16Array.byteLength),
      ),
    );
  });

  it("uploadRange", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("uploadRange with content MD5", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5, {
      contentMD5: new Uint8Array([
        0x8b, 0x1a, 0x99, 0x53, 0xc4, 0x61, 0x12, 0x96, 0xa8, 0x27, 0xab, 0xf8, 0xc4, 0x78, 0x04,
        0xd7,
      ]),
    });
    await fileClient.uploadRange("World", 5, 5);
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("uploadRange with progress event", async (ctx) => {
    if (!isNodeLike && !isLiveMode()) {
      ctx.skip();
    }
    await fileClient.create(10);
    let progressUpdated = false;
    // fetch http client doesn't fire progress for string bodies, only blob and streams
    const body = isNodeLike ? "HelloWorld" : new Blob(["HelloWorld"]);
    await fileClient.uploadRange(body, 0, 10, {
      onProgress: () => {
        progressUpdated = true;
      },
    });
    assert.equal(progressUpdated, true);

    const response = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(response), "HelloWorld");
  });

  it("uploadRange with lastWriteTime", async () => {
    const createResult = await fileClient.create(10);

    const uploadRangeResult = await fileClient.uploadRange("Hello", 0, 5, {
      fileLastWrittenMode: "Preserve",
    });
    assert.deepStrictEqual(
      uploadRangeResult.fileLastWriteTime,
      createResult.fileLastWriteOn,
      "Last write time should be expected",
    );

    await fileClient.uploadRange("World", 5, 5, {
      fileLastWrittenMode: "Now",
    });
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("clearRange", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, 10), "H" + "\u0000".repeat(8) + "d");
  });

  it("clearRange with lastWriteTime", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    const uploadRangeResult = await fileClient.uploadRange("World", 5, 5);
    const clearRangeResult = await fileClient.clearRange(1, 4, {
      fileLastWrittenMode: "Preserve",
    });
    assert.deepStrictEqual(
      uploadRangeResult.fileLastWriteTime,
      clearRangeResult.fileLastWriteTime,
      "File last write time should be expected",
    );
    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, 10), "H" + "\u0000".repeat(4) + "World");

    await fileClient.clearRange(5, 4, {
      fileLastWrittenMode: "Now",
    });
    const downloadResult2 = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(downloadResult2, 10), "H" + "\u0000".repeat(8) + "d");
  });

  it("getRangeList", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.getRangeList();
    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 0, end: 9 });
  });

  it("getRangeList with share snapshot", async () => {
    await fileClient.create(513); // 512-byte aligned
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(0, 513);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeList();

    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 512, end: 512 });
  });

  it("getRangeListDiff", async function (ctx) {
    if (isLiveMode()) {
      // Skipped for now as the result is not stable.
      ctx.skip();
    }
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);
    const result = await fileClient.getRangeListDiff(snapshotRes.snapshot!);

    assert.isDefined(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.isDefined(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with share snapshot", async function (ctx) {
    if (isLiveMode()) {
      // Skipped for now as the result is not stable.
      ctx.skip();
    }
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const snapshotRes2 = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes2.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes2.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!);

    assert.isDefined(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.isDefined(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with rename", async function (ctx) {
    if (isLiveMode()) {
      // Skipped for now as the result is not stable.
      ctx.skip();
    }
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    const newFileName = recorder.variable("rename_file", getUniqueName("rename_file"));
    const renamedFileClient = (await fileClient.rename(newFileName)).destinationFileClient;

    await renamedFileClient.clearRange(0, 1024);
    await renamedFileClient.uploadRange("World", 1023, 5);
    try {
      await renamedFileClient.getRangeListDiff(snapshotRes.snapshot!);
      assert.fail(
        "getRangeListDiff against a renamed file with a snapshot before renaming should failed.",
      );
    } catch (err) {
      assert.equal((err as any).statusCode, 409);
    }
    const result = await renamedFileClient.getRangeListDiff(snapshotRes.snapshot!, {
      includeRenames: true,
    });

    assert.isDefined(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.isDefined(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with share snapshot and rename", async function (ctx) {
    if (isLiveMode()) {
      // Skipped for now as the result is not stable.
      ctx.skip();
    }
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const newFileName = recorder.variable("rename_file", getUniqueName("rename_file"));
    const renamedFileClient = (await fileClient.rename(newFileName)).destinationFileClient;

    const snapshotRes2 = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes2.snapshot);

    await renamedFileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = renamedFileClient.withShareSnapshot(snapshotRes2.snapshot!);
    try {
      await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!);
      assert.fail(
        "getRangeListDiff against a renamed file with a snapshot before renaming should failed.",
      );
    } catch (err) {
      assert.equal((err as any).statusCode, 409);
    }
    const result = await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!, {
      includeRenames: true,
    });

    assert.isDefined(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.isDefined(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("download with with default parameters", async () => {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);
    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("download should not have aborted error after download finishes", async () => {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);

    const aborter = new AbortController();
    const result = await fileClient.download(0, undefined, { abortSignal: aborter.signal });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("download all parameters set", async () => {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);
    const result = await fileClient.download(0, 1, {
      rangeGetContentMD5: true,
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it("download with progress report", async () => {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);
    const result = await fileClient.download(0, undefined, {
      onProgress: () => {
        /* empty */
      },
    });
    assert.deepStrictEqual(await bodyToString(result), content);
  });

  it("download partial content", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("HelloWorld", 0, 10);

    const result = await fileClient.download(0, 2);
    assert.deepStrictEqual(await bodyToString(result, 2), "He");
  });

  it("download should update progress and abort successfully", async (ctx) => {
    if (!isNodeLike || !isLiveMode()) {
      // because this test is using a blob response, there won't be
      // anything to abort by the time onProgress gets called.
      ctx.skip();
    }
    await fileClient.create(128 * 1024 * 1024);

    let eventTriggered = false;
    try {
      const aborter = new AbortController();
      const result = await fileClient.download(0, undefined, {
        abortSignal: aborter.signal,
        onProgress: () => {
          eventTriggered = true;
          aborter.abort();
        },
      });

      await new Promise((resolve, reject) => {
        if (isNodeLike) {
          // Receiving data...
          const rs = result.readableStreamBody!;

          rs.on("data", () => {
            /* empty */
          });
          rs.on("end", resolve);
          rs.on("error", reject);
        } else {
          result.blobBody!.then(resolve).catch(reject);
        }
      });

      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
    assert.isDefined(eventTriggered);
  });

  it("listHandles should work", async () => {
    await fileClient.create(10);

    const result = (await fileClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      assert.notDeepEqual(handle.handleId, undefined);
      assert.notDeepEqual(handle.path, undefined);
      assert.notDeepEqual(handle.fileId, undefined);
      assert.notDeepEqual(handle.sessionId, undefined);
      assert.notDeepEqual(handle.clientName, undefined);
      assert.notDeepEqual(handle.clientIp, undefined);
      assert.notDeepEqual(handle.openTime, undefined);
    }
  });

  it("forceCloseAllHandles should work", async () => {
    await fileClient.create(10);

    // TODO: Open or create a handle - Has to be tested locally

    assert.deepStrictEqual(
      await fileClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles",
    );
  });

  it("listHandles for file with Invalid Char should work", async function (ctx) {
    if (isBrowser && isLiveMode()) {
      // Skipped for now as the generating new version SAS token is not supported in pipeline yet.
      ctx.skip();
    }
    const fileNameWithInvalidChar = recorder.variable("file", getUniqueName("file\uFFFE"));

    const fileWithInvalidChar = shareClient
      .getDirectoryClient("")
      .getFileClient(fileNameWithInvalidChar);
    await fileWithInvalidChar.create(10);

    const result = (await fileWithInvalidChar.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      assert.notDeepEqual(handle.handleId, undefined);
      assert.notDeepEqual(handle.path, undefined);
      assert.notDeepEqual(handle.fileId, undefined);
      assert.notDeepEqual(handle.sessionId, undefined);
      assert.notDeepEqual(handle.clientName, undefined);
      assert.notDeepEqual(handle.clientIp, undefined);
      assert.notDeepEqual(handle.openTime, undefined);
    }
  });

  it("forceCloseHandle should work", async () => {
    await fileClient.create(10);

    // TODO: Open or create a handle

    const result = (await fileClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("forceCloseHandle could return closeFailureCount", async () => {
    await fileClient.create(10);
  });

  it("forceCloseAllHandles return correct closeFailureCount", async () => {
    await fileClient.create(10);

    const closeAllResp = await fileClient.forceCloseAllHandles();
    assert.equal(
      closeAllResp.closeFailureCount,
      0,
      "The closeFailureCount is not set to 0 as default.",
    );
  });

  it("create with tracing", async () => {
    await expect(async (options: OperationOptions) => {
      await fileClient.create(content.length, options);
    }).toSupportTracing(["ShareFileClient-create"]);
  });

  // STG81
  it("rename", async () => {
    await fileClient.create(1024);
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const result = await fileClient.rename(destFileName);
    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await fileClient.getProperties();
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename with metadata", async () => {
    await fileClient.create(1024);

    const metadata = {
      key1: "vala",
      key2: "valb",
    };
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const result = await fileClient.rename(destFileName, {
      metadata: metadata,
    });
    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    const propertiesResult = await result.destinationFileClient.getProperties();
    assert.deepStrictEqual(propertiesResult.metadata, metadata, "Metadata should be expected.");

    try {
      await fileClient.getProperties();
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename to under a different directory", async () => {
    const sourceParentDirName = recorder.variable("sourcedir", getUniqueName("sourcedir"));
    const sourceParentDir = shareClient.getDirectoryClient(sourceParentDirName);
    await sourceParentDir.create();

    const sourdeFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFile = sourceParentDir.getFileClient(sourdeFileName);
    await sourceFile.create(1024);

    const destParentDirName = recorder.variable("destdir", getUniqueName("destdir"));
    const destParentDir = shareClient.getDirectoryClient(destParentDirName);
    await destParentDir.create();

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const destFilePath = destParentDirName + "/" + destFileName;

    const result = await sourceFile.rename(destFilePath);
    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await sourceFile.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename - replaceIfExists = true ", async () => {
    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    await shareClient.getDirectoryClient("").getFileClient(destFileName).create(2048);

    const result = await sourceFileClient.rename(destFileName, {
      replaceIfExists: true,
    });

    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename - replaceIfExists = false", async () => {
    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await targetFileClient.create(2048);

    try {
      await sourceFileClient.rename(destFileName);
      assert.fail("Should got conflict error when trying to overwrite an exiting file");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        409,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await sourceFileClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.strictEqual(properties.contentLength, 2048, "The origin file should still exist");
  });

  it("rename - ignoreReadOnly = true", async () => {
    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await targetFileClient.create(2048, {
      fileAttributes: FileSystemAttributes.parse("ReadOnly"),
    });

    const result = await sourceFileClient.rename(destFileName, {
      ignoreReadOnly: true,
      replaceIfExists: true,
    });

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename - ignoreReadOnly = false", async () => {
    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await targetFileClient.create(2048, {
      fileAttributes: FileSystemAttributes.parse("ReadOnly"),
    });

    try {
      await sourceFileClient.rename(destFileName, {
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

    await sourceFileClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.strictEqual(properties.contentLength, 2048, "The origin file should still exist");
  });

  it("rename - destination leased", async () => {
    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await targetFileClient.create(2048);

    const guid = "e9890485-bf47-4d9a-b3d0-aceb18506124";
    const leaseClient = targetFileClient.getShareLeaseClient(guid);
    const leaseResult = await leaseClient.acquireLease(-1);

    const result = await sourceFileClient.rename(destFileName, {
      replaceIfExists: true,
      destinationLeaseAccessConditions: {
        leaseId: leaseResult.leaseId,
      },
    });

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        404,
        "Source directory should not exist anymore",
      );
    }
  });

  it("rename - destination leased - no lease access condition", async () => {
    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await targetFileClient.create(2048);

    const guid = "e9890485-bf47-4d9a-b3d0-aceb18506124";
    const leaseClient = targetFileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease(-1);

    try {
      await sourceFileClient.rename(destFileName, {
        replaceIfExists: true,
      });

      assert.fail("Should got conflict error when trying to overwrite an exiting file");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        412,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await sourceFileClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.strictEqual(properties.contentLength, 2048, "The origin file should still exist");
  });

  it("rename - source leased", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-source-lease-id", "x-ms-proposed-lease-id"],
        },
      },
      ["record", "playback"],
    );
    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const leaseClient = sourceFileClient.getShareLeaseClient();
    const leaseResult = await leaseClient.acquireLease(-1);

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));

    const result = await sourceFileClient.rename(destFileName, {
      sourceLeaseAccessConditions: {
        leaseId: leaseResult.leaseId,
      },
    });

    // Validate destination existence.
    await result.destinationFileClient.getProperties();
    assert.equal(
      destFileName,
      result.destinationFileClient.name,
      "Destination client instance should be expected",
    );

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename - source leased - no lease access condition", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-source-lease-id", "x-ms-proposed-lease-id"],
        },
      },
      ["record", "playback"],
    );
    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const leaseClient = sourceFileClient.getShareLeaseClient();
    await leaseClient.acquireLease(-1);

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));

    try {
      await sourceFileClient.rename(destFileName);
      assert.fail("Should got conflict error when trying to overwrite an exiting file");
    } catch (err: any) {
      assert.strictEqual(
        err.statusCode as number,
        412,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await sourceFileClient.getProperties();
  });

  it("rename - Non-ASCII source and destination", async () => {
    const destName = "汉字. dest ~!@#$%^&()_+`1234567890-={}[];','";
    const destFileName = recorder.variable(destName, getUniqueName(destName));

    const sourceName = "汉字. source ~!@#$%^&()_+`1234567890-={}[];','";
    const sourceFileName = recorder.variable(sourceName, getUniqueName(sourceName));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const result = await sourceFileClient.rename(destFileName);
    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    await result.destinationFileClient.getProperties();

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename - with file permission", async () => {
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";

    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const result = await sourceFileClient.rename(destFileName, {
      filePermission: filePermission,
    });

    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    const properties = await result.destinationFileClient.getProperties();
    assert.isDefined(
      properties.filePermissionKey,
      "File permission should have been set to destination",
    );

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename - with binary file permission", async () => {
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));

    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const result = await sourceFileClient.rename(destFileName, {
      filePermissionFormat: "Binary",
      filePermission: filePermissionInBinaryFormat,
    });

    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    const properties = await result.destinationFileClient.getProperties();
    assert.isDefined(
      properties.filePermissionKey,
      "File permission should have been set to destination",
    );

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename - SMB properties", async () => {
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";
    const permissionResponse = await shareClient.createPermission(filePermission);

    const fileAttributesInstance = new FileSystemAttributes();
    fileAttributesInstance.hidden = true;
    fileAttributesInstance.readonly = true;

    const creationDate = new Date("05 October 2019 14:48 UTC");
    const lastwriteTime = new Date("15 October 2019 14:48 UTC");
    const changeTime = new Date("25 October 2019 14:48 UTC");

    const copyFileSMBInfo = {
      fileAttributes: fileAttributesInstance.toString(),
      fileCreationTime: truncatedISO8061Date(creationDate),
      fileLastWriteTime: truncatedISO8061Date(lastwriteTime),
      fileChangeTime: truncatedISO8061Date(changeTime),
    };

    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const result = await sourceFileClient.rename(destFileName, {
      filePermissionKey: permissionResponse.filePermissionKey,
      copyFileSmbInfo: copyFileSMBInfo,
    });

    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    const properties = await result.destinationFileClient.getProperties();
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
      truncatedISO8061Date(changeTime),
      "File changed time should be expected",
    );
    const fileSystemAttributes = FileSystemAttributes.parse(properties.fileAttributes!);
    assert.isTrue(
      fileSystemAttributes.readonly && fileSystemAttributes.hidden,
      "File attributes should be expected",
    );

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename - Content type", async () => {
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));

    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const contentType = "contenttype/subtype";
    const result = await sourceFileClient.rename(destFileName, {
      contentType: contentType,
    });

    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    const properties = await result.destinationFileClient.getProperties();
    assert.equal(properties.contentType, contentType);

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });
});

describe("ShareFileClient - Verify Name Properties", () => {
  const accountName = "myaccount";
  const dirName = "dir1/dir2";
  const fileName = "1.txt";
  const shareName = "shareName";

  function verifyNameProperties(url: string): void {
    const newClient = new ShareFileClient(url);
    assert.equal(newClient.shareName, shareName, "Share name is not the same as the one provided.");
    assert.equal(
      newClient.path,
      dirName + "/" + fileName,
      "FilePath is not the same as the one provided.",
    );
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided.",
    );
    assert.equal(
      newClient.name,
      fileName,
      "FileClient name is not the same as the baseName of the provided file URI",
    );
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(
      `https://${accountName}.file.core.windows.net/${shareName}/${dirName}/${fileName}`,
    );
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://192.0.0.10:1900/${accountName}/${shareName}/${dirName}/${fileName}`,
    );
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${shareName}/${dirName}/${fileName}`,
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${shareName}/${dirName}/${fileName}`);
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new ShareFileClient(
      `https://customdomain.com/${shareName}/${dirName}/${fileName}`,
    );

    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
    assert.equal(newClient.shareName, shareName, "Share name is not the same as the one provided.");
    assert.equal(
      newClient.path,
      dirName + "/" + fileName,
      "FilePath is not the same as the one provided.",
    );
    assert.equal(
      newClient.name,
      fileName,
      "FileClient name is not the same as the baseName of the provided file URI",
    );
  });
});

describe("FileClient - OAuth", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let shareClientWithKeyCredential: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let fileName: string;
  let fileClient: ShareFileClient;
  const content = "Hello World";
  let recorder: Recorder;

  const fullFileAttributes = new FileSystemAttributes();
  fullFileAttributes.readonly = true;
  fullFileAttributes.hidden = true;
  fullFileAttributes.system = true;
  fullFileAttributes.archive = true;
  fullFileAttributes.temporary = true;
  fullFileAttributes.offline = true;
  fullFileAttributes.notContentIndexed = true;
  fullFileAttributes.noScrubData = true;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
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
    let serviceClient: ShareServiceClient;
    try {
      serviceClient = getTokenBSU(recorder, "", "", { fileRequestIntent: "backup" });
    } catch (err) {
      ctx.skip();
      return;
    }
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    shareClientWithKeyCredential = getBSU(recorder).getShareClient(shareName);
    await shareClientWithKeyCredential.create();

    dirName = recorder.variable("dir", getUniqueName("dir"));
    dirClient = shareClient.getDirectoryClient(dirName);

    await dirClient.create();

    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = dirClient.getFileClient(fileName);
  });

  afterEach(async () => {
    await shareClientWithKeyCredential.delete({ deleteSnapshots: "include" });
    await recorder.stop();
  });

  it("create", async () => {
    const cResp = await fileClient.create(content.length);
    assert.equal(cResp.errorCode, undefined);
    assert.equal(cResp.fileAttributes!, "Archive");
    assert.isDefined(cResp.fileChangeOn!);
    assert.isDefined(cResp.fileCreatedOn!);
    assert.isDefined(cResp.fileId!);
    assert.isDefined(cResp.fileLastWriteOn!);
    assert.isDefined(cResp.fileParentId!);
    assert.isDefined(cResp.filePermissionKey!);

    const result = await fileClient.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, content.length),
      "\u0000".repeat(content.length),
    );
  });

  it("setProperties", async () => {
    await fileClient.create(content.length);
    await fileClient.setProperties();

    const result = await fileClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, "Archive");
    assert.isDefined(result.fileCreatedOn!);
    assert.isDefined(result.fileLastWriteOn!);
    assert.isDefined(result.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isUndefined(result.cacheControl);
    assert.isUndefined(result.contentType);
    assert.isUndefined(result.contentMD5);
    assert.isUndefined(result.contentEncoding);
    assert.isUndefined(result.contentLanguage);
    assert.isUndefined(result.contentDisposition);
  });

  it("setHTTPHeaders", async () => {
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders({});
    const result = await fileClient.getProperties();

    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isUndefined(result.cacheControl);
    assert.isUndefined(result.contentType);
    assert.isUndefined(result.contentMD5);
    assert.isUndefined(result.contentEncoding);
    assert.isUndefined(result.contentLanguage);
    assert.isUndefined(result.contentDisposition);
  });

  it("delete", async () => {
    await fileClient.create(content.length);
    await fileClient.delete();
  });

  it("deleteIfExists", async () => {
    const res = await fileClient.deleteIfExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await fileClient.create(content.length);
    const res2 = await fileClient.deleteIfExists();
    assert.isTrue(res2.succeeded);
  });

  it("exists", async () => {
    assert.isFalse(await fileClient.exists());
    await fileClient.create(content.length);
    assert.isTrue(await fileClient.exists());
  });

  it("startCopyFromURL", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.isDefined(result.copyId);

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    if (isLiveMode()) {
      // A service feature is being rolling out which will sanitize the sig field
      // so we remove it before comparing urls.
      assert.isDefined(properties2.copySource, "Expecting valid 'properties2.copySource");

      const sanitizedActualUrl = new URL(properties2.copySource!);
      sanitizedActualUrl.searchParams.set("sig", "");

      const sanitizedExpectedUrl = new URL(fileClient.url);
      sanitizedExpectedUrl.searchParams.set("sig", "");

      assert.strictEqual(
        sanitizedActualUrl.toString(),
        sanitizedExpectedUrl.toString(),
        "copySource does not match original source",
      );
    }
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    await fileClient.create(content.length);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.isDefined(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation.",
      );
    } catch (err: any) {
      // Expected - test passes if exception is thrown
    }
  });

  it("resize", async () => {
    await fileClient.create(content.length);
    const properties = await fileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, content.length);

    await fileClient.resize(1);
    const updatedProperties = await fileClient.getProperties();
    assert.deepStrictEqual(updatedProperties.contentLength, 1);
  });

  it("uploadData", async () => {
    await fileClient.create(10);
    await fileClient.uploadData(isNodeLike ? Buffer.from(content) : new Blob([content]));
    const response = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(response), content);
  });

  it("uploadRange", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("clearRange", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, 10), "H" + "\u0000".repeat(8) + "d");
  });

  it("getRangeList", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.getRangeList();
    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 0, end: 9 });
  });

  it("getRangeListDiff with share snapshot", async () => {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClientWithKeyCredential.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const snapshotRes2 = await shareClientWithKeyCredential.createSnapshot();
    assert.isDefined(snapshotRes2.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes2.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!);

    assert.isDefined(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.isDefined(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("download", async () => {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);
    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("listHandles should work", async () => {
    await fileClient.create(10);

    const result = (await fileClient.listHandles().byPage().next()).value;
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

  it("forceCloseAllHandles should work", async () => {
    await fileClient.create(10);

    // TODO: Open or create a handle - Has to be tested locally

    assert.deepStrictEqual(
      await fileClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles",
    );
  });

  it("forceCloseHandle should work", async () => {
    await fileClient.create(10);

    // TODO: Open or create a handle

    const result = (await fileClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("rename", async () => {
    await fileClient.create(1024);
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const result = await fileClient.rename(destFileName);
    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    assert.equal(await fileClient.exists(), false);
  });
});

describe("FileClient - AllowTrailingDots - True", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let fileName: string;
  let fileNameWithTrailingDots: string;
  let fileClient: ShareFileClient;
  const content = "Hello World";
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"],
    );
    const serviceClient = getBSU(recorder, {
      allowSourceTrailingDot: true,
      allowTrailingDot: true,
    });
    shareName = recorder.variable("file", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir")) + "....";
    dirClient = shareClient.getDirectoryClient(dirName);

    await dirClient.create();

    fileName = recorder.variable("file", getUniqueName("file"));
    fileNameWithTrailingDots = fileName + "....";
    fileClient = dirClient.getFileClient(fileNameWithTrailingDots);
  });

  afterEach(async () => {
    await shareClient.delete({ deleteSnapshots: "include" });
    await recorder.stop();
  });

  it("create", async () => {
    await fileClient.create(content.length);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === fileNameWithTrailingDots) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "The file with trailing dot should have been created.");
  });

  it("setProperties with default parameters", async () => {
    await fileClient.create(content.length);
    await fileClient.setProperties();

    const result = await fileClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, "Archive");
    assert.isDefined(result.fileCreatedOn!);
    assert.isDefined(result.fileLastWriteOn!);
    assert.isDefined(result.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isUndefined(result.cacheControl);
    assert.isUndefined(result.contentType);
    assert.isUndefined(result.contentMD5);
    assert.isUndefined(result.contentEncoding);
    assert.isUndefined(result.contentLanguage);
    assert.isUndefined(result.contentDisposition);
  });

  it("setMetadata with new metadata set", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata);
    const result = await fileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setHTTPHeaders with default parameters", async () => {
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders({});
    const result = await fileClient.getProperties();

    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isUndefined(result.cacheControl);
    assert.isUndefined(result.contentType);
    assert.isUndefined(result.contentMD5);
    assert.isUndefined(result.contentEncoding);
    assert.isUndefined(result.contentLanguage);
    assert.isUndefined(result.contentDisposition);
  });

  it("delete", async () => {
    await fileClient.create(content.length);
    await fileClient.delete();
  });

  it("deleteIfExists", async () => {
    const res = await fileClient.deleteIfExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await fileClient.create(content.length);
    const res2 = await fileClient.deleteIfExists();
    assert.isTrue(res2.succeeded);
  });

  it("exists", async () => {
    assert.isFalse(await fileClient.exists());
    await fileClient.create(content.length);
    assert.isTrue(await fileClient.exists());
  });

  it("startCopyFromURL", async () => {
    await fileClient.create(1024);
    const copiedFileName = recorder.variable("copiedfile", getUniqueName("copiedfile"));
    const copiedFileNameWithTrailingDots = copiedFileName + "...";
    const newFileClient = dirClient.getFileClient(copiedFileNameWithTrailingDots);
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.isDefined(result.copyId);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === copiedFileNameWithTrailingDots) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "The copied file should exist.");

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    assert.isDefined(properties2.copySource, "Expecting valid 'properties2.copySource");
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    await fileClient.create(content.length);
    const copiedFileName = recorder.variable("copiedfile", getUniqueName("copiedfile"));
    const copiedFileNameWithTrailingDots = copiedFileName + "...";
    const newFileClient = dirClient.getFileClient(copiedFileNameWithTrailingDots);
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.isDefined(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation.",
      );
    } catch (err: any) {
      assert.isTrue(
        err.statusCode === 409 && err.code === "NoPendingCopyOperation",
        "Should got expected error",
      );
    }
  });

  it("resize", async () => {
    await fileClient.create(content.length);
    const properties = await fileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, content.length);

    await fileClient.resize(1);
    const updatedProperties = await fileClient.getProperties();
    assert.deepStrictEqual(updatedProperties.contentLength, 1);
  });

  it("uploadData", async () => {
    await fileClient.create(10);
    await fileClient.uploadData(isNodeLike ? Buffer.from(content) : new Blob([content]));
    const response = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(response), content);
  });

  it("uploadRange", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("clearRange", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, 10), "H" + "\u0000".repeat(8) + "d");
  });

  it("getRangeList", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.getRangeList();
    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 0, end: 9 });
  });

  it("getRangeList with share snapshot", async () => {
    await fileClient.create(513); // 512-byte aligned
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(0, 513);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeList();

    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 512, end: 512 });
  });

  it("getRangeListDiff", async () => {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);
    const result = await fileClient.getRangeListDiff(snapshotRes.snapshot!);

    assert.isDefined(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.isDefined(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with share snapshot", async () => {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const snapshotRes2 = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes2.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes2.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!);

    assert.isDefined(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.isDefined(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("download", async () => {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);
    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("listHandles should work", async () => {
    await fileClient.create(10);

    const result = (await fileClient.listHandles().byPage().next()).value;
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

  it("forceCloseAllHandles should work", async () => {
    await fileClient.create(10);

    assert.deepStrictEqual(
      await fileClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles",
    );
  });

  it("forceCloseHandle should work", async () => {
    await fileClient.create(10);

    const result = (await fileClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("rename", async () => {
    await fileClient.create(1024);
    const destFileName = recorder.variable("destfile", getUniqueName("destfile")) + "....";
    const result = await fileClient.rename(destFileName);
    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    let foundFile = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === destFileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "Destination should exist.");

    // Validate destination existence.
    await result.destinationFileClient.getProperties();
    assert.equal(await fileClient.exists(), false);

    const firstDestClient = result.destinationFileClient;
    const anotherDestFileName = recorder.variable("destfile1", getUniqueName("destfile1")) + "....";
    const anotherResult = await firstDestClient.rename(anotherDestFileName);

    foundFile = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === anotherDestFileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "Destination should exist.");

    // Validate destination existence.
    await anotherResult.destinationFileClient.getProperties();
    assert.equal(await firstDestClient.exists(), false);
  });
});

describe("FileClient - AllowTrailingDots - False", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let fileName: string;
  let fileNameWithTrailingDots: string;
  let fileClient: ShareFileClient;
  const content = "Hello World";
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"],
    );
    const serviceClient = getBSU(recorder, {
      allowSourceTrailingDot: false,
      allowTrailingDot: false,
    });
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir")) + "....";
    dirClient = shareClient.getDirectoryClient(dirName);

    await dirClient.create();

    fileName = recorder.variable("file", getUniqueName("file"));
    fileNameWithTrailingDots = fileName + "....";
    fileClient = dirClient.getFileClient(fileNameWithTrailingDots);
  });

  afterEach(async () => {
    await shareClient.delete({ deleteSnapshots: "include" });
    await recorder.stop();
  });

  it("create", async () => {
    await fileClient.create(content.length);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === fileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "The file with trailing dot should have been created.");
  });

  it("setProperties with default parameters", async () => {
    await fileClient.create(content.length);
    await fileClient.setProperties();

    const result = await fileClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, "Archive");
    assert.isDefined(result.fileCreatedOn!);
    assert.isDefined(result.fileLastWriteOn!);
    assert.isDefined(result.filePermissionKey!);
    assert.isDefined(result.fileChangeOn!);
    assert.isDefined(result.fileId!);
    assert.isDefined(result.fileParentId!);
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isUndefined(result.cacheControl);
    assert.isUndefined(result.contentType);
    assert.isUndefined(result.contentMD5);
    assert.isUndefined(result.contentEncoding);
    assert.isUndefined(result.contentLanguage);
    assert.isUndefined(result.contentDisposition);
  });

  it("setMetadata with new metadata set", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata);
    const result = await fileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setHTTPHeaders with default parameters", async () => {
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders({});
    const result = await fileClient.getProperties();

    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isUndefined(result.cacheControl);
    assert.isUndefined(result.contentType);
    assert.isUndefined(result.contentMD5);
    assert.isUndefined(result.contentEncoding);
    assert.isUndefined(result.contentLanguage);
    assert.isUndefined(result.contentDisposition);
  });

  it("delete", async () => {
    await fileClient.create(content.length);
    await fileClient.delete();
  });

  it("deleteIfExists", async () => {
    const res = await fileClient.deleteIfExists();
    assert.isFalse(res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await fileClient.create(content.length);
    const res2 = await fileClient.deleteIfExists();
    assert.isTrue(res2.succeeded);
  });

  it("exists", async () => {
    assert.isFalse(await fileClient.exists());
    await fileClient.create(content.length);
    assert.isTrue(await fileClient.exists());
  });

  it("startCopyFromURL", async () => {
    await fileClient.create(1024);
    const copiedFileName = recorder.variable("copiedfile", getUniqueName("copiedfile"));
    const copiedFileNameWithTrailingDots = copiedFileName + "...";
    const newFileClient = dirClient.getFileClient(copiedFileNameWithTrailingDots);
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.isDefined(result.copyId);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === copiedFileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "The copied file should exist.");

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    assert.isDefined(properties2.copySource, "Expecting valid 'properties2.copySource");
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    await fileClient.create(content.length);
    const copiedFileName = recorder.variable("copiedfile", getUniqueName("copiedfile"));
    const copiedFileNameWithTrailingDots = copiedFileName + "...";
    const newFileClient = dirClient.getFileClient(copiedFileNameWithTrailingDots);
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.isDefined(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation.",
      );
    } catch (err: any) {
      assert.isTrue(
        err.statusCode === 409 && err.code === "NoPendingCopyOperation",
        "Should got expected error",
      );
    }
  });

  it("resize", async () => {
    await fileClient.create(content.length);
    const properties = await fileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, content.length);

    await fileClient.resize(1);
    const updatedProperties = await fileClient.getProperties();
    assert.deepStrictEqual(updatedProperties.contentLength, 1);
  });

  it("uploadData", async () => {
    await fileClient.create(10);
    await fileClient.uploadData(isNodeLike ? Buffer.from(content) : new Blob([content]));
    const response = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(response), content);
  });

  it("uploadRange", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("clearRange", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, 10), "H" + "\u0000".repeat(8) + "d");
  });

  it("getRangeList", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.getRangeList();
    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 0, end: 9 });
  });

  it("getRangeList with share snapshot", async () => {
    await fileClient.create(513); // 512-byte aligned
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(0, 513);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeList();

    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 512, end: 512 });
  });

  it("getRangeListDiff", async () => {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);
    const result = await fileClient.getRangeListDiff(snapshotRes.snapshot!);

    assert.isDefined(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.isDefined(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with share snapshot", async () => {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const snapshotRes2 = await shareClient.createSnapshot();
    assert.isDefined(snapshotRes2.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes2.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!);

    assert.isDefined(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.isDefined(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("download", async () => {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);
    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("listHandles should work", async () => {
    await fileClient.create(10);

    const result = (await fileClient.listHandles().byPage().next()).value;
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

  it("forceCloseAllHandles should work", async () => {
    await fileClient.create(10);

    assert.deepStrictEqual(
      await fileClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles",
    );
  });

  it("forceCloseHandle should work", async () => {
    await fileClient.create(10);

    const result = (await fileClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("rename", async () => {
    await fileClient.create(1024);
    const destFileBaseName = recorder.variable("destfile", getUniqueName("destfile"));
    const destFileName = destFileBaseName + "....";
    const result = await fileClient.rename(destFileName);
    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    let foundFile = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === destFileBaseName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }
    assert.isTrue(foundFile, "Destination should exist.");

    // Validate destination existence.
    await result.destinationFileClient.getProperties();
    assert.equal(await fileClient.exists(), false);

    const firstDestClient = result.destinationFileClient;
    const anotherDestFileBaseName = recorder.variable("destfile1", getUniqueName("destfile1"));
    const anotherDestFileName = anotherDestFileBaseName + ".....";
    const anotherResult = await firstDestClient.rename(anotherDestFileName);
    assert.strictEqual(
      anotherResult.destinationFileClient.name,
      anotherDestFileName,
      "Destination name should be expected",
    );

    foundFile = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === anotherDestFileBaseName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }
    assert.isTrue(foundFile, "Destination should exist.");

    // Validate destination existence.
    await anotherResult.destinationFileClient.getProperties();
    assert.equal(await firstDestClient.exists(), false);
  });
});

describe("FileClient - AllowTrailingDots - Default", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let fileName: string;
  let fileNameWithTrailingDots: string;
  let fileClient: ShareFileClient;
  const content = "Hello World";
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"],
    );
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir")) + "....";
    dirClient = shareClient.getDirectoryClient(dirName);

    await dirClient.create();

    fileName = recorder.variable("file", getUniqueName("file"));
    fileNameWithTrailingDots = fileName + "....";
    fileClient = dirClient.getFileClient(fileNameWithTrailingDots);
  });

  afterEach(async () => {
    await shareClient.delete({ deleteSnapshots: "include" });
    await recorder.stop();
  });

  it("create", async () => {
    await fileClient.create(content.length);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === fileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.isTrue(foundFile, "The file with trailing dots trimmed should have been created.");
  });

  it("delete", async () => {
    await fileClient.create(content.length);
    await fileClient.delete();
  });
});

describe("FileClient - NFS", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let fileName: string;
  let fileClient: ShareFileClient;
  const content = "Hello World";

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    try {
      serviceClient = getGenericBSU(recorder, "PREMIUM_FILE_");
    } catch (error: any) {
      console.log(error);
      ctx.skip();
    }

    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create({
      protocols: {
        nfsEnabled: true,
      },
    });

    dirName = recorder.variable("dir", getUniqueName("dir"));
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = dirClient.getFileClient(fileName);
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
      fileMode: parseOctalFileMode("0755"),
      fileType: "Regular",
    };
    const cResp = await fileClient.create(content.length, {
      posixProperties: posixProperties,
    });

    assert.equal(cResp.errorCode, undefined);
    assert.deepEqual(cResp.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(cResp.posixProperties?.group, posixProperties.group);
    assert.deepEqual(cResp.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(cResp.posixProperties?.fileType, posixProperties.fileType);
    assert.isDefined(cResp.fileChangeOn!);
    assert.isDefined(cResp.fileCreatedOn!);
    assert.isDefined(cResp.fileId!);
    assert.isDefined(cResp.fileLastWriteOn!);
    assert.isDefined(cResp.fileParentId!);

    const result = await fileClient.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, content.length),
      "\u0000".repeat(content.length),
    );
    assert.deepEqual(result.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(result.posixProperties?.group, posixProperties.group);
    assert.deepEqual(result.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(result.posixProperties?.linkCount, 1);
  });

  it("set&get nfs properties", async () => {
    const posixProperties: FilePosixProperties = {
      owner: "123",
      group: "654",
      fileMode: parseSymbolicFileMode("rwxr-xr-x"),
      fileType: "Regular",
    };
    const cResp = await fileClient.create(content.length);
    assert.deepEqual(cResp.posixProperties?.owner, "0");
    assert.deepEqual(cResp.posixProperties?.group, "0");
    assert.isDefined(cResp.posixProperties?.fileMode);
    assert.isDefined(cResp.posixProperties?.fileType);

    const setResp = await fileClient.setProperties({ posixProperties });
    assert.deepEqual(setResp.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(setResp.posixProperties?.group, posixProperties.group);
    assert.deepEqual(setResp.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(setResp.posixProperties?.linkCount, 1);

    const getResp = await fileClient.getProperties();
    assert.deepEqual(getResp.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(getResp.posixProperties?.group, posixProperties.group);
    assert.deepEqual(getResp.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(getResp.posixProperties?.fileType, posixProperties.fileType);
    assert.deepEqual(getResp.posixProperties?.linkCount, 1);

    const result = await fileClient.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, content.length),
      "\u0000".repeat(content.length),
    );
    assert.deepEqual(result.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(result.posixProperties?.group, posixProperties.group);
    assert.deepEqual(result.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(result.posixProperties?.linkCount, 1);
  });

  it("delete nfs file", async () => {
    const cResp = await fileClient.create(content.length);
    assert.deepEqual(cResp.posixProperties?.owner, "0");
    assert.deepEqual(cResp.posixProperties?.group, "0");
    assert.isDefined(cResp.posixProperties?.fileMode);
    assert.isDefined(cResp.posixProperties?.fileType);

    const result = await fileClient.delete();
    assert.deepEqual(result.linkCount, 0);
  });

  it("setHTTPHeaders with default parameters", async () => {
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders({});
    const result = await fileClient.getProperties();

    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.isUndefined(result.cacheControl);
    assert.isUndefined(result.contentType);
    assert.isUndefined(result.contentMD5);
    assert.isUndefined(result.contentEncoding);
    assert.isUndefined(result.contentLanguage);
    assert.isUndefined(result.contentDisposition);
    assert.deepEqual(result.posixProperties?.owner, "0");
    assert.deepEqual(result.posixProperties?.group, "0");
    assert.isDefined(result.posixProperties?.fileMode);
    assert.isDefined(result.posixProperties?.fileType);
  });

  it("setHTTPHeaders with all parameters set", async () => {
    const posixProperties: FilePosixProperties = {
      owner: "123",
      group: "654",
      fileMode: parseSymbolicFileMode("rwxr-xr-x"),
      fileType: "Regular",
    };

    await fileClient.create(content.length);
    const headers = {
      fileCacheControl: "fileCacheControl",
      fileContentDisposition: "fileContentDisposition",
      fileContentEncoding: "fileContentEncoding",
      fileContentLanguage: "fileContentLanguage",
      fileContentMD5: isNodeLike ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      fileContentType: "fileContentType",
    };

    const setHeadersResult = await fileClient.setHttpHeaders(headers, {
      posixProperties: posixProperties,
    });
    assert.deepEqual(setHeadersResult.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(setHeadersResult.posixProperties?.group, posixProperties.group);
    assert.deepEqual(setHeadersResult.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(setHeadersResult.posixProperties?.linkCount, 1);

    const result = await fileClient.getProperties();
    assert.isDefined(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.deepStrictEqual(result.cacheControl, headers.fileCacheControl);
    assert.deepStrictEqual(result.contentType, headers.fileContentType);
    assert.deepStrictEqual(result.contentMD5, headers.fileContentMD5);
    assert.deepStrictEqual(result.contentEncoding, headers.fileContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, headers.fileContentLanguage);
    assert.deepStrictEqual(result.contentDisposition, headers.fileContentDisposition);
    assert.deepEqual(result.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(result.posixProperties?.group, posixProperties.group);
    assert.deepEqual(result.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(result.posixProperties?.linkCount, 1);
  });

  it("resize with all parameters set", async () => {
    const posixProperties: FilePosixProperties = {
      owner: "123",
      group: "654",
      fileMode: parseSymbolicFileMode("rwxr-xr-x"),
      fileType: "Regular",
    };

    await fileClient.create(content.length);

    const resizeResult = await fileClient.resize(1, {
      posixProperties: posixProperties,
    });
    assert.deepEqual(resizeResult.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(resizeResult.posixProperties?.group, posixProperties.group);
    assert.deepEqual(resizeResult.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(resizeResult.posixProperties?.linkCount, 1);

    const result = await fileClient.getProperties();
    assert.isDefined(result.lastModified);
    assert.deepEqual(result.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(result.posixProperties?.group, posixProperties.group);
    assert.deepEqual(result.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(result.contentLength, 1);
    assert.deepEqual(result.posixProperties?.linkCount, 1);
  });

  it("startCopy - with NFS properties", async () => {
    const posixProperties: FilePosixProperties = {
      owner: "123",
      group: "654",
      fileMode: parseSymbolicFileMode("rwxr-xr-x"),
      fileType: "Regular",
    };

    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );

    const result = await newFileClient.startCopyFromURL(fileClient.url, {
      posixProperties: posixProperties,
      fileModeCopyMode: "override",
      fileOwnerCopyMode: "override",
    });
    assert.isDefined(result.copyId);

    const properties = await newFileClient.getProperties();
    assert.deepEqual(properties.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(properties.posixProperties?.group, posixProperties.group);
    assert.deepEqual(properties.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(properties.posixProperties?.fileType, "Regular");
    assert.deepEqual(properties.posixProperties?.linkCount, 1);
  });

  it("startCopy - with default", async () => {
    const posixProperties: FilePosixProperties = {
      owner: "123",
      group: "654",
      fileMode: parseSymbolicFileMode("rwxr-xr-x"),
      fileType: "Regular",
    };
    await fileClient.create(1024, { posixProperties: posixProperties });

    const getResp = await fileClient.getProperties();
    assert.deepEqual(getResp.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(getResp.posixProperties?.group, posixProperties.group);
    assert.deepEqual(getResp.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(getResp.posixProperties?.fileType, posixProperties.fileType);
    assert.deepEqual(getResp.posixProperties?.linkCount, 1);

    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const expectedDefaultFileMode = parseSymbolicFileMode("rw-rw-r--");
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.isDefined(result.copyId);

    const properties = await newFileClient.getProperties();
    assert.deepEqual(properties.posixProperties?.owner, "0");
    assert.deepEqual(properties.posixProperties?.group, "0");
    assert.deepEqual(properties.posixProperties?.fileMode, expectedDefaultFileMode);
    assert.deepEqual(properties.posixProperties?.linkCount, 1);
  });

  it("startCopy - with source", async () => {
    const posixProperties: FilePosixProperties = {
      owner: "123",
      group: "654",
      fileMode: parseSymbolicFileMode("rwxr-xr-x"),
      fileType: "Regular",
    };
    await fileClient.create(1024, { posixProperties: posixProperties });

    const getResp = await fileClient.getProperties();
    assert.deepEqual(getResp.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(getResp.posixProperties?.group, posixProperties.group);
    assert.deepEqual(getResp.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(getResp.posixProperties?.fileType, posixProperties.fileType);
    assert.deepEqual(getResp.posixProperties?.linkCount, 1);

    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url, {
      fileModeCopyMode: "source",
      fileOwnerCopyMode: "source",
    });
    assert.isDefined(result.copyId);

    const properties = await newFileClient.getProperties();
    assert.deepEqual(properties.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(properties.posixProperties?.group, posixProperties.group);
    assert.deepEqual(properties.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(properties.posixProperties?.fileType, posixProperties.fileType);
    assert.deepEqual(properties.posixProperties?.linkCount, 1);
  });

  it("createHardLink", async () => {
    const posixProperties: FilePosixProperties = {
      owner: "123",
      group: "654",
      fileMode: parseSymbolicFileMode("rwxr-sr-x"),
      fileType: "Regular",
    };
    await fileClient.create(1024, { posixProperties: posixProperties });

    const hardLink = recorder.variable("hardLink", getUniqueName("hardLink"));
    const linkClient = dirClient.getFileClient(hardLink);
    const getResp = await linkClient.createHardLink(`${dirName}/${fileName}`);
    assert.deepEqual(getResp.posixProperties?.owner, posixProperties.owner);
    assert.deepEqual(getResp.posixProperties?.group, posixProperties.group);
    assert.deepEqual(getResp.posixProperties?.fileMode, posixProperties.fileMode);
    assert.deepEqual(getResp.posixProperties?.fileType, posixProperties.fileType);
    assert.deepEqual(getResp.posixProperties?.linkCount, 2);
    assert.isDefined(getResp.fileCreationTime);
    assert.isDefined(getResp.fileLastWriteTime);
    assert.isDefined(getResp.fileChangeTime);
    assert.isDefined(getResp.fileId);
    assert.isDefined(getResp.fileParentId);
  });

  it("createSymbolicLink & getSymbolicLink", async function () {
    const owner = "123";
    const group = "456";
    const expectedFileMode = parseSymbolicFileMode("rwxrwxrwx");
    const resp = await fileClient.createSymbolicLink("APath", { owner: owner, group: group });
    assert.deepEqual(resp.posixProperties?.owner, owner);
    assert.deepEqual(resp.posixProperties?.group, group);
    assert.deepEqual(resp.posixProperties?.fileMode, expectedFileMode);
    assert.deepEqual(resp.posixProperties?.fileType, "SymLink");
    assert.isDefined(resp.fileCreationTime);
    assert.isDefined(resp.fileLastWriteTime);
    assert.isDefined(resp.fileChangeTime);
    assert.isDefined(resp.fileId);
    assert.isDefined(resp.fileParentId);

    const getResp = await fileClient.getSymbolicLink();
    assert.deepEqual(getResp.linkText, "APath");
  });

  it("file mode test", async function () {
    const posixProperties = {
      fileMode: parseOctalFileMode("2755"),
    };
    const expectedPosixProperties: FilePosixProperties = {
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
        effectiveGroupIdentity: true,
        stickyBit: false,
      },
    };
    const resp = await fileClient.create(1024, { posixProperties: posixProperties });
    assert.deepEqual(resp.posixProperties?.fileMode, expectedPosixProperties.fileMode);

    const posixProperties1 = {
      fileMode: parseOctalFileMode("7644"),
    };
    const expectedPosixProperties1: FilePosixProperties = {
      fileMode: {
        owner: {
          read: true,
          write: true,
          execute: false,
        },
        group: {
          read: true,
          write: false,
          execute: false,
        },
        other: {
          read: true,
          write: false,
          execute: false,
        },
        effectiveUserIdentity: true,
        effectiveGroupIdentity: true,
        stickyBit: true,
      },
    };
    const setResp1 = await fileClient.setProperties({ posixProperties: posixProperties1 });
    assert.deepEqual(setResp1.posixProperties?.fileMode, expectedPosixProperties1.fileMode);

    const posixProperties2 = {
      fileMode: parseOctalFileMode("1522"),
    };
    const expectedPosixProperties2: FilePosixProperties = {
      fileMode: {
        owner: {
          read: true,
          write: false,
          execute: true,
        },
        group: {
          read: false,
          write: true,
          execute: false,
        },
        other: {
          read: false,
          write: true,
          execute: false,
        },
        effectiveUserIdentity: false,
        effectiveGroupIdentity: false,
        stickyBit: true,
      },
    };
    const setResp2 = await fileClient.setProperties({ posixProperties: posixProperties2 });
    assert.deepEqual(setResp2.posixProperties?.fileMode, expectedPosixProperties2.fileMode);
  });

  it("parse file mode function unit test", async () => {
    const expectedFileMode1: NfsFileMode = {
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
      effectiveGroupIdentity: true,
      stickyBit: false,
    };

    const fileModeFromOctalString1 = parseOctalFileMode("2755");
    const octalFildMode1 = toOctalFileMode(expectedFileMode1);
    const symblicFileModeString1 = toSymbolicFileMode(expectedFileMode1);
    const fileModeFromSymblicString1 = parseSymbolicFileMode("rwxr-sr-x");

    assert.deepEqual(fileModeFromOctalString1, expectedFileMode1);
    assert.deepEqual(fileModeFromSymblicString1, expectedFileMode1);
    assert.deepEqual(octalFildMode1, "2755");
    assert.deepEqual(symblicFileModeString1, "rwxr-sr-x");

    const expectedFileMode2: NfsFileMode = {
      owner: {
        read: true,
        write: true,
        execute: false,
      },
      group: {
        read: true,
        write: false,
        execute: false,
      },
      other: {
        read: true,
        write: false,
        execute: false,
      },
      effectiveUserIdentity: true,
      effectiveGroupIdentity: true,
      stickyBit: true,
    };
    const fileModeFromOctalString2 = parseOctalFileMode("7644");
    const octalFildMode2 = toOctalFileMode(expectedFileMode2);
    const symblicFileModeString2 = toSymbolicFileMode(expectedFileMode2);
    const fileModeFromSymblicString2 = parseSymbolicFileMode("rwSr-Sr-S");
    const fileModeFromSymblicString2Witht = parseSymbolicFileMode("rwSr-Sr-T");

    assert.deepEqual(fileModeFromOctalString2, expectedFileMode2);
    assert.deepEqual(fileModeFromSymblicString2, expectedFileMode2);
    assert.deepEqual(fileModeFromSymblicString2Witht, expectedFileMode2);
    assert.deepEqual(octalFildMode2, "7644");
    assert.deepEqual(symblicFileModeString2, "rwSr-Sr-T");

    const expectedFileMode3: NfsFileMode = {
      owner: {
        read: true,
        write: false,
        execute: true,
      },
      group: {
        read: false,
        write: true,
        execute: false,
      },
      other: {
        read: false,
        write: true,
        execute: true,
      },
      effectiveUserIdentity: false,
      effectiveGroupIdentity: false,
      stickyBit: true,
    };
    const fileModeFromOctalString3 = parseOctalFileMode("1523");
    const octalFildMode3 = toOctalFileMode(expectedFileMode3);
    const symblicFileModeString3 = toSymbolicFileMode(expectedFileMode3);
    const fileModeFromSymblicString3 = parseSymbolicFileMode("r-x-w--ws");
    const fileModeFromSymblicString3Witht = parseSymbolicFileMode("r-x-w--wt");

    assert.deepEqual(fileModeFromOctalString3, expectedFileMode3);
    assert.deepEqual(fileModeFromSymblicString3, expectedFileMode3);
    assert.deepEqual(fileModeFromSymblicString3Witht, expectedFileMode3);
    assert.deepEqual(octalFildMode3, "1523");
    assert.deepEqual(symblicFileModeString3, "r-x-w--wt");
  });
});
