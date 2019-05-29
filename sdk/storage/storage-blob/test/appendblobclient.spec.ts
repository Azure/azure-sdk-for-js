import * as assert from "assert";

import { bodyToString, getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("AppendBlobClient", () => {
  const blobServiceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = blobServiceClient.createContainerClient(containerName);
  let blobName: string = getUniqueName("blob");
  let appendBlobClient = containerClient.createAppendBlobClient(blobName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = blobServiceClient.createContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob");
    appendBlobClient = containerClient.createAppendBlobClient(blobName);
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("create with default parameters", async () => {
    await appendBlobClient.create();
    await appendBlobClient.download(0);
  });

  it("create with parameters configured", async () => {
    const options = {
      blobHTTPHeaders: {
        blobCacheControl: "blobCacheControl",
        blobContentDisposition: "blobContentDisposition",
        blobContentEncoding: "blobContentEncoding",
        blobContentLanguage: "blobContentLanguage",
        blobContentType: "blobContentType"
      },
      metadata: {
        key1: "vala",
        key2: "valb"
      }
    };
    await appendBlobClient.create(options);
    const properties = await appendBlobClient.getProperties();
    assert.equal(properties.cacheControl, options.blobHTTPHeaders.blobCacheControl);
    assert.equal(properties.contentDisposition, options.blobHTTPHeaders.blobContentDisposition);
    assert.equal(properties.contentEncoding, options.blobHTTPHeaders.blobContentEncoding);
    assert.equal(properties.contentLanguage, options.blobHTTPHeaders.blobContentLanguage);
    assert.equal(properties.contentType, options.blobHTTPHeaders.blobContentType);
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("appendBlock", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    await appendBlobClient.appendBlock(content, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });
});
