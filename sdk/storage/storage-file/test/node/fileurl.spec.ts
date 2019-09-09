import * as assert from "assert";
import { Duplex } from "stream";

import { Aborter } from "../../src/Aborter";
import { DirectoryURL } from "../../src/DirectoryURL";
import { FileURL } from "../../src/FileURL";
import { ShareURL } from "../../src/ShareURL";
import { bodyToString, getBSU } from "../utils";
import { Buffer } from "buffer";
import { record } from "../utils/recorder";
import { FileSASPermissions, generateFileSASQueryParameters, SharedKeyCredential } from "../../src"

describe("FileURL Node.js only", () => {
  const serviceURL = getBSU();
  let shareName: string;
  let shareURL: ShareURL;
  let dirName: string;
  let dirURL: DirectoryURL;
  let fileName: string;
  let fileURL: FileURL;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);

    shareName = recorder.getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);

    dirName = recorder.getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);

    fileName = recorder.getUniqueName("file");
    fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
    recorder.stop();
  });

  it("upload with buffer and default parameters", async () => {
    const body: string = recorder.getUniqueName("randomstring");
    const bodyBuffer = Buffer.from(body);

    await fileURL.create(Aborter.none, body.length);
    await fileURL.uploadRange(Aborter.none, bodyBuffer, 0, body.length);
    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with Node.js stream", async () => {
    const body: string = recorder.getUniqueName("randomstring");

    await fileURL.create(Aborter.none, body.length);
    await fileURL.uploadRange(
      Aborter.none,
      () => {
        const duplexStream = new Duplex();
        duplexStream.push(body);
        duplexStream.push(null);
        return duplexStream;
      },
      0,
      body.length
    );
    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with Chinese string body and default parameters", async () => {
    const body: string = recorder.getUniqueName("randomstring你好");
    const bodyLength = Buffer.byteLength(body);

    await fileURL.create(Aborter.none, bodyLength);
    await fileURL.uploadRange(Aborter.none, body, 0, bodyLength);
    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, bodyLength), body);
  });

  it("uploadRangeFromURL", async () => {
    await fileURL.create(Aborter.none, 1024);

    const content = "a".repeat(512) + "b".repeat(512);
    await fileURL.uploadRange(Aborter.none, content, 0, content.length);

    // Get a SAS for fileURL
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateFileSASQueryParameters(
      {
        expiryTime,
        shareName,
        filePath: `${dirName}/${fileName}`,
        permissions: FileSASPermissions.parse("r").toString()
      },
      fileURL.pipeline.factories[fileURL.pipeline.factories.length - 1] as SharedKeyCredential
    );

    const fileName2 = recorder.getUniqueName("file2");
    const fileURL2 = FileURL.fromDirectoryURL(dirURL, fileName2);

    await fileURL2.create(Aborter.none, 1024);

    await fileURL2.uploadRangeFromURL(Aborter.none, `${fileURL.url}?${sas}`, 0, 0, 512);
    await fileURL2.uploadRangeFromURL(Aborter.none, `${fileURL.url}?${sas}`, 512, 512, 512);

    const range1 = await fileURL2.download(Aborter.none, 0, 512);
    const range2 = await fileURL2.download(Aborter.none, 512, 512);

    assert.equal(await bodyToString(range1, 512), "a".repeat(512));
    assert.equal(await bodyToString(range2, 512), "b".repeat(512));
  });
});
