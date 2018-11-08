// Steps to run this sample
// 1. npm install
// 2. Enter your storage account name and shared key in main()

const {
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  StorageURL,
  SharedKeyCredential,
  AnonymousCredential,
  TokenCredential
} = require(".."); // Change to "@azure/storage-blob" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "account";
  const accountKey = "accountkey";

  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use TokenCredential with OAuth token
  const tokenCredential = new TokenCredential("token");
  tokenCredential.token = "renewedToken"; // Renew the token by updating token filed of token credential

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  // Use sharedKeyCredential, tokenCredential or AnonymousCredential to create a pipeline
  const pipeline = StorageURL.newPipeline(sharedKeyCredential);

  // List containers
  const serviceURL = new ServiceURL(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    pipeline
  );

  let marker;
  do {
    const listContainersResponse = await serviceURL.listContainersSegment(
      Aborter.none,
      marker
    );

    marker = listContainersResponse.marker;
    for (const container of listContainersResponse.containerItems) {
      console.log(`Container: ${container.name}`);
    }
  } while (marker);

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

  const createContainerResponse = await containerURL.create(Aborter.none);
  console.log(
    `Create container ${containerName} successfully`,
    createContainerResponse.requestId
  );

  // Create a blob
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  const uploadBlobResponse = await blockBlobURL.upload(
    Aborter.none,
    content,
    content.length
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );

  // List blobs
  do {
    const listBlobsResponse = await containerURL.listBlobFlatSegment(
      Aborter.none,
      marker
    );

    marker = listBlobsResponse.marker;
    for (const blob of listBlobsResponse.segment.blobItems) {
      console.log(`Blob: ${blob.name}`);
    }
  } while (marker);

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blobURL.download(Aborter.none, 0);
  console.log(
    "Downloaded blob content",
    downloadBlockBlobResponse.readableStreamBody.read(content.length).toString()
  );

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