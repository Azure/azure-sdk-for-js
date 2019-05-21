/*
 Setup: Enter your storage account name, SAS and a path pointing to local file in main()
*/

const fs = require("fs");
const {
  AnonymousCredential,
  uploadBrowserDataToBlockBlob,
  downloadBlobToBuffer,
  uploadFileToBlockBlob,
  uploadStreamToBlockBlob,
  Aborter,
  BlobClient,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
  StorageClient
} = require("../.."); // Change to "@azure/storage-blob" in your package

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

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${accountSas}`,
    pipeline
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = ContainerClient.fromBlobServiceClient(blobServiceClient, containerName);
  await containerClient.create();

  // Create a blob
  const blobName = "newblob" + new Date().getTime();
  const blobClient = BlobClient.fromContainerClient(containerClient, blobName);
  const blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);

  // Parallel uploading with uploadFileToBlockBlob in Node.js runtime
  // uploadFileToBlockBlob is only available in Node.js
  await uploadFileToBlockBlob(localFilePath, blockBlobClient, {
    blockSize: 4 * 1024 * 1024, // 4MB block size
    parallelism: 20, // 20 concurrency
    progress: ev => console.log(ev)
  });
  console.log("uploadFileToBlockBlob success");

  // Parallel uploading a Readable stream with uploadStreamToBlockBlob in Node.js runtime
  // uploadStreamToBlockBlob is only available in Node.js
  await uploadStreamToBlockBlob(
    fs.createReadStream(localFilePath),
    blockBlobClient,
    4 * 1024 * 1024,
    20,
    {
      abortSignal: Aborter.timeout(30 * 60 * 1000), // Abort uploading with timeout in 30mins
      progress: ev => console.log(ev)
    }
  );
  console.log("uploadStreamToBlockBlob success");

  // Parallel uploading a browser File/Blob/ArrayBuffer in browsers with uploadBrowserDataToBlockBlob
  // Uncomment following code in browsers because uploadBrowserDataToBlockBlob is only available in browsers
  /*
  const browserFile = document.getElementById("fileinput").files[0];
  await uploadBrowserDataToBlockBlob(browserFile, blockBlobClient, {
    blockSize: 4 * 1024 * 1024, // 4MB block size
    parallelism: 20, // 20 concurrency
    progress: ev => console.log(ev)
  });
  */

  // Parallel downloading a block blob into Node.js buffer
  // downloadBlobToBuffer is only available in Node.js
  const fileSize = fs.statSync(localFilePath).size;
  const buffer = Buffer.alloc(fileSize);
  await downloadBlobToBuffer(
    buffer,
    blockBlobClient,
    0,
    undefined,
    {
      abortSignal: Aborter.timeout(30 * 60 * 1000),
      blockSize: 4 * 1024 * 1024, // 4MB block size
      parallelism: 20, // 20 concurrency
      progress: ev => console.log(ev)
    }
  );
  console.log("downloadBlobToBuffer success");

  // Delete container
  await containerClient.delete();
  console.log("deleted container");
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch(err => {
    console.log(err.message);
  });
