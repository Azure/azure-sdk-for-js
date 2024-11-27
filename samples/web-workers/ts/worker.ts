/// <reference lib="webworker"/>
// Import the polyfill before importing @azure/storage-blob
import "./polyfill.worker";

// At this point, you should be able to import @azure/storage-blob without
// any errors. If you are missing a global dependency, we'll throw a descriptive error on import.
import { ContainerClient } from "@azure/storage-blob";

async function uploadToStorageBlob() {
  // For example, in Azure public cloud, a container SAS URL has the form of
  // `https://${account}.blob.core.windows.net/${containerName}?${sasToken}`
  const containerSasUrl = ""; // <replace this empty string with your SAS URL>

  if (!containerSasUrl) {
    throw new Error("Please replace the placeholder value of containerSasUrl with your SAS URL.");
  }

  const data = "Hello, Web Workers!";

  const containerClient = new ContainerClient(containerSasUrl);
  const blockBlobClient = containerClient.getBlockBlobClient("sample.txt");

  await blockBlobClient.upload(data, data.length);

  postMessage("Successfully uploaded 'sample.txt' to Azure Storage Blob!");
}

uploadToStorageBlob().catch((err) => console.error(err));
