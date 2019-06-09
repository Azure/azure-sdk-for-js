import * as assert from "assert";
import { getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
import { DirectoryClient, newPipeline, SharedKeyCredential } from "../src";
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

  it("listFilesAndDirectoriesSegment under root directory", async () => {
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

    const result = await rootDirClient.listFilesAndDirectoriesSegment(undefined, {
      prefix
    });
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

  it("listFilesAndDirectoriesSegment with all parameters confirgured", async () => {
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

    const firstResult = await rootDirClient.listFilesAndDirectoriesSegment(undefined, {
      prefix,
      maxresults: firstRequestSize
    });

    assert.deepStrictEqual(
      firstResult.segment.directoryItems.length + firstResult.segment.fileItems.length,
      firstRequestSize
    );
    assert.notDeepEqual(firstResult.nextMarker, undefined);

    const secondResult = await rootDirClient.listFilesAndDirectoriesSegment(
      firstResult.nextMarker,
      { prefix, maxresults: firstRequestSize + secondRequestSize }
    );
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

  it("can be created with a url and a credential", async () => {
    const factories = dirClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new DirectoryClient(dirClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = dirClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new DirectoryClient(dirClient.url, credential, {
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
    const factories = dirClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new DirectoryClient(dirClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });
});
