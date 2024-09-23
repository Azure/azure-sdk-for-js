// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockBlobClient, BlobServiceClient } from "../src";
import {
  getBSU,
  getRecorderUniqueVariable,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils/index";
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
    await recorder.addSanitizers({ uriSanitizers }, ["playback", "record"]);
    blobServiceClient = getBSU(recorder);
    containerName = getRecorderUniqueVariable(recorder, "1container-with-dash");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async function () {
    await containerClient.delete();
    await recorder.stop();
  });

  it("Should work with special container and blob names with spaces", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "blob empty");
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

  it("Should work with special container and blob names with spaces in URL string", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "blob empty");
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
    const blobName: string = getRecorderUniqueVariable(recorder, "////blob/empty /another");
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
    const blobName: string = getRecorderUniqueVariable(recorder, "////blob/empty /another");
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

  it("Should work with special container and blob names uppercase", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "////Upper/blob/empty /another");
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
    const blobName: string = recorder.variable(
      "blobNameWithDots",
      getUniqueName("/blobname/./blobname1/../blobname2/blobname3"),
    );
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

  it("Should work with special container and blob names uppercase in URL string", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "////Upper/blob/empty /another");
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

  it("Should work with special blob names Chinese characters", async function () {
    const blobName: string = getRecorderUniqueVariable(
      recorder,
      "////Upper/blob/empty /another 汉字",
    );
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

  it("Should work with special blob names Chinese characters in URL string", async function () {
    const blobName: string = getRecorderUniqueVariable(
      recorder,
      "////Upper/blob/empty /another 汉字",
    );
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

  it("Should work with special blob name characters", async function () {
    const blobName = getRecorderUniqueVariable(
      recorder,
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'",
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

  it("Should work with special blob name characters in URL string", async function () {
    const blobName = getRecorderUniqueVariable(
      recorder,
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'",
    );
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

  it("Should work with special blob name Russian URI encoded", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "ру́сский язы́к");
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

  it("Should work with special blob name Russian", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "ру́сский язы́к");
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

  it("Should work with special blob name Russian in URL string", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "ру́сский язы́к");
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

  it("Should work with special blob name Arabic URI encoded", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "عربي/عربى");
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

  it("Should work with special blob name Arabic", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "عربي/عربى");
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

  it("Should work with special blob name Arabic in URL string", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "عربي/عربى");
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

  it("Should work with special blob name Japanese URI encoded", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "にっぽんご/にほんご");
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

  it("Should work with special blob name Japanese", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "にっぽんご/にほんご");
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

  it("Should work with special blob name Japanese in URL string", async function () {
    const blobName: string = getRecorderUniqueVariable(recorder, "にっぽんご/にほんご");
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
