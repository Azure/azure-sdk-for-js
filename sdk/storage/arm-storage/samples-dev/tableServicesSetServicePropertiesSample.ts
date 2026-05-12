// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets the properties of a storage account’s Table service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary sets the properties of a storage account’s Table service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: 2025-08-01/TableServicesPut.json
 */
async function tableServicesPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.tableServices.setServiceProperties("res4410", "sto8607", {
    tableServiceProperties: {
      cors: {
        corsRules: [
          {
            allowedHeaders: ["x-ms-meta-abc", "x-ms-meta-data*", "x-ms-meta-target*"],
            allowedMethods: ["GET", "HEAD", "POST", "OPTIONS", "MERGE", "PUT"],
            allowedOrigins: ["http://www.contoso.com", "http://www.fabrikam.com"],
            exposedHeaders: ["x-ms-meta-*"],
            maxAgeInSeconds: 100,
          },
          {
            allowedHeaders: ["*"],
            allowedMethods: ["GET"],
            allowedOrigins: ["*"],
            exposedHeaders: ["*"],
            maxAgeInSeconds: 2,
          },
          {
            allowedHeaders: ["x-ms-meta-12345675754564*"],
            allowedMethods: ["GET", "PUT"],
            allowedOrigins: ["http://www.abc23.com", "https://www.fabrikam.com/*"],
            exposedHeaders: ["x-ms-meta-abc", "x-ms-meta-data*", "x-ms-meta-target*"],
            maxAgeInSeconds: 2000,
          },
        ],
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await tableServicesPut();
}

main().catch(console.error);
