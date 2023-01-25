// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlockBlobClient, BlobServiceClient } from "../src";
import { getBSU, recorderEnvSetup } from "./utils/index";
import { assert } from "chai";
import { appendToURLPath, EscapePath } from "../src/utils/utils.common";
import { Recorder } from "@azure-tools/test-recorder";
import { ContainerClient } from "../src";
import { Context } from "mocha";

describe("Special Naming Tests", () => {
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("1container-with-dash", `1container-with-dash-${Date.now()}`);
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async function () {
    await containerClient.delete();
    await recorder.stop();
  });

  it("Should work with special container and blob names with spaces", async function() {
    const blobName: string = recorder.variable("blob empty", `blob empty-${Date.now()}`);
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

  it("Should work with special container and blob names with spaces in URL string", async function() {
    const blobName: string = recorder.variable("blob empty", `blob empty-${Date.now()}`);
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
    const blobName: string = recorder.variable("////blob/empty /another", `////blob/empty /another-${Date.now()}`);
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
    const blobName: string = recorder.variable("////blob/empty /another", `////blob/empty /another-${Date.now()}`);
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

  it("Should work with special container and blob names uppercase", async function() {
    const blobName: string = recorder.variable("////Upper/blob/empty /another", `////Upper/blob/empty /another-${Date.now()}`);
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

  it("Should work with special container and blob names uppercase in URL string", async function() {
    const blobName: string = recorder.variable("////Upper/blob/empty /another", `////Upper/blob/empty /another-${Date.now()}`);
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

  it("Should work with special blob names Chinese characters", async function() {
    const blobName: string = recorder.variable("////Upper/blob/empty /another 汉字", `////Upper/blob/empty /another 汉字-${Date.now()}`);
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

  it("Should work with special blob names Chinese characters in URL string", async function() {
    const blobName: string = recorder.variable("////Upper/blob/empty /another 汉字", `////Upper/blob/empty /another 汉字-${Date.now()}`);
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

  it("Should work with special blob name characters", async function() {
    const blobName = recorder.variable(
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'",
      `汉字. special ~!@#$%^&*()_+\`1234567890-={}|[]\\:\";'<>?,/'-${Date.now()}`
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

  it("Should work with special blob name characters in URL string", async function() {
    const blobName = recorder.variable("汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'", `汉字. special ~!@#$%^&*()_+\`1234567890-={}|[]\\:\";'<>?,/'-${Date.now()}`)
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, EscapePath(blobName)),
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

  it("Should work with special blob name Russian URI encoded", async function() {
    const blobName: string = recorder.variable("ру́сский язы́к", `ру́сский язы́к-${Date.now()}`);
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

  it("Should work with special blob name Russian", async function() {
    const blobName: string = recorder.variable("ру́сский язы́к", `ру́сский язы́к-${Date.now()}`);
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

  it("Should work with special blob name Russian in URL string", async function() {
    const blobName: string = recorder.variable("ру́сский язы́к", `ру́сский язы́к-${Date.now()}`);
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

  it("Should work with special blob name Arabic URI encoded", async function() {
    const blobName: string = recorder.variable("عربي/عربى", `عربي/عربى-${Date.now()}`);
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

  it("Should work with special blob name Arabic", async function() {
    const blobName: string = recorder.variable("عربي/عربى", `عربي/عربى-${Date.now()}`);
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

  it("Should work with special blob name Arabic in URL string", async function() {
    const blobName: string = recorder.variable("عربي/عربى", `عربي/عربى-${Date.now()}`);
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

  it("Should work with special blob name Japanese URI encoded", async function() {
    const blobName: string = recorder.variable("にっぽんご/にほんご", `にっぽんご/にほんご-${Date.now()}`);
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

  it("Should work with special blob name Japanese", async function() {
    const blobName: string = recorder.variable("にっぽんご/にほんご", `にっぽんご/にほんご-${Date.now()}`);
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

  it("Should work with special blob name Japanese in URL string", async function() {
    const blobName: string = recorder.variable("にっぽんご/にほんご", `にっぽんご/にほんご-${Date.now()}`);
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
