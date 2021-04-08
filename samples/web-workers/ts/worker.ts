/// <reference lib="webworker"/>
import "./polyfill.worker";

import { ContainerClient } from "@azure/storage-blob";

const azureStorageBlobConnectionString = process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING

if (!azureStorageBlobConnectionString) {
  throw "Required environment variable AZURE_STORAGE_BLOB_CONNECTION_STRING is either missing or empty."
}

const containerClient = new ContainerClient(azureStorageBlobConnectionString, "default/blobs")
const blockBlobClient = containerClient.getBlockBlobClient("sample.txt")

const data = "Hello, Web Workers!"

blockBlobClient.upload(data, data.length)
  .then(() => postMessage("Successfully uploaded to Azure Storage Blob!"))
  .catch(err => console.error(err))
