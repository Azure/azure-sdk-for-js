/*
 Setup: Enter your storage account name and shared key in main()
*/

import { FileServiceClient } from "../../src"; // Change to "@azure/storage-file-share" in your package

async function main() {
  // Create File Service Client from Account connection string or SAS connection string
  // Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
  // SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
  const STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "";
  // Note - Account connection string can only be used in node.
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
