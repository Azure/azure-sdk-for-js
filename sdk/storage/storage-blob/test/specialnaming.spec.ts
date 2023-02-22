// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlockBlobClient, BlobServiceClient } from "../src";
import { getBSU, recorderEnvSetup } from "./utils/index";
import { assert } from "chai";
import { appendToURLPath } from "../src/utils/utils.common";
import { record, Recorder } from "@azure-tools/test-recorder";
import { ContainerClient } from "../src";
import { Context } from "mocha";

describe("Special Naming Tests", () => {
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("1container-with-dash");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async function () {
    await containerClient.delete();
    await recorder.stop();
  });

  it("Should work with special container and blob names with spaces", async () => {
    const blobName: string = recorder.getUniqueName("blob empty");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload("A", 1);
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with spaces in URL string", async () => {
    const blobName: string = recorder.getUniqueName("blob empty");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline
    );

    await blockBlobClient.upload("A", 1);
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with /", async () => {
    const blobName: string = recorder.getUniqueName("////blob/empty /another");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with / in URL string", async () => {
    const blobName: string = recorder.getUniqueName("////blob/empty /another");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline
    );

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names uppercase", async () => {
    const blobName: string = recorder.getUniqueName("////Upper/blob/empty /another");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with dots in blobname", async () => {
    const blobName: string = recorder.getUniqueName("/blobname/./blobname1/../blobname2/blobname3");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline
    );

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();

    const prefix = "/blobname/blobname2/blobname3";
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: prefix,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names uppercase in URL string", async () => {
    const blobName: string = recorder.getUniqueName("////Upper/blob/empty /another");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline
    );

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob names Chinese characters", async () => {
    const blobName: string = recorder.getUniqueName("////Upper/blob/empty /another 汉字");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob names Chinese characters in URL string", async () => {
    const blobName: string = recorder.getUniqueName("////Upper/blob/empty /another 汉字");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline
    );

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name characters", async () => {
    const blobName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'"
    );
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
          prefix: blobName.replace(/\\/g, "/"),
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name characters in URL string", async () => {
    const blobName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'"
    );
    const blockBlobClient = new BlockBlobClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XxxClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(containerClient.url, blobName.replace(/%/g, "%25").replace(/\?/g, "%3F")),
      (containerClient as any).pipeline
    );

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
          prefix: blobName.replace(/\\/g, "/"),
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Russian URI encoded", async () => {
    const blobName: string = recorder.getUniqueName("ру́сский язы́к");
    const blobNameEncoded: string = encodeURIComponent(blobName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobNameEncoded);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobNameEncoded,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Russian", async () => {
    const blobName: string = recorder.getUniqueName("ру́сский язы́к");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Russian in URL string", async () => {
    const blobName: string = recorder.getUniqueName("ру́сский язы́к");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline
    );

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Arabic URI encoded", async () => {
    const blobName: string = recorder.getUniqueName("عربي/عربى");
    const blobNameEncoded: string = encodeURIComponent(blobName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobNameEncoded);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobNameEncoded,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Arabic", async () => {
    const blobName: string = recorder.getUniqueName("عربي/عربى");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Arabic in URL string", async () => {
    const blobName: string = recorder.getUniqueName("عربي/عربى");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline
    );

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Japanese URI encoded", async () => {
    const blobName: string = recorder.getUniqueName("にっぽんご/にほんご");
    const blobNameEncoded: string = encodeURIComponent(blobName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobNameEncoded);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobNameEncoded,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Japanese", async () => {
    const blobName: string = recorder.getUniqueName("にっぽんご/にほんご");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Japanese in URL string", async () => {
    const blobName: string = recorder.getUniqueName("にっぽんご/にほんご");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline
    );

    await blockBlobClient.upload("A", 1);
    await blockBlobClient.getProperties();
    const response = (
      await containerClient
        .listBlobsFlat({
          prefix: blobName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });
});
