import * as assert from "assert";

import { AppendBlobClient } from "../src/AppendBlobClient";
import { bodyToString, getBSU, getUniqueName } from "./utils";
import { SharedKeyCredential, newPipeline } from "../src";
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

  it("can be created with a url and a credential", async () => {
    const factories = appendBlobClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new AppendBlobClient(appendBlobClient.url, credential);

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = appendBlobClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new AppendBlobClient(appendBlobClient.url, credential, {
      telemetry: { value: "test/1.0" }
    });

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = appendBlobClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new AppendBlobClient(appendBlobClient.url, pipeline);

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a connection string", async () => {
    const newClient = new AppendBlobClient(
      process.env.CONNECTION_STRING || "",
      containerName,
      blobName
    );

    await newClient.create();
    await newClient.download();
  });

  it("throws error when passed an invalid connection string", async () => {
    try {
      const newClient = new AppendBlobClient(
        "DefaultEndpointsProtocol=a;AccountName=b;AccountKey=c;EndpointSuffix=d" || "",
        containerName,
        blobName
      );

      await newClient.create();
    } catch (error) {}
  });

  it("throws error when passed an invalid connection string", async () => {
    try {
      const newClient = new AppendBlobClient(
        // Typo in the attributes
        "DefaultEndpointsProtocol=a;Name=b;AccountKey=c;EndpointSuffix=d" || "",
        containerName,
        blobName
      );

      await newClient.create();
    } catch (error) {
      assert.equal(
        "Invalid Connection String",
        error.message,
        "Connection string is different than expected"
      );
    }
  });

  it("throws error with empty EndpointSuffix in the connection string", async () => {
    try {
      new AppendBlobClient(
        "DefaultEndpointsProtocol=a;AccountName=b;AccountKey=c;EndpointSuffix=" || "",
        containerName,
        blobName
      );
    } catch (error) {
      assert.equal(
        "Invalid EndpointSuffix in the provided Connection String",
        error.message,
        "Connection string is different than expected"
      );
    }
  });

  it("throws error with empty AccountKey in the connection string", async () => {
    try {
      new AppendBlobClient(
        "DefaultEndpointsProtocol=a;AccountName=b;AccountKey=;EndpointSuffix=d" || "",
        containerName,
        blobName
      );
    } catch (error) {
      assert.equal(
        "Invalid AccountKey in the provided Connection String",
        error.message,
        "Connection string is different than expected"
      );
    }
  });

  it("throws error with empty AccountName in the connection string", async () => {
    try {
      new AppendBlobClient(
        "DefaultEndpointsProtocol=a;AccountName=;AccountKey=c;EndpointSuffix=d" || "",
        containerName,
        blobName
      );
    } catch (error) {
      assert.equal(
        "Invalid AccountName in the provided Connection String",
        error.message,
        "Connection string is different than expected"
      );
    }
  });

  it("throws error with empty DefaultEndpointsProtocol in the connection string", async () => {
    try {
      new AppendBlobClient(
        "DefaultEndpointsProtocol=;AccountName=b;AccountKey=c;EndpointSuffix=d" || "",
        containerName,
        blobName
      );
    } catch (error) {
      assert.equal(
        "Invalid DefaultEndpointsProtocol in the provided Connection String",
        error.message,
        "Connection string is different than expected"
      );
    }
  });
});
