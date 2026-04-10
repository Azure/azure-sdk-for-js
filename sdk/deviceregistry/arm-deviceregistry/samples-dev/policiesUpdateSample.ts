// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Policy
 *
 * @summary update a Policy
 * x-ms-original-file: 2026-03-01-preview/Update_Policies.json
 */
async function updatePolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.policies.update("rgdeviceregistry", "mynamespace", "mypolicy", {
    properties: { certificate: { leafCertificateConfiguration: { validityPeriodInDays: 10 } } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatePolicies();
}

main().catch(console.error);
