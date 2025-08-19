// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an Appliance with the specified Resource Name, Resource Group, and Subscription Id.
 *
 * @summary Deletes an Appliance with the specified Resource Name, Resource Group, and Subscription Id.
 * x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesDelete.json
 */

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAppliance(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCECONNECTOR_SUBSCRIPTION_ID"] || "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = process.env["RESOURCECONNECTOR_RESOURCE_GROUP"] || "testresourcegroup";
  const resourceName = "appliance01";
  const credential = new DefaultAzureCredential();
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.beginDeleteAndWait(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAppliance();
}

main().catch(console.error);
