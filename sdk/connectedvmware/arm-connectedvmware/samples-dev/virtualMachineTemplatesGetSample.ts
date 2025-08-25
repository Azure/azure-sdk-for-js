// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Implements virtual machine template GET method.
 *
 * @summary Implements virtual machine template GET method.
 * x-ms-original-file: specification/connectedvmware/resource-manager/Microsoft.ConnectedVMwarevSphere/stable/2023-10-01/examples/GetVirtualMachineTemplate.json
 */

import { AzureArcVMwareManagementServiceAPI } from "@azure/arm-connectedvmware";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getVirtualMachineTemplate(): Promise<void> {
  const subscriptionId =
    process.env["CONNECTEDVMWARE_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["CONNECTEDVMWARE_RESOURCE_GROUP"] || "testrg";
  const virtualMachineTemplateName = "WebFrontEndTemplate";
  const credential = new DefaultAzureCredential();
  const client = new AzureArcVMwareManagementServiceAPI(credential, subscriptionId);
  const result = await client.virtualMachineTemplates.get(
    resourceGroupName,
    virtualMachineTemplateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualMachineTemplate();
}

main().catch(console.error);
