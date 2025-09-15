// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Cordon the provided bare metal machine's Kubernetes node.
 *
 * @summary Cordon the provided bare metal machine's Kubernetes node.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/BareMetalMachines_Cordon.json
 */

import {
  BareMetalMachineCordonParameters,
  BareMetalMachinesCordonOptionalParams,
  NetworkCloud,
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cordonBareMetalMachine(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const bareMetalMachineName = "bareMetalMachineName";
  const bareMetalMachineCordonParameters: BareMetalMachineCordonParameters = {
    evacuate: "True",
  };
  const options: BareMetalMachinesCordonOptionalParams = {
    bareMetalMachineCordonParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.beginCordonAndWait(
    resourceGroupName,
    bareMetalMachineName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cordonBareMetalMachine();
}

main().catch(console.error);
