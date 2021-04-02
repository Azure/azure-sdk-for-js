/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how to create a React hook integrating
  with Azure Blob Storage.

  For more information on Azure Blob Storage please see
  https://www.npmjs.com/package/@azure/storage-blob
*/

import { useEffect, useRef } from "react";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { credential, getEnvironmentVariable } from "../utils";

type GetBlob = (blobName: string) => Promise<Blob | undefined>;
type UploadBlob = (blobName: string, content: string) => Promise<void>;
type Hook = () => [GetBlob, UploadBlob];

/**
 * The Azure Blob hook exposes a methods to interact
 * With Azure Blob Storage.
 */
const useBlobs: Hook = () => {
  // Keep a reference to a client for a Blob Container
  // in order to lazy-load it as needed.
  // For more information about Azure Blob Storage container
  // Please refer to https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources
  const instance = useRef<ContainerClient>();

  /**
   * Fetch a Blob from Azure Blob Storage, returning its body if the blob exists.
   * @param blobName The name of the blob within the container.
   */
  const getBlob = async (blobName: string): Promise<Blob | undefined> => {
    if (!instance.current) {
      throw new Error("[useBlobs]: Instance never initialized.");
    }
    const blob = instance.current.getBlobClient(blobName);
    const response = await blob.download();
    return response.blobBody;
  };

  /**
   * Upload a string to Azure blob Stroage, overwriting it if it already exists.
   * @param blobName The name of the blob within the container.
   * @param content The file contents.
   */
  const uploadBlob = async (blobName: string, content: string): Promise<void> => {
    if (!instance.current) {
      throw new Error("[useBLobs]: Instance never initialized.");
    }
    const blockBlobClient = instance.current.getBlockBlobClient(blobName);
    await blockBlobClient.upload(content, content.length);
  };

  useEffect(() => {
    if (!instance.current) {
      const uri = getEnvironmentVariable("REACT_APP_BLOB_URI");
      const containerName = getEnvironmentVariable("REACT_APP_BLOB_CONTAINER");

      // In this sample we fetch all blobs from a single container, creating
      // a client for that container to be used for fetching Blobs
      const blobStorageClient = new BlobServiceClient(uri, credential);

      const containerClient = blobStorageClient.getContainerClient(containerName);

      instance.current = containerClient;
    }
  }, []);

  return [getBlob, uploadBlob];
};

export { useBlobs };
