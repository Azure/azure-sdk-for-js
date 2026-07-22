// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the base Settings for the target resource.
 *
 * @summary returns the base Settings for the target resource.
 * x-ms-original-file: 2026-06-16-preview/settings/SettingsGet.json
 */
async function networkConfigurationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.settings.get(
    "hybridRG",
    "Microsoft.HybridCompute",
    "machines",
    "testMachine",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkConfigurationsGet();
}

main().catch(console.error);
