// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { BlobServiceClient } = require("@azure/storage-blob");
const { ManagedIdentityCredential } = require("@azure/identity");

async function main() {
  const account2 = process.env.IDENTITY_STORAGE_NAME_2;
  if (!account2) {
    throw new Error("Missing IDENTITY_STORAGE_NAME_2 env var");
  }

  const clientId = process.env.IDENTITY_USER_DEFINED_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing IDENTITY_USER_DEFINED_CLIENT_ID env var");
  }

  const blobServiceClient = new BlobServiceClient(
    `https://${account2}.blob.core.windows.net`,
    new ManagedIdentityCredential({
      clientId,
    }),
  );

  try {
    console.log("Authenticating with storage using user-assigned ManagedIdentityCredential");
    await blobServiceClient.getProperties();
    return "Successfully authenticated with storage";
  } catch (e) {
    console.error(e);
    throw e;
  }
}

main().then(console.log).catch(console.error);
