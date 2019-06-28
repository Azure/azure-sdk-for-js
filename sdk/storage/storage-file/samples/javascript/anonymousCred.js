/*
 Setup: Enter your storage account name and shared key in main()
*/

const { FileServiceClient, AnonymousCredential } = require("../.."); // Change to "@azure/storage-file" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountSas = "";

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  // List shares
  const serviceClient = new FileServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS
    `https://${account}.file.core.windows.net${accountSas}`,
    anonymousCredential
  );

  console.log(`List shares`);
  let i = 1;
  for await (const share of serviceClient.listShares()) {
    console.log(`Share ${i++}: ${share.name}`);
  }

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.getShareClient(shareName);
  await shareClient.create();
  console.log(`Create share ${shareName} successfully`);

  // Delete share
  await shareClient.delete();
  console.log(`deleted share ${shareName}`);
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
