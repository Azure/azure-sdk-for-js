/*
 Setup: Enter your storage account name, SAS and a path pointing to local file in main()
*/

import fs from "fs";
import {
  Aborter,
  AnonymousCredential,
  FileServiceClient,
  newPipeline
} from "../../src"; // Change to "@azure/storage-file" in your package

async function main() {
  // Fill in following settings before running this sample
  const account = "";
  const accountSas = "";
  const localFilePath = "";

  const pipeline = newPipeline(new AnonymousCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    // logger: MyLogger, // A customized logger implementing IHttpPipelineLogger interface
    retryOptions: { maxTries: 4 }, // Retry options
    telemetry: { value: "HighLevelSample V1.0.0" } // Customized telemetry string
  });

  const serviceClient = new FileServiceClient(
    `https://${account}.file.core.windows.net${accountSas}`,
    pipeline
  );

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.createShareClient(shareName);
  await shareClient.create();
  console.log(`Create share ${shareName} successfully`);

  // Create a directory
  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryClient = shareClient.createDirectoryClient(directoryName);
  await directoryClient.create();
  console.log(`Create directory ${directoryName} successfully`);

  // Upload local file to Azure file parallelly
  const fileName = "newfile" + new Date().getTime();
  const fileClient = directoryClient.createFileClient(fileName);
  const fileSize = fs.statSync(localFilePath).size;

  // Parallel uploading with FileClient.uploadFile() in Node.js runtime
  // FileClient.uploadFile() is only available in Node.js
  await fileClient.uploadFile(localFilePath, {
    rangeSize: 4 * 1024 * 1024, // 4MB range size
    parallelism: 20, // 20 concurrency
    progress: (ev) => console.log(ev)
  });
  console.log("uploadFile success");

  // Parallel uploading a Readable stream with FileClient.uploadStream() in Node.js runtime
  // FileClient.uploadStream() is only available in Node.js
  await fileClient.uploadStream(fs.createReadStream(localFilePath), fileSize, 4 * 1024 * 1024, 20, {
    abortSignal: Aborter.timeout(30 * 60 * 1000), // Abort uploading with timeout in 30mins
    progress: (ev: any) => console.log(ev)
  });
  console.log("uploadStream success");

  // Parallel uploading a browser File/Blob/ArrayBuffer in browsers with FileClient.uploadBrowserData()
  // Uncomment following code in browsers because FileClient.uploadBrowserData() is only available in browsers
  /*
  const browserFile = document.getElementById("fileinput").files[0];
  await fileClient.uploadBrowserData(browserFile, {
    rangeSize: 4 * 1024 * 1024, // 4MB range size
    parallelism: 20, // 20 concurrency
    progress: ev => console.log(ev)
  });
  */

  // Parallel downloading an Azure file into Node.js buffer
  // FileClient.downloadToBuffer() is only available in Node.js
  const buffer = Buffer.alloc(fileSize);
  await fileClient.downloadToBuffer(buffer, 0, undefined, {
    abortSignal: Aborter.timeout(30 * 60 * 1000),
    rangeSize: 4 * 1024 * 1024, // 4MB range size
    parallelism: 20, // 20 concurrency
    progress: (ev) => console.log(ev)
  });
  console.log("downloadToBuffer success");

  // Delete share
  await shareClient.delete();
  console.log("deleted share");
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
