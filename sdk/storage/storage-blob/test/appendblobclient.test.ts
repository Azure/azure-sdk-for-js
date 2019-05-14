import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { AppendBlobClient } from "../src/AppendBlobClient";
import { ContainerClient } from "../src/ContainerClient";
import { bodyToString, getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("AppendBlobClient", () => {
  const serviceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
  let blobName: string = getUniqueName("blob");
  let appendBlobClient = AppendBlobClient.fromContainerClient(containerClient, blobName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);
    blobName = getUniqueName("blob");
    appendBlobClient = AppendBlobClient.fromContainerClient(containerClient, blobName);
  });

  afterEach(async () => {
    await containerClient.delete(Aborter.none);
  });

  it("create with default parameters", async () => {
    await appendBlobClient.create(Aborter.none);
    await appendBlobClient.download(Aborter.none, 0);
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
    await appendBlobClient.create(Aborter.none, options);
    const properties = await appendBlobClient.getProperties(Aborter.none);
    assert.equal(properties.cacheControl, options.blobHTTPHeaders.blobCacheControl);
    assert.equal(properties.contentDisposition, options.blobHTTPHeaders.blobContentDisposition);
    assert.equal(properties.contentEncoding, options.blobHTTPHeaders.blobContentEncoding);
    assert.equal(properties.contentLanguage, options.blobHTTPHeaders.blobContentLanguage);
    assert.equal(properties.contentType, options.blobHTTPHeaders.blobContentType);
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("appendBlock", async () => {
    await appendBlobClient.create(Aborter.none);

    const content = "Hello World!";
    await appendBlobClient.appendBlock(Aborter.none, content, content.length);

    const downloadResponse = await appendBlobClient.download(Aborter.none, 0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });
});
