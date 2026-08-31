// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an installed template.
 *
 * @summary delete an installed template.
 * x-ms-original-file: 2025-07-01-preview/contentTemplates/DeleteTemplate.json
 */
async function deleteMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.contentTemplate.delete(
    "myRg",
    "myWorkspace",
    "8365ebfe-a381-45b7-ad08-7d818070e11f",
  );
}

async function main(): Promise<void> {
  await deleteMetadata();
}

main().catch(console.error);
