// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reconcile network security perimeter configuration for SQL Resource Provider
 *
 * @summary reconcile network security perimeter configuration for SQL Resource Provider
 * x-ms-original-file: 2025-02-01-preview/NetworkSecurityPerimeterConfigurationsReconcile.json
 */
async function reconcileNSPConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.reconcile(
    "sqlcrudtest-7398",
    "sqlcrudtest-7398",
    "00000001-2222-3333-4444-111144444444.assoc1",
  );
  console.log(result);
}

async function main() {
  await reconcileNSPConfig();
}

main().catch(console.error);
