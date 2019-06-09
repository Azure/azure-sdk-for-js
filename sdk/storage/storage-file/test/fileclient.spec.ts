import * as assert from "assert";
import { isNode } from "@azure/ms-rest-js";
import { bodyToString, getBSU, getUniqueName, sleep } from "./utils";
import * as dotenv from "dotenv";
import { Aborter, FileClient, newPipeline, SharedKeyCredential } from "../src";
dotenv.config({ path: "../.env" });

describe("FileClient", () => {
  const serviceClient = getBSU();
  let shareName = getUniqueName("share");
  let shareClient = serviceClient.createShareClient(shareName);
  let dirName = getUniqueName("dir");
  let dirClient = shareClient.createDirectoryClient(dirName);
  let fileName = getUniqueName("file");
  let fileClient = dirClient.createFileClient(fileName);
  const content = "Hello World";

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareClient = serviceClient.createShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir");
    dirClient = shareClient.createDirectoryClient(dirName);
    await dirClient.create();

    fileName = getUniqueName("file");
    fileClient = dirClient.createFileClient(fileName);
  });

  afterEach(async () => {
    await shareClient.delete();
  });

  it("create with default parameters", async () => {
    await fileClient.create(content.length);
    const result = await fileClient.download();
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
    await fileClient.create(512, options);

    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));

    const properties = await fileClient.getProperties();
    assert.equal(properties.cacheControl, options.fileHTTPHeaders.fileCacheControl);
    assert.equal(properties.contentDisposition, options.fileHTTPHeaders.fileContentDisposition);
    assert.equal(properties.contentEncoding, options.fileHTTPHeaders.fileContentEncoding);
    assert.equal(properties.contentLanguage, options.fileHTTPHeaders.fileContentLanguage);
    assert.equal(properties.contentType, options.fileHTTPHeaders.fileContentType);
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
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
    await fileClient.setHTTPHeaders({});
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
      fileContentType: "fileContentType"
    };
    await fileClient.setHTTPHeaders(headers);
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
    const newFileClient = dirClient.createFileClient(getUniqueName("copiedfile"));
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
    const newFileClient = dirClient.createFileClient(getUniqueName("copiedfile"));
    const result = await newFileClient.startCopyFromURL(fileClient.url);
    assert.ok(result.copyId);
    sleep(1 * 1000);

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
      progress: () => {
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
      const aborter = Aborter.none;
      const result = await fileClient.download(0, undefined, {
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

  it("can be created with a url and a credential", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b"
    };
    await fileClient.setMetadata(metadata);

    const factories = fileClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new FileClient(fileClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b"
    };
    await fileClient.setMetadata(metadata);

    const factories = fileClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new FileClient(fileClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const result = await newClient.getProperties();

    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b"
    };
    await fileClient.setMetadata(metadata);

    const factories = fileClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new FileClient(fileClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });
});
