import * as fs from "fs";

import {
  AnonymousCredential,
  // UploadBrowserDataToBlockBlob,
  DownloadBlobToBuffer,
  UploadFileToBlockBlob,
  UploadStreamToBlockBlob
} from "../lib";
import { Aborter } from "../lib/Aborter";
import { BlobURL } from "../lib/BlobURL";
import { BlockBlobURL } from "../lib/BlockBlobURL";
import { ContainerURL } from "../lib/ContainerURL";
import { ServiceURL } from "../lib/ServiceURL";
import { StorageURL } from "../lib/StorageURL";

// tslint:disable:no-console
async function executeSample() {
  // Fill in following settings before running this sample
  const account = "account";
  const accountSas = "accountSas";
  const localFilePath = "localFilePath";

  const pipeline = StorageURL.newPipeline(new AnonymousCredential());

  const serviceURL = new ServiceURL(
    `https://${account}.blob.core.windows.net${accountSas}`,
    pipeline
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  await containerURL.create(Aborter.None);

  // Create a blob
  const blobName = "newblob" + new Date().getTime();
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);

  // Parallel uploading with UploadFileToBlockBlob in Node.js runtime
  // UploadFileToBlockBlob is only available in Node.js
  await UploadFileToBlockBlob(Aborter.None, localFilePath, blockBlobURL, {
    blockSize: 4 * 1024 * 1024, // 4MB block size
    parallelism: 20, // 20 concurrency
    progress: ev => console.log(ev)
  });
  console.log("UploadFileToBlockBlob success");

  // Parallel uploading a Readable stream with UploadStreamToBlockBlob in Node.js runtime
  // UploadStreamToBlockBlob is only available in Node.js
  await UploadStreamToBlockBlob(
    Aborter.timeout(30 * 60 * 60 * 1000), // Abort uploading with timeout in 30mins
    fs.createReadStream(localFilePath),
    blockBlobURL,
    4 * 1024 * 1024,
    20,
    {
      progress: ev => console.log(ev)
    }
  );
  console.log("UploadStreamToBlockBlob success");

  // Parallel uploading a browser File/Blob/ArrayBuffer in browsers with UploadBrowserDataToBlockBlob
  // UploadBrowserDataToBlockBlob is only available in browsers
  /*
  const browserFile = document.getElementById("fileinput").files[0];
  await UploadBrowserDataToBlockBlob(Aborter.None, browserFile, blockBlobURL, {
    blockSize: 4 * 1024 * 1024, // 4MB block size
    parallelism: 20, // 20 concurrency
    progress: ev => console.log(ev)
  });
  */

  // Parallel downloading a block blob into Node.js buffer
  // DownloadBlobToBuffer is only available in Node.js
  const fileSize = fs.statSync(localFilePath).size;
  const buffer = Buffer.alloc(fileSize);
  await DownloadBlobToBuffer(
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
  console.log("DownloadBlobToBuffer success");

  // Delete container
  await containerURL.delete(Aborter.None);
  console.log("deleted container");
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
executeSample()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch(err => {
    console.log(err.message);
  });
