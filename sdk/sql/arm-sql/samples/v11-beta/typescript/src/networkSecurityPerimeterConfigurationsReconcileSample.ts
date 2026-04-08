// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconcile network security perimeter configuration for SQL Resource Provider
 *
 * @summary reconcile network security perimeter configuration for SQL Resource Provider
 * x-ms-original-file: 2025-02-01-preview/NetworkSecurityPerimeterConfigurationsReconcile.json
 */
async function reconcileNSPConfig(): Promise<void> {
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

async function main(): Promise<void> {
  await reconcileNSPConfig();
}

main().catch(console.error);
