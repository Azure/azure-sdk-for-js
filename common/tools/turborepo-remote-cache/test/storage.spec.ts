// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createAzureStorageClient } from "../src/storage.js";
import { PassThrough } from "node:stream";
import {
  BlobServiceClient,
  ContainerClient,
  BlobClient,
  BlockBlobClient,
  ContainerCreateIfNotExistsResponse,
  BlobGetPropertiesResponse,
  BlobDownloadResponseParsed,
} from "@azure/storage-blob";

vi.mock("@azure/storage-blob", async (importActual) => {
  const actual = await importActual<typeof import("@azure/storage-blob")>();

  const mockBlobServiceClient = vi.fn();
  mockBlobServiceClient.prototype.getContainerClient = vi.fn();

  const mockContainerClient = vi.fn();
  mockContainerClient.prototype.createIfNotExists = vi.fn();
  mockContainerClient.prototype.getBlobClient = vi.fn();
  mockContainerClient.prototype.getBlockBlobClient = vi.fn();
  mockContainerClient.prototype.exists = vi.fn();

  const mockBlobClient = vi.fn();
  mockBlobClient.prototype.getProperties = vi.fn();
  mockBlobClient.prototype.exists = vi.fn();
  mockBlobClient.prototype.download = vi.fn();

  const mockBlockBlobClient = vi.fn();
  mockBlockBlobClient.prototype.uploadStream = vi.fn();

  return {
    ...actual,
    BlobServiceClient: mockBlobServiceClient,
    ContainerClient: mockContainerClient,
    BlobClient: mockBlobClient,
    BlockBlobClient: mockBlockBlobClient,
  };
});

describe("createAzureStorageClient", () => {
  let mockBlobServiceClient: BlobServiceClient;
  let mockContainerClient: ContainerClient;
  let mockBlobClient: BlobClient;
  let mockBlockBlobClient: BlockBlobClient;

  beforeEach(() => {
    mockBlobServiceClient = new BlobServiceClient(expect.anything());
    mockContainerClient = new ContainerClient(expect.anything());
    mockBlobClient = new BlobClient(expect.anything());
    mockBlockBlobClient = new BlockBlobClient(expect.anything());

    vi.mocked(mockBlobServiceClient.getContainerClient).mockReturnValue(mockContainerClient);
    vi.mocked(mockContainerClient.createIfNotExists).mockResolvedValue({
      succeeded: true,
    } as unknown as ContainerCreateIfNotExistsResponse);
    vi.mocked(mockContainerClient.getBlobClient).mockReturnValue(mockBlobClient);
    vi.mocked(mockContainerClient.getBlockBlobClient).mockReturnValue(mockBlockBlobClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create the container if it does not exist", async () => {
    await createAzureStorageClient({
      containerName: "test-container",
      account: "test-account",
    });

    expect(mockBlobServiceClient.getContainerClient).toHaveBeenCalledWith("test-container");
    expect(mockContainerClient.createIfNotExists).toHaveBeenCalled();
  });

  it("should return the content length of a blob", async () => {
    vi.mocked(mockBlobClient.getProperties).mockResolvedValue({
      contentLength: 123,
    } as unknown as BlobGetPropertiesResponse);

    const client = await createAzureStorageClient({
      containerName: "test-container",
      account: "test-account",
    });

    const contentLength = await client.contentLength("team1", "hash1");
    expect(mockContainerClient.getBlobClient).toHaveBeenCalledWith("team1/hash1");
    expect(mockBlobClient.getProperties).toHaveBeenCalled();
    expect(contentLength).toBe(123);
  });

  it("should check if a blob exists", async () => {
    vi.mocked(mockBlobClient.exists).mockResolvedValue(true);

    const client = await createAzureStorageClient({
      containerName: "test-container",
      account: "test-account",
    });

    const exists = await client.exists("team1", "hash1");
    expect(mockContainerClient.getBlobClient).toHaveBeenCalledWith("team1/hash1");
    expect(mockBlobClient.exists).toHaveBeenCalled();
    expect(exists).toBe(true);
  });

  it("should create a readable stream for a blob", async () => {
    const mockReadableStream = new PassThrough();
    vi.mocked(mockBlobClient.download).mockResolvedValue({
      readableStreamBody: mockReadableStream,
    } as unknown as BlobDownloadResponseParsed);

    const client = await createAzureStorageClient({
      containerName: "test-container",
      account: "test-account",
    });

    const stream = await client.createReadStream("team1", "hash1");
    expect(mockContainerClient.getBlobClient).toHaveBeenCalledWith("team1/hash1");
    expect(mockBlobClient.download).toHaveBeenCalled();
    expect(stream).toBeInstanceOf(PassThrough);
  });

  it("should create a writable stream for a blob", async () => {
    const client = await createAzureStorageClient({
      containerName: "test-container",
      account: "test-account",
    });

    const stream = await client.createWriteStream("team1", "hash1");
    expect(mockContainerClient.getBlockBlobClient).toHaveBeenCalledWith("team1/hash1");
    expect(mockBlockBlobClient.uploadStream).toHaveBeenCalledWith(stream);
    expect(stream).toBeInstanceOf(PassThrough);
  });
});
