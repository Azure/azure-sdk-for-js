  
import "./polyfill.worker";
import { BlobClient, ContainerClient } from "@azure/storage-blob";

const containerClient = new ContainerClient(process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING, "default/blobs")
const blockBlobClient = containerClient.getBlockBlobClient("sample.txt")

const data = "Hello, Web Workers!"

blockBlobClient.upload(data, data.length)
  .then(() => console.log("Successfully uploaded to Azure Storage Blob!"))
  .catch(err => console.error(err))
