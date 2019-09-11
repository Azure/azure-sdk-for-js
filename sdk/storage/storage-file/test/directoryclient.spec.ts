import * as assert from "assert";
import { getBSU } from "./utils";
import * as dotenv from "dotenv";
import { ShareClient, DirectoryClient, FileSystemAttributes } from "../src";
import { record } from "./utils/recorder";
import {
  DirectoryForceCloseHandlesResponse,
  DirectoryCreateResponse
} from "../src/generated/src/models";
import { truncatedISO8061Date } from "../src/utils/utils.common";
dotenv.config({ path: "../.env" });

describe("DirectoryClient", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: DirectoryClient;
  let defaultDirCreateResp: DirectoryCreateResponse;
  let recorder: any;
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
    recorder = record(this);
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.getUniqueName("dir");
    dirClient = shareClient.getDirectoryClient(dirName);

    defaultDirCreateResp = await dirClient.create();
    assert.equal(defaultDirCreateResp.errorCode, undefined);
    assert.equal(defaultDirCreateResp.fileAttributes!, "Directory");
    assert.ok(defaultDirCreateResp.fileChangeTime!);
    assert.ok(defaultDirCreateResp.fileCreationTime!);
    assert.ok(defaultDirCreateResp.fileId!);
    assert.ok(defaultDirCreateResp.fileLastWriteTime!);
    assert.ok(defaultDirCreateResp.fileParentId!);
    assert.ok(defaultDirCreateResp.filePermissionKey!);
  });

  afterEach(async function() {
    await shareClient.delete();
    recorder.stop();
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
    assert.ok(result.eTag!.length > 0);
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
    assert.equal(truncatedISO8061Date(result.fileCreationTime!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteTime!), truncatedISO8061Date(now));
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeTime!);
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
    assert.equal(truncatedISO8061Date(result.fileCreationTime!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteTime!), truncatedISO8061Date(now));
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeTime!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("setProperties with default parameters", async () => {
    await dirClient.setProperties();

    const result = await dirClient.getProperties();
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, defaultDirCreateResp.fileAttributes!);
    assert.equal(
      truncatedISO8061Date(result.fileCreationTime!),
      truncatedISO8061Date(defaultDirCreateResp.fileCreationTime!)
    );
    assert.equal(
      truncatedISO8061Date(result.fileLastWriteTime!),
      truncatedISO8061Date(defaultDirCreateResp.fileLastWriteTime!)
    );
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeTime!);
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
    assert.equal(truncatedISO8061Date(result.fileCreationTime!), truncatedISO8061Date(now));
    assert.equal(truncatedISO8061Date(result.fileLastWriteTime!), truncatedISO8061Date(now));
    assert.ok(result.filePermissionKey!);
    assert.ok(result.fileChangeTime!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("listFilesAndDirectories under root directory", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.getDirectoryClient("");

    const prefix = recorder.getUniqueName(
      `pre${recorder
        .newDate()
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

    const result = (await rootDirClient
      .listFilesAndDirectories({ prefix })
      .byPage()
      .next()).value;

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareClient.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.nextMarker, "");
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
        .newDate()
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

    const firstResult = (await rootDirClient
      .listFilesAndDirectories({ prefix })
      .byPage({ maxPageSize: firstRequestSize })
      .next()).value;

    assert.deepStrictEqual(
      firstResult.segment.directoryItems.length + firstResult.segment.fileItems.length,
      firstRequestSize
    );
    assert.notDeepEqual(firstResult.nextMarker, undefined);

    const secondResult = (await rootDirClient
      .listFilesAndDirectories({ prefix })
      .byPage({
        continuationToken: firstResult.nextMarker,
        maxPageSize: firstRequestSize + secondRequestSize
      })
      .next()).value;
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
        .newDate()
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
        .newDate()
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

    const iter = await rootDirClient.listFilesAndDirectories({ prefix });
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
        .newDate()
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
        .newDate()
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
    assert.notDeepEqual(response.nextMarker, undefined);

    iter = await rootDirClient
      .listFilesAndDirectories({
        prefix
      })
      .byPage({
        continuationToken: response.nextMarker,
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

  it.only("listHandles should work", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    const s = serviceClient.getShareClient("share156830612406803206");
    dirClient = s.getDirectoryClient("dir156830612568607181");
    const result = (await dirClient
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

  it("forceCloseHandlesSegment should work", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    let marker: string | undefined = "";

    do {
      const response: DirectoryForceCloseHandlesResponse = await dirClient.forceCloseHandlesSegment(
        marker,
        {
          recursive: true
        }
      );
      marker = response.marker;
    } while (marker);
  });

  it("forceCloseHandle should work", async () => {
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    const result = (await dirClient
      .listHandles()
      .byPage()
      .next()).value;
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirClient.forceCloseHandle(handle.handleId);
    }
  });
});
