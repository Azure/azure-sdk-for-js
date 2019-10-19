/*
 Setup: Enter your storage account name, SAS and a path pointing to local file in main()
*/

import fs from "fs";
import { AbortController } from "@azure/abort-controller";
import {
  AnonymousCredential,
  BlobServiceClient,
  newPipeline,
  HttpPipelineLogLevel
} from "../../src"; // Change to "@azure/storage-blob" in your package

class ConsoleHttpPipelineLogger {
  minimumLogLevel: any;
  constructor(minimumLogLevel: any) {
    this.minimumLogLevel = minimumLogLevel;
  }
  log(logLevel: number, message: any) {
    const logMessage = `${new Date().toISOString()} ${HttpPipelineLogLevel[logLevel]}: ${message}`;
    switch (logLevel) {
      case HttpPipelineLogLevel.ERROR:
        // tslint:disable-next-line:no-console
        console.error(logMessage);
        break;
      case HttpPipelineLogLevel.WARNING:
        // tslint:disable-next-line:no-console
        console.warn(logMessage);
        break;
      case HttpPipelineLogLevel.INFO:
        // tslint:disable-next-line:no-console
        console.log(logMessage);
        break;
    }
  }
}

async function main() {
  // Fill in following settings before running this sample
  const account = process.env.ACCOUNT_NAME || "";
  const accountSas = process.env.ACCOUNT_SAS || "";
  const localFilePath = "../README.md";

  const pipeline = newPipeline(new AnonymousCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    // logger: MyLogger, // A customized logger implementing IHttpPipelineLogger interface
    logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO),
    retryOptions: { maxTries: 4 }, // Retry options
    telemetry: { value: "AdvancedSample V1.0.0" }, // Customized telemetry string
    keepAliveOptions: {
      // Keep alive is enabled by default, disable keep alive by setting false
      enable: false
    }
  });

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${accountSas}`,
    pipeline
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.create();

  // Create a blob
  const blobName = "newblob" + new Date().getTime();
  const blobClient = containerClient.getBlobClient(blobName);
  const blockBlobClient = blobClient.getBlockBlobClient();

  // Parallel uploading with BlockBlobClient.uploadFile() in Node.js runtime
  // BlockBlobClient.uploadFile() is only available in Node.js
  await blockBlobClient.uploadFile(localFilePath, {
    blockSize: 4 * 1024 * 1024, // 4MB block size
    concurrency: 20, // 20 concurrency
    onProgress: (ev) => console.log(ev)
  });
  console.log("uploadFile success");

  // Parallel uploading a Readable stream with BlockBlobClient.uploadStream() in Node.js runtime
  // BlockBlobClient.uploadStream() is only available in Node.js
  await blockBlobClient.uploadStream(fs.createReadStream(localFilePath), 4 * 1024 * 1024, 20, {
    abortSignal: AbortController.timeout(30 * 60 * 1000), // Abort uploading with timeout in 30mins
    onProgress: (ev) => console.log(ev)
  });
  console.log("uploadStream success");

  // Parallel uploading a browser File/Blob/ArrayBuffer in browsers with BlockBlobClient.uploadBrowserData()
  // Uncomment following code in browsers because BlockBlobClient.uploadBrowserData() is only available in browsers
  /*
  const browserFile = document.getElementById("fileinput").files[0];
  await blockBlobClient.uploadBrowserData(browserFile, {
    blockSize: 4 * 1024 * 1024, // 4MB block size
    concurrency: 20, // 20 concurrency
    onProgress: ev => console.log(ev)
  });
  */

  // Parallel downloading a block blob into Node.js buffer
  // downloadToBuffer is only available in Node.js
  const fileSize = fs.statSync(localFilePath).size;
  const buffer = Buffer.alloc(fileSize);
  await blockBlobClient.downloadToBuffer(buffer, 0, undefined, {
    abortSignal: AbortController.timeout(30 * 60 * 1000), // Abort uploading with timeout in 30mins
    blockSize: 4 * 1024 * 1024, // 4MB block size
    concurrency: 20, // 20 concurrency
    onProgress: (ev) => console.log(ev)
  });
  console.log("downloadToBuffer success");

  // Delete container
  await containerClient.delete();
  console.log("deleted container");
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
