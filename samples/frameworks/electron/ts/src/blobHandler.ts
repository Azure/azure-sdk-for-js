/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how we can interact with
  Azure Blob Storage in an Electron application.
*/

import { TokenCredential } from "@azure/identity";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { BLOB_CONTAINER, BLOB_URI } from "./constants";

/**
 * Represents a handler for Azure Storage Blob.
 * @public
 */
export class BlobHandler {
  private client: ContainerClient;

  /**
   * Creates a new handler to interact with Azure Blob Storage
   * @param credential A valid credential to authenticate requests.
   */
  constructor(credential: TokenCredential) {
    const blobUri = BLOB_URI;
    const blobContainer = BLOB_CONTAINER;
    const serviceClient = new BlobServiceClient(blobUri, credential);
    this.client = serviceClient.getContainerClient(blobContainer);
  }

  /**
   * Uploads a text to Azure Blob Storage with a given name.
   * @param name The file name.
   * @param contents The file contents to upload.
   */
  async uploadFile(name: string, contents: string): Promise<void> {
    if (!this.client) {
      throw new Error("[blobHandler]: Client never initialized!");
    }

    const blockBlobClient = this.client.getBlockBlobClient(name);
    await blockBlobClient.upload(contents, contents.length);
  }

  /**
   * Downloads a Blob from Azure Blob Storage, returning its contents
   * if it exists, or undefined otherwise.
   * @param name The name of the file to download.
   */
  async downloadFileContents(name: string): Promise<string | undefined> {
    if (!this.client) {
      throw new Error("[blobHandler]: Client never initialized!");
    }

    const blobClient = this.client.getBlobClient(name);

    try {
      const buffer = await blobClient.downloadToBuffer();
      return buffer.toString();
    } catch (error: any) {
      // It's possible the blob doesn't exist, which is fine.
      // but if it's a different error we should let it bubble up.
      // Please refer to https://github.com/Azure/azure-sdk-for-js/blob/f558cff1ab6f862a74b668abef89c36e53b980f0/sdk/storage/storage-blob/samples/typescript/src/errorsAndResponses.ts#L78
      // for more examples of working with Blobs.
      if (error.details?.errorCode === "BlobNotFound") {
        return undefined;
      }
      throw error;
    }
  }
}
