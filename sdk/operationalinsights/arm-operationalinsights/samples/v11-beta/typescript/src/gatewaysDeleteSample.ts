// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Log Analytics gateway.
 *
 * @summary delete a Log Analytics gateway.
 * x-ms-original-file: 2025-07-01/WorkspacesGatewaysDelete.json
 */
async function deleteGateways(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.gateways.delete(
    "OIAutoRest5123",
    "aztest5048",
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main(): Promise<void> {
  await deleteGateways();
}

main().catch(console.error);
