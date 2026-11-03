// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureRedHatOpenShiftClient } from "@azure/arm-redhatopenshift";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation returns the installable OpenShift versions as a string.
 *
 * @summary the operation returns the installable OpenShift versions as a string.
 * x-ms-original-file: 2025-07-25/OpenShiftVersions_List.json
 */
async function listsAllOpenShiftVersionsAvailableToInstallInTheSpecifiedLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.openShiftVersions.list("location")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOpenShiftVersionsAvailableToInstallInTheSpecifiedLocation();
}

main().catch(console.error);
