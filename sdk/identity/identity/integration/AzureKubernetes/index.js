// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const dotenv = require("dotenv");

const { BlobServiceClient } = require("@azure/storage-blob");
const { ManagedIdentityCredential } = require("@azure/identity");

// Initialize the environment
dotenv.config();

async function main() {
  const account1 = process.env.IDENTITY_STORAGE_NAME_1;
  const account2 = process.env.IDENTITY_STORAGE_NAME_2;
  const credentialSystemAssigned = new ManagedIdentityCredential();
  const credentialUserAssigned = new ManagedIdentityCredential({
    clientId: process.env.IDENTITY_USER_DEFINED_IDENTITY_CLIENT_ID,
  });
  const client1 = new BlobServiceClient(
    `https://${account1}.blob.core.windows.net`,
    credentialSystemAssigned,
  );
  const client2 = new BlobServiceClient(
    `https://${account2}.blob.core.windows.net`,
    credentialUserAssigned,
  );

  let success = true;
  try {
    console.log("Client with system assigned identity");
    await client1.getProperties();
    console.log("Successfully acquired token with system-assigned ManagedIdentityCredential");
  } catch (e) {
    success = false;
    console.error(e);
  }

  try {
    console.log("Client with user assigned identity");
    await client2.getProperties();
  } catch (e) {
    console.error(e);
    success = false;
  }

  if (!success) {
    throw new Error("Unable to authenticate, see console logs for details");
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
