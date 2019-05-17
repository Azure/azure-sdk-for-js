import * as assert from "assert";

import { BlobClient } from "../../src/BlobClient";
import { BlockBlobClient } from "../../src/BlockBlobClient";
import { ContainerClient } from "../../src/ContainerClient";
import { bodyToString, getBSU, getUniqueName } from "../utils";

describe("BlockBlobClient Node.js only", () => {
  const blobServiceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = ContainerClient.fromBlobServiceClient(blobServiceClient, containerName);
  let blobName: string = getUniqueName("blob");
  let blobClient = BlobClient.fromContainerClient(containerClient, blobName);
  let blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = ContainerClient.fromBlobServiceClient(blobServiceClient, containerName);
    await containerClient.create();
    blobName = getUniqueName("blob");
    blobClient = BlobClient.fromContainerClient(containerClient, blobName);
    blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("upload with Readable stream body and default parameters", async () => {
    const body: string = getUniqueName("randomstring");
    const bodyBuffer = Buffer.from(body);

    await blockBlobClient.upload(bodyBuffer, body.length);
    const result = await blobClient.download(0);

    const downloadedBody = await new Promise((resolve, reject) => {
      const buffer: string[] = [];
      result.readableStreamBody!.on("data", (data: Buffer) => {
        buffer.push(data.toString());
      });
      result.readableStreamBody!.on("end", () => {
        resolve(buffer.join(""));
      });
      result.readableStreamBody!.on("error", reject);
    });

    assert.deepStrictEqual(downloadedBody, body);
  });

  it("upload with Chinese string body and default parameters", async () => {
    const body: string = getUniqueName("randomstring你好");
    await blockBlobClient.upload(body, Buffer.byteLength(body));
    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, Buffer.byteLength(body)), body);
  });
});
