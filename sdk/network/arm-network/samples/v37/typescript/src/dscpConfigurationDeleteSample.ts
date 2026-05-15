// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a DSCP Configuration.
 *
 * @summary deletes a DSCP Configuration.
 * x-ms-original-file: 2025-05-01/DscpConfigurationDelete.json
 */
async function deleteDscpConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.dscpConfiguration.delete("rg1", "mydscpConfig");
}

async function main(): Promise<void> {
  await deleteDscpConfiguration();
}

main().catch(console.error);
