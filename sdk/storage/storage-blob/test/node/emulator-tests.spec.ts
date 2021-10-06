// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as dotenv from "dotenv";
import {
  BlobClient,
  ContainerClient,
  BlobServiceClient,
  BlockBlobClient,
  PageBlobClient
} from "../../src";
import { getBSU, getConnectionStringFromEnvironment, bodyToString, getUniqueName } from "../utils";
import { env } from "@azure-tools/test-recorder";
import { Context } from "mocha";
dotenv.config();

// Expected environment variable to run this test-suite
// STORAGE_CONNECTION_STRING=UseDevelopmentStorage=true
describe("Emulator Tests", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let blobName: string;
  let containerClient: ContainerClient;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";

  beforeEach(async function(this: Context) {
    if (!env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")) {
      this.skip();
    }
    blobServiceClient = getBSU();
    containerName = getUniqueName("container");
    blobName = getUniqueName("blob");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await containerClient.delete();
    }
  });

  it("BlobClient can be created with a connection string", async () => {
    const newClient = new BlobClient(getConnectionStringFromEnvironment(), containerName, blobName);
    const metadata = {
      a: "a",
      b: "b"
    };
    await newClient.setMetadata(metadata);
    assert.equal(
      containerName,
      newClient.containerName,
      "Container name didn't match with the provided one."
    );
    assert.equal(newClient.name, blobName, "Blob name didn't match with the provided one.");
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("BlobServiceClient can be created from a connection string", async () => {
    const newClient = BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment());

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("BlockBlobClient can be created with a connection string", async () => {
    const newClient = new BlockBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName
    );

    assert.equal(
      newClient.containerName,
      containerName,
      "Container name didn't match with the provided one."
    );
    assert.equal(newClient.name, blobName, "Blob name didn't match with the provided one.");
    const body: string = "randomstring";
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("ContainerClient can be created with a connection string and a container name and an option bag", async () => {
    const newClient = new ContainerClient(getConnectionStringFromEnvironment(), containerName, {
      retryOptions: {
        maxTries: 5
      }
    });

    const result = await newClient.getProperties();

    assert.equal(
      newClient.containerName,
      containerName,
      "Container name didn't match with the provided one."
    );
    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(!result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
    assert.ok(!result.blobPublicAccess);
  });

  it("ContainerClient can be created from BSU()", async () => {
    const newClient = blobServiceClient.getContainerClient(containerName);

    const result = await newClient.getProperties();

    assert.equal(
      newClient.containerName,
      containerName,
      "Container name didn't match with the provided one."
    );
    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
  });

  it("PageBlobClient can be created with a connection string", async () => {
    const newClient = new PageBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName
    );

    assert.equal(
      newClient.containerName,
      containerName,
      "Container name didn't match with the provided one."
    );
    assert.equal(newClient.name, blobName, "Blob name didn't match with the provided one.");
    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });
});
