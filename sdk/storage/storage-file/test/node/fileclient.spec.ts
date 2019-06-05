import * as assert from "assert";
import { Duplex } from "stream";
import { bodyToString, getBSU, getUniqueName } from "../utils";
import { Buffer } from "buffer";

describe("FileClient Node.js only", () => {
  const serviceClient = getBSU();
  let shareName = getUniqueName("share");
  let shareClient = serviceClient.createShareClient(shareName);
  let dirName = getUniqueName("dir");
  let dirClient = shareClient.createDirectoryClient(dirName);
  let fileName = getUniqueName("file");
  let fileClient = dirClient.createFileClient(fileName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareClient = serviceClient.createShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir");
    dirClient = shareClient.createDirectoryClient(dirName);
    await dirClient.create();

    fileName = getUniqueName("file");
    fileClient = dirClient.createFileClient(fileName);
  });

  afterEach(async () => {
    await shareClient.delete();
  });

  it("upload with buffer and default parameters", async () => {
    const body: string = getUniqueName("randomstring");
    const bodyBuffer = Buffer.from(body);

    await fileClient.create(body.length);
    await fileClient.uploadRange(bodyBuffer, 0, body.length);
    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with Node.js stream", async () => {
    const body: string = getUniqueName("randomstring");

    await fileClient.create(body.length);
    await fileClient.uploadRange(
      () => {
        const duplexStream = new Duplex();
        duplexStream.push(body);
        duplexStream.push(null);
        return duplexStream;
      },
      0,
      body.length
    );
    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with Chinese string body and default parameters", async () => {
    const body: string = getUniqueName("randomstring你好");
    const bodyLength = Buffer.byteLength(body);

    await fileClient.create(bodyLength);
    await fileClient.uploadRange(body, 0, bodyLength);
    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, bodyLength), body);
  });
});
