import * as assert from "assert";
import { isNode } from "@azure/core-http";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";
import { AbortController } from "@azure/abort-controller";
import { record, delay } from "./utils/recorder";
import * as dotenv from "dotenv";
import { ShareClient, DirectoryClient, FileClient } from "../src";
import { getBSU, bodyToString } from "./utils";
import { DirectoryCreateResponse } from "../src/generated/src/models";
import { FileSystemAttributes } from "../src/FileSystemAttributes";
import { truncatedISO8061Date } from "../src/utils/utils.common";

dotenv.config({ path: "../.env" });

describe("FileClient", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: DirectoryClient;
  let defaultDirCreateResp: DirectoryCreateResponse;
  let fileName: string;
  let fileClient: FileClient;
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
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.getUniqueName("dir");
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();

    fileName = recorder.getUniqueName("file");
    fileClient = dirClient.getFileClient(fileName);
  });

  afterEach(async function() {
    await shareClient.delete();
    recorder.stop();
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

  it("setProperties with default parameters", async () => {
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
      b: "b"
    };
    await fileClient.setMetadata(metadata);
    const result = await fileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b"
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
    // IE11 force adds `cache-control: no-cache` for requests sent to Azure Storage server.
    // So, cacheControl has `no-cache` as its value instead of undefined.
    // Disabling the following check until the issue is resolved.
    // assert.ok(!result.cacheControl);
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
      fileContentType: "fileContentType"
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

  it("startCopyFromURL", async () => {
    await fileClient.create(1024);
    const newFileClient = dirClient.getFileClient(recorder.getUniqueName("copiedfile"));
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);

    const properties1 = await fileClient.getProperties();
    const properties2 = await newFileClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.deepStrictEqual(properties2.copySource, fileClient.url);
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

  it("uploadRange", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5);
    await fileClient.uploadRange("World", 5, 5);
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("uploadRange with conent MD5", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("Hello", 0, 5, {
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
    await fileClient.uploadRange("World", 5, 5);
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
  });

  it("uploadRange with progress event", async () => {
    await fileClient.create(10);
    let progressUpdated = false;
    await fileClient.uploadRange("HelloWorld", 0, 10, {
      onProgress: () => {
        progressUpdated = true;
      }
    });
    assert.deepStrictEqual(progressUpdated, true);
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
      rangeGetContentMD5: true
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it("download partial content", async () => {
    await fileClient.create(10);
    await fileClient.uploadRange("HelloWorld", 0, 10);

    const result = await fileClient.download(0, 2);
    assert.deepStrictEqual(await bodyToString(result, 2), "He");
  });

  it("download should update progress and abort successfully", async () => {
    await fileClient.create(128 * 1024 * 1024);

    let eventTriggered = false;
    try {
      const aborter = new AbortController();
      const result = await fileClient.download(0, undefined, {
        abortSignal: aborter.signal,
        onProgress: () => {
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
    } catch (err) {
      assert.ok((err.message as string).toLowerCase().includes("aborted"));
    }
    assert.ok(eventTriggered);
  });

  it("listHandles should work", async () => {
    await fileClient.create(10);

    const result = (await fileClient
      .listHandles()
      .byPage()
      .next()).value;
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

  it("forceCloseAllHandles should work", async () => {
    await fileClient.create(10);

    // TODO: Open or create a handle - Has to be tested locally

    assert.equal(await fileClient.forceCloseAllHandles(), 0, "Error in forceCloseAllHandles");
  });

  it("forceCloseHandle should work", async () => {
    await fileClient.create(10);

    // TODO: Open or create a handle

    const result = (await fileClient
      .listHandles()
      .byPage()
      .next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("verify shareName and filePath passed to the client", async () => {
    const accountName = "myaccount";
    const newClient = new FileClient(
      `https://${accountName}.file.core.windows.net/` + shareName + "/" + dirName + "/" + fileName
    );
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
  });

  it("create with tracing", async () => {
    const tracer = new TestTracer();
    setTracer(tracer);
    const rootSpan = tracer.startSpan("root");
    await fileClient.create(content.length, {
      spanOptions: { parent: rootSpan }
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
              name: "Azure.Storage.File.FileClient-create",
              children: [
                {
                  name: "core-http",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });
});
