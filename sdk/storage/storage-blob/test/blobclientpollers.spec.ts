import * as assert from "assert";
import * as dotenv from "dotenv";

import { getBSU } from "./utils";
import { record } from "./utils/recorder";
import { BlobClient, BlockBlobClient, ContainerClient } from "../src";
import { BlobStartCopyFromURLResponse } from "../src/generated/src/models";
dotenv.config({ path: "../.env" });

describe("BlobClient beginCopyFromURL Poller", () => {
  const blobServiceClient = getBSU();
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let destinationContainerClient: ContainerClient;
  let destinationContainerName: string;
  const content = "Hello World";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
    destinationContainerName = recorder.getUniqueName("dest-container");
    destinationContainerClient = blobServiceClient.getContainerClient(destinationContainerName);
    await destinationContainerClient.create();
  });

  afterEach(async function() {
    await containerClient.delete();
    await destinationContainerClient.delete();
    recorder.stop();
  });

  it("supports automatic polling via pollUntilDone", async () => {
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.getUniqueName("copiedblob")
    );
    const poller = await newBlobClient.beginCopyFromURL(blobClient.url);

    const result = await poller.pollUntilDone();
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.deepStrictEqual(properties2.copySource, blobClient.url);
  });

  it("supports manual polling via poll", async () => {
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.getUniqueName("copiedblob")
    );
    const poller = await newBlobClient.beginCopyFromURL(blobClient.url);
    let result: BlobStartCopyFromURLResponse;
    do {
      await poller.poll();
      if (poller.isDone()) {
        result = await poller.getResult()!;
      }
    } while (!poller.isDone());

    assert.ok(result!);
    assert.ok(result!.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result!.copyId);
    assert.deepStrictEqual(properties2.copySource, blobClient.url);
  });

  it("supports cancellation of the copy", async () => {
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.getUniqueName("copiedblob")
    );
    const poller = await newBlobClient.beginCopyFromURL(
      "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/README.md"
    );
    await poller.cancelOperation();
    try {
      await poller.pollUntilDone();
      throw new Error("Test failure");
    } catch (err) {
      assert.equal(err.name, "PollerCancelledError");
    }
  });
});
