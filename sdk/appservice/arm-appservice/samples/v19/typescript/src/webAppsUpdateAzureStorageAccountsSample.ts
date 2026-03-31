// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Updates the Azure storage account configurations of an app.
 *
 * @summary description for Updates the Azure storage account configurations of an app.
 * x-ms-original-file: 2025-05-01/UpdateAzureStorageAccounts.json
 */
async function updateAzureStorageAccounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateAzureStorageAccounts("testrg123", "sitef6141", {
    properties: {
      account1: {
        type: "AzureFiles",
        accessKey: "26515^%@#*",
        accountName: "testsa",
        mountPath: "/mounts/a/files",
        shareName: "web",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAzureStorageAccounts();
}

main().catch(console.error);
