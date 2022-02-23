const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require('dotenv').config()

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

async function main() {
  console.log("Azure Blob storage v12 - JavaScript quickstart sample");
  // Quick start code goes here
  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );

  // Create a unique name for the container
  const containerName = "quickstart";

  console.log("\nCreating container...");
  console.log("\t", containerName);

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create the container if it doesn't exist
  const createContainerResponse = await containerClient.create();
  console.log(
    "Container was created successfully. requestId: ",
    createContainerResponse.requestId
  );

  // Create a unique name for the blob
  const blobName = "quickstart" + uuidv1() + ".txt";

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log("\nUploading to Azure storage as blob:\n\t", blobName);

  // Upload data to the blob
  const data = "Hello, World!";
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log(
    "Blob was uploaded successfully. requestId: ",
    uploadBlobResponse.requestId
  );

  console.log("\nListing blobs...");

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log("\t", blob.name);
  }

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blockBlobClient.download(0);
  console.log("\nDownloaded blob content...");
  console.log(
    "\t",
    await streamToString(downloadBlockBlobResponse.readableStreamBody)
  );

  console.log("\nDeleting container...");

  // Delete container
  const deleteContainerResponse = await containerClient.delete();
  console.log(
    "Container was deleted successfully. requestId: ",
    deleteContainerResponse.requestId
  );
}
// A helper function used to read a Node.js readable stream into a string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}
main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
