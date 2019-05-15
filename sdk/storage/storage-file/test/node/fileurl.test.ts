import * as assert from "assert";
import { Duplex } from "stream";
import { DirectoryURL } from "../../src/DirectoryURL";
import { FileURL } from "../../src/FileURL";
import { ShareURL } from "../../src/ShareURL";
import { bodyToString, getBSU, getUniqueName } from "../utils";
import { Buffer } from "buffer";

describe("BlockBlobURL Node.js only", () => {
  const serviceURL = getBSU();
  let shareName = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
  let dirName = getUniqueName("dir");
  let dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
  let fileName = getUniqueName("file");
  let fileURL = FileURL.fromDirectoryURL(dirURL, fileName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create();

    dirName = getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create();

    fileName = getUniqueName("file");
    fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  });

  afterEach(async () => {
    await shareURL.delete();
  });

  it("upload with buffer and default parameters", async () => {
    const body: string = getUniqueName("randomstring");
    const bodyBuffer = Buffer.from(body);

    await fileURL.create(body.length);
    await fileURL.uploadRange(bodyBuffer, 0, body.length);
    const result = await fileURL.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with Node.js stream", async () => {
    const body: string = getUniqueName("randomstring");

    await fileURL.create(body.length);
    await fileURL.uploadRange(
      () => {
        const duplexStream = new Duplex();
        duplexStream.push(body);
        duplexStream.push(null);
        return duplexStream;
      },
      0,
      body.length
    );
    const result = await fileURL.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with Chinese string body and default parameters", async () => {
    const body: string = getUniqueName("randomstring你好");
    const bodyLength = Buffer.byteLength(body);

    await fileURL.create(bodyLength);
    await fileURL.uploadRange(body, 0, bodyLength);
    const result = await fileURL.download(0);
    assert.deepStrictEqual(await bodyToString(result, bodyLength), body);
  });
});
