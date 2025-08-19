// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SaveImageBody } from "@azure/arm-labservices";
import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Saves an image from a lab VM to the attached shared image gallery.
 *
 * @summary Saves an image from a lab VM to the attached shared image gallery.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/LabPlans/saveImageVirtualMachine.json
 */
async function saveImageVirtualMachine(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labPlanName = "testlabplan";
  const body: SaveImageBody = {
    name: "Test Image",
    labVirtualMachineId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.LabServices/labs/testlab/virtualMachines/template",
  };
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.labPlans.beginSaveImageAndWait(resourceGroupName, labPlanName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await saveImageVirtualMachine();
}

main().catch(console.error);
