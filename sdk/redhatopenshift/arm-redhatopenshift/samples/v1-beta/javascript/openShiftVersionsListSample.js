// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureRedHatOpenShiftClient } = require("@azure/arm-redhatopenshift");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation returns the installable OpenShift versions as a string.
 *
 * @summary the operation returns the installable OpenShift versions as a string.
 * x-ms-original-file: 2025-07-25/OpenShiftVersions_List.json
 */
async function listsAllOpenShiftVersionsAvailableToInstallInTheSpecifiedLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.openShiftVersions.list("location")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllOpenShiftVersionsAvailableToInstallInTheSpecifiedLocation();
}

main().catch(console.error);
