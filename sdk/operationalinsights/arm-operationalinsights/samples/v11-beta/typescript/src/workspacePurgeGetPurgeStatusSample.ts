// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets status of an ongoing purge operation.
 *
 * @summary gets status of an ongoing purge operation.
 * x-ms-original-file: 2025-07-01/WorkspacesPurgeOperation.json
 */
async function workspacePurgeOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.workspacePurge.getPurgeStatus(
    "OIAutoRest5123",
    "aztest5048",
    "purge-970318e7-b859-4edb-8903-83b1b54d0b74",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspacePurgeOperation();
}

main().catch(console.error);
