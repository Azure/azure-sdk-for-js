import * as assert from "assert";
import * as dotenv from "dotenv";

import { Aborter } from "../src/Aborter";
import { DirectoryURL } from "../src/DirectoryURL";
import { FileURL } from "../src/FileURL";
import { DirectoryForceCloseHandlesResponse } from "../src/generated/src/models";
import { ShareURL } from "../src/ShareURL";
import { getBSU } from "./utils";
import { record } from "./utils/recorder";

dotenv.config({ path: "../.env" });

describe("DirectoryURL", () => {
  const serviceURL = getBSU();
  let shareName: string;
  let shareURL: ShareURL;
  let dirName: string;
  let dirURL: DirectoryURL;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);

    shareName = recorder.getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);

    dirName = recorder.getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);
  });

  afterEach(async () => {
    await dirURL.delete(Aborter.none);
    await shareURL.delete(Aborter.none);
    recorder.stop();
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

  it("create with default parameters", (done) => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters configured", async () => {
    const cURL = ShareURL.fromServiceURL(serviceURL, recorder.getUniqueName(shareName));
    const metadata = { key: "value" };
    await cURL.create(Aborter.none, { metadata });
    const result = await cURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("listFilesAndDirectoriesSegment under root directory", async () => {
    const subDirURLs = [];
    const rootDirURL = DirectoryURL.fromShareURL(shareURL, "");

    const prefix = recorder.getUniqueName(
      `pre${recorder
        .newDate("date")
        .getTime()
        .toString()}`
    );
    for (let i = 0; i < 3; i++) {
      const subDirURL = DirectoryURL.fromDirectoryURL(
        rootDirURL,
        recorder.getUniqueName(`${prefix}dir${i}`)
      );
      await subDirURL.create(Aborter.none);
      subDirURLs.push(subDirURL);
    }

    const subFileURLs = [];
    for (let i = 0; i < 3; i++) {
      const subFileURL = FileURL.fromDirectoryURL(
        rootDirURL,
        recorder.getUniqueName(`${prefix}file${i}`)
      );
      await subFileURL.create(Aborter.none, 1024);
      subFileURLs.push(subFileURL);
    }

    const result = await rootDirURL.listFilesAndDirectoriesSegment(Aborter.none, undefined, {
      prefix
    });
    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(shareURL.url.indexOf(result.shareName));
    assert.deepStrictEqual(result.nextMarker, "");
    assert.deepStrictEqual(result.segment.directoryItems.length, subDirURLs.length);
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

  it("listFilesAndDirectoriesSegment with all parameters configured", async () => {
    const subDirURLs = [];
    const rootDirURL = DirectoryURL.fromShareURL(shareURL, "");

    const prefix = recorder.getUniqueName(
      `pre${recorder
        .newDate("date")
        .getTime()
        .toString()}`
    );
    for (let i = 0; i < 3; i++) {
      const subDirURL = DirectoryURL.fromDirectoryURL(
        rootDirURL,
        recorder.getUniqueName(`${prefix}dir${i}`)
      );
      await subDirURL.create(Aborter.none);
      subDirURLs.push(subDirURL);
    }

    const subFileURLs = [];
    for (let i = 0; i < 3; i++) {
      const subFileURL = FileURL.fromDirectoryURL(
        rootDirURL,
        recorder.getUniqueName(`${prefix}file${i}`)
      );
      await subFileURL.create(Aborter.none, 1024);
      subFileURLs.push(subFileURL);
    }

    const firstRequestSize = Math.ceil((subDirURLs.length + subFileURLs.length) / 2);
    const secondRequestSize = subDirURLs.length + subFileURLs.length - firstRequestSize;

    const firstResult = await rootDirURL.listFilesAndDirectoriesSegment(Aborter.none, undefined, {
      prefix,
      maxresults: firstRequestSize
    });

    assert.deepStrictEqual(
      firstResult.segment.directoryItems.length + firstResult.segment.fileItems.length,
      firstRequestSize
    );
    assert.notDeepEqual(firstResult.nextMarker, undefined);

    const secondResult = await rootDirURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      firstResult.nextMarker,
      { prefix, maxresults: firstRequestSize + secondRequestSize }
    );
    assert.deepStrictEqual(
      secondResult.segment.directoryItems.length + secondResult.segment.fileItems.length,
      secondRequestSize
    );

    for (const subFile of subFileURLs) {
      await subFile.delete(Aborter.none);
    }
    for (const subDir of subDirURLs) {
      await subDir.delete(Aborter.none);
    }
  });

  it("listHandles should work", async () => {
    const result = await dirURL.listHandlesSegment(Aborter.none, undefined);
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
    // TODO: Open or create a handle
    
    let marker: string | undefined = "";

    do {
      const response: DirectoryForceCloseHandlesResponse = await dirURL.forceCloseHandlesSegment(Aborter.none, marker, {
        recursive: true
      });
      marker = response.marker;
    } while (marker)
  });

  it("forceCloseHandle should work", async () => {
    // TODO: Open or create a handle

    const result = await dirURL.listHandlesSegment(Aborter.none, undefined);
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirURL.forceCloseHandle(Aborter.none, handle.handleId);
    }
  });
});
