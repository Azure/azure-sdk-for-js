// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import express from "express";
import { ManagedIdentityCredential, WorkloadIdentityCredential, TokenCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

// Initialize the environment
dotenv.config();
const app = express();

// Global variables - will be initialized at startup
let storageAccount: string;
let storageAccount2: string;
let userAssignedClientId: string;
let azureClientId: string;

// Utility function to test storage access with a credential
async function testStorageAccess(credential: TokenCredential, storageAccount: string): Promise<void> {
  try {
    // Create blob service client
    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccount}.blob.core.windows.net`,
      credential
    );

    // List containers to test authentication
    await blobServiceClient.getProperties();

  } catch (error: any) {
    console.error(`Error accessing storage account ${storageAccount}:`, error);
    throw error;
  }
}

// Health check endpoint
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({
    status: "OK",
    service: "Azure Identity Test Service",
  });
});

// Test system-assigned managed identity
app.get("/managed-identity", async (req: express.Request, res: express.Response) => {
  try {
    const credential = new ManagedIdentityCredential();
    await testStorageAccess(credential, storageAccount);

    res.json({ test: "managed-identity-success" });
  } catch (error: any) {
    res.status(500).json({
      test: "managed-identity",
      error: error.message || "Unknown error occurred",
      details: {
        name: error.name,
        code: error.code,
        stack: error.stack
      },
    });
  }
});

// Test user-assigned managed identity
app.get("/managed-identity/user-assigned", async (req: express.Request, res: express.Response) => {
  try {
    const credential = new ManagedIdentityCredential({ clientId: userAssignedClientId });
    await testStorageAccess(credential, storageAccount2);

    res.json({ test: "user-assigned-managed-identity-success" });
  } catch (error: any) {
    res.status(500).json({
      test: "user-assigned-managed-identity",
      error: error.message || "Unknown error occurred",
      details: {
        name: error.name,
        code: error.code,
        stack: error.stack
      },
    });
  }
});

// Test workload identity
app.get("/workload-identity", async (req: express.Request, res: express.Response) => {
  try {
    const credential = new WorkloadIdentityCredential({
      clientId: azureClientId
    });

    await testStorageAccess(credential, storageAccount2);

    res.json({ test: "workload-identity-success" });
  } catch (error: any) {
    res.status(500).json({
      test: "workload-identity",
      error: error.message || "Unknown error occurred",
      details: {
        name: error.name,
        code: error.code,
        stack: error.stack
      },
    });
  }
});

// Get the port from environment variable or default to 8080
const port = process.env.FUNCTIONS_CUSTOMHANDLER_PORT || 8080;

app.listen(port, () => {
  storageAccount = requireEnvVar("IDENTITY_STORAGE_NAME");
  storageAccount2 = requireEnvVar("IDENTITY_STORAGE_NAME_2");
  userAssignedClientId = requireEnvVar("IDENTITY_USER_DEFINED_CLIENT_ID");
  azureClientId = requireEnvVar("IDENTITY_USER_DEFINED_CLIENT_ID");
});

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}
