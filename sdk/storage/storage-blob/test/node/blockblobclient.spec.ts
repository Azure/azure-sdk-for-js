import * as assert from "assert";
import * as zlib from "zlib";

import {
  bodyToString,
  getBSU,
  getConnectionStringFromEnvironment,
  recorderEnvSetup
} from "../utils";
import {
  BlockBlobClient,
  newPipeline,
  StorageSharedKeyCredential,
  BlobClient,
  ContainerClient,
  BlobServiceClient
} from "../../src";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { record, Recorder } from "@azure/test-utils-recorder";

describe("BlockBlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await containerClient.delete();
      await recorder.stop();
    }
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
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new BlockBlobClient(blockBlobClient.url, credential);

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (blockBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
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
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
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

  it("can be created with a connection string and an option bag", async () => {
    const newClient = new BlockBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
      {
        retryOptions: {
          maxTries: 5
        }
      }
    );

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("should not decompress during downloading", async () => {
    const body: string = "hello world body string!";
    const deflated = zlib.deflateSync(body);

    await blockBlobClient.upload(deflated, deflated.byteLength, {
      blobHTTPHeaders: {
        blobContentEncoding: "deflate",
        blobContentType: "text/plain"
      }
    });

    const downloaded = await blockBlobClient.downloadToBuffer();
    assert.deepStrictEqual(downloaded, deflated);
  });
});
