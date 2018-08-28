import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { AppendBlobURL } from "../lib/AppendBlobURL";
import { ContainerURL } from "../lib/ContainerURL";
import { bodyToString, getBSU, getUniqueName } from "./utils";

describe("AppendBlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  let blobName: string = getUniqueName("blob");
  let appendBlobURL = AppendBlobURL.fromContainerURL(containerURL, blobName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.None);
    blobName = getUniqueName("blob");
    appendBlobURL = AppendBlobURL.fromContainerURL(containerURL, blobName);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.None);
  });

  it("create with default parameters", async () => {
    await appendBlobURL.create(Aborter.None);
    await appendBlobURL.download(Aborter.None, 0);
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
    await appendBlobURL.create(Aborter.None, options);
    const properties = await appendBlobURL.getProperties(Aborter.None);
    assert.equal(
      properties.cacheControl,
      options.blobHTTPHeaders.blobCacheControl
    );
    assert.equal(
      properties.contentDisposition,
      options.blobHTTPHeaders.blobContentDisposition
    );
    assert.equal(
      properties.contentEncoding,
      options.blobHTTPHeaders.blobContentEncoding
    );
    assert.equal(
      properties.contentLanguage,
      options.blobHTTPHeaders.blobContentLanguage
    );
    assert.equal(
      properties.contentType,
      options.blobHTTPHeaders.blobContentType
    );
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("appendBlock", async () => {
    await appendBlobURL.create(Aborter.None);

    const content = "Hello World!";
    await appendBlobURL.appendBlock(Aborter.None, content, content.length);

    const downloadResponse = await appendBlobURL.download(Aborter.None, 0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });
});
