// Steps to run this sample
// 1. npm install
// 2. Enter your storage account name, SAS and a path pointing to local file in main()

const fs = require("fs");
const {
  AnonymousCredential,
  uploadBrowserDataToBlockBlob,
  downloadBlobToBuffer,
  uploadFileToBlockBlob,
  uploadStreamToBlockBlob,
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  StorageURL
} = require(".."); // Change to "@azure/storage-blob" in your package

async function main() {
  // Fill in following settings before running this sample
  const account = "account";
  const accountSas = "accountSas";
  const localFilePath = "localFilePath";

  const pipeline = StorageURL.newPipeline(new AnonymousCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    // logger: MyLogger, // A customized logger implementing IHttpPipelineLogger interface
    retryOptions: { maxTries: 4 }, // Retry options
    telemetry: { value: "HighLevelSample V1.0.0" } // Customized telemetry string
  });

  const serviceURL = new ServiceURL(
    `https://${account}.blob.core.windows.net${accountSas}`,
    pipeline
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  await containerURL.create(Aborter.none);

  // Create a blob
  const blobName = "newblob" + new Date().getTime();
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);

  // Parallel uploading with uploadFileToBlockBlob in Node.js runtime
  // uploadFileToBlockBlob is only available in Node.js
  await uploadFileToBlockBlob(Aborter.none, localFilePath, blockBlobURL, {
    blockSize: 4 * 1024 * 1024, // 4MB block size
    parallelism: 20, // 20 concurrency
    progress: ev => console.log(ev)
  });
  console.log("uploadFileToBlockBlob success");

  // Parallel uploading a Readable stream with uploadStreamToBlockBlob in Node.js runtime
  // uploadStreamToBlockBlob is only available in Node.js
  await uploadStreamToBlockBlob(
    Aborter.timeout(30 * 60 * 60 * 1000), // Abort uploading with timeout in 30mins
    fs.createReadStream(localFilePath),
    blockBlobURL,
    4 * 1024 * 1024,
    20,
    {
      progress: ev => console.log(ev)
    }
  );
  console.log("uploadStreamToBlockBlob success");

  // Parallel uploading a browser File/Blob/ArrayBuffer in browsers with uploadBrowserDataToBlockBlob
  // Uncomment following code in browsers because uploadBrowserDataToBlockBlob is only available in browsers
  /*
  const browserFile = document.getElementById("fileinput").files[0];
  await uploadBrowserDataToBlockBlob(Aborter.none, browserFile, blockBlobURL, {
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
    Aborter.timeout(30 * 60 * 60 * 1000),
    buffer,
    blockBlobURL,
    0,
    undefined,
    {
      blockSize: 4 * 1024 * 1024, // 4MB block size
      parallelism: 20, // 20 concurrency
      progress: ev => console.log(ev)
    }
  );
  console.log("downloadBlobToBuffer success");

  // Delete container
  await containerURL.delete(Aborter.none);
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
