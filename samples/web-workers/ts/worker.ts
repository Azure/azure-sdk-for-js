  
import "./polyfill.worker";
import { BlobClient, ContainerClient } from "@azure/storage-blob";

import * as dotenv from "dotenv"
dotenv.config()


const containerClient = new ContainerClient(process.env.STORAGE_BLOB_SAS, "/default/blobs")
const blockBlobClient = containerClient.getBlockBlobClient("sample.txt")

const data = "Hello, Web Workers!"

blockBlobClient.upload(data, data.length)
  .then(() => console.log("Successfully uploaded to Azure Storage Blob!"))
  .catch(err => console.error(err))
