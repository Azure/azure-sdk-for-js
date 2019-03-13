import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { DirectoryURL } from "../lib/DirectoryURL";
import { FileURL } from "../lib/FileURL";
import { ShareURL } from "../lib/ShareURL";
import { getBSU, getUniqueName } from "./utils";

describe("DirectoryURL", () => {
  const serviceURL = getBSU();
  let shareName = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
  let dirName = getUniqueName("dir");
  let dirURL = DirectoryURL.fromShareURL(shareURL, dirName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);

    dirName = getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);
  });

  afterEach(async () => {
    await dirURL.delete(Aborter.none);
    await shareURL.delete(Aborter.none);
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    try {
      await dirURL.setMetadata(Aborter.none, metadata);

      const result = await dirURL.getProperties(Aborter.none);
      assert.deepEqual(result.metadata, metadata);
    } catch (err) {
      console.log(err);
    }
  });

  it("getProperties", async () => {
    const result = await dirURL.getProperties(Aborter.none);
    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("create with default parameters", done => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters configured", async () => {
    const cURL = ShareURL.fromServiceURL(serviceURL, getUniqueName(shareName));
    const metadata = { key: "value" };
    await cURL.create(Aborter.none, { metadata });
    const result = await cURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("delete", done => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("listFilesAndDirectoriesSegment under root directory", async () => {
    const subDirURLs = [];
    const rootDirURL = DirectoryURL.fromShareURL(shareURL, "");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirURL = DirectoryURL.fromDirectoryURL(
        rootDirURL,
        getUniqueName(`${prefix}dir${i}`)
      );
      await subDirURL.create(Aborter.none);
      subDirURLs.push(subDirURL);
    }

    const subFileURLs = [];
    for (let i = 0; i < 3; i++) {
      const subFileURL = FileURL.fromDirectoryURL(
        rootDirURL,
        getUniqueName(`${prefix}file${i}`)
      );
      await subFileURL.create(Aborter.none, 1024);
      subFileURLs.push(subFileURL);
    }

    const result = await rootDirURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      { prefix }
    );
    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareURL.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.nextMarker, "");
    assert.deepStrictEqual(
      result.segment.directoryItems.length,
      subDirURLs.length
    );
    assert.deepStrictEqual(result.segment.fileItems.length, subFileURLs.length);

    let i = 0;
    for (const entry of result.segment.directoryItems) {
      assert.ok(subDirURLs[i++].url.indexOf(entry.name) > 0);
    }

    i = 0;
    for (const entry of result.segment.fileItems) {
      assert.ok(subFileURLs[i++].url.indexOf(entry.name) > 0);
    }

    for (const subFile of subFileURLs) {
      await subFile.delete(Aborter.none);
    }
    for (const subDir of subDirURLs) {
      await subDir.delete(Aborter.none);
    }
  });

  it("listFilesAndDirectoriesSegment with all parameters confirgured", async () => {
    const subDirURLs = [];
    const rootDirURL = DirectoryURL.fromShareURL(shareURL, "");

    const prefix = getUniqueName(`pre${new Date().getTime().toString()}`);
    for (let i = 0; i < 3; i++) {
      const subDirURL = DirectoryURL.fromDirectoryURL(
        rootDirURL,
        getUniqueName(`${prefix}dir${i}`)
      );
      await subDirURL.create(Aborter.none);
      subDirURLs.push(subDirURL);
    }

    const subFileURLs = [];
    for (let i = 0; i < 3; i++) {
      const subFileURL = FileURL.fromDirectoryURL(
        rootDirURL,
        getUniqueName(`${prefix}file${i}`)
      );
      await subFileURL.create(Aborter.none, 1024);
      subFileURLs.push(subFileURL);
    }

    const firstRequestSize = Math.ceil(
      (subDirURLs.length + subFileURLs.length) / 2
    );
    const secondRequestSize =
      subDirURLs.length + subFileURLs.length - firstRequestSize;

    const firstResult = await rootDirURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      { prefix, maxresults: firstRequestSize }
    );

    assert.deepStrictEqual(
      firstResult.segment.directoryItems.length +
        firstResult.segment.fileItems.length,
      firstRequestSize
    );
    assert.notDeepEqual(firstResult.nextMarker, undefined);

    const secondResult = await rootDirURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      firstResult.nextMarker,
      { prefix, maxresults: firstRequestSize + secondRequestSize }
    );
    assert.deepStrictEqual(
      secondResult.segment.directoryItems.length +
        secondResult.segment.fileItems.length,
      secondRequestSize
    );

    for (const subFile of subFileURLs) {
      await subFile.delete(Aborter.none);
    }
    for (const subDir of subDirURLs) {
      await subDir.delete(Aborter.none);
    }
  });
});
