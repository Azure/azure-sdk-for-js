// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @summary delete a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 * x-ms-original-file: 2024-04-01/DeleteDeployment.json
 */
async function deploymentsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  await client.deployments.delete(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProductName1",
    "DeviceGroupName1",
    "MyDeploymentName1",
  );
}

async function main(): Promise<void> {
  await deploymentsDelete();
}

main().catch(console.error);
