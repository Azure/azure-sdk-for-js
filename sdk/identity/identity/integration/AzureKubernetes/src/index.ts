// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import express from "express";
import { ManagedIdentityCredential, WorkloadIdentityCredential, TokenCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

// Initialize the environment
dotenv.config();
const app = express();

// Utility function to test storage access with a credential
async function testStorageAccess(credential: TokenCredential, storageAccount: string | undefined, credentialType: string): Promise<boolean> {
  try {
    console.log(`Testing ${credentialType} with storage account: ${storageAccount}`);

    if (!storageAccount) {
      throw new Error(`Storage account name not provided for ${credentialType}`);
    }

    // Create blob service client
    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccount}.blob.core.windows.net`,
      credential
    );

    console.log(`Created BlobServiceClient for ${credentialType}`);

    // List containers to test authentication
    const containerIterator = blobServiceClient.listContainers();
    const containers: string[] = [];
    let count = 0;

    for await (const container of containerIterator) {
      containers.push(container.name);
      count++;
      if (count >= 10) break; // Limit to first 10 containers
    }

    console.log(`Successfully listed ${count} containers using ${credentialType}`);
    if (containers.length > 0) {
      console.log(`Container names: ${containers.join(", ")}`);
    }

    return true;

  } catch (error: any) {
    console.log(error);
    return false;
  }
}

// Health check endpoint
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({
    status: "OK",
    service: "Azure Identity Test Service",
    endpoints: [
      "/managed-identity",
      "/managed-identity/user-assigned",
      "/workload-identity"
    ],
    timestamp: new Date().toISOString()
  });
});

// Test system-assigned managed identity
app.get("/managed-identity", async (req: express.Request, res: express.Response) => {
  console.log("=== Testing System-Assigned Managed Identity ===");

  try {
    const storageAccount = process.env.IDENTITY_STORAGE_NAME_1;
    const credential = new ManagedIdentityCredential();

    const success = await testStorageAccess(credential, storageAccount, "System-Assigned Managed Identity");

    res.status(success ? 200 : 500).json({
      test: "managed-identity",
      success: success,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      test: "managed-identity",
      success: false,
      timestamp: new Date().toISOString()
    });
  }
});

// Test user-assigned managed identity
app.get("/managed-identity/user-assigned", async (req: express.Request, res: express.Response) => {
  console.log("=== Testing User-Assigned Managed Identity ===");

  try {
    const storageAccount = process.env.IDENTITY_STORAGE_NAME_2;
    const clientId = process.env.IDENTITY_USER_DEFINED_CLIENT_ID;

    if (!clientId) {
      throw new Error("IDENTITY_USER_DEFINED_CLIENT_ID environment variable is required for user-assigned managed identity");
    }

    const credential = new ManagedIdentityCredential({ clientId });

    const success = await testStorageAccess(credential, storageAccount, "User-Assigned Managed Identity");

    res.status(success ? 200 : 500).json({
      test: "user-assigned-managed-identity",
      success: success,
      clientId: clientId,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      test: "user-assigned-managed-identity",
      success: false,
      timestamp: new Date().toISOString()
    });
  }
});

// Test workload identity
app.get("/workload-identity", async (req: express.Request, res: express.Response) => {
  console.log("=== Testing Workload Identity ===");

  try {
    const storageAccount = process.env.IDENTITY_STORAGE_NAME_1;
    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;

    if (!tenantId || !clientId) {
      throw new Error("AZURE_TENANT_ID and AZURE_CLIENT_ID environment variables are required for workload identity");
    }

    const credential = new WorkloadIdentityCredential({
      tenantId,
      clientId
    });

    const success = await testStorageAccess(credential, storageAccount, "Workload Identity");

    res.status(success ? 200 : 500).json({
      test: "workload-identity",
      success: success,
      tenantId: tenantId,
      clientId: clientId,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      test: "workload-identity",
      success: false,
      timestamp: new Date().toISOString()
    });
  }
});

// Get the port from environment variable or default to 8080
const port = process.env.FUNCTIONS_CUSTOMHANDLER_PORT || 8080;

app.listen(port, () => {
  console.log(`Azure Identity Test Server listening on port ${port}`);
  console.log("Available endpoints:");
  console.log("  GET / - Health check and service info");
  console.log("  GET /managed-identity - Test system-assigned managed identity");
  console.log("  GET /managed-identity/user-assigned - Test user-assigned managed identity");
  console.log("  GET /workload-identity - Test workload identity");
});
