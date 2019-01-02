import * as assert from "assert";
import { Duplex } from "stream";

import { Aborter } from "../../lib/Aborter";
import { DirectoryURL } from "../../lib/DirectoryURL";
import { FileURL } from "../../lib/FileURL";
import { ShareURL } from "../../lib/ShareURL";
import { bodyToString, getBSU, getUniqueName } from "../utils";

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
    await shareURL.create(Aborter.none);

    dirName = getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);

    fileName = getUniqueName("file");
    fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
  });

  it("upload with buffer and default parameters", async () => {
    const body: string = getUniqueName("randomstring");
    const bodyBuffer = Buffer.from(body);

    await fileURL.create(Aborter.none, body.length);
    await fileURL.uploadRange(Aborter.none, bodyBuffer, 0, body.length);
    const result = await fileURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with Node.js stream", async () => {
    const body: string = getUniqueName("randomstring");

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
});
