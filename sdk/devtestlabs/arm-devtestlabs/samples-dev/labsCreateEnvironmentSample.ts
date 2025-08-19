// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create virtual machines in a lab. This operation can take a while to complete.
 *
 * @summary Create virtual machines in a lab. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Labs_CreateEnvironment.json
 */

import type { LabVirtualMachineCreationParameter } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function labsCreateEnvironment(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const name = "{labName}";
  const labVirtualMachineCreationParameter: LabVirtualMachineCreationParameter = {
    name: "{vmName}",
    allowClaim: true,
    disallowPublicIpAddress: true,
    galleryImageReference: {
      offer: "UbuntuServer",
      osType: "Linux",
      publisher: "Canonical",
      sku: "16.04-LTS",
      version: "Latest",
    },
    labSubnetName: "{virtualnetwork-subnet-name}",
    labVirtualNetworkId:
      "/subscriptions/{subscriptionId}/resourcegroups/resourceGroupName/providers/microsoft.devtestlab/labs/{labName}/virtualnetworks/{virtualNetworkName}",
    location: "{location}",
    password: "{userPassword}",
    size: "Standard_A2_v2",
    storageType: "Standard",
    tags: { tagName1: "tagValue1" },
    userName: "{userName}",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.labs.beginCreateEnvironmentAndWait(
    resourceGroupName,
    name,
    labVirtualMachineCreationParameter,
  );
  console.log(result);
}

labsCreateEnvironment().catch(console.error);
