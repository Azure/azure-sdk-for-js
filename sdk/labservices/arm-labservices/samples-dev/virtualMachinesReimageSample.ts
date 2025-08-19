// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Re-image a lab virtual machine. The virtual machine will be deleted and recreated using the latest published snapshot of the reference environment of the lab.
 *
 * @summary Re-image a lab virtual machine. The virtual machine will be deleted and recreated using the latest published snapshot of the reference environment of the lab.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/VirtualMachines/reimageVirtualMachine.json
 */

import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reimageVirtualMachine(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labName = "testlab";
  const virtualMachineName = "template";
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginReimageAndWait(
    resourceGroupName,
    labName,
    virtualMachineName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reimageVirtualMachine();
}

main().catch(console.error);
