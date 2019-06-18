/* 
 Setup: Enter your storage account name and shared key in main()
*/

import { BlobServiceClient, SharedKeyCredential } from "../../src"; // Change to "@azure/storage-blob" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";

  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential,
    {
      proxy: { url: "http://localhost:3128" }
    }
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const createContainerResponse = await blobServiceClient
    .createContainerClient(containerName)
    .create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
