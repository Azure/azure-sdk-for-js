// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary use `ShareServiceClient` to interact with shares, directories, and files
 */

import { DefaultAzureCredential } from "@azure/identity";
import { ShareServiceClient } from "@azure/storage-file-share";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // List shares
  const serviceClient = new ShareServiceClient(
    `https://${accountName}.file.core.windows.net`,
    new DefaultAzureCredential(),
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

  const downloadedContent = (
    await streamToBuffer(downloadFileResponse.readableStreamBody)
  ).toString();

  console.log(`Downloaded file content: ${downloadedContent}`);

  // Finally, delete the example share
  await shareClient.delete();
  console.log(`Deleted share ${shareClient.name}`);
}

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data: Buffer | string) => {
      chunks.push(typeof data === "string" ? Buffer.from(data) : data);
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
