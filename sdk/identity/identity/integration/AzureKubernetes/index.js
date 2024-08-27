// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlobServiceClient } = require("@azure/storage-blob");
const { ManagedIdentityCredential, WorkloadIdentityCredential } = require("@azure/identity");

async function main() {
  const storageAccount = process.env.IDENTITY_STORAGE_NAME_2;
  if (!storageAccount) {
    throw new Error("Missing IDENTITY_STORAGE_NAME_2 env var");
  }

  const clientId = process.env.IDENTITY_USER_DEFINED_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing IDENTITY_USER_DEFINED_CLIENT_ID env var");
  }

  const blobUrl = `https://${storageAccount}.blob.core.windows.net`;

  try {
    const blobServiceClient = new BlobServiceClient(
      blobUrl,
      new ManagedIdentityCredential({
        clientId,
      }),
    );
    await blobServiceClient.getProperties();

    // The test looks for this line in the output
    console.log("ManagedIdentity: Successfully authenticated with storage");
  } catch (e) {
    console.error(e);
  }

  try {
    const blobServiceClient = new BlobServiceClient(
      blobUrl,
      new WorkloadIdentityCredential({
        clientId,
      }),
    );
    await blobServiceClient.getProperties();

    // The test looks for this line in the output
    console.log("WorkloadIdentity: Successfully authenticated with storage");
  } catch (e) {
    console.error(e);
  }
}

main().then(console.log).catch(console.error);
