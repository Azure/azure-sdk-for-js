// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a license.
 *
 * @summary the operation to delete a license.
 * x-ms-original-file: 2026-06-16-preview/license/License_Delete.json
 */
async function deleteALicense(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.licenses.delete("myResourceGroup", "{licenseName}");
}

async function main(): Promise<void> {
  await deleteALicense();
}

main().catch(console.error);
