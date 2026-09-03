// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Log Analytics gateway.
 *
 * @summary delete a Log Analytics gateway.
 * x-ms-original-file: 2025-07-01/WorkspacesGatewaysDelete.json
 */
async function deleteGateways() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.gateways.delete(
    "OIAutoRest5123",
    "aztest5048",
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main() {
  await deleteGateways();
}

main().catch(console.error);
