// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

import { ShareServiceClient, StorageSharedKeyCredential } from "@azure/storage-file-share";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // Use AnonymousCredential when url already includes a SAS signature
  // const anonymousCredential = new AnonymousCredential();

  // List shares
  const serviceClient = new ShareServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS
    `https://${account}.file.core.windows.net`,
    sharedKeyCredential
  );

  console.log(`List shares`);
  let i = 1;
  for await (const share of serviceClient.listShares()) {
    console.log(`Share ${i++}: ${share.name}`);
  }

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.getShareClient(shareName);
  await shareClient.create();
  console.log(`Create share ${shareName} successfully`);

  // Create a directory
  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryClient = shareClient.getDirectoryClient(directoryName);
  await directoryClient.create();
  console.log(`Create directory ${directoryName} successfully`);

  // Create a file
  const content = "Hello World!你好";
  // Get its length in bytes.
  const contentByteLength = Buffer.byteLength(content);
  const fileName = "newfile" + new Date().getTime();
  const fileClient = directoryClient.getFileClient(fileName);
  await fileClient.create(contentByteLength);
  console.log(`Create file ${fileName} successfully`);

  // Upload file range
  await fileClient.uploadRange(content, 0, contentByteLength);
  console.log(`Upload file range "${content}" to ${fileName} successfully`);

  // List directories and files
  console.log(`List directories and files under directory ${directoryName}`);
  i = 1;
  for await (const entity of directoryClient.listFilesAndDirectories()) {
    if (entity.kind === "directory") {
      console.log(`${i++} - directory\t: ${entity.name}`);
    } else {
      console.log(`${i++} - file\t: ${entity.name}`);
    }
  }

  // Get file content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadFileResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadFileResponse.contentAsBlob
  const downloadFileResponse = await fileClient.download(0);
  console.log(
    `Downloaded file content: ${(
      await streamToBuffer(downloadFileResponse.readableStreamBody!)
    ).toString()}`
  );

  // Delete share
  await shareClient.delete();
  console.log(`deleted share ${shareName}`);
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

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
