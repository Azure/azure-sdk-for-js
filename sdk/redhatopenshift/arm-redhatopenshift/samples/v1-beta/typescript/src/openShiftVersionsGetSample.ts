// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureRedHatOpenShiftClient } from "@azure/arm-redhatopenshift";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation returns installable OpenShift version as a string.
 *
 * @summary this operation returns installable OpenShift version as a string.
 * x-ms-original-file: 2025-07-25/OpenShiftVersions_Get.json
 */
async function getsAnAvailableOpenShiftVersionToInstallInTheSpecifiedLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.openShiftVersions.get("location", "4.14.40");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAnAvailableOpenShiftVersionToInstallInTheSpecifiedLocation();
}

main().catch(console.error);
