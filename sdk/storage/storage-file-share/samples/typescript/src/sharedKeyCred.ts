/*
 Setup: Enter your storage account name and shared key in main()
*/

import { ShareServiceClient, StorageSharedKeyCredential } from "@azure/storage-file-share";

export async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // List shares
  const serviceClient = new ShareServiceClient(
    `https://${account}.file.core.windows.net`,
    sharedKeyCredential
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
if (!process.env["BATCH_SAMPLES"]) {
  main()
    .then(() => {
      console.log("Successfully executed sample.");
    })
    .catch((err) => {
      console.log(err.message);
    });
}
