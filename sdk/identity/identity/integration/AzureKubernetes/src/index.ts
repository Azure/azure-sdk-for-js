// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import express from "express";
import { ManagedIdentityCredential, WorkloadIdentityCredential, TokenCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const storageAccountUserAssigned = requireEnvVar("IDENTITY_STORAGE_NAME_USER_ASSIGNED");
const userAssignedClientId = requireEnvVar("IDENTITY_USER_DEFINED_CLIENT_ID");

// Test storage access with a credential
async function testStorageAccess(credential: TokenCredential, storageAccount: string): Promise<void> {
  try {
    // Create blob service client
    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccount}.blob.core.windows.net`,
      credential
    );

    // List containers to test authentication
    for await (const container of blobServiceClient.listContainers()) {
      console.log(`Container ${container.name}`);
    }
  } catch (error: any) {
    console.error(`Error accessing storage account ${storageAccount}:`, error);
    throw error;
  }
}

// Health check endpoint
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({
    status: "OK",
  });
});

app.get("/managed-identity/user-assigned", async (req: express.Request, res: express.Response) => {
  try {
    const credential = new ManagedIdentityCredential({ clientId: userAssignedClientId });
    await testStorageAccess(credential, storageAccountUserAssigned);

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
      details: {
        name: error.name,
        code: error.code,
        stack: error.stack
      },
    });
  }
});

app.get("/workload-identity", async (req: express.Request, res: express.Response) => {
  try {
    const credential = new WorkloadIdentityCredential({
      clientId: userAssignedClientId
    });

    await testStorageAccess(credential, storageAccountUserAssigned);

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || "Unknown error occurred",
      details: {
        name: error.name,
        code: error.code,
        stack: error.stack
      },
    });
  }
});

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}

// Get the port from environment variable or default to 8080
const port = process.env.IDENTITY_FUNCTIONS_CUSTOMHANDLER_PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
