// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { BlockBlobClient } from "@azure/storage-blob";
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { appendToURLPath, EscapePath, getUniqueName } from "./utils/utils.js";
import { createBlobServiceClient } from "./utils/clients.js";

describe("Special Naming Tests", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let recorder: Recorder;
  let blobServiceClient: BlobServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("1container-with-dash", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("Should work with special container and blob names with spaces", async () => {
    const blobName = getUniqueName("blob empty", { recorder });
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
    const blobName = getUniqueName("blob empty", { recorder });
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline,
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
    const blobName = getUniqueName("////blob/empty /another", { recorder });
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
    const blobName = getUniqueName("////blob/empty /another", { recorder });
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline,
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
    const blobName = getUniqueName("////Upper/blob/empty /another", { recorder });
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
    const blobName = getUniqueName("/blobname/./blobname1/../blobname2/blobname3", { recorder });
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline,
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
    const blobName = getUniqueName("////Upper/blob/empty /another", { recorder });
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline,
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
    const blobName = getUniqueName("////Upper/blob/empty /another 汉字", { recorder });
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
    const blobName = getUniqueName("////Upper/blob/empty /another 汉字", { recorder });
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline,
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
    const blobName = getUniqueName("汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'", {
      recorder,
    });
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
    const blobName = getUniqueName("汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'", {
      recorder,
    });
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, EscapePath(blobName)),
      (containerClient as any).pipeline,
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
    const blobName = getUniqueName("ру́сский язы́к", { recorder });
    const blobNameEncoded = encodeURIComponent(blobName);
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
    const blobName = getUniqueName("ру́сский язы́к", { recorder });
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
    const blobName = getUniqueName("ру́сский язы́к", { recorder });
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline,
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
    const blobName = getUniqueName("عربي/عربى", { recorder });
    const blobNameEncoded = encodeURIComponent(blobName);
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
    const blobName = getUniqueName("عربي/عربى", { recorder });
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
    const blobName = getUniqueName("عربي/عربى", { recorder });
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline,
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
    const blobName = getUniqueName("にっぽんご/にほんご", { recorder });
    const blobNameEncoded = encodeURIComponent(blobName);
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
    const blobName = getUniqueName("にっぽんご/にほんご", { recorder });
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
    const blobName = getUniqueName("にっぽんご/にほんご", { recorder });
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      (containerClient as any).pipeline,
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
