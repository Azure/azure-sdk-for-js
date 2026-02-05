// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Power off the provided bare metal machine.
 *
 * @summary Power off the provided bare metal machine.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-09-01/examples/BareMetalMachines_PowerOff.json
 */
async function powerOffBareMetalMachine() {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] || "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName = process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const bareMetalMachineName = "bareMetalMachineName";
  const bareMetalMachinePowerOffParameters = { skipShutdown: "True" };
  const options = {
    bareMetalMachinePowerOffParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.beginPowerOffAndWait(
    resourceGroupName,
    bareMetalMachineName,
    options,
  );
  console.log(result);
}

async function main() {
  await powerOffBareMetalMachine();
}

main().catch(console.error);
