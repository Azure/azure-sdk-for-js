// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to create or update an extension.
 *
 * @summary The operation to create or update an extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_CreateOrUpdate_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionCreateOrUpdateMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaaa";
  const vmssExtensionName = "aaaaaaaaaaaaaaaaaaaaa";
  const extensionParameters = {
    name: "{extension-name}",
    typePropertiesType: "{extension-Type}",
    autoUpgradeMinorVersion: true,
    enableAutomaticUpgrade: true,
    forceUpdateTag: "aaaaaaaaa",
    protectedSettings: {},
    provisionAfterExtensions: ["aa"],
    publisher: "{extension-Publisher}",
    settings: {},
    suppressFailures: true,
    typeHandlerVersion: "{handler-version}",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetExtensions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vmScaleSetName,
    vmssExtensionName,
    extensionParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create or update an extension.
 *
 * @summary The operation to create or update an extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_CreateOrUpdate_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionCreateOrUpdateMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaa";
  const vmssExtensionName = "aaaaaaaaaaa";
  const extensionParameters = {};
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetExtensions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vmScaleSetName,
    vmssExtensionName,
    extensionParameters,
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetExtensionCreateOrUpdateMaximumSetGen();
  await virtualMachineScaleSetExtensionCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
