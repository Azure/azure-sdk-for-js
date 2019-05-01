import * as assert from "assert";
import { Duplex } from "stream";

import { Aborter } from "../../src/Aborter";
import { DirectoryURL } from "../../src/DirectoryURL";
import { FileURL } from "../../src/FileURL";
import { ShareURL } from "../../src/ShareURL";
import { bodyToString, getBSU } from "../utils";
import { Buffer } from "buffer";
import { record } from "../utils/nock-recorder";

describe("BlockBlobURL Node.js only", function() {
  const serviceURL = getBSU();
  let shareName: string;
  let shareURL: ShareURL;
  let dirName: string;
  let dirURL: DirectoryURL;
  let fileName: string;
  let fileURL: FileURL;
  const testSuiteTitle = this.fullTitle();

  let recorder: any;

  beforeEach(async function() {
    recorder = record.call(this, testSuiteTitle);

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
});
