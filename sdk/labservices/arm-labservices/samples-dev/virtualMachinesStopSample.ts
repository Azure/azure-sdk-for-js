// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Action to stop a lab virtual machine.
 *
 * @summary Action to stop a lab virtual machine.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/VirtualMachines/stopVirtualMachine.json
 */

import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function stopVirtualMachine(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labName = "testlab";
  const virtualMachineName = "template";
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginStopAndWait(
    resourceGroupName,
    labName,
    virtualMachineName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stopVirtualMachine();
}

main().catch(console.error);
