// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { AbortController } from "@azure/abort-controller";
import { isNode, URLBuilder, URLQuery } from "@azure/core-http";
import { delay, isLiveMode, record, Recorder } from "@azure-tools/test-recorder";
import { context, setSpan } from "@azure/core-tracing";
import { Context } from "mocha";
import { setTracer, SpanGraph } from "@azure/test-utils";

import { FileStartCopyOptions, ShareClient, ShareDirectoryClient, ShareFileClient } from "../src";
import { FileSystemAttributes } from "../src/FileSystemAttributes";
import { DirectoryCreateResponse } from "../src/generated/src/models";
import { Pipeline } from "../src/Pipeline";
import { FILE_MAX_SIZE_BYTES } from "../src/utils/constants";
import { truncatedISO8061Date } from "../src/utils/utils.common";
import { bodyToString, compareBodyWithUint8Array, getBSU, recorderEnvSetup } from "./utils";
import { MockPolicyFactory } from "./utils/MockPolicyFactory";

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
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.getUniqueName("dir");
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();

    fileName = recorder.getUniqueName("file");
    fileClient = dirClient.getFileClient(fileName);
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await shareClient.delete({ deleteSnapshots: "include" });
      await recorder.stop();
    }
  });

  it("create with default parameters", async () => {
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
      "\u0000".repeat(content.length)
    );
  });

  it("create with all parameters configured setting filePermissionKey", async () => {
    const now = recorder.newDate("now");

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

  it("setProperties with all parameters configured setting filePermission", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!
    );

    const now = recorder.newDate("now");

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
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
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

    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("setHTTPHeaders with all parameters set", async () => {
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

  it("deleteIfExists when parent not exists", async () => {
    const newDirectoryClient = shareClient.getDirectoryClient(recorder.getUniqueName("newdir"));
    const newFileClient = newDirectoryClient.getFileClient(fileName);
    const res = await newFileClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ParentNotFound");
  });

  it("exists", async () => {
    assert.ok(!(await fileClient.exists()));
    await fileClient.create(content.length);
    assert.ok(await fileClient.exists());
  });

  it("startCopyFromURL", async () => {
    recorder.skip("browser");
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(recorder.getUniqueName("copiedfile"));
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    // A service feature is being rolling out which will sanitize the sig field
    // so we remove it before comparing urls.
    assert.ok(properties2.copySource, "Expecting valid 'properties2.copySource");

    const sanitizedActualUrl = URLBuilder.parse(properties2.copySource!);
    const sanitizedQuery = URLQuery.parse(sanitizedActualUrl.getQuery()!);
    sanitizedQuery.set("sig", undefined);
    sanitizedActualUrl.setQuery(sanitizedQuery.toString());

    const sanitizedExpectedUrl = URLBuilder.parse(fileClient.url);
    const sanitizedQuery2 = URLQuery.parse(sanitizedActualUrl.getQuery()!);
    sanitizedQuery2.set("sig", undefined);
    sanitizedExpectedUrl.setQuery(sanitizedQuery.toString());

    assert.strictEqual(
      sanitizedActualUrl.toString(),
      sanitizedExpectedUrl.toString(),
      "copySource does not match original source"
    );
  });

  it("startCopyFromURL ignore readonly", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(recorder.getUniqueName("copiedfile"));
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

  it("startCopyFromURL with smb options", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(recorder.getUniqueName("copiedfile"));

    const fileAttributesInstance = new FileSystemAttributes();
    fileAttributesInstance.hidden = true;
    fileAttributesInstance.system = true;
    const fileAttributes = fileAttributesInstance.toString();

    const fileCreationDate = new Date("05 October 2011 14:48 UTC");
    const fileCreationTime = truncatedISO8061Date(fileCreationDate);
    const options: FileStartCopyOptions = {
      filePermission: filePermissionInSDDL,
      copyFileSmbInfo: {
        filePermissionCopyMode: "override",
        ignoreReadOnly: false,
        fileAttributes,
        fileCreationTime,
        fileLastWriteTime: "source",
        setArchiveAttribute: false,
      },
    };

    const result = await newFileClient.startCopyFromURL(fileClient.url, options);
    assert.ok(result.copyId);
    const sourceProperties = await fileClient.getProperties();
    const targetProperties = await newFileClient.getProperties();

    assert.deepStrictEqual(
      FileSystemAttributes.parse(targetProperties.fileAttributes!),
      fileAttributesInstance
    );
    assert.deepStrictEqual(targetProperties.fileLastWriteOn, sourceProperties.fileLastWriteOn);
    assert.deepStrictEqual(targetProperties.fileCreatedOn, fileCreationDate);
  });

  it("startCopyFromURL with smb options: filePermissionKey", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(recorder.getUniqueName("copiedfile"));

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
      fileAttributesInstance
    );
    assert.deepStrictEqual(targetProperties.fileLastWriteOn, sourceProperties.fileLastWriteOn);
    assert.deepStrictEqual(targetProperties.fileCreatedOn, fileCreationDate);
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    await fileClient.create(content.length);
    const newFileClient = dirClient.getFileClient(recorder.getUniqueName("copiedfile"));
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation."
      );
    } catch (err) {
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

  it("uploadData should work with ArrayBuffer and ArrayBufferView", async () => {
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
        new Uint8Array(arrayBuf, uint16Array.byteOffset, uint16Array.byteLength)
      )
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

  it("uploadRange with progress event", async () => {
    recorder.skip(
      "browser",
      "record & playback issue: https://github.com/Azure/azure-sdk-for-js/issues/6476"
    );
    await fileClient.create(10);
    let progressUpdated = false;
    await fileClient.uploadRange("HelloWorld", 0, 10, {
      onProgress: () => {
        progressUpdated = true;
      },
    });
    assert.equal(progressUpdated, true);

    const response = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(response), "HelloWorld");
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
    console.log(result.clearRanges);
    console.log(result.ranges);
    console.log(result.requestId);

    assert.ok(result.clearRanges);
    assert.deepStrictEqual(result.clearRanges!.length, 1);
    assert.deepStrictEqual(result.clearRanges![0], { start: 0, end: 511 });

    assert.ok(result.ranges);
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

  it("download should update progress and abort successfully", async () => {
    recorder.skip(
      undefined,
      "Abort - Recorder does not record a request if it's aborted in a 'progress' callback"
    );
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
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
    assert.ok(eventTriggered);
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
      "Error in forceCloseAllHandles"
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

  it("forceCloseHandle could return closeFailureCount", async () => {
    await fileClient.create(10);

    // TODO: Open or create a handle, currently have to do this manually
    const result = (await fileClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const mockPolicyFactory = new MockPolicyFactory({ numberOfHandlesFailedToClose: 1 });
      const factories = (fileClient as any).pipeline.factories.slice(); // clone factories array
      factories.unshift(mockPolicyFactory);
      const pipeline = new Pipeline(factories);
      const mockFileClient = new ShareFileClient(fileClient.url, pipeline);

      const handle = result.handleList[0];
      const closeResp = await mockFileClient.forceCloseHandle(handle.handleId);
      assert.equal(
        closeResp.closeFailureCount,
        1,
        "Number of handles failed to close is not as set."
      );
    }
  });

  it("forceCloseAllHandles return correct closeFailureCount", async () => {
    await fileClient.create(10);

    // TODO: Open or create a handle; currently have to do this manually
    const result = (await fileClient.listHandles().byPage().next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const mockPolicyFactory = new MockPolicyFactory({ numberOfHandlesFailedToClose: 1 });
      const factories = (fileClient as any).pipeline.factories.slice(); // clone factories array
      factories.unshift(mockPolicyFactory);
      const pipeline = new Pipeline(factories);
      const mockFileClient = new ShareFileClient(fileClient.url, pipeline);
      const closeResp = await mockFileClient.forceCloseAllHandles();
      assert.equal(
        closeResp.closeFailureCount,
        1,
        "Number of handles failed to close is not as set."
      );
    }

    const closeAllResp = await fileClient.forceCloseAllHandles();
    assert.equal(
      closeAllResp.closeFailureCount,
      0,
      "The closeFailureCount is not set to 0 as default."
    );
  });

  it("create with tracing", async () => {
    const tracer = setTracer();
    const rootSpan = tracer.startSpan("root");
    await fileClient.create(content.length, {
      tracingOptions: {
        tracingContext: setSpan(context.active(), rootSpan),
      },
    });
    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children: [
            {
              name: "Azure.Storage.File.ShareFileClient-create",
              children: [
                {
                  name: "HTTP PUT",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.spanContext().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });

  // STG81
  it("rename", async () => {
    await fileClient.create(1024);
    const destFileName = recorder.getUniqueName("destfile");
    const result = await fileClient.rename(destFileName);
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected"
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await fileClient.getProperties();
    } catch (err) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename with metadata", async () => {
    await fileClient.create(1024);

    const metadata = {
      key1: "vala",
      key2: "valb",
    };
    const destFileName = recorder.getUniqueName("destfile");
    const result = await fileClient.rename(destFileName, {
      metadata: metadata,
    });
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected"
    );

    // Validate destination existence.
    const propertiesResult = await result.destinationFileClient.getProperties();
    assert.deepStrictEqual(propertiesResult.metadata, metadata, "Metadata should be expected.");

    try {
      await fileClient.getProperties();
    } catch (err) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename to under a different directory", async () => {
    const sourceParentDirName = recorder.getUniqueName("sourcedir");
    const sourceParentDir = shareClient.getDirectoryClient(sourceParentDirName);
    await sourceParentDir.create();

    const sourdeFileName = recorder.getUniqueName("sourcefile");
    const sourceFile = sourceParentDir.getFileClient(sourdeFileName);
    await sourceFile.create(1024);

    const destParentDirName = recorder.getUniqueName("destdir");
    const destParentDir = shareClient.getDirectoryClient(destParentDirName);
    await destParentDir.create();

    const destFileName = recorder.getUniqueName("destfile");
    const destFilePath = destParentDirName + "/" + destFileName;

    const result = await sourceFile.rename(destFilePath);
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected"
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await sourceFile.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - replaceIfExists = true ", async () => {
    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.getUniqueName("destfile");
    await shareClient.getDirectoryClient("").getFileClient(destFileName).create(2048);

    const result = await sourceFileClient.rename(destFileName, {
      replaceIfExists: true,
    });

    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected"
    );

    // Validate destination existence.
    await result.destinationFileClient.getProperties();

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - replaceIfExists = false", async () => {
    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.getUniqueName("destfile");
    const targetFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await targetFileClient.create(2048);

    try {
      await sourceFileClient.rename(destFileName);
      assert.fail("Should got conflict error when trying to overwrite an exiting file");
    } catch (err) {
      assert.ok(
        (err.statusCode as number) === 409,
        "Should got conflict error when trying to overwrite an exiting file"
      );
    }

    await sourceFileClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.ok(properties.contentLength === 2048, "The origin file should still exist");
  });

  it("rename - ignoreReadOnly = true", async () => {
    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.getUniqueName("destfile");
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
    } catch (err) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - ignoreReadOnly = false", async () => {
    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.getUniqueName("destfile");
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
    } catch (err) {
      assert.ok(
        (err.statusCode as number) === 409,
        "Should got conflict error when trying to overwrite an exiting file"
      );
    }

    await sourceFileClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.ok(properties.contentLength === 2048, "The origin file should still exist");
  });

  it("rename - destination leased", async () => {
    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.getUniqueName("destfile");
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
    } catch (err) {
      assert.ok((err.statusCode as number) === 404, "Source directory should not exist anymore");
    }
  });

  it("rename - destination leased - no lease access condition", async () => {
    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const destFileName = recorder.getUniqueName("destfile");
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
    } catch (err) {
      assert.ok(
        (err.statusCode as number) === 412,
        "Should got conflict error when trying to overwrite an exiting file"
      );
    }

    await sourceFileClient.getProperties();
    const properties = await targetFileClient.getProperties();
    assert.ok(properties.contentLength === 2048, "The origin file should still exist");
  });

  it("rename - source leased", async () => {
    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const leaseClient = sourceFileClient.getShareLeaseClient();
    const leaseResult = await leaseClient.acquireLease(-1);

    const destFileName = recorder.getUniqueName("destfile");

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
      "Destination client instance should be expected"
    );

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - source leased - no lease access condition", async () => {
    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const leaseClient = sourceFileClient.getShareLeaseClient();
    await leaseClient.acquireLease(-1);

    const destFileName = recorder.getUniqueName("destfile");

    try {
      await sourceFileClient.rename(destFileName);
      assert.fail("Should got conflict error when trying to overwrite an exiting file");
    } catch (err) {
      assert.ok(
        (err.statusCode as number) === 412,
        "Should got conflict error when trying to overwrite an exiting file"
      );
    }

    await sourceFileClient.getProperties();
  });

  it("rename - Non-ASCII source and destination", async () => {
    const destFileName = recorder.getUniqueName("汉字. dest ~!@#$%^&()_+`1234567890-={}[];','");

    const sourceFileName = recorder.getUniqueName("汉字. source ~!@#$%^&()_+`1234567890-={}[];','");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const result = await sourceFileClient.rename(destFileName);
    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected"
    );

    await result.destinationFileClient.getProperties();

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - with file permission", async () => {
    const destFileName = recorder.getUniqueName("destfile");
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";

    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const result = await sourceFileClient.rename(destFileName, {
      filePermission: filePermission,
    });

    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected"
    );

    const properties = await result.destinationFileClient.getProperties();
    assert.ok(properties.filePermissionKey, "File permission should have been set to destination");

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err) {
      assert.ok((err.statusCode as number) === 404, "Source file should not exist anymore");
    }
  });

  it("rename - SMB properties", async () => {
    const destFileName = recorder.getUniqueName("destfile");
    const filePermission =
      "O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)";
    const permissionResponse = await shareClient.createPermission(filePermission);

    const fileAttributesInstance = new FileSystemAttributes();
    fileAttributesInstance.hidden = true;
    fileAttributesInstance.readonly = true;

    const creationDate = new Date("05 October 2019 14:48 UTC");
    const lastwriteTime = new Date("15 October 2019 14:48 UTC");

    const copyFileSMBInfo = {
      fileAttributes: fileAttributesInstance.toString(),
      fileCreationTime: truncatedISO8061Date(creationDate),
      fileLastWriteTime: truncatedISO8061Date(lastwriteTime),
    };

    const sourceFileName = recorder.getUniqueName("sourcefile");
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(2048);

    const result = await sourceFileClient.rename(destFileName, {
      filePermissionKey: permissionResponse.filePermissionKey,
      copyFileSmbInfo: copyFileSMBInfo,
    });

    assert.ok(
      result.destinationFileClient.name === destFileName,
      "Destination name should be expected"
    );

    const properties = await result.destinationFileClient.getProperties();
    assert.ok(properties.filePermissionKey, "File permission should have been set to destination");
    assert.ok(
      truncatedISO8061Date(properties.fileCreatedOn!) === truncatedISO8061Date(creationDate),
      "Creation time should be expected"
    );
    assert.ok(
      truncatedISO8061Date(properties.fileLastWriteOn!) === truncatedISO8061Date(lastwriteTime),
      "Last write time should be expected"
    );
    const fileSystemAttributes = FileSystemAttributes.parse(properties.fileAttributes!);
    assert.ok(
      fileSystemAttributes.readonly && fileSystemAttributes.hidden,
      "File attributes should be expected"
    );

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err) {
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
      "FilePath is not the same as the one provided."
    );
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided."
    );
    assert.equal(
      newClient.name,
      fileName,
      "FileClient name is not the same as the baseName of the provided file URI"
    );
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(
      `https://${accountName}.file.core.windows.net/${shareName}/${dirName}/${fileName}`
    );
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://192.0.0.10:1900/${accountName}/${shareName}/${dirName}/${fileName}`
    );
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${shareName}/${dirName}/${fileName}`
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${shareName}/${dirName}/${fileName}`);
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new ShareFileClient(
      `https://customdomain.com/${shareName}/${dirName}/${fileName}`
    );

    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
    assert.equal(newClient.shareName, shareName, "Share name is not the same as the one provided.");
    assert.equal(
      newClient.path,
      dirName + "/" + fileName,
      "FilePath is not the same as the one provided."
    );
    assert.equal(
      newClient.name,
      fileName,
      "FileClient name is not the same as the baseName of the provided file URI"
    );
  });
});
