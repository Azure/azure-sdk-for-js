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
async function testStorageAccess(credential: TokenCredential, storageAccount: string ): Promise<{ success: boolean; error?: string; details?: any }> {
  try {
    // Create blob service client
    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccount}.blob.core.windows.net`,
      credential
    );

    // List containers to test authentication
    const containerIterator = blobServiceClient.listContainers();
    const containers: string[] = [];
    let count = 0;

    for await (const container of containerIterator) {
      containers.push(container.name);
      count++;
      if (count >= 10) break; // Limit to first 10 containers
    }

    return { success: true };

  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error occurred",
      details: {
        name: error.name,
        code: error.code,
        statusCode: error.statusCode,
        stack: error.stack
      }
    };
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
    ]
  });
});

// Test system-assigned managed identity
app.get("/managed-identity", async (req: express.Request, res: express.Response) => {
  try {
    const storageAccount = process.env.IDENTITY_STORAGE_NAME_1;
    const credential = new ManagedIdentityCredential();
    const result = await testStorageAccess(credential, storageAccount!);

    if (result.success) {
      res.json({ test: "managed-identity" });
    } else {
      res.status(500).json({
        test: "managed-identity",
        error: result.error,
        details: result.details,
        environment: {
          storageAccount: storageAccount,
          hasStorageAccount: !!storageAccount
        }
      });
    }

  } catch (error: any) {
    res.status(500).json({
      test: "managed-identity",
      error: error.message || "Unknown error occurred",
      details: {
        name: error.name,
        code: error.code,
        stack: error.stack
      },
      environment: {
        storageAccount: process.env.IDENTITY_STORAGE_NAME_1,
        hasStorageAccount: !!process.env.IDENTITY_STORAGE_NAME_1
      }
    });
  }
});

// Test user-assigned managed identity
app.get("/managed-identity/user-assigned", async (req: express.Request, res: express.Response) => {
  try {
    const storageAccount = process.env.IDENTITY_STORAGE_NAME_2;
    const clientId = process.env.IDENTITY_USER_DEFINED_CLIENT_ID;

    if (!clientId) {
      throw new Error("IDENTITY_USER_DEFINED_CLIENT_ID environment variable is required for user-assigned managed identity");
    }

    const credential = new ManagedIdentityCredential({ clientId });
    const result = await testStorageAccess(credential, storageAccount!);

    if (result.success) {
      res.json({ test: "user-assigned-managed-identity" });
    } else {
      res.status(500).json({
        test: "user-assigned-managed-identity",
        error: result.error,
        details: result.details,
        environment: {
          storageAccount: storageAccount,
          clientId: clientId,
          hasStorageAccount: !!storageAccount,
          hasClientId: !!clientId
        }
      });
    }

  } catch (error: any) {
    res.status(500).json({
      test: "user-assigned-managed-identity",
      error: error.message || "Unknown error occurred",
      details: {
        name: error.name,
        code: error.code,
        stack: error.stack
      },
      environment: {
        storageAccount: process.env.IDENTITY_STORAGE_NAME_2,
        clientId: process.env.IDENTITY_USER_DEFINED_CLIENT_ID,
        hasStorageAccount: !!process.env.IDENTITY_STORAGE_NAME_2,
        hasClientId: !!process.env.IDENTITY_USER_DEFINED_CLIENT_ID
      }
    });
  }
});

// Test workload identity
app.get("/workload-identity", async (req: express.Request, res: express.Response) => {
  try {
    const storageAccount = process.env.IDENTITY_STORAGE_NAME_1!;
    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;

    if (!tenantId || !clientId) {
      throw new Error("AZURE_TENANT_ID and AZURE_CLIENT_ID environment variables are required for workload identity");
    }

    const credential = new WorkloadIdentityCredential({
      tenantId,
      clientId
    });

    const result = await testStorageAccess(credential, storageAccount);

    if (result.success) {
      res.json({ test: "workload-identity" });
    } else {
      res.status(500).json({
        test: "workload-identity",
        error: result.error,
        details: result.details,
        environment: {
          storageAccount: storageAccount,
          tenantId: tenantId,
          clientId: clientId,
          hasStorageAccount: !!storageAccount,
          hasTenantId: !!tenantId,
          hasClientId: !!clientId,
          tokenFile: process.env.AZURE_FEDERATED_TOKEN_FILE,
          hasTokenFile: !!process.env.AZURE_FEDERATED_TOKEN_FILE
        }
      });
    }

  } catch (error: any) {
    res.status(500).json({
      test: "workload-identity",
      error: error.message || "Unknown error occurred",
      details: {
        name: error.name,
        code: error.code,
        stack: error.stack
      },
      environment: {
        storageAccount: process.env.IDENTITY_STORAGE_NAME_1,
        tenantId: process.env.AZURE_TENANT_ID,
        clientId: process.env.AZURE_CLIENT_ID,
        hasStorageAccount: !!process.env.IDENTITY_STORAGE_NAME_1,
        hasTenantId: !!process.env.AZURE_TENANT_ID,
        hasClientId: !!process.env.AZURE_CLIENT_ID,
        tokenFile: process.env.AZURE_FEDERATED_TOKEN_FILE,
        hasTokenFile: !!process.env.AZURE_FEDERATED_TOKEN_FILE
      }
    });
  }
});

// Get the port from environment variable or default to 8080
const port = process.env.FUNCTIONS_CUSTOMHANDLER_PORT || 8080;

app.listen(port, () => {
  // Server started - no logging needed for pipeline
});
