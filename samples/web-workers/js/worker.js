// Import the polyfill before importing @azure/storage-blob
import "./polyfill.worker";

// At this point, you should be able to import @azure/storage-blob without
// any errors. If you are missing a global dependency, we'll throw a descriptive error on import.
import { ContainerClient } from "@azure/storage-blob";

const azureStorageBlobConnectionString = process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING
if (!azureStorageBlobConnectionString) {
  throw "Required environment variable AZURE_STORAGE_BLOB_CONNECTION_STRING is either missing or empty."
}

const azureStorageBlobContainerName = process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME
if (!azureStorageBlobContainerName) {
  throw "Required environment variable AZURE_STORAGE_BLOB_CONTAINER_NAME is either missing or empty."
}

const data = "Hello, Web Workers!"
new ContainerClient(azureStorageBlobConnectionString, azureStorageBlobContainerName)
  .getBlockBlobClient("sample.txt")
  .upload(data, data.length)
  .then(() => postMessage("Successfully uploaded `sample.txt` to Azure Storage Blob!"))
  .catch(err => console.error(err))
