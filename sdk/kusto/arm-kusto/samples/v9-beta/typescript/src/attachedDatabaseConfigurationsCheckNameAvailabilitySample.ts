// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the attached database configuration resource name is valid and is not already in use.
 *
 * @summary checks that the attached database configuration resource name is valid and is not already in use.
 * x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationCheckNameAvailability.json
 */
async function kustoAttachedDatabaseConfigurationCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.attachedDatabaseConfigurations.checkNameAvailability(
    "kustorptest",
    "kustoCluster",
    { name: "adc1", type: "Microsoft.Kusto/clusters/attachedDatabaseConfigurations" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoAttachedDatabaseConfigurationCheckNameAvailability();
}

main().catch(console.error);
