// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates an image resource.
 *
 * @summary Updates an image resource.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/Images/patchImage.json
 */

import type { ImageUpdate } from "@azure/arm-labservices";
import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchImage(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labPlanName = "testlabplan";
  const imageName = "image1";
  const body: ImageUpdate = { enabledState: "Enabled" };
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.images.update(resourceGroupName, labPlanName, imageName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await patchImage();
}

main().catch(console.error);
