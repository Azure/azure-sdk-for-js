/*
 Setup: Enter your storage account name and shared key in main()
*/

import { BlobServiceClient, SharedKeyCredential } from "../../src"; // Change to "@azure/storage-blob" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";

  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  // create some blobs with delimiters in names
  const content = "hello";
  let blobName = "a1";
  let blockBlobClient = containerClient.getBlockBlobClient(blobName);
  let uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  blobName = "a2";
  blockBlobClient = containerClient.getBlockBlobClient(blobName);
  uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  blobName = "prefix1/b1";
  blockBlobClient = containerClient.getBlockBlobClient(blobName);
  uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  blobName = "prefix1/b2";
  blockBlobClient = containerClient.getBlockBlobClient(blobName);
  uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  blobName = "prefix2/sub1/c";
  blockBlobClient = containerClient.getBlockBlobClient(blobName);
  uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  blobName = "prefix2/sub1/d";
  blockBlobClient = containerClient.getBlockBlobClient(blobName);
  uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  blobName = "prefix2/sub1/e";
  blockBlobClient = containerClient.getBlockBlobClient(blobName);
  uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  // 1. List blobs by hierarchy
  console.log("Listing blobs by hierarchy");
  let iter = await containerClient.listBlobsByHierarchy("/");
  for await (const item of iter) {
    if (item.kind === "prefix") {
      console.log(`\tBlobPrefix: ${item.name}`);
    } else {
      console.log(
        `\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`
      );
    }
  }

  // 2. Generator syntax .next() and passing a prefix
  console.log("Listing blobs by hierarchy, specifying a prefix");
  iter = await containerClient.listBlobsByHierarchy("/", { prefix: "prefix1/" });
  let entity = await iter.next();
  while (!entity.done) {
    let item = entity.value;
    if (item.kind === "prefix") {
      console.log(`\tBlobPrefix: ${item.name}`);
    } else {
      console.log(
        `\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`
      );
    }
    entity = await iter.next();
  }

  // 3. byPage()
  console.log("Listing blobs by hierarchy by page");
  for await (const response of containerClient.listBlobsByHierarchy("/").byPage()) {
    const segment = response.segment;
    if (segment.blobPrefixes) {
      for (const prefix of segment.blobPrefixes) {
        console.log(`\tBlobPrefix: ${prefix.name}`);
      }
    }
    for (const blob of response.segment.blobItems) {
      console.log(
        `\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`
      );
    }
  }

  // 4. byPage() and passing a prefix and max page size
  console.log("Listing blobs by hierarchy by page, specifying a prefix and a max page size");
  let i = 1;
  for await (const response of containerClient
    .listBlobsByHierarchy("/", { prefix: "prefix2/sub1/" })
    .byPage({ maxPageSize: 2 })) {
    console.log(`Page ${i++}`);
    const segment = response.segment;
    if (segment.blobPrefixes) {
      for (const prefix of segment.blobPrefixes) {
        console.log(`\tBlobPrefix: ${prefix.name}`);
      }
    }
    for (const blob of response.segment.blobItems) {
      console.log(
        `\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`
      );
    }
  }

  await containerClient.delete();
  console.log("deleted container");
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
