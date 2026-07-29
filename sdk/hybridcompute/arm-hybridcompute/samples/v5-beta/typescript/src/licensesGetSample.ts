// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about the view of a license.
 *
 * @summary retrieves information about the view of a license.
 * x-ms-original-file: 2026-06-16-preview/license/License_Get.json
 */
async function getLicense(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenses.get("myResourceGroup", "{licenseName}");
  console.log(result);
}

async function main(): Promise<void> {
  await getLicense();
}

main().catch(console.error);
