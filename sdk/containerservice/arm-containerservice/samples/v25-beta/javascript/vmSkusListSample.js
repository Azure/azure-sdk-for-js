// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of VM SKUs accepted by AKS when creating node pools in a specified location. AKS will perform a best effort approach to provision the requested VM SKUs, but availability is not guaranteed.
 *
 * @summary gets the list of VM SKUs accepted by AKS when creating node pools in a specified location. AKS will perform a best effort approach to provision the requested VM SKUs, but availability is not guaranteed.
 * x-ms-original-file: 2026-01-02-preview/ListAvailableContainerServiceVmSkus.json
 */
async function listsAllAvailableContainerServiceVMSKUsForALocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vmSkus.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets the list of VM SKUs accepted by AKS when creating node pools in a specified location. AKS will perform a best effort approach to provision the requested VM SKUs, but availability is not guaranteed.
 *
 * @summary gets the list of VM SKUs accepted by AKS when creating node pools in a specified location. AKS will perform a best effort approach to provision the requested VM SKUs, but availability is not guaranteed.
 * x-ms-original-file: 2026-01-02-preview/ListAvailableContainerServiceVmSkusWithExtendedLocations.json
 */
async function listsAllAvailableContainerServiceVMSKUsWithExtendedLocationInformation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vmSkus.list("westus", { includeExtendedLocations: true })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllAvailableContainerServiceVMSKUsForALocation();
  await listsAllAvailableContainerServiceVMSKUsWithExtendedLocationInformation();
}

main().catch(console.error);
