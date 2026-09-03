// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary use `ShareServiceClient` to interact with shares, directories, and files
 * @azsdk-weight 80
 */

import { ShareServiceClient, StorageSharedKeyCredential } from "@azure/storage-file-share";

import { buffer } from "node:stream/consumers";
// Use `text` from "node:stream/consumers" if you want the content as a string directly.
// import { text } from "node:stream/consumers";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
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
    sharedKeyCredential,
  );

  console.log("Shares:");
  for await (const share of serviceClient.listShares()) {
    console.log(`- ${share.name}`);
  }

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.getShareClient(shareName);
  await shareClient.create();
  console.log(`Created share ${shareClient.name} successfully.`);

  // Create a directory
  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryClient = shareClient.getDirectoryClient(directoryName);
  await directoryClient.create();
  console.log(`Created directory ${directoryClient.name} successfully.`);

  // Create a file with multibyte characters as an example.
  const content = "Hello World!你好";
  // Get its length in bytes.
  const contentByteLength = Buffer.byteLength(content);
  const fileName = "newfile" + new Date().getTime();
  const fileClient = directoryClient.getFileClient(fileName);
  await fileClient.create(contentByteLength);
  console.log(`Created file ${fileClient.name} successfully.`);

  // Upload file range
  await fileClient.uploadRange(content, 0, contentByteLength);
  console.log(`Uploaded file range "${content}" to ${fileName} successfully.`);

  // List directories and files
  console.log(`Files and Directories in ${directoryName}:`);
  for await (const entity of directoryClient.listFilesAndDirectories()) {
    console.log(`- (${entity.kind})\t${entity.name}`);
  }

  // Get file content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadFileResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadFileResponse.contentAsBlob
  const downloadFileResponse = await fileClient.download(0);

  if (!downloadFileResponse.readableStreamBody) {
    throw new Error("Expected a readable stream, but none was returned.");
  }

  // Download the raw bytes of the file. Use `text(...)` from "node:stream/consumers"
  // instead if you want to read the content as a string directly.
  const downloadedContent = await buffer(downloadFileResponse.readableStreamBody);

  console.log(`Downloaded file content: ${downloadedContent.toString()}`);

  // Finally, delete the example share
  await shareClient.delete();
  console.log(`Deleted share ${shareClient.name}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
