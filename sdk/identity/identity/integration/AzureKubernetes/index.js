// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const dotenv = require("dotenv");

const { BlobServiceClient } = require("@azure/storage-blob");
const { ManagedIdentityCredential } = require("@azure/identity");

// Initialize the environment
dotenv.config();

async function main() {
  const account2 = process.env.IDENTITY_STORAGE_NAME_2;
  if (!account2) {
    throw new Error("Missing IDENTITY_STORAGE_NAME_2 env var");
  }

  const clientId = process.env.IDENTITY_USER_DEFINED_IDENTITY_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing IDENTITY_USER_DEFINED_IDENTITY_CLIENT_ID env var");
  }

  const client2 = new BlobServiceClient(
    `https://${account2}.blob.core.windows.net`,
    new ManagedIdentityCredential({
      clientId: process.env.IDENTITY_USER_DEFINED_IDENTITY_CLIENT_ID,
    }),
  );

  try {
    console.log("Authenticating with storage using user-assigned ManagedIdentityCredential");
    await client2.getProperties();
    console.log("Successfully acquired token with user-assigned ManagedIdentityCredential");
  } catch (e) {
    console.error(e);
    success = false;
  }

  if (success) {
    console.log("Successfully authenticated with storage");
    return "Successfully authenticated with storage";
  } else {
    console.log("unable to authenticate");
    throw new Error("unable to authenticate");
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
