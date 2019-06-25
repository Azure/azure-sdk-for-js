import * as assert from "assert";

import { bodyToString, getBSU, getConnectionStringFromEnvironment } from "../utils";
import {
  BlockBlobClient,
  newPipeline,
  SharedKeyCredential,
  BlobClient,
  ContainerClient
} from "../../src";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { record } from "../utils/recorder";

describe("BlockBlobClient Node.js only", () => {
  const blobServiceClient = getBSU();
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.createContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.createBlobClient(blobName);
    blockBlobClient = blobClient.createBlockBlobClient();
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("upload with Readable stream body and default parameters", async () => {
    const body: string = recorder.getUniqueName("randomstring");
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
    const body: string = recorder.getUniqueName("randomstring你好");
    await blockBlobClient.upload(body, Buffer.byteLength(body));
    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, Buffer.byteLength(body)), body);
  });

  it("can be created with a url and a credential", async () => {
    const factories = (blockBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new BlockBlobClient(blockBlobClient.url, credential);

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (blockBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new BlockBlobClient(blockBlobClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345
        })
    };
    const newClient = new BlockBlobClient(blockBlobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (blockBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new BlockBlobClient(blockBlobClient.url, pipeline);

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a connection string", async () => {
    const newClient = new BlockBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName
    );

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("throws error if constructor containerName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new BlockBlobClient(getConnectionStringFromEnvironment(), "", "blobName");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected."
      );
    }
  });

  it("throws error if constructor blobName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new BlockBlobClient(getConnectionStringFromEnvironment(), "containerName", "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected."
      );
    }
  });
});
