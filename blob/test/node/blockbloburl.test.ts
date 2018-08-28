import * as assert from "assert";

import { Aborter } from "../../lib/Aborter";
import { BlobURL } from "../../lib/BlobURL";
import { BlockBlobURL } from "../../lib/BlockBlobURL";
import { ContainerURL } from "../../lib/ContainerURL";
import { getBSU, getUniqueName } from "../utils";

describe("BlockBlobURL Node.js only", () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  let blobName: string = getUniqueName("blob");
  let blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  let blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.None);
    blobName = getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.None);
  });

  it("upload with Readable stream body and default parameters", async () => {
    const body: string = getUniqueName("randomstring");
    const bodyBuffer = Buffer.from(body);

    await blockBlobURL.upload(Aborter.None, bodyBuffer, body.length);
    const result = await blobURL.download(Aborter.None, 0);
    assert.deepStrictEqual(
      result.readableStreamBody!.read(body.length)!.toString(),
      body
    );
  });
});
