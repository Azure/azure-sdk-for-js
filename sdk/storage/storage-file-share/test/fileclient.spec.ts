// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController } from "@azure/abort-controller";
import { isNode, isBrowser } from "@azure/core-util";
import { delay, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assert } from "@azure-tools/test-utils";

import {
  FileStartCopyOptions,
  ShareClient,
  ShareDirectoryClient,
  ShareFileClient,
  ShareServiceClient,
} from "../src";
import { FileSystemAttributes } from "../src/FileSystemAttributes";
import { DirectoryCreateResponse } from "../src/generated/src/models";
import { FILE_MAX_SIZE_BYTES } from "../src/utils/constants";
import { truncatedISO8061Date } from "../src/utils/utils.common";
import {
  bodyToString,
  compareBodyWithUint8Array,
  getBSU,
  getTokenBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils";

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

    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = dirClient.getFileClient(fileName);
  });

  afterEach(async function (this: Context) {
    if (shareClient) {
      await shareClient.delete({ deleteSnapshots: "include" });
    }
    await recorder.stop();
  });

  it("create with default parameters", async function () {
    const cResp = await fileClient.create(content.length);
    assert.equal(cResp.errorCode, undefined);
    assert.equal(cResp.fileAttributes!, "Archive");
    assert.ok(cResp.fileChangeOn!);
    assert.ok(cResp.fileCreatedOn!);
    assert.ok(cResp.fileId!);
    assert.ok(cResp.fileLastWriteOn!);
    assert.ok(cResp.fileParentId!);
    assert.ok(cResp.filePermissionKey!);

    const result = await fileClient.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, content.length),
      "\u0000".repeat(content.length),
    );
  });

  it("create with all parameters configured setting filePermissionKey", async function () {
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
    assert.ok(respFileAttributesFromDownload.readonly);
    assert.ok(respFileAttributesFromDownload.hidden);
    assert.ok(respFileAttributesFromDownload.system);
    assert.ok(respFileAttributesFromDownload.archive);
    assert.ok(respFileAttributesFromDownload.offline);
    assert.ok(respFileAttributesFromDownload.notContentIndexed);
    assert.ok(respFileAttributesFromDownload.noScrubData);
    assert.ok(respFileAttributesFromDownload.temporary);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);

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
    assert.ok(respFileAttributes.readonly);
    assert.ok(respFileAttributes.hidden);
    assert.ok(respFileAttributes.system);
    assert.ok(respFileAttributes.archive);
    assert.ok(respFileAttributes.offline);
    assert.ok(respFileAttributes.notContentIndexed);
    assert.ok(respFileAttributes.noScrubData);
    assert.ok(respFileAttributes.temporary);
    assert.equal(truncatedISO8061Date(properties.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(properties.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.equal(properties.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(properties.fileChangeOn!);
    assert.ok(properties.fileId!);
    assert.ok(properties.fileParentId!);
  });

  it("create largest file", async function () {
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

    assert.ok(foundFile, "The file should have been created.");

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

    assert.ok(foundFile, "The file should have been created.");

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

    assert.ok(foundDir, "The directory should have been created.");

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

    assert.ok(foundDir, "The file should have been created.");

    await dirClientShouldInRootDir.delete();
  });

  it("setProperties with default parameters", async function () {
    await fileClient.create(content.length);
    await fileClient.setProperties();

    const result = await fileClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, "Archive");
    assert.ok(result.fileCreatedOn!);
    assert.ok(result.fileLastWriteOn!);
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("setProperties with all parameters configured setting filePermission", async function () {
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
    assert.ok(respFileAttributes.readonly);
    assert.ok(respFileAttributes.hidden);
    assert.ok(respFileAttributes.system);
    assert.ok(respFileAttributes.archive);
    assert.ok(respFileAttributes.offline);
    assert.ok(respFileAttributes.notContentIndexed);
    assert.ok(respFileAttributes.noScrubData);
    assert.ok(respFileAttributes.temporary);
    assert.equal(truncatedISO8061Date(result.fileCreatedOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteOn!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileChangeOn!), truncatedISO8061Date(now));
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("setMetadata with new metadata set", async function () {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata);
    const result = await fileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async function () {
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

  it("setHTTPHeaders with default parameters", async function () {
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders({});
    const result = await fileClient.getProperties();

    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("setHTTPHeaders with all parameters set", async function () {
    await fileClient.create(content.length);
    const headers = {
      fileCacheControl: "fileCacheControl",
      fileContentDisposition: "fileContentDisposition",
      fileContentEncoding: "fileContentEncoding",
      fileContentLanguage: "fileContentLanguage",
      fileContentMD5: isNode ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      fileContentType: "fileContentType",
    };
    await fileClient.setHttpHeaders(headers);
    const result = await fileClient.getProperties();
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.deepStrictEqual(result.cacheControl, headers.fileCacheControl);
    assert.deepStrictEqual(result.contentType, headers.fileContentType);
    assert.deepStrictEqual(result.contentMD5, headers.fileContentMD5);
    assert.deepStrictEqual(result.contentEncoding, headers.fileContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, headers.fileContentLanguage);
    assert.deepStrictEqual(result.contentDisposition, headers.fileContentDisposition);
  });

  it("delete", async function () {
    await fileClient.create(content.length);
    await fileClient.delete();
  });

  it("deleteIfExists", async function () {
    const res = await fileClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await fileClient.create(content.length);
    const res2 = await fileClient.deleteIfExists();
    assert.ok(res2.succeeded);
  });

  it("deleteIfExists when parent not exists", async function () {
    const newDirectoryClient = shareClient.getDirectoryClient(
      recorder.variable("newdir", getUniqueName("newdir")),
    );
    const newFileClient = newDirectoryClient.getFileClient(fileName);
    const res = await newFileClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ParentNotFound");
  });

  it("exists", async function () {
    assert.ok(!(await fileClient.exists()));
    await fileClient.create(content.length);
    assert.ok(await fileClient.exists());
  });

  it("startCopyFromURL", async function () {
    if (!isNode && !isLiveMode()) {
      this.skip();
    }
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    // we don't record this header so we can't find it during playback
    if (isLiveMode()) {
      // A service feature is being rolling out which will sanitize the sig field
      // so we remove it before comparing urls.
      assert.ok(properties2.copySource, "Expecting valid 'properties2.copySource");

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

  it("startCopyFromURL ignore readonly", async function () {
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
    assert.ok(result.copyId);
    const sourceProperties = await fileClient.getProperties();
    const targetProperties = await newFileClient.getProperties();

    assert.equal(targetProperties.contentLength, 1024);
    assert.deepStrictEqual(targetProperties.fileLastWriteOn, sourceProperties.fileLastWriteOn);
  });

  it("startCopyFromURL with smb options", async function () {
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
    assert.ok(result.copyId);
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

  it("startCopyFromURL with smb options: filePermissionKey", async function () {
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
    assert.ok(result.copyId);
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

  it("abortCopyFromURL should failed for a completed copy operation", async function () {
    await fileClient.create(content.length);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation.",
      );
    } catch (err: any) {
      assert.ok(true);
    }
  });

  it("resize", async function () {
    await fileClient.create(content.length);
    const properties = await fileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, content.length);

    await fileClient.resize(1);
    const updatedProperties = await fileClient.getProperties();
    assert.deepStrictEqual(updatedProperties.contentLength, 1);
  });

  it("resize with all parameters", async function () {
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
    assert.ok(respFileAttributes.readonly);
    assert.ok(respFileAttributes.hidden);
    assert.ok(respFileAttributes.system);
    assert.ok(respFileAttributes.archive);
    assert.ok(respFileAttributes.offline);
    assert.ok(respFileAttributes.notContentIndexed);
    assert.ok(respFileAttributes.noScrubData);
    assert.ok(respFileAttributes.temporary);
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

  it("uploadData", async function () {
    await fileClient.create(10);
    await fileClient.uploadData(isNode ? Buffer.from(content) : new Blob([content]));
    const response = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(response), content);
  });

  it("uploadData should work with ArrayBuffer and ArrayBufferView", async function () {
    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    await fileClient.uploadData(arrayBuf);
    const res = await fileClient.download();
    assert.ok(compareBodyWithUint8Array(res, uint8Array));

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    await fileClient.uploadData(uint8ArrayPartial);
    const res1 = await fileClient.download();
    assert.ok(compareBodyWithUint8Array(res1, uint8ArrayPartial));

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    await fileClient.uploadData(uint16Array);
    const res2 = await fileClient.download();
    assert.ok(
      compareBodyWithUint8Array(
        res2,
        new Uint8Array(arrayBuf, uint16Array.byteOffset, uint16Array.byteLength),
      ),
    );
  });

  it("uploadRange", async function () {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("uploadRange with content MD5", async function () {
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

  it("uploadRange with progress event", async function () {
    if (!isNode && !isLiveMode()) {
      this.skip();
    }
    await fileClient.create(10);
    let progressUpdated = false;
    // fetch http client doesn't fire progress for string bodies, only blob and streams
    const body = isNode ? "HelloWorld" : new Blob(["HelloWorld"]);
    await fileClient.uploadRange(body, 0, 10, {
      onProgress: () => {
        progressUpdated = true;
      },
    });
    assert.equal(progressUpdated, true);

    const response = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(response), "HelloWorld");
  });

  it("uploadRange with lastWriteTime", async function () {
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

  it("clearRange", async function () {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, 10), "H" + "\u0000".repeat(8) + "d");
  });

  it("clearRange with lastWriteTime", async function () {
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

  it("getRangeList", async function () {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(1, 8);

    const result = await fileClient.getRangeList();
    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 0, end: 9 });
  });

  it("getRangeList with share snapshot", async function () {
    await fileClient.create(513); // 512-byte aligned
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    await fileClient.clearRange(0, 513);

    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeList();

    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 512, end: 512 });
  });

  it("getRangeListDiff", async function (this: Context) {
    if (isLiveMode()) {
      // Skipped for now as the result is not stable.
      this.skip();
    }
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);
    const result = await fileClient.getRangeListDiff(snapshotRes.snapshot!);

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with share snapshot", async function (this: Context) {
    if (isLiveMode()) {
      // Skipped for now as the result is not stable.
      this.skip();
    }
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const snapshotRes2 = await shareClient.createSnapshot();
    assert.ok(snapshotRes2.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes2.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!);

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with rename", async function (this: Context) {
    if (isLiveMode()) {
      // Skipped for now as the result is not stable.
      this.skip();
    }
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);

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

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with share snapshot and rename", async function (this: Context) {
    if (isLiveMode()) {
      // Skipped for now as the result is not stable.
      this.skip();
    }
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const newFileName = recorder.variable("rename_file", getUniqueName("rename_file"));
    const renamedFileClient = (await fileClient.rename(newFileName)).destinationFileClient;

    const snapshotRes2 = await shareClient.createSnapshot();
    assert.ok(snapshotRes2.snapshot);

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

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("download with with default parameters", async function () {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);
    const result = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("download should not have aborted error after download finishes", async function () {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);

    const aborter = new AbortController();
    const result = await fileClient.download(0, undefined, { abortSignal: aborter.signal });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("download all parameters set", async function () {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);
    const result = await fileClient.download(0, 1, {
      rangeGetContentMD5: true,
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it("download with progress report", async function () {
    await fileClient.create(content.length);
    await fileClient.uploadRange(content, 0, content.length);
    const result = await fileClient.download(0, undefined, {
      onProgress: () => {
        /* empty */
      },
    });
    assert.deepStrictEqual(await bodyToString(result), content);
  });

  it("download partial content", async function () {
    await fileClient.create(10);
    await fileClient.uploadRange("HelloWorld", 0, 10);

    const result = await fileClient.download(0, 2);
    assert.deepStrictEqual(await bodyToString(result, 2), "He");
  });

  it("download should update progress and abort successfully", async function () {
    if (!isNode || !isLiveMode()) {
      // because this test is using a blob response, there won't be
      // anything to abort by the time onProgress gets called.
      this.skip();
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
        if (isNode) {
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
    assert.ok(eventTriggered);
  });

  it("listHandles should work", async function () {
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

  it("forceCloseAllHandles should work", async function () {
    await fileClient.create(10);

    // TODO: Open or create a handle - Has to be tested locally

    assert.deepStrictEqual(
      await fileClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles",
    );
  });

  it("listHandles for file with Invalid Char should work", async function (this: Context) {
    if (isBrowser && isLiveMode()) {
      // Skipped for now as the generating new version SAS token is not supported in pipeline yet.
      this.skip();
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

  it("forceCloseHandle should work", async function () {
    await fileClient.create(10);

    // TODO: Open or create a handle

    const result = (await fileClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("forceCloseHandle could return closeFailureCount", async function () {
    await fileClient.create(10);
  });

  it("forceCloseAllHandles return correct closeFailureCount", async function () {
    await fileClient.create(10);

    const closeAllResp = await fileClient.forceCloseAllHandles();
    assert.equal(
      closeAllResp.closeFailureCount,
      0,
      "The closeFailureCount is not set to 0 as default.",
    );
  });

  it("create with tracing", async function () {
    await assert.supportsTracing(
      async (options) => {
        await fileClient.create(content.length, options);
      },
      ["ShareFileClient-create"],
    );
  });

  // STG81
  it("rename", async function () {
    await fileClient.create(1024);
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const result = await fileClient.rename(destFileName);
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await fileClient.getProperties();
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename with metadata", async function () {
    await fileClient.create(1024);

    const metadata = {
      key1: "vala",
      key2: "valb",
    };
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const result = await fileClient.rename(destFileName, {
      metadata: metadata,
    });
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    const propertiesResult = await result.destinationFileClient.getProperties();
    assert.deepStrictEqual(propertiesResult.metadata, metadata, "Metadata should be expected.");

    try {
      await fileClient.getProperties();
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename to under a different directory", async function () {
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
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await sourceFile.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - replaceIfExists = true ", async function () {
    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    await shareClient.getDirectoryClient("").getFileClient(destFileName).create(2048);

    const result = await sourceFileClient.rename(destFileName, {
      replaceIfExists: true,
    });

    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - replaceIfExists = false", async function () {
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
      assert.ok(
        (err.statusCode as number) === 409,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await sourceFileClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.ok(properties.contentLength === 2048, "The origin file should still exist");
  });

  it("rename - ignoreReadOnly = true", async function () {
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
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - ignoreReadOnly = false", async function () {
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
      assert.ok(
        (err.statusCode as number) === 409,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await sourceFileClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.ok(properties.contentLength === 2048, "The origin file should still exist");
  });

  it("rename - destination leased", async function () {
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
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - destination leased - no lease access condition", async function () {
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
      assert.ok(
        (err.statusCode as number) === 412,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await sourceFileClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.ok(properties.contentLength === 2048, "The origin file should still exist");
  });

  it("rename - source leased", async function () {
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
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - source leased - no lease access condition", async function () {
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
      assert.ok(
        (err.statusCode as number) === 412,
        "Should got conflict error when trying to overwrite an exiting file",
      );
    }

    await sourceFileClient.getProperties();
  });

  it("rename - Non-ASCII source and destination", async function () {
    const destName = "汉字. dest ~!@#$%^&()_+`1234567890-={}[];','";
    const destFileName = recorder.variable(destName, getUniqueName(destName));

    const sourceName = "汉字. source ~!@#$%^&()_+`1234567890-={}[];','";
    const sourceFileName = recorder.variable(sourceName, getUniqueName(sourceName));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const result = await sourceFileClient.rename(destFileName);
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    await result.destinationFileClient.getProperties();

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - with file permission", async function () {
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";

    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const result = await sourceFileClient.rename(destFileName, {
      filePermission: filePermission,
    });

    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    const properties = await result.destinationFileClient.getProperties();
    assert.ok(properties.filePermissionKey, "File permission should have been set to destination");

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - SMB properties", async function () {
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

    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    const properties = await result.destinationFileClient.getProperties();
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
      truncatedISO8061Date(properties.fileChangeOn!) === truncatedISO8061Date(changeTime),
      "File changed time should be expected",
    );
    const fileSystemAttributes = FileSystemAttributes.parse(properties.fileAttributes!);
    assert.ok(
      fileSystemAttributes.readonly && fileSystemAttributes.hidden,
      "File attributes should be expected",
    );

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - Content type", async function () {
    const destFileName = recorder.variable("destfile", getUniqueName("destfile"));

    const sourceFileName = recorder.variable("sourcefile", getUniqueName("sourcefile"));
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const contentType = "contenttype/subtype";
    const result = await sourceFileClient.rename(destFileName, {
      contentType: contentType,
    });

    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    const properties = await result.destinationFileClient.getProperties();
    assert.equal(properties.contentType, contentType);

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });
});

describe("ShareFileClient - Verify Name Properties", () => {
  const accountName = "myaccount";
  const dirName = "dir1/dir2";
  const fileName = "1.txt";
  const shareName = "shareName";

  function verifyNameProperties(url: string) {
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

  it("verify endpoint from the portal", async function () {
    verifyNameProperties(
      `https://${accountName}.file.core.windows.net/${shareName}/${dirName}/${fileName}`,
    );
  });

  it("verify IPv4 host address as Endpoint", async function () {
    verifyNameProperties(
      `https://192.0.0.10:1900/${accountName}/${shareName}/${dirName}/${fileName}`,
    );
  });

  it("verify IPv6 host address as Endpoint", async function () {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${shareName}/${dirName}/${fileName}`,
    );
  });

  it("verify endpoint without dots", async function () {
    verifyNameProperties(`https://localhost:80/${accountName}/${shareName}/${dirName}/${fileName}`);
  });

  it("verify custom endpoint without valid accountName", async function () {
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
    let serviceClient: ShareServiceClient;
    try {
      serviceClient = getTokenBSU(recorder, "", "", { fileRequestIntent: "backup" });
    } catch (err) {
      this.skip();
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

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await shareClientWithKeyCredential.delete({ deleteSnapshots: "include" });
      await recorder.stop();
    }
  });

  it("create", async () => {
    const cResp = await fileClient.create(content.length);
    assert.equal(cResp.errorCode, undefined);
    assert.equal(cResp.fileAttributes!, "Archive");
    assert.ok(cResp.fileChangeOn!);
    assert.ok(cResp.fileCreatedOn!);
    assert.ok(cResp.fileId!);
    assert.ok(cResp.fileLastWriteOn!);
    assert.ok(cResp.fileParentId!);
    assert.ok(cResp.filePermissionKey!);

    const result = await fileClient.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, content.length),
      "\u0000".repeat(content.length),
    );
  });

  it("setProperties", async function () {
    await fileClient.create(content.length);
    await fileClient.setProperties();

    const result = await fileClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, "Archive");
    assert.ok(result.fileCreatedOn!);
    assert.ok(result.fileLastWriteOn!);
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("setHTTPHeaders", async () => {
    await fileClient.create(content.length);
    await fileClient.setHttpHeaders({});
    const result = await fileClient.getProperties();

    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("delete", async () => {
    await fileClient.create(content.length);
    await fileClient.delete();
  });

  it("deleteIfExists", async () => {
    const res = await fileClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await fileClient.create(content.length);
    const res2 = await fileClient.deleteIfExists();
    assert.ok(res2.succeeded);
  });

  it("exists", async () => {
    assert.ok(!(await fileClient.exists()));
    await fileClient.create(content.length);
    assert.ok(await fileClient.exists());
  });

  it("startCopyFromURL", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile")),
    );
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    if (isLiveMode()) {
      // A service feature is being rolling out which will sanitize the sig field
      // so we remove it before comparing urls.
      assert.ok(properties2.copySource, "Expecting valid 'properties2.copySource");

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
    assert.ok(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation.",
      );
    } catch (err: any) {
      assert.ok(true);
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
    await fileClient.uploadData(isNode ? Buffer.from(content) : new Blob([content]));
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

  it("getRangeListDiff with share snapshot", async function (this: Context) {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClientWithKeyCredential.createSnapshot();
    assert.ok(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const snapshotRes2 = await shareClientWithKeyCredential.createSnapshot();
    assert.ok(snapshotRes2.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes2.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!);

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
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
    assert.ok(
      result.destinationFileClient.name === destFileName,
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

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
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

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await shareClient.delete({ deleteSnapshots: "include" });
      await recorder.stop();
    }
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

    assert.ok(foundFile, "The file with trailing dot should have been created.");
  });

  it("setProperties with default parameters", async function () {
    await fileClient.create(content.length);
    await fileClient.setProperties();

    const result = await fileClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, "Archive");
    assert.ok(result.fileCreatedOn!);
    assert.ok(result.fileLastWriteOn!);
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
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

    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("delete", async () => {
    await fileClient.create(content.length);
    await fileClient.delete();
  });

  it("deleteIfExists", async () => {
    const res = await fileClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await fileClient.create(content.length);
    const res2 = await fileClient.deleteIfExists();
    assert.ok(res2.succeeded);
  });

  it("exists", async () => {
    assert.ok(!(await fileClient.exists()));
    await fileClient.create(content.length);
    assert.ok(await fileClient.exists());
  });

  it("startCopyFromURL", async () => {
    await fileClient.create(1024);
    const copiedFileName = recorder.variable("copiedfile", getUniqueName("copiedfile"));
    const copiedFileNameWithTrailingDots = copiedFileName + "...";
    const newFileClient = dirClient.getFileClient(copiedFileNameWithTrailingDots);
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === copiedFileNameWithTrailingDots) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.ok(foundFile, "The copied file should exist.");

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    assert.ok(properties2.copySource, "Expecting valid 'properties2.copySource");
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    await fileClient.create(content.length);
    const copiedFileName = recorder.variable("copiedfile", getUniqueName("copiedfile"));
    const copiedFileNameWithTrailingDots = copiedFileName + "...";
    const newFileClient = dirClient.getFileClient(copiedFileNameWithTrailingDots);
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation.",
      );
    } catch (err: any) {
      assert.ok(
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
    await fileClient.uploadData(isNode ? Buffer.from(content) : new Blob([content]));
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
    assert.ok(snapshotRes.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeList();

    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 512, end: 512 });
  });

  it("getRangeListDiff", async function (this: Context) {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);
    const result = await fileClient.getRangeListDiff(snapshotRes.snapshot!);

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with share snapshot", async function (this: Context) {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const snapshotRes2 = await shareClient.createSnapshot();
    assert.ok(snapshotRes2.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes2.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!);

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
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
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    let foundFile = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === destFileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.ok(foundFile, "Destination should exist.");

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

    assert.ok(foundFile, "Destination should exist.");

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

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
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

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await shareClient.delete({ deleteSnapshots: "include" });
      await recorder.stop();
    }
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

    assert.ok(foundFile, "The file with trailing dot should have been created.");
  });

  it("setProperties with default parameters", async function () {
    await fileClient.create(content.length);
    await fileClient.setProperties();

    const result = await fileClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, "Archive");
    assert.ok(result.fileCreatedOn!);
    assert.ok(result.fileLastWriteOn!);
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
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

    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("delete", async () => {
    await fileClient.create(content.length);
    await fileClient.delete();
  });

  it("deleteIfExists", async () => {
    const res = await fileClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await fileClient.create(content.length);
    const res2 = await fileClient.deleteIfExists();
    assert.ok(res2.succeeded);
  });

  it("exists", async () => {
    assert.ok(!(await fileClient.exists()));
    await fileClient.create(content.length);
    assert.ok(await fileClient.exists());
  });

  it("startCopyFromURL", async () => {
    await fileClient.create(1024);
    const copiedFileName = recorder.variable("copiedfile", getUniqueName("copiedfile"));
    const copiedFileNameWithTrailingDots = copiedFileName + "...";
    const newFileClient = dirClient.getFileClient(copiedFileNameWithTrailingDots);
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);

    let foundFile = false;
    for await (const item of dirClient.listFilesAndDirectories()) {
      if (item.name === copiedFileName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }

    assert.ok(foundFile, "The copied file should exist.");

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    assert.ok(properties2.copySource, "Expecting valid 'properties2.copySource");
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    await fileClient.create(content.length);
    const copiedFileName = recorder.variable("copiedfile", getUniqueName("copiedfile"));
    const copiedFileNameWithTrailingDots = copiedFileName + "...";
    const newFileClient = dirClient.getFileClient(copiedFileNameWithTrailingDots);
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation.",
      );
    } catch (err: any) {
      assert.ok(
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
    await fileClient.uploadData(isNode ? Buffer.from(content) : new Blob([content]));
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
    assert.ok(snapshotRes.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeList();

    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 512, end: 512 });
  });

  it("getRangeListDiff", async function (this: Context) {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);
    const result = await fileClient.getRangeListDiff(snapshotRes.snapshot!);

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
    assert.deepStrictEqual(result.ranges!.length, 1);
    assert.deepStrictEqual(result.ranges![0], { start: 512, end: 1535 });
  });

  it("getRangeListDiff with share snapshot", async function (this: Context) {
    await fileClient.create(512 * 4 + 1);
    await fileClient.uploadRange("Hello", 0, 5);

    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);

    await fileClient.clearRange(0, 1024);
    await fileClient.uploadRange("World", 1023, 5);

    const snapshotRes2 = await shareClient.createSnapshot();
    assert.ok(snapshotRes2.snapshot);

    await fileClient.uploadRange("Hello", 0, 5);

    const fileClientWithShareSnapShot = fileClient.withShareSnapshot(snapshotRes2.snapshot!);
    const result = await fileClientWithShareSnapShot.getRangeListDiff(snapshotRes.snapshot!);

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
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
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected",
    );

    let foundFile = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === destFileBaseName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }
    assert.ok(foundFile, "Destination should exist.");

    // Validate destination existence.
    await result.destinationFileClient.getProperties();
    assert.equal(await fileClient.exists(), false);

    const firstDestClient = result.destinationFileClient;
    const anotherDestFileBaseName = recorder.variable("destfile1", getUniqueName("destfile1"));
    const anotherDestFileName = anotherDestFileBaseName + ".....";
    const anotherResult = await firstDestClient.rename(anotherDestFileName);
    assert.ok(
      anotherResult.destinationFileClient.name === anotherDestFileName,
      "Destination name should be expected",
    );

    foundFile = false;
    for await (const item of shareClient.getDirectoryClient("").listFilesAndDirectories()) {
      if (item.name === anotherDestFileBaseName) {
        assert.equal(item.kind, "file");
        foundFile = true;
      }
    }
    assert.ok(foundFile, "Destination should exist.");

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

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
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

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await shareClient.delete({ deleteSnapshots: "include" });
      await recorder.stop();
    }
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

    assert.ok(foundFile, "The file with trailing dots trimmed should have been created.");
  });

  it("delete", async () => {
    await fileClient.create(content.length);
    await fileClient.delete();
  });
});
