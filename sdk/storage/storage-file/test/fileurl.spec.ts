import { isNode } from "@azure/ms-rest-js";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { Aborter } from "../src/Aborter";
import { DirectoryURL } from "../src/DirectoryURL";
import { FileURL } from "../src/FileURL";
import { FileForceCloseHandlesResponse, DirectoryCreateResponse } from "../src/generated/src/models";
import { ShareURL } from "../src/ShareURL";
import { bodyToString, getBSU } from "./utils";
import { delay, record } from "./utils/recorder";
import { FileSystemAttributes } from '../src/FileSystemAttributes';
import { truncatedISO8061Date } from '../src/utils/utils.common';

dotenv.config({ path: "../.env" });

describe("FileURL", () => {
  const serviceURL = getBSU();
  let shareName: string;
  let shareURL: ShareURL;
  let dirName: string;
  let dirURL: DirectoryURL;
  let defaultDirCreateResp: DirectoryCreateResponse;
  let fileName: string;
  let fileURL: FileURL;
  const content = "Hello World";

  let recorder: any;

  let fullFileAttributes = new FileSystemAttributes();
  fullFileAttributes.readonly = true;
  fullFileAttributes.hidden = true;
  fullFileAttributes.system = true;
  fullFileAttributes.archive = true;
  fullFileAttributes.temporary = true;
  fullFileAttributes.offline = true;
  fullFileAttributes.notContentIndexed = true;
  fullFileAttributes.noScrubData = true;

  beforeEach(async function() {
    recorder = record(this);

    shareName = recorder.getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);

    dirName = recorder.getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    defaultDirCreateResp = await dirURL.create(Aborter.none);

    fileName = recorder.getUniqueName("file");
    fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
    recorder.stop();
  });

  it("create with default parameters", async () => {
    const cResp = await fileURL.create(Aborter.none, content.length);
    assert.equal(cResp.errorCode, undefined);
    assert.equal(cResp.fileAttributes!, "Archive");
    assert.ok(cResp.fileChangeTime!);
    assert.ok(cResp.fileCreationTime!);
    assert.ok(cResp.fileId!);
    assert.ok(cResp.fileLastWriteTime!);
    assert.ok(cResp.fileParentId!);
    assert.ok(cResp.filePermissionKey!);

    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(
      await bodyToString(result, content.length),
      "\u0000".repeat(content.length)
    );
  });

  it("create with all parameters configured setting filePermissionKey", async () => {
    const now = recorder.newDate("now");

    const options = {
      fileHTTPHeaders: {
        fileCacheControl: "fileCacheControl",
        fileContentDisposition: "fileContentDisposition",
        fileContentEncoding: "fileContentEncoding",
        fileContentLanguage: "fileContentLanguage",
        fileContentType: "fileContentType"
      },
      metadata: {
        key1: "vala",
        key2: "valb"
      },
      creationTime: now,
      lastWriteTime: now,
      filePermissionKey: defaultDirCreateResp.filePermissionKey,
      fileAttributes: fullFileAttributes
    };
    await fileURL.create(Aborter.none, 512, options);

    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));

    const properties = await fileURL.getProperties(Aborter.none);
    assert.equal(properties.cacheControl, options.fileHTTPHeaders.fileCacheControl);
    assert.equal(properties.contentDisposition, options.fileHTTPHeaders.fileContentDisposition);
    assert.equal(properties.contentEncoding, options.fileHTTPHeaders.fileContentEncoding);
    assert.equal(properties.contentLanguage, options.fileHTTPHeaders.fileContentLanguage);
    assert.equal(properties.contentType, options.fileHTTPHeaders.fileContentType);
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
    assert.equal(truncatedISO8061Date(properties.fileCreationTime!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(properties.fileLastWriteTime!), truncatedISO8061Date(now));
    assert.equal(properties.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(properties.fileChangeTime!);
    assert.ok(properties.fileId!);
    assert.ok(properties.fileParentId!); 
  });

  it("setProperties with default parameters", async () => {
    await fileURL.create(Aborter.none, content.length);
    await fileURL.setProperties(Aborter.none);

    const result = await fileURL.getProperties(Aborter.none);
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, "Archive");
    assert.ok(result.fileCreationTime!);
    assert.ok(result.fileLastWriteTime!);
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeTime!);
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
    const getPermissionResp = await shareURL.getPermission(Aborter.none, defaultDirCreateResp.filePermissionKey!);
    
    const now = recorder.newDate("now");
    
    const options = {
      fileHTTPHeaders: {
        fileCacheControl: "fileCacheControl",
        fileContentDisposition: "fileContentDisposition",
        fileContentEncoding: "fileContentEncoding",
        fileContentLanguage: "fileContentLanguage",
        fileContentType: "fileContentType"
      },
      metadata: {
        key1: "vala",
        key2: "valb"
      },
      creationTime: now,
      lastWriteTime: now,
      filePermission: getPermissionResp.permission,
      fileAttributes: fullFileAttributes
    };

    await fileURL.create(Aborter.none, content.length);
    await fileURL.setProperties(Aborter.none, options);
    
    const result = await fileURL.getProperties(Aborter.none);
    assert.equal(result.errorCode, undefined);
    const respFileAttributes = FileSystemAttributes.parse(result.fileAttributes!);
    assert.ok(respFileAttributes.readonly);
    assert.ok(respFileAttributes.hidden);
    assert.ok(respFileAttributes.system);
    assert.ok(respFileAttributes.archive);
    assert.ok(respFileAttributes.offline);
    assert.ok(respFileAttributes.notContentIndexed);
    assert.ok(respFileAttributes.noScrubData);
    assert.ok(respFileAttributes.temporary)
    assert.equal(truncatedISO8061Date(result.fileCreationTime!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteTime!), truncatedISO8061Date(now));
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeTime!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!); 
  });

  it("setMetadata with new metadata set", async () => {
    await fileURL.create(Aborter.none, content.length);
    const metadata = {
      a: "a",
      b: "b"
    };
    await fileURL.setMetadata(Aborter.none, metadata);
    const result = await fileURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    await fileURL.create(Aborter.none, content.length);
    const metadata = {
      a: "a",
      b: "b"
    };
    await fileURL.setMetadata(Aborter.none, metadata);
    const result = await fileURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);

    await fileURL.setMetadata(Aborter.none);
    const result2 = await fileURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result2.metadata, {});
  });

  it("setHTTPHeaders with default parameters", async () => {
    await fileURL.create(Aborter.none, content.length);
    await fileURL.setHTTPHeaders(Aborter.none, {});
    const result = await fileURL.getProperties(Aborter.none);

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
    await fileURL.create(Aborter.none, content.length);
    const headers = {
      fileCacheControl: "fileCacheControl",
      fileContentDisposition: "fileContentDisposition",
      fileContentEncoding: "fileContentEncoding",
      fileContentLanguage: "fileContentLanguage",
      fileContentMD5: isNode ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      fileContentType: "fileContentType"
    };
    await fileURL.setHTTPHeaders(Aborter.none, headers);
    const result = await fileURL.getProperties(Aborter.none);
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
    await fileURL.create(Aborter.none, content.length);
    await fileURL.delete(Aborter.none);
  });

  it("startCopyFromURL", async () => {
    await fileURL.create(Aborter.none, 1024);
    const newFileURL = FileURL.fromDirectoryURL(dirURL, recorder.getUniqueName("copiedfile"));
    const result = await newFileURL.startCopyFromURL(Aborter.none, fileURL.url);
    assert.ok(result.copyId);

    const properties1 = await fileURL.getProperties(Aborter.none);
    const properties2 = await newFileURL.getProperties(Aborter.none);
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.deepStrictEqual(properties2.copySource, fileURL.url);
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    await fileURL.create(Aborter.none, content.length);
    const newFileURL = FileURL.fromDirectoryURL(dirURL, recorder.getUniqueName("copiedfile"));
    const result = await newFileURL.startCopyFromURL(Aborter.none, fileURL.url);
    assert.ok(result.copyId);
    await delay(1 * 1000);

    try {
      await newFileURL.abortCopyFromURL(Aborter.none, result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation."
      );
    } catch (err) {
      assert.ok(true);
    }
  });

  it("resize", async () => {
    await fileURL.create(Aborter.none, content.length);
    const properties = await fileURL.getProperties(Aborter.none);
    assert.deepStrictEqual(properties.contentLength, content.length);

    await fileURL.resize(Aborter.none, 1);
    const updatedProperties = await fileURL.getProperties(Aborter.none);
    assert.deepStrictEqual(updatedProperties.contentLength, 1);
  });

  it("uploadRange", async () => {
    await fileURL.create(Aborter.none, 10);
    await fileURL.uploadRange(Aborter.none, "Hello", 0, 5);
    await fileURL.uploadRange(Aborter.none, "World", 5, 5);
    const response = await fileURL.download(Aborter.none, 0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("uploadRange with conent MD5", async () => {
    await fileURL.create(Aborter.none, 10);
    await fileURL.uploadRange(Aborter.none, "Hello", 0, 5, {
      contentMD5: new Uint8Array([
        0x8b,
        0x1a,
        0x99,
        0x53,
        0xc4,
        0x61,
        0x12,
        0x96,
        0xa8,
        0x27,
        0xab,
        0xf8,
        0xc4,
        0x78,
        0x04,
        0xd7
      ])
    });
    await fileURL.uploadRange(Aborter.none, "World", 5, 5);
    const response = await fileURL.download(Aborter.none, 0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("uploadRange with progress event", async () => {
    await fileURL.create(Aborter.none, 10);
    let progressUpdated = false;
    await fileURL.uploadRange(Aborter.none, "HelloWorld", 0, 10, {
      progress: () => {
        progressUpdated = true;
      }
    });
    assert.deepStrictEqual(progressUpdated, true);
  });

  it("clearRange", async () => {
    await fileURL.create(Aborter.none, 10);
    await fileURL.uploadRange(Aborter.none, "Hello", 0, 5);
    await fileURL.uploadRange(Aborter.none, "World", 5, 5);
    await fileURL.clearRange(Aborter.none, 1, 8);

    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 10), "H" + "\u0000".repeat(8) + "d");
  });

  it("getRangeList", async () => {
    await fileURL.create(Aborter.none, 10);
    await fileURL.uploadRange(Aborter.none, "Hello", 0, 5);
    await fileURL.uploadRange(Aborter.none, "World", 5, 5);
    await fileURL.clearRange(Aborter.none, 1, 8);

    const result = await fileURL.getRangeList(Aborter.none);
    assert.deepStrictEqual(result.rangeList.length, 1);
    assert.deepStrictEqual(result.rangeList[0], { start: 0, end: 9 });
  });

  it("download with default parameters", async () => {
    await fileURL.create(Aborter.none, content.length);
    await fileURL.uploadRange(Aborter.none, content, 0, content.length);
    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("download should not have aborted error after download finishes", async () => {
    await fileURL.create(Aborter.none, content.length);
    await fileURL.uploadRange(Aborter.none, content, 0, content.length);

    const aborter = Aborter.none;
    const result = await fileURL.download(aborter, 0);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("download all parameters set", async () => {
    await fileURL.create(Aborter.none, content.length);
    await fileURL.uploadRange(Aborter.none, content, 0, content.length);
    const result = await fileURL.download(Aborter.none, 0, 1, {
      rangeGetContentMD5: true
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it("download partial content", async () => {
    await fileURL.create(Aborter.none, 10);
    await fileURL.uploadRange(Aborter.none, "HelloWorld", 0, 10);

    const result = await fileURL.download(Aborter.none, 0, 2);
    assert.deepStrictEqual(await bodyToString(result, 2), "He");
  });

  it("download should update progress and abort successfully", async () => {
    await fileURL.create(Aborter.none, 128 * 1024 * 1024);

    let eventTriggered = false;
    try {
      const aborter = Aborter.none;
      const result = await fileURL.download(aborter, 0, undefined, {
        progress: () => {
          eventTriggered = true;
          aborter.abort();
        }
      });

      await new Promise((resolve, reject) => {
        if (isNode) {
          // Receiving data...
          const rs = result.readableStreamBody!;

          // tslint:disable-next-line:no-empty
          rs.on("data", () => {});
          rs.on("end", resolve);
          rs.on("error", reject);
        } else {
          result.blobBody!.then(resolve).catch(reject);
        }
      });

      assert.fail();
      // tslint:disable-next-line:no-empty
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("listHandles should work", async () => {
    await fileURL.create(Aborter.none, 10);

    const result = await fileURL.listHandlesSegment(Aborter.none, undefined);
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      assert.notDeepStrictEqual(handle.handleId, undefined);
      assert.notDeepStrictEqual(handle.path, undefined);
      assert.notDeepStrictEqual(handle.fileId, undefined);
      assert.notDeepStrictEqual(handle.sessionId, undefined);
      assert.notDeepStrictEqual(handle.clientIp, undefined);
      assert.notDeepStrictEqual(handle.openTime, undefined);
    }
  });

  it("forceCloseHandlesSegment should work", async () => {
    await fileURL.create(Aborter.none, 10);

    // TODO: Open or create a handle

    let marker: string | undefined = "";

    do {
      const response: FileForceCloseHandlesResponse = await fileURL.forceCloseHandlesSegment(Aborter.none, marker);
      marker = response.marker;
    } while (marker)
  });

  it("forceCloseHandle should work", async () => {
    await fileURL.create(Aborter.none, 10);

    // TODO: Open or create a handle
    
    const result = await fileURL.listHandlesSegment(Aborter.none, undefined);
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirURL.forceCloseHandle(Aborter.none, handle.handleId);
    }
  });
});
