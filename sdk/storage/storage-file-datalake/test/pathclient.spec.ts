import { AbortController } from "@azure/abort-controller";
import { isNode, URLBuilder } from "@azure/core-http";
import { setTracer, SpanGraph, TestTracer } from "@azure/core-tracing";
import { record } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { DataLakeFileClient, DataLakeFileSystemClient } from "../src";
import { toPermissionsString } from "../src/transforms";
import { bodyToString, getDataLakeServiceClient, recorderEnvSetup } from "./utils";

dotenv.config();

describe("DataLakePathClient", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  const content = "Hello World";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    fileName = recorder.getUniqueName("file");
    fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    recorder.stop();
  });

  it("read with with default parameters", async () => {
    const result = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("read should not have aborted error after read finishes", async () => {
    const aborter = new AbortController();
    const result = await fileClient.read(0, undefined, { abortSignal: aborter.signal });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("read all parameters set", async () => {
    // For browser scenario, please ensure CORS settings exposed headers: content-md5,x-ms-content-crc64
    // So JS can get contentCrc64 and contentMD5.
    const result1 = await fileClient.read(0, 1, {
      rangeGetContentCrc64: true
    });
    assert.ok(result1.clientRequestId);
    //assert.ok(result1.contentCrc64!);
    assert.deepStrictEqual(await bodyToString(result1, 1), content[0]);
    assert.ok(result1.clientRequestId);

    const result2 = await fileClient.read(1, 1, {
      rangeGetContentMD5: true
    });
    assert.ok(result2.clientRequestId);
    //assert.ok(result2.contentMD5!);

    let exceptionCaught = false;
    try {
      await fileClient.read(2, 1, {
        rangeGetContentMD5: true,
        rangeGetContentCrc64: true
      });
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("setMetadata with new metadata set", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await fileClient.setMetadata(metadata);
    const result = await fileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
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

  it("setHttpHeaders with default parameters", async () => {
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

  it("setHttpHeaders with all parameters set", async () => {
    const headers = {
      cacheControl: "cacheControl",
      contentDisposition: "contentDisposition",
      contentEncoding: "contentEncoding",
      contentLanguage: "contentLanguage",
      contentMD5: isNode ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      contentType: "contentType"
    };
    await fileClient.setHttpHeaders(headers);
    const result = await fileClient.getProperties();
    assert.ok(result.date);

    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.deepStrictEqual(result.cacheControl, headers.cacheControl);
    assert.deepStrictEqual(result.contentType, headers.contentType);
    assert.deepStrictEqual(result.contentMD5, headers.contentMD5);
    assert.deepStrictEqual(result.contentEncoding, headers.contentEncoding);
    assert.deepStrictEqual(result.contentLanguage, headers.contentLanguage);
    assert.deepStrictEqual(result.contentDisposition, headers.contentDisposition);
  });

  it("delete", async () => {
    await fileClient.delete();
  });

  it("read with default parameters and tracing", async () => {
    const tracer = new TestTracer();
    setTracer(tracer);

    const rootSpan = tracer.startSpan("root");

    const result = await fileClient.read(undefined, undefined, {
      tracingOptions: {
        spanOptions: { parent: rootSpan.context() }
      }
    });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);

    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const urlPath = URLBuilder.parse(fileClient.url).getPath() || "";
    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children: [
            {
              name: "Azure.Storage.DataLake.DataLakeFileClient-read",
              children: [
                {
                  name: "Azure.Storage.Blob.BlobClient-download",
                  children: [
                    {
                      name: urlPath,
                      children: []
                    }
                  ]
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

  it("verify fileName and fileSystemName passed to the client", async () => {
    const accountName = "myaccount";
    const fileName = "file/part/1.txt";
    const newClient = new DataLakeFileClient(
      `https://${accountName}.dfs.core.windows.net/` + fileSystemName + "/" + fileName
    );
    assert.equal(
      newClient.fileSystemName,
      fileSystemName,
      "File system name is not the same as the one provided."
    );
    assert.equal(newClient.name, fileName, "File name is not the same as the one provided.");
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided."
    );
  });

  it("append & flush should work", async () => {
    const body = "HelloWorld";

    const fileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(fileName);

    await tempFileClient.create();

    await tempFileClient.append(body, 0, body.length, {
      transactionalContentMD5: new Uint8Array([])
    });
    await tempFileClient.append(body, body.length, body.length, {
      transactionalContentMD5: new Uint8Array([])
    });
    await tempFileClient.append(body, body.length * 2, body.length, {
      transactionalContentMD5: new Uint8Array([])
    });

    await tempFileClient.flush(body.length * 3);

    const properties = await tempFileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, body.length * 3);

    await tempFileClient.delete();
  });

  it("append & flush should work with all parameters", async () => {
    const body = "HelloWorld";

    const fileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(fileName);

    let permissions = {
      owner: { read: false, write: false, execute: false },
      group: { read: false, write: false, execute: false },
      other: { read: false, write: false, execute: false },
      stickyBit: false,
      extendedAcls: false
    };
    let permissionsString = toPermissionsString(permissions);
    let metadata = {
      a: "val-a",
      b: "val-b"
    };
    let pathHttpHeaders = {
      cacheControl: "cacheControl",
      contentEncoding: "contentEncoding",
      contentLanguage: "contentLanguage",
      contentDisposition: "contentDisposition",
      contentType: "contentType"
    };
    await tempFileClient.create({
      permissions: permissionsString,
      metadata,
      umask: "0000",
      pathHttpHeaders
    });

    let properties = await tempFileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, 0);
    assert.deepStrictEqual(properties.cacheControl, pathHttpHeaders.cacheControl);
    assert.deepStrictEqual(properties.contentEncoding, pathHttpHeaders.contentEncoding);
    assert.deepStrictEqual(properties.contentLanguage, pathHttpHeaders.contentLanguage);
    assert.deepStrictEqual(properties.contentDisposition, pathHttpHeaders.contentDisposition);
    assert.deepStrictEqual(properties.contentType, pathHttpHeaders.contentType);
    assert.deepStrictEqual(properties.metadata, metadata);

    let acl = await tempFileClient.getAccessControl();
    assert.deepStrictEqual(acl.permissions, permissions);

    await tempFileClient.append(body, 0, body.length, {
      transactionalContentMD5: new Uint8Array([])
    });
    await tempFileClient.append(body, body.length, body.length, {
      transactionalContentMD5: new Uint8Array([])
    });
    await tempFileClient.append(body, body.length * 2, body.length, {
      transactionalContentMD5: new Uint8Array([])
    });

    pathHttpHeaders = {
      cacheControl: "cacheControl2",
      contentEncoding: "contentEncoding2",
      contentLanguage: "contentLanguage2",
      contentDisposition: "contentDisposition2",
      contentType: "contentType2"
    };
    await tempFileClient.flush(body.length * 3, {
      retainUncommittedData: true,
      close: true,
      pathHttpHeaders
    });

    properties = await tempFileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, body.length * 3);
    assert.deepStrictEqual(properties.cacheControl, pathHttpHeaders.cacheControl);
    assert.deepStrictEqual(properties.contentEncoding, pathHttpHeaders.contentEncoding);
    assert.deepStrictEqual(properties.contentLanguage, pathHttpHeaders.contentLanguage);
    assert.deepStrictEqual(properties.contentDisposition, pathHttpHeaders.contentDisposition);
    assert.deepStrictEqual(properties.contentType, pathHttpHeaders.contentType);
    assert.deepStrictEqual(properties.metadata, metadata);

    await tempFileClient.delete();
  });

  it("exists returns true on an existing file", async () => {
    const result = await fileClient.exists();
    assert.ok(result, "exists() should return true for an existing file");
  });

  it("exists returns false on non-existing file or directory", async () => {
    const newFileClient = fileSystemClient.getFileClient(recorder.getUniqueName("newFile"));
    const result = await newFileClient.exists();
    assert.ok(result === false, "exists() should return false for a non-existing file");

    const newDirectoryClient = fileSystemClient.getDirectoryClient(
      recorder.getUniqueName("newDirectory")
    );
    const dirResult = await newDirectoryClient.exists();
    assert.ok(dirResult === false, "exists() should return false for a non-existing directory");
  });

  it("DataLakeDirectoryClient-createIfNotExists", async () => {
    const directoryName = recorder.getUniqueName("dir");
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const res = await directoryClient.createIfNotExists();
    assert.ok(res.succeeded);

    const res2 = await directoryClient.createIfNotExists();
    assert.ok(!res2.succeeded);
    assert.equal(res2.errorCode, "PathAlreadyExists");
  });

  it("DataLakeFileClient-createIfNotExists", async () => {
    const res = await fileClient.createIfNotExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "PathAlreadyExists");
  });

  it("DataLakePathClient-deleteIfExists", async () => {
    const directoryName = recorder.getUniqueName("dir");
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const res = await directoryClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "PathNotFound");

    await directoryClient.create();
    const res2 = await directoryClient.deleteIfExists();
    assert.ok(res2.succeeded);
  });
});
