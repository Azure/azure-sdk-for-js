/*
 Setup: Enter your storage account name and shared key in main()
*/

import { FileServiceClient } from "../../src"; // Change to "@azure/storage-file" in your package

async function main() {
  // Create File Service Client from Connection String
  const STORAGE_CONNECTION_STRING = "";
  // Only available in Node.js runtime
  const serviceClient = FileServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);

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
