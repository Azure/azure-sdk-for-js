// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BlobClient,
  ContainerClient,
  BlobServiceClient,
  BlockBlobClient,
  PageBlobClient,
} from "@azure/storage-blob";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getStorageConnectionString } from "../../utils/injectables.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { bodyToString } from "../../utils/node/testHelpers.js";
import { createServer } from "node:net";

function getConnectionString(mode?: "local"): string {
  const connStr = getStorageConnectionString();
  if (mode === "local" || !connStr) {
    return `UseDevelopmentStorage=true`;
  }
  return connStr;
}

/**
 * Check if the Azurite Blob emulator is running by attempting to connect to its port.
 * Azurite Blob service runs on port 10000 by default.
 */
async function isEmulatorRunning(): Promise<boolean> {
  const AZURITE_BLOB_PORT = 10000;
  return new Promise((resolve) => {
    const server = createServer();
    server.once("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        // Port is in use, meaning the emulator is likely running
        resolve(true);
      } else {
        resolve(false);
      }
    });
    server.once("listening", () => {
      // Port is free, meaning the emulator is not running
      server.close();
      resolve(false);
    });
    server.listen(AZURITE_BLOB_PORT, "127.0.0.1");
  });
}

const emulatorRunning = await isEmulatorRunning();

describe.runIf(emulatorRunning)("Emulator Tests", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let blobName: string;
  let containerClient: ContainerClient;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";
  const cs = getConnectionString("local");

  beforeEach(async () => {
    blobServiceClient = BlobServiceClient.fromConnectionString(cs);
    containerName = getUniqueName("container");
    blobName = getUniqueName("blob");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("BlobClient can be created with a connection string", async () => {
    const newClient = new BlobClient(cs, containerName, blobName);
    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    assert.equal(
      containerName,
      newClient.containerName,
      "Container name didn't match with the provided one.",
    );
    assert.equal(newClient.name, blobName, "Blob name didn't match with the provided one.");
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("BlobServiceClient can be created from a connection string", async () => {
    const newClient = BlobServiceClient.fromConnectionString(cs);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
  });

  it("BlockBlobClient can be created with a connection string", async () => {
    const newClient = new BlockBlobClient(cs, containerName, blobName);

    assert.equal(
      newClient.containerName,
      containerName,
      "Container name didn't match with the provided one.",
    );
    assert.equal(newClient.name, blobName, "Blob name didn't match with the provided one.");
    const body = "randomstring";
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("ContainerClient can be created with a connection string and a container name and an option bag", async () => {
    const newClient = new ContainerClient(cs, containerName, {
      retryOptions: {
        maxTries: 5,
      },
    });

    const result = await newClient.getProperties();

    assert.equal(
      newClient.containerName,
      containerName,
      "Container name didn't match with the provided one.",
    );
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
  });

  it("ContainerClient can be created from BSU()", async () => {
    const newClient = blobServiceClient.getContainerClient(containerName);

    const result = await newClient.getProperties();

    assert.equal(
      newClient.containerName,
      containerName,
      "Container name didn't match with the provided one.",
    );
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
  });

  it("PageBlobClient can be created with a connection string", async () => {
    const newClient = new PageBlobClient(cs, containerName, blobName);

    assert.equal(
      newClient.containerName,
      containerName,
      "Container name didn't match with the provided one.",
    );
    assert.equal(newClient.name, blobName, "Blob name didn't match with the provided one.");
    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });
});
