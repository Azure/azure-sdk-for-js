// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Run one or more restricted data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 *
 * @summary Run one or more restricted data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-09-01/examples/BareMetalMachines_RunDataExtractsRestricted.json
 */
async function runRestrictedDataExtractionOnBareMetalMachine() {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] || "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName = process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const bareMetalMachineName = "bareMetalMachineName";
  const bareMetalMachineRunDataExtractsRestrictedParameters = {
    limitTimeSeconds: 60,
    commands: [{ arguments: ["--min-severity=8"], command: "cluster-cve-report" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.beginRunDataExtractsRestrictedAndWait(
    resourceGroupName,
    bareMetalMachineName,
    bareMetalMachineRunDataExtractsRestrictedParameters,
  );
  console.log(result);
}

async function main() {
  await runRestrictedDataExtractionOnBareMetalMachine();
}

main().catch(console.error);
