import * as assert from "assert";
import { isNode } from "ms-rest-js";

import { Aborter } from "../lib/Aborter";
import { DirectoryURL } from "../lib/DirectoryURL";
import { FileURL } from "../lib/FileURL";
import { ShareURL } from "../lib/ShareURL";
import { bodyToString, getBSU, getUniqueName, sleep } from "./utils";

describe("FileURL", () => {
  const serviceURL = getBSU();
  let shareName = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
  let dirName = getUniqueName("dir");
  let dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
  let fileName = getUniqueName("file");
  let fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  const content = "Hello World";

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);

    dirName = getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);

    fileName = getUniqueName("file");
    fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
  });

  it("create with default parameters", async () => {
    await fileURL.create(Aborter.none, content.length);
    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(
      await bodyToString(result, content.length),
      "\u0000".repeat(content.length)
    );
  });

  it("create with all parameters set", async () => {
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
      }
    };
    await fileURL.create(Aborter.none, 512, options);

    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(
      await bodyToString(result, 512),
      "\u0000".repeat(512)
    );

    const properties = await fileURL.getProperties(Aborter.none);
    assert.equal(
      properties.cacheControl,
      options.fileHTTPHeaders.fileCacheControl
    );
    assert.equal(
      properties.contentDisposition,
      options.fileHTTPHeaders.fileContentDisposition
    );
    assert.equal(
      properties.contentEncoding,
      options.fileHTTPHeaders.fileContentEncoding
    );
    assert.equal(
      properties.contentLanguage,
      options.fileHTTPHeaders.fileContentLanguage
    );
    assert.equal(
      properties.contentType,
      options.fileHTTPHeaders.fileContentType
    );
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
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
      fileContentMD5: isNode
        ? Buffer.from([1, 2, 3, 4])
        : new Uint8Array([1, 2, 3, 4]),
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
    assert.deepStrictEqual(
      result.contentDisposition,
      headers.fileContentDisposition
    );
  });

  it("delete", async () => {
    await fileURL.create(Aborter.none, content.length);
    await fileURL.delete(Aborter.none);
  });

  it("startCopyFromURL", async () => {
    await fileURL.create(Aborter.none, 1024);
    const newFileURL = FileURL.fromDirectoryURL(
      dirURL,
      getUniqueName("copiedfile")
    );
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
    const newFileURL = FileURL.fromDirectoryURL(
      dirURL,
      getUniqueName("copiedfile")
    );
    const result = await newFileURL.startCopyFromURL(Aborter.none, fileURL.url);
    assert.ok(result.copyId);
    sleep(1 * 1000);

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
    assert.deepStrictEqual(
      await bodyToString(result, 10),
      "H" + "\u0000".repeat(8) + "d"
    );
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

  it("download with with default parameters", async () => {
    await fileURL.create(Aborter.none, content.length);
    await fileURL.uploadRange(Aborter.none, content, 0, content.length);
    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
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
});
