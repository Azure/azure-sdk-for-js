// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operation to update a Lab Plan resource.
 *
 * @summary Operation to update a Lab Plan resource.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/LabPlans/patchLabPlan.json
 */

import type { LabPlanUpdate } from "@azure/arm-labservices";
import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchLabPlan(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labPlanName = "testlabplan";
  const body: LabPlanUpdate = {
    defaultConnectionProfile: {
      clientRdpAccess: "Public",
      clientSshAccess: "Public",
      webRdpAccess: "None",
      webSshAccess: "None",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.labPlans.beginUpdateAndWait(resourceGroupName, labPlanName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await patchLabPlan();
}

main().catch(console.error);
