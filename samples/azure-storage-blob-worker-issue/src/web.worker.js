import "./jsdom.worker";
import storageBlob, { BlobServiceClient } from "@azure/storage-blob";

console.log("hello from worker!", storageBlob);
var client = new BlobServiceClient("url");
var blobClient = client.getContainerClient("container");
var blob = blobClient.getBlobClient("file");

blob
  .download()
  .then((resp) => resp.blobBody)
  .then((body) => body.text())
  .then(console.log)
  .catch(console.log);
