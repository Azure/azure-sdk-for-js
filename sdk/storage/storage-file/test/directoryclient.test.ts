import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { DirectoryClient } from "../src/DirectoryClient";
import { FileClient } from "../src/FileClient";
import { ShareClient } from "../src/ShareClient";
import { getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("DirectoryClient", () => {
  const serviceClient = getBSU();
  let shareName = getUniqueName("share");
  let shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);
  let dirName = getUniqueName("dir");
  let dirClient = DirectoryClient.fromShareClient(shareClient, dirName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);
    await shareClient.create(Aborter.none);

    dirName = getUniqueName("dir");
    dirClient = DirectoryClient.fromShareClient(shareClient, dirName);
    await dirClient.create(Aborter.none);
  });

  afterEach(async () => {
    await dirClient.delete(Aborter.none);
    await shareClient.delete(Aborter.none);
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    try {
      await dirClient.setMetadata(Aborter.none, metadata);

      const result = await dirClient.getProperties(Aborter.none);
      assert.deepEqual(result.metadata, metadata);
    } catch (err) {
      console.log(err);
    }
  });

  it("getProperties", async () => {
    const result = await dirClient.getProperties(Aborter.none);
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
    const cClient = ShareClient.fromFileServiceClient(serviceClient, getUniqueName(shareName));
    const metadata = { key: "value" };
    await cClient.create(Aborter.none, { metadata });
    const result = await cClient.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("listFilesAndDirectoriesSegment under root directory", async () => {
    const subDirClients = [];
    const rootDirClient = DirectoryClient.fromShareClient(shareClient, "");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirClient = DirectoryClient.fromDirectoryClient(
        rootDirClient,
        getUniqueName(`${prefix}dir${i}`)
      );
      await subDirClient.create(Aborter.none);
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = FileClient.fromDirectoryClient(
        rootDirClient,
        getUniqueName(`${prefix}file${i}`)
      );
      await subFileClient.create(Aborter.none, 1024);
      subFileClients.push(subFileClient);
    }

    const result = await rootDirClient.listFilesAndDirectoriesSegment(Aborter.none, undefined, {
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
      await subFile.delete(Aborter.none);
    }
    for (const subDir of subDirClients) {
      await subDir.delete(Aborter.none);
    }
  });

  it("listFilesAndDirectoriesSegment with all parameters confirgured", async () => {
    const subDirClients = [];
    const rootDirClient = DirectoryClient.fromShareClient(shareClient, "");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirClient = DirectoryClient.fromDirectoryClient(
        rootDirClient,
        getUniqueName(`${prefix}dir${i}`)
      );
      await subDirClient.create(Aborter.none);
      subDirClients.push(subDirClient);
    }

    const subFileClients = [];
    for (let i = 0; i < 3; i++) {
      const subFileClient = FileClient.fromDirectoryClient(
        rootDirClient,
        getUniqueName(`${prefix}file${i}`)
      );
      await subFileClient.create(Aborter.none, 1024);
      subFileClients.push(subFileClient);
    }

    const firstRequestSize = Math.ceil((subDirClients.length + subFileClients.length) / 2);
    const secondRequestSize = subDirClients.length + subFileClients.length - firstRequestSize;

    const firstResult = await rootDirClient.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix,
        maxresults: firstRequestSize
      }
    );

    assert.deepStrictEqual(
      firstResult.segment.directoryItems.length + firstResult.segment.fileItems.length,
      firstRequestSize
    );
    assert.notDeepEqual(firstResult.nextMarker, undefined);

    const secondResult = await rootDirClient.listFilesAndDirectoriesSegment(
      Aborter.none,
      firstResult.nextMarker,
      { prefix, maxresults: firstRequestSize + secondRequestSize }
    );
    assert.deepStrictEqual(
      secondResult.segment.directoryItems.length + secondResult.segment.fileItems.length,
      secondRequestSize
    );

    for (const subFile of subFileClients) {
      await subFile.delete(Aborter.none);
    }
    for (const subDir of subDirClients) {
      await subDir.delete(Aborter.none);
    }
  });
});
