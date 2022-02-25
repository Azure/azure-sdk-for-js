// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary use advanced HTTP pipeline and request options for several methods
 */

const fs = require("fs");

const { AbortController } = require("@azure/abort-controller");
const {
  AnonymousCredential,
  ShareServiceClient,
  newPipeline,
} = require("@azure/storage-file-share");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Fill in following settings before running this sample
  const account = process.env.ACCOUNT_NAME || "";
  const accountSas = process.env.ACCOUNT_SAS || "";
  const localFilePath = "README.md";

  const pipeline = newPipeline(new AnonymousCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    retryOptions: { maxTries: 4 },
    userAgentOptions: { userAgentPrefix: "AdvancedSample V1.0.0" },
    keepAliveOptions: {
      // Keep alive is enabled by default, disable keep alive by setting false
      enable: false,
    },
  });

  const serviceClient = new ShareServiceClient(
    `https://${account}.file.core.windows.net${accountSas}`,
    pipeline
  );

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.getShareClient(shareName);
  await shareClient.create();
  console.log(`Created share ${shareName} successfully`);

  // Create a directory
  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryClient = shareClient.getDirectoryClient(directoryName);
  await directoryClient.create();
  console.log(`Created directory ${directoryName} successfully`);

  // Upload local file to Azure file parallelly
  const fileName = "newfile" + new Date().getTime();
  const fileClient = directoryClient.getFileClient(fileName);
  const fileSize = fs.statSync(localFilePath).size;

  // Parallel uploading with ShareFileClient.uploadFile() in Node.js runtime
  // ShareFileClient.uploadFile() is only available in Node.js
  await fileClient.uploadFile(localFilePath, {
    rangeSize: 4 * 1024 * 1024,
    concurrency: 20,
    onProgress: (ev) => console.log(ev),
  });
  console.log("uploadFile succeeded");

  // Parallel uploading a Readable stream with ShareFileClient.uploadStream() in Node.js runtime
  // ShareFileClient.uploadStream() is only available in Node.js
  await fileClient.uploadStream(fs.createReadStream(localFilePath), fileSize, 4 * 1024 * 1024, 20, {
    abortSignal: AbortController.timeout(30 * 60 * 1000),
    onProgress: (ev) => console.log(ev),
  });
  console.log("uploadStream succeeded");

  // Parallel uploading a browser File/Blob/ArrayBuffer in browsers with ShareFileClient.uploadBrowserData()
  // Uncomment following code in browsers because ShareFileClient.uploadBrowserData() is only available in browsers
  /*
    const browserFile = document.getElementById("fileinput").files[0];
    await fileClient.uploadBrowserData(browserFile, {
      rangeSize: 4 * 1024 * 1024, // 4MB range size
      concurrency: 20, // 20 concurrency
      onProgress: ev => console.log(ev)
    });
    */

  // Parallel downloading an Azure file into Node.js buffer
  // ShareFileClient.downloadToBuffer() is only available in Node.js
  const buffer = Buffer.alloc(fileSize);
  await fileClient.downloadToBuffer(buffer, undefined, undefined, {
    abortSignal: AbortController.timeout(30 * 60 * 1000),
    rangeSize: 4 * 1024 * 1024,
    concurrency: 20,
    onProgress: (ev) => console.log(ev),
  });
  console.log("downloadToBuffer succeeded");

  // Delete share
  await shareClient.delete();
  console.log(`Deleted share ${shareClient.name}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
