/* 
 Setup: Enter your storage account name and shared key in main()
*/

const {
  DataLakeServiceClient,
  StorageSharedKeyCredential
} = require("@azure/storage-file-datalake");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // ONLY AVAILABLE IN NODE.JS RUNTIME
  // If you are using the browser, you can use the InteractiveBrowserCredential provided via @azure/identity or any other feasible implementation of TokenCredential.
  // DefaultAzureCredential will first look for Azure Active Directory (AAD)
  // client secret credentials in the following environment variables:
  //
  // - AZURE_TENANT_ID: The ID of your AAD tenant
  // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
  // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
  //
  // If those environment variables aren't found and your application is deployed
  // to an Azure VM or App Service instance, the managed service identity endpoint
  // will be used as a fallback authentication source.
  // const defaultAzureCredential = new DefaultAzureCredential();

  // You can find more TokenCredential implementations in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library
  // to use client secrets, certificates, or managed identities for authentication.

  // Use AnonymousCredential when url already includes a SAS signature
  // const anonymousCredential = new AnonymousCredential();

  // List file systems
  const serviceClient = new DataLakeServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.dfs.core.windows.net`,
    sharedKeyCredential
  );

  let i = 1;
  for await (const filesystem of serviceClient.listFileSystems()) {
    console.log(`FileSystem ${i++}: ${filesystem.name}`);
  }

  // Create a filesystem
  const fileSystemName = `newfilesystem${new Date().getTime()}`;
  const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);

  const createFileSystemResponse = await fileSystemClient.create();
  console.log(
    `Create filesystem ${fileSystemName} successfully`,
    createFileSystemResponse.requestId
  );

  // Create a file
  const content = "hello";
  const fileName = "newfile" + new Date().getTime();
  const fileClient = fileSystemClient.getFileClient(fileName);
  await fileClient.create();
  await fileClient.append(content, 0, content.length);
  const flushFileResponse = await fileClient.flush(content.length);
  console.log(`Upload file ${fileName} successfully`, flushFileResponse.requestId);

  // List paths
  i = 1;
  for await (const path of fileSystemClient.listPaths()) {
    console.log(`Path ${i++}: ${path.name}, isDirectory:${path.isDirectory}`);
  }

  // Get file content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.contentAsBlob
  const readFileResponse = await fileClient.read();
  console.log(
    "Downloaded file content",
    (await streamToBuffer(readFileResponse.readableStreamBody)).toString()
  );

  // Delete filesystem
  await fileSystemClient.delete();

  console.log("Deleted filesystem");
}

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
