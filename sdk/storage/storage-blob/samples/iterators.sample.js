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
} = require("../dist"); // Change to "@azure/storage-blob" in your package

async function main() {
  // Enter your storage account name and shared key
  const accountName = process.env.ACCOUNT_NAME || "accountName";
  const accountKey = process.env.ACCOUNT_KEY || "accountkey";
  const accountSas = process.env.ACCOUNT_SAS || "accountSas";

  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(accountName, accountKey);
  const anonymousCredential = new AnonymousCredential();

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = StorageURL.newPipeline(anonymousCredential);

  // List containers
  const serviceURL = new ServiceURL(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${accountName}.blob.core.windows.net/?${accountSas}`,
    pipeline
  );

  // Iterate over all the containers
  for await (const container of serviceURL.listContainers()) {
    console.log(`Container: ${container.name}`);
  }

  // The iteration can be paused and resumed
  let iter1 = serviceURL.listContainers();
  let i = 1;
  for await (const container of iter1) {
    console.log(`${i}: ${container.name}`);
    i++;
    if (i > 5) {
      break;
    }
  }

  const iter2 = serviceURL.listContainers({ resumePoint: iter1.resumePoint });
  for await (const container of iter2) {
    console.log(`${i}: ${container.name}`);
    i++;
  }

  const containerURL = ContainerURL.fromServiceURL(serviceURL, "existingContainerName");
  const containerURL2 = ContainerURL.fromServiceURL(serviceURL, "jeremy-test-container");
  let iter3 = containerURL2.listBlobs();
  // Blob iterator (similar to container iterator), can be resumed too.
  for await (const blob of iter3) {
      console.log(`Blob: ${blob.name}`);
  }
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch(err => {
    console.log(err.message);
  });
