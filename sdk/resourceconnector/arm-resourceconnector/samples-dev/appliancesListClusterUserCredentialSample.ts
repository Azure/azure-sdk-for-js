// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the cluster user credentials for the dedicated appliance.
 *
 * @summary Returns the cluster user credentials for the dedicated appliance.
 * x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListClusterUserCredential.json
 */

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listClusterUserCredentialAppliance(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCECONNECTOR_SUBSCRIPTION_ID"] || "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = process.env["RESOURCECONNECTOR_RESOURCE_GROUP"] || "testresourcegroup";
  const resourceName = "appliance01";
  const credential = new DefaultAzureCredential();
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.listClusterUserCredential(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await listClusterUserCredentialAppliance();
}

main().catch(console.error);
