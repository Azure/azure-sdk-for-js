// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to perform a long-running resource action.
 *
 * @summary perform a long-running resource action.
 * x-ms-original-file: 2026-03-01-preview/Policies_RevokeIssuer.json
 */
async function policiesRevokeIssuer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.policies.revokeIssuer("rgdeviceregistry", "mynamespace", "mypolicy");
}

async function main(): Promise<void> {
  await policiesRevokeIssuer();
}

main().catch(console.error);
