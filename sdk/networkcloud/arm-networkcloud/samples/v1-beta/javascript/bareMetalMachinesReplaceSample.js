// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Replace the provided bare metal machine.
 *
 * @summary Replace the provided bare metal machine.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/preview/2025-07-01-preview/examples/BareMetalMachines_Replace.json
 */
async function replaceBareMetalMachine() {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] || "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName = process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const bareMetalMachineName = "bareMetalMachineName";
  const bareMetalMachineReplaceParameters = {
    bmcCredentials: {
      password: "https://keyvaultname.vault.azure.net/secrets/secretName",
      username: "bmcuser",
    },
    bmcMacAddress: "00:00:4f:00:57:ad",
    bootMacAddress: "00:00:4e:00:58:af",
    machineName: "name",
    safeguardMode: "All",
    serialNumber: "BM1219XXX",
    storagePolicy: "DiscardAll",
  };
  const options = {
    bareMetalMachineReplaceParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.beginReplaceAndWait(
    resourceGroupName,
    bareMetalMachineName,
    options,
  );
  console.log(result);
}

async function main() {
  await replaceBareMetalMachine();
}

main().catch(console.error);
