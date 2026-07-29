// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get all license profiles of a non-Azure machine
 *
 * @summary the operation to get all license profiles of a non-Azure machine
 * x-ms-original-file: 2026-06-16-preview/licenseProfile/LicenseProfile_List.json
 */
async function listAllLicenseProfiles(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.licenseProfiles.list("myResourceGroup", "myMachine")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllLicenseProfiles();
}

main().catch(console.error);
