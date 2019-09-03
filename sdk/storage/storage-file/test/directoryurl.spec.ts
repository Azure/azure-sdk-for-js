import * as assert from "assert";
import * as dotenv from "dotenv";

import { Aborter } from "../src/Aborter";
import { DirectoryURL } from "../src/DirectoryURL";
import { FileURL } from "../src/FileURL";
import { DirectoryForceCloseHandlesResponse, DirectoryCreateResponse } from "../src/generated/src/models";
import { ShareURL } from "../src/ShareURL";
import { getBSU } from "./utils";
import { record } from "./utils/recorder";
import { FileSystemAttributes } from '../src/FileSystemAttributes';
import { truncatedISO8061Date } from '../src/utils/utils.common';

dotenv.config({ path: "../.env" });

describe("DirectoryURL", () => {
  const serviceURL = getBSU();
  let shareName: string;
  let shareURL: ShareURL;
  let dirName: string;
  let dirURL: DirectoryURL;
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
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);

    dirName = recorder.getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    defaultDirCreateResp = await dirURL.create(Aborter.none);
    assert.equal(defaultDirCreateResp.errorCode, undefined);
    assert.equal(defaultDirCreateResp.fileAttributes!, "Directory");
    assert.ok(defaultDirCreateResp.fileChangeTime!);
    assert.ok(defaultDirCreateResp.fileCreationTime!);
    assert.ok(defaultDirCreateResp.fileId!);
    assert.ok(defaultDirCreateResp.fileLastWriteTime!);
    assert.ok(defaultDirCreateResp.fileParentId!);
    assert.ok(defaultDirCreateResp.filePermissionKey!);
  });

  afterEach(async () => {
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

  it("create with all parameters configured setting filePermissionKey", async () => {
    const dirURL2 = DirectoryURL.fromShareURL(shareURL, recorder.getUniqueName(dirName));
    const metadata = { key: "value" };
    const now = recorder.newDate("now");
    
    await dirURL2.create(Aborter.none, { 
      metadata: metadata,
      creationTime: now,
      lastWriteTime: now,
      filePermissionKey: defaultDirCreateResp.filePermissionKey,
      fileAttributes: fullDirAttributes
    });
    
    const result = await dirURL2.getProperties(Aborter.none);
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
    const getPermissionResp = await shareURL.getPermission(Aborter.none, defaultDirCreateResp.filePermissionKey!);
    
    const dirURL2 = DirectoryURL.fromShareURL(shareURL, recorder.getUniqueName(dirName));
    const metadata = { key: "value" };
    const now = recorder.newDate("now");
    
    await dirURL2.create(Aborter.none, { 
      metadata: metadata,
      creationTime: now,
      lastWriteTime: now,
      filePermission: getPermissionResp.permission,
      fileAttributes: fullDirAttributes
    });
    
    const result = await dirURL2.getProperties(Aborter.none);
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
    await dirURL.setProperties(Aborter.none);

    const result = await dirURL.getProperties(Aborter.none);
    assert.equal(result.errorCode, undefined);
    assert.equal(result.fileAttributes!, defaultDirCreateResp.fileAttributes!);
    assert.equal(truncatedISO8061Date(result.fileCreationTime!), truncatedISO8061Date(defaultDirCreateResp.fileCreationTime!));
    assert.equal(truncatedISO8061Date(result.fileLastWriteTime!), truncatedISO8061Date(defaultDirCreateResp.fileLastWriteTime!));
    assert.equal(result.filePermissionKey!, defaultDirCreateResp.filePermissionKey!);
    assert.ok(result.fileChangeTime!);
    assert.ok(result.fileId!);
    assert.ok(result.fileParentId!); 
  });

  it("setProperties with all parameters configured setting filePermission", async () => {
    const getPermissionResp = await shareURL.getPermission(Aborter.none, defaultDirCreateResp.filePermissionKey!);
    
    const now = recorder.newDate("now");
    
    await dirURL.setProperties(Aborter.none, { 
      creationTime: now,
      lastWriteTime: now,
      filePermission: getPermissionResp.permission,
      fileAttributes: fullDirAttributes
    });
    
    const result = await dirURL.getProperties(Aborter.none);
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
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

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
    // TODO: Open or create a handle; Currently can only be done manually; No REST APIs for creating handles

    let marker: string | undefined = "";

    do {
      const response: DirectoryForceCloseHandlesResponse = await dirURL.forceCloseHandlesSegment(
        Aborter.none,
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

    const result = await dirURL.listHandlesSegment(Aborter.none, undefined);
    if (result.handleList !== undefined && result.handleList.length > 0) {
      const handle = result.handleList[0];
      await dirURL.forceCloseHandle(Aborter.none, handle.handleId);
    }
  });
});
