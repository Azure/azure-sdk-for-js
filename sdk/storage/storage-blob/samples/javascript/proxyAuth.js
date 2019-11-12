/* 
 Setup: Enter your storage account name and shared key in main()
*/

const { BlobServiceClient, StorageSharedKeyCredential } = require("../.."); // Change to "@azure/storage-blob" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential,
    {
      // proxy can either be a URL like "http://localhost:3128"
      // or
      // an option bag consisting {host, port, username, password }
      proxyOptions: {
        host: "http://localhost",
        port: 3128,
        username: "username",
        password: "password"
      }
      // if proxy is undefined, the library tries to load the proxy settings from the environment variables like HTTP_PROXY
    }
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const createContainerResponse = await blobServiceClient
    .getContainerClient(containerName)
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
