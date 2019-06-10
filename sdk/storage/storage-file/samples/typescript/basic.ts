/*
 Setup: Enter your storage account name and shared key in main()
*/

import {
  newPipeline,
  FileServiceClient,
  SharedKeyCredential,
  Models,
} from "../../src"; // Change to "@azure/storage-file" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";
  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use AnonymousCredential when url already includes a SAS signature
  // const anonymousCredential = new AnonymousCredential();

  // Use sharedKeyCredential or anonymousCredential to create a pipeline
  const pipeline = newPipeline(sharedKeyCredential);

  // List shares
  const serviceClient = new FileServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS
    `https://${account}.file.core.windows.net`,
    pipeline
  );

  console.log(`List shares`);
  let marker;
  do {
    const listSharesResponse: Models.ServiceListSharesSegmentResponse = await serviceClient.listSharesSegment(
      marker
    );

    marker = listSharesResponse.nextMarker;
    for (const share of listSharesResponse.shareItems!) {
      console.log(`\tShare: ${share.name}`);
    }
  } while (marker);

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

  // Create a file
  const content = "Hello World!";
  const fileName = "newfile" + new Date().getTime();
  const fileClient = directoryClient.createFileClient(fileName);
  await fileClient.create(content.length);
  console.log(`Create file ${fileName} successfully`);

  // Upload file range
  await fileClient.uploadRange(content, 0, content.length);
  console.log(`Upload file range "${content}" to ${fileName} successfully`);

  // List directories and files
  console.log(`List directories and files under directory ${directoryName}`);
  marker = undefined;
  do {
    const listFilesAndDirectoriesResponse: Models.DirectoryListFilesAndDirectoriesSegmentResponse = await directoryClient.listFilesAndDirectoriesSegment(
      marker
    );

    marker = listFilesAndDirectoriesResponse.nextMarker;
    for (const file of listFilesAndDirectoriesResponse.segment.fileItems) {
      console.log(`\tFile: ${file.name}`);
    }
    for (const directory of listFilesAndDirectoriesResponse.segment.directoryItems) {
      console.log(`\tDirectory: ${directory.name}`);
    }
  } while (marker);

  // Get file content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadFileResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadFileResponse.blobBody
  const downloadFileResponse = await fileClient.download(0);
  console.log(
    `Downloaded file content${await streamToString(downloadFileResponse.readableStreamBody!)}`
  );

  // Delete share
  await shareClient.delete();
  console.log(`deleted share ${shareName}`);
}

// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream: NodeJS.ReadableStream) {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
