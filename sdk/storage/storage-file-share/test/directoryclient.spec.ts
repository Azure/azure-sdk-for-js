import * as assert from "assert";
import { getBSU, recorderEnvSetup } from "./utils";
import * as dotenv from "dotenv";
import { ShareClient, ShareDirectoryClient, FileSystemAttributes } from "../src";
import { record, Recorder } from "@azure/test-utils-recorder";
import { DirectoryCreateResponse } from "../src/generated/src/models";
import { truncatedISO8061Date } from "../src/utils/utils.common";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";
import { URLBuilder } from "@azure/core-http";
import { MockPolicyFactory } from "./utils/MockPolicyFactory";
import { Pipeline } from "../src/Pipeline";
dotenv.config();

describe("DirectoryClient", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let defaultDirCreateResp: DirectoryCreateResponse;
  let recorder: Recorder;
  let fullDirAttributes = new FileSystemAttributes();
  fullDirAttributes.readonly = true;
  fullDirAttributes.hidden = true;
  fullDirAttributes.system = true;
  fullDirAttributes.directory = true;
  fullDirAttributes.archive = true;
  fullDirAttributes.offline = true;
  fullDirAttributes.notContentIndexed = true;
  fullDirAttributes.noScrubData = true;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.getUniqueName("dir");
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

  afterEach(async function() {
    await shareClient.delete();
    await recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    try {
      await dirClient.setMetadata(metadata);

      const result = await dirClient.getProperties();
      assert.deepEqual(result.metadata, metadata);
    } catch (err) {
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
    const dirClient2 = shareClient.getDirectoryClient(recorder.getUniqueName(dirName));
    const metadata = { key: "value" };
    const now = recorder.newDate("now");

    await dirClient2.create({
      metadata: metadata,
      creationTime: now,
      lastWriteTime: now,
      filePermissionKey: defaultDirCreateResp.filePermissionKey,
      fileAttributes: fullDirAttributes
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
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });
  it("create with all parameters configured setting filePermission", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!
    );

    const dirClient2 = shareClient.getDirectoryClient(recorder.getUniqueName(dirName));
    const metadata = { key: "value" };
    const now = recorder.newDate("now");
    await dirClient2.create({
      metadata: metadata,
      creationTime: now,
      lastWriteTime: now,
      filePermission: getPermissionResp.permission,
      fileAttributes: fullDirAttributes
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

    const dirClient2 = shareClient.getDirectoryClient(recorder.getUniqueName(dirName));
    const res2 = await dirClient2.createIfNotExists();
    assert.ok(res2.succeeded);

    await dirClient2.delete();
  });

  it("deleteIfExists", async () => {
    const dirClient2 = shareClient.getDirectoryClient(recorder.getUniqueName(dirName));
    const res = await dirClient2.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "ResourceNotFound");

    await dirClient2.create();
    const res2 = await dirClient2.deleteIfExists();
    assert.ok(res2.succeeded);
  });

  it("exists", async () => {
    assert.ok(await dirClient.exists());
    const dirClient2 = shareClient.getDirectoryClient(recorder.getUniqueName(dirName));
    assert.ok(!(await dirClient2.exists()));
  });

  it("setProperties with default parameters", async () => {
    await dirClient.setProperties();

    const result = await dirClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, defaultDirCreateResp.fileAttributes!);
    assert.equal(
      truncatedISO8061Date(result.fileCreatedOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileCreatedOn!)
    );
    assert.equal(
      truncatedISO8061Date(result.fileLastWriteOn!),
      truncatedISO8061Date(defaultDirCreateResp.fileLastWriteOn!)
    );
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeOn!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("setProperties with all parameters configured setting filePermission", async () => {
    const getPermissionResp = await shareClient.getPermission(
      defaultDirCreateResp.filePermissionKey!
    );

    const now = recorder.newDate("now");

    await dirClient.setProperties({
      creationTime: now,
      lastWriteTime: now,
      filePermission: getPermissionResp.permission,
      fileAttributes: fullDirAttributes
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
      const subDirClient = dirClient.getDirectoryClient(recorder.getUniqueName(`dir${i}`));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = dirClient.getFileClient(recorder.getUniqueName(`file${i}`));
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (
      await dirClient
        .listFilesAndDirectories({ prefix: "" })
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

  it("listFilesAndDirectories under root directory", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.getDirectoryClient("");

    const prefix = recorder.getUniqueName(
      `pre${recorder
        .newDate("now")
        .getTime()
        .toString()}`
    );
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.getUniqueName(`${prefix}dir${i}`)
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.getUniqueName(`${prefix}file${i}`)
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (
      await rootDirClient
        .listFilesAndDirectories({ prefix })
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

    const prefix = recorder.getUniqueName(
      `pre${recorder
        .newDate("now")
        .getTime()
        .toString()}`
    );
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.getUniqueName(`${prefix}dir${i}`)
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.getUniqueName(`${prefix}file${i}`)
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
      firstRequestSize
    );
    assert.notDeepEqual(firstResult.continuationToken, undefined);

    const secondResult = (
      await rootDirClient
        .listFilesAndDirectories({ prefix })
        .byPage({
          continuationToken: firstResult.continuationToken,
          maxPageSize: firstRequestSize + secondRequestSize
        })
        .next()
    ).value;
    assert.deepStrictEqual(
      secondResult.segment.directoryItems.length + secondResult.segment.fileItems.length,
      secondRequestSize
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

    const prefix = recorder.getUniqueName(
      `pre${recorder
        .newDate("now")
        .getTime()
        .toString()}`
    );
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.getUniqueName(`${prefix}dir${i}`)
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.getUniqueName(`${prefix}file${i}`)
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    for await (const entity of rootDirClient.listFilesAndDirectories({ prefix })) {
      assert.ok(entity.name.startsWith(prefix));
      if (entity.kind == "file") {
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

    const prefix = recorder.getUniqueName(
      `pre${recorder
        .newDate("now")
        .getTime()
        .toString()}`
    );
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.getUniqueName(`${prefix}dir${i}`)
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.getUniqueName(`${prefix}file${i}`)
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const iter = rootDirClient.listFilesAndDirectories({ prefix });
    let entity = (await iter.next()).value;
    assert.ok(entity.name.startsWith(prefix));
    if (entity.kind == "file") {
      assert.deepEqual(entity.properties.contentLength, 1024);
    }

    entity = (await iter.next()).value;
    assert.ok(entity.name.startsWith(prefix));
    if (entity.kind == "file") {
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

    const prefix = recorder.getUniqueName(
      `pre${recorder
        .newDate("now")
        .getTime()
        .toString()}`
    );
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.getUniqueName(`${prefix}dir${i}`)
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.getUniqueName(`${prefix}file${i}`)
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    for await (const response of rootDirClient
      .listFilesAndDirectories({
        prefix
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

    const prefix = recorder.getUniqueName(
      `pre${recorder
        .newDate("now")
        .getTime()
        .toString()}`
    );
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.getDirectoryClient(
        recorder.getUniqueName(`${prefix}dir${i}`)
      );
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.getFileClient(
        recorder.getUniqueName(`${prefix}file${i}`)
      );
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const firstRequestSize = Math.ceil((subDirClients.length + subFileClients.length) / 2);
    const secondRequestSize = subDirClients.length + subFileClients.length - firstRequestSize;

    let iter = await rootDirClient
      .listFilesAndDirectories({
        prefix
      })
      .byPage({ maxPageSize: firstRequestSize });
    let response = (await iter.next()).value;

    assert.deepStrictEqual(
      response.segment.directoryItems.length + response.segment.fileItems.length,
      firstRequestSize
    );
    assert.notDeepEqual(response.continuationToken, undefined);

    iter = await rootDirClient
      .listFilesAndDirectories({
        prefix
      })
      .byPage({
        continuationToken: response.continuationToken,
        maxPageSize: firstRequestSize + secondRequestSize
      });
    response = (await iter.next()).value;
    assert.deepStrictEqual(
      response.segment.directoryItems.length + response.segment.fileItems.length,
      secondRequestSize
    );

    for (const subFile of subFileClients) {
      await subFile.delete();
    }
    for (const subDir of subDirClients) {
      await subDir.delete();
    }
  });

  it("createSubDirectory and deleteSubDirectory", async () => {
    const directoryName = recorder.getUniqueName("directory");
    const metadata = { key: "value" };

    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName, {
      metadata
    });
    const result = await subDirClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await dirClient.deleteSubdirectory(directoryName);
    try {
      await subDirClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one."
      );
    } catch (error) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("createFile and deleteFile", async () => {
    const directoryName = recorder.getUniqueName("directory");
    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName);
    const fileName = recorder.getUniqueName("file");
    const metadata = { key: "value" };
    const { fileClient } = await subDirClient.createFile(fileName, 256, { metadata });
    const result = await fileClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await subDirClient.deleteFile(fileName);
    try {
      await fileClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one."
      );
    } catch (error) {
      assert.ok((error.statusCode as number) === 404);
    }
    await subDirClient.delete();
  });

  it("createFile and deleteFile with tracing", async () => {
    const tracer = new TestTracer();
    setTracer(tracer);
    const rootSpan = tracer.startSpan("root");
    const spanOptions = { parent: rootSpan.context() };
    const tracingOptions = { spanOptions };
    const directoryName = recorder.getUniqueName("directory");
    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName, {
      tracingOptions
    });
    const fileName = recorder.getUniqueName("file");
    const metadata = { key: "value" };
    const { fileClient } = await subDirClient.createFile(fileName, 256, {
      metadata,
      tracingOptions
    });
    const result = await fileClient.getProperties({
      tracingOptions
    });
    assert.deepEqual(result.metadata, metadata);

    await subDirClient.deleteFile(fileName, { tracingOptions });
    try {
      await fileClient.getProperties({ tracingOptions });
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one."
      );
    } catch (error) {
      assert.ok((error.statusCode as number) === 404);
      assert.equal(
        error.details.errorCode,
        "ResourceNotFound",
        "Error does not contain details property"
      );
    }
    await subDirClient.delete({ tracingOptions });

    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const subDirPath = URLBuilder.parse(subDirClient.url).getPath() || "";
    const filePath = URLBuilder.parse(fileClient.url).getPath() || "";

    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children: [
            {
              name: "Azure.Storage.File.ShareDirectoryClient-createSubdirectory",
              children: [
                {
                  name: "Azure.Storage.File.ShareDirectoryClient-create",
                  children: [
                    {
                      name: subDirPath,
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: "Azure.Storage.File.ShareDirectoryClient-createFile",
              children: [
                {
                  name: "Azure.Storage.File.ShareFileClient-create",
                  children: [
                    {
                      name: filePath,
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: "Azure.Storage.File.ShareFileClient-getProperties",
              children: [
                {
                  name: filePath,
                  children: []
                }
              ]
            },
            {
              name: "Azure.Storage.File.ShareDirectoryClient-deleteFile",
              children: [
                {
                  name: "Azure.Storage.File.ShareFileClient-delete",
                  children: [
                    {
                      name: filePath,
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: "Azure.Storage.File.ShareFileClient-getProperties",
              children: [
                {
                  name: filePath,
                  children: []
                }
              ]
            },
            {
              name: "Azure.Storage.File.ShareDirectoryClient-delete",
              children: [
                {
                  name: subDirPath,
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

  it("listHandles should work", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    const result = (
      await dirClient
        .listHandles()
        .byPage()
        .next()
    ).value;

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
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles - Has to be tested locally

    assert.deepStrictEqual(
      await dirClient.forceCloseAllHandles(),
      { closedHandlesCount: 0, closeFailureCount: 0 },
      "Error in forceCloseAllHandles"
    );
  });

  it("forceCloseHandle should work", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    const result = (
      await dirClient
        .listHandles()
        .byPage()
        .next()
    ).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });

  it("forceCloseHandle could return closeFailureCount", async () => {
    // TODO: Open or create a handle; currently have to do this manually
    const result = (
      await dirClient
        .listHandles()
        .byPage()
        .next()
    ).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const mockPolicyFactory = new MockPolicyFactory({ numberOfHandlesFailedToClose: 1 });
      const factories = (dirClient as any).pipeline.factories.slice(); // clone factories array
      factories.unshift(mockPolicyFactory);
      const pipeline = new Pipeline(factories);
      const mockDirClient = new ShareDirectoryClient(dirClient.url, pipeline);

      const handle = result.handleList[0];
      const closeResp = await mockDirClient.forceCloseHandle(handle.handleId);
      assert.equal(
        closeResp.closeFailureCount,
        1,
        "Number of handles failed to close is not as set."
      );
    }
  });

  it("forceCloseAllHandles return correct closeFailureCount", async () => {
    const closeRes = await dirClient.forceCloseAllHandles();
    assert.equal(
      closeRes.closeFailureCount,
      0,
      "The closeFailureCount is not set to 0 as default."
    );
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
      "DirPath is not the same as the one provided."
    );
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided."
    );
    assert.equal(
      newClient.name,
      baseName,
      "DirectoryClient name is not the same as the baseName of the provided directory URI"
    );
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(
      `https://${accountName}.file.core.windows.net/${shareName}/${dirPath}/${baseName}`
    );
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://192.0.0.10:1900/${accountName}/${shareName}/${dirPath}/${baseName}`
    );
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${shareName}/${dirPath}/${baseName}`
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${shareName}/${dirPath}/${baseName}`);
  });
});
