// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary use `DataLakeServiceClient` to create and read file systems and files
 */

import { DataLakeServiceClient, StorageSharedKeyCredential } from "@azure/storage-file-datalake";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
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

  console.log("File Systems:");
  for await (const fileSystem of serviceClient.listFileSystems()) {
    console.log(`- ${fileSystem.name}`);
  }

  // Create a file system
  const fileSystemName = `newfilesystem${new Date().getTime()}`;
  const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);

  const fileSystemResponse = await fileSystemClient.create();
  console.log(
    `Created file system ${fileSystemClient.name} successfully, request ID: ${fileSystemResponse.requestId}`
  );

  // Create a file
  const content = "hello";
  const fileName = "newfile" + new Date().getTime();
  const fileClient = fileSystemClient.getFileClient(fileName);
  await fileClient.create();
  await fileClient.append(content, 0, content.length);
  const flushFileResponse = await fileClient.flush(content.length);
  console.log(`Uploaded file ${fileClient.name} successfully`, flushFileResponse.requestId);

  console.log(`Paths in ${fileSystemClient.name}:`);
  for await (const path of fileSystemClient.listPaths()) {
    console.log(`- ${path.name} (isDirectory = ${path.isDirectory})`);
  }

  // Get file content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.contentAsBlob
  const readFileResponse = await fileClient.read();

  if (!readFileResponse.readableStreamBody) {
    throw new Error("Expected a readable stream body, but none was returned.");
  }

  const readFileContent = (await streamToBuffer(readFileResponse.readableStreamBody)).toString();

  console.log(`Downloaded file content: ${readFileContent}`);

  // Finally, delete the example file system.
  await fileSystemClient.delete();

  console.log(`Deleted file system ${fileSystemClient.name}.`);
}

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data: Buffer | string) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
