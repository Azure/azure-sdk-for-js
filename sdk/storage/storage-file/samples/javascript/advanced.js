/*
 Setup: Enter your storage account name, SAS and a path pointing to local file in main()
*/

const fs = require("fs");
const {
  AnonymousCredential,
  uploadBrowserDataToAzureFile,
  downloadAzureFileToBuffer,
  uploadFileToAzureFile,
  uploadStreamToAzureFile,
  Aborter,
  FileClient,
  DirectoryClient,
  ShareClient,
  FileServiceClient,
  StorageClient
} = require(".."); // Change to "@azure/storage-file" in your package

async function main() {
  // Fill in following settings before running this sample
  const account = "";
  const accountSas = "";
  const localFilePath = "";

  const pipeline = StorageClient.newPipeline(new AnonymousCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    // logger: MyLogger, // A customized logger implementing IHttpPipelineLogger interface
    retryOptions: { maxTries: 4 }, // Retry options
    telemetry: { value: "HighLevelSample V1.0.0" } // Customized telemetry string
  });

  const servieClient = new FileServiceClient(
    `https://${account}.file.core.windows.net${accountSas}`,
    pipeline
  );

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = ShareClient.fromFileServiceClient(servieClient, shareName);
  await shareClient.create(Aborter.none);
  console.log(`Create share ${shareName} successfully`);

  // Create a directory
  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryClient = DirectoryClient.fromShareClient(shareClient, directoryName);
  await directoryClient.create(Aborter.none);
  console.log(`Create directory ${directoryName} successfully`);

  // Upload local file to Azure file parallelly
  const fileName = "newfile" + new Date().getTime();
  const fileClient = FileClient.fromDirectoryClient(directoryClient, fileName);
  const fileSize = fs.statSync(localFilePath).size;

  // Parallel uploading with uploadFileToAzureFile in Node.js runtime
  // uploadFileToAzureFile is only available in Node.js
  await uploadFileToAzureFile(Aborter.none, localFilePath, fileClient, {
    rangeSize: 4 * 1024 * 1024, // 4MB range size
    parallelism: 20, // 20 concurrency
    progress: ev => console.log(ev)
  });
  console.log("uploadFileToAzureFile success");

  // Parallel uploading a Readable stream with uploadStreamToAzureFile in Node.js runtime
  // uploadStreamToAzureFile is only available in Node.js
  await uploadStreamToAzureFile(
    Aborter.timeout(30 * 60 * 1000), // Abort uploading with timeout in 30mins
    fs.createReadStream(localFilePath),
    fileSize,
    fileClient,
    4 * 1024 * 1024,
    20,
    {
      progress: ev => console.log(ev)
    }
  );
  console.log("uploadStreamToAzureFile success");

  // Parallel uploading a browser File/Blob/ArrayBuffer in browsers with uploadBrowserDataToAzureFile
  // Uncomment following code in browsers because uploadBrowserDataToAzureFile is only available in browsers
  /*
  const browserFile = document.getElementById("fileinput").files[0];
  await uploadBrowserDataToAzureFile(Aborter.none, browserFile, fileClient, {
    rangeSize: 4 * 1024 * 1024, // 4MB range size
    parallelism: 20, // 20 concurrency
    progress: ev => console.log(ev)
  });
  */

  // Parallel downloading an Azure file into Node.js buffer
  // downloadAzureFileToBuffer is only available in Node.js
  const buffer = Buffer.alloc(fileSize);
  await downloadAzureFileToBuffer(
    Aborter.timeout(30 * 60 * 1000),
    buffer,
    fileClient,
    0,
    undefined,
    {
      rangeSize: 4 * 1024 * 1024, // 4MB range size
      parallelism: 20, // 20 concurrency
      progress: ev => console.log(ev)
    }
  );
  console.log("downloadAzureFileToBuffer success");

  // Delete share
  await shareClient.delete(Aborter.none);
  console.log("deleted share");
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch(err => {
    console.log(err.message);
  });
