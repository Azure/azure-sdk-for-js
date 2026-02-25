// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Run one or more read-only commands on the provided storage appliance.
 *
 * @summary Run one or more read-only commands on the provided storage appliance.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-09-01/examples/StorageAppliances_RunReadCommands.json
 */
async function runAndRetrieveOutputFromReadOnlyCommandsOnStorageAppliance() {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] || "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName = process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const storageApplianceName = "storageApplianceName";
  const storageApplianceRunReadCommandsParameters = {
    limitTimeSeconds: 60,
    commands: [
      {
        arguments: ["list", "--filter", "state='open'"],
        command: "purealert",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.storageAppliances.beginRunReadCommandsAndWait(
    resourceGroupName,
    storageApplianceName,
    storageApplianceRunReadCommandsParameters,
  );
  console.log(result);
}

async function main() {
  await runAndRetrieveOutputFromReadOnlyCommandsOnStorageAppliance();
}

main().catch(console.error);
