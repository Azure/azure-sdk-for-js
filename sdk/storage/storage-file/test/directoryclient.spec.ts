import * as assert from "assert";
import { getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("DirectoryClient", () => {
  const serviceClient = getBSU();
  let shareName = getUniqueName("share");
  let shareClient = serviceClient.createShareClient(shareName);
  let dirName = getUniqueName("dir");
  let dirClient = shareClient.createDirectoryClient(dirName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareClient = serviceClient.createShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir");
    dirClient = shareClient.createDirectoryClient(dirName);
    await dirClient.create();
  });

  afterEach(async () => {
    await dirClient.delete();
    await shareClient.delete();
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

  it("create with all parameters configured", async () => {
    const cClient = serviceClient.createShareClient(getUniqueName(shareName));
    const metadata = { key: "value" };
    await cClient.create({ metadata });
    const result = await cClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("listFilesAndDirectories under root directory", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.createDirectoryClient("");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.createDirectoryClient(getUniqueName(`${prefix}dir${i}`));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.createFileClient(getUniqueName(`${prefix}file${i}`));
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const result = (await (await rootDirClient.listFilesAndDirectories({ prefix }).byPage()).next())
      .value;

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
    const rootDirClient = shareClient.createDirectoryClient("");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.createDirectoryClient(getUniqueName(`${prefix}dir${i}`));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.createFileClient(getUniqueName(`${prefix}file${i}`));
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    const firstRequestSize = Math.ceil((subDirClients.length + subFileClients.length) / 2);
    const secondRequestSize = subDirClients.length + subFileClients.length - firstRequestSize;

    const firstResult = (await (await rootDirClient
      .listFilesAndDirectories({ prefix })
      .byPage({ maxPageSize: firstRequestSize })).next()).value;

    assert.deepStrictEqual(
      firstResult.segment.directoryItems.length + firstResult.segment.fileItems.length,
      firstRequestSize
    );
    assert.notDeepEqual(firstResult.nextMarker, undefined);

    const secondResult = (await (await rootDirClient.listFilesAndDirectories({ prefix }).byPage({
      continuationToken: firstResult.nextMarker,
      maxPageSize: firstRequestSize + secondRequestSize
    })).next()).value;
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
    const rootDirClient = shareClient.createDirectoryClient("");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.createDirectoryClient(getUniqueName(`${prefix}dir${i}`));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.createFileClient(getUniqueName(`${prefix}file${i}`));
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
    const rootDirClient = shareClient.createDirectoryClient("");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.createDirectoryClient(getUniqueName(`${prefix}dir${i}`));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.createFileClient(getUniqueName(`${prefix}file${i}`));
      await subFileClient.create(1024);
      subFileClients.push(subFileClient);
    }

    let iter = await rootDirClient.listFilesAndDirectories({ prefix });
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

  it("Verify PagedAsyncIterableIterator for listFilesAndDirectories", async () => {
    const subDirClients = [];
    const rootDirClient = shareClient.createDirectoryClient("");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.createDirectoryClient(getUniqueName(`${prefix}dir${i}`));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.createFileClient(getUniqueName(`${prefix}file${i}`));
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
    const rootDirClient = shareClient.createDirectoryClient("");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirClient = rootDirClient.createDirectoryClient(getUniqueName(`${prefix}dir${i}`));
      await subDirClient.create();
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = rootDirClient.createFileClient(getUniqueName(`${prefix}file${i}`));
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
    const directoryName = getUniqueName("directory");
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
    const directoryName = getUniqueName("directory");
    const { directoryClient: subDirClient } = await dirClient.createSubdirectory(directoryName);
    const fileName = getUniqueName("file");
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
});
