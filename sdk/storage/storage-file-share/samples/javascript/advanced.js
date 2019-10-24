/*
 Setup: Enter your storage account name, SAS and a path pointing to local file in main()
*/

const fs = require("fs");
const { AbortController } = require("@azure/abort-controller");
const {
  AnonymousCredential,
  FileServiceClient,
  HttpPipelineLogLevel,
  newPipeline
} = require("../.."); // Change to "@azure/storage-file-share" in your package

class ConsoleHttpPipelineLogger {
  constructor(minimumLogLevel) {
    this.minimumLogLevel = minimumLogLevel;
  }
  log(logLevel, message) {
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

  const serviceClient = new FileServiceClient(
    `https://${account}.file.core.windows.net${accountSas}`,
    pipeline
  );

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

  // Upload local file to Azure file parallelly
  const fileName = "newfile" + new Date().getTime();
  const fileClient = directoryClient.getFileClient(fileName);
  const fileSize = fs.statSync(localFilePath).size;

  // Parallel uploading with FileClient.uploadFile() in Node.js runtime
  // FileClient.uploadFile() is only available in Node.js
  await fileClient.uploadFile(localFilePath, {
    rangeSize: 4 * 1024 * 1024, // 4MB range size
    parallelism: 20, // 20 concurrency
    onProgress: (ev) => console.log(ev)
  });
  console.log("uploadFile success");

  // Parallel uploading a Readable stream with FileClient.uploadStream() in Node.js runtime
  // FileClient.uploadStream() is only available in Node.js
  await fileClient.uploadStream(fs.createReadStream(localFilePath), fileSize, 4 * 1024 * 1024, 20, {
    abortSignal: AbortController.timeout(30 * 60 * 1000), // Abort uploading with timeout in 30mins
    onProgress: (ev) => console.log(ev)
  });
  console.log("uploadStream success");

  // Parallel uploading a browser File/Blob/ArrayBuffer in browsers with FileClient.uploadBrowserData()
  // Uncomment following code in browsers because FileClient.uploadBrowserData() is only available in browsers
  /*
  const browserFile = document.getElementById("fileinput").files[0];
  await fileClient.uploadBrowserData(browserFile, {
    rangeSize: 4 * 1024 * 1024, // 4MB range size
    parallelism: 20, // 20 concurrency
    onProgress: ev => console.log(ev)
  });
  */

  // Parallel downloading an Azure file into Node.js buffer
  // FileClient.downloadToBuffer() is only available in Node.js
  const buffer = Buffer.alloc(fileSize);
  await fileClient.downloadToBuffer(buffer, 0, undefined, {
    abortSignal: AbortController.timeout(30 * 60 * 1000),
    rangeSize: 4 * 1024 * 1024, // 4MB range size
    parallelism: 20, // 20 concurrency
    onProgress: (ev) => console.log(ev)
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
