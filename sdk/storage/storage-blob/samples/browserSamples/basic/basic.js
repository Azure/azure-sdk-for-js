import { BlobServiceClient } from "@azure/storage";

const account = "";
const accountSas = "";
const blobServiceClient = BlobServiceClient(
  "https://" + account + ".blob.core.windows.net" + accountSas
);

// Create a container
const containerName = "newcontainer";
const containerClient = blobServiceClient.getContainerClient(containerName);
containerClient.create();
console.log(containerName);
