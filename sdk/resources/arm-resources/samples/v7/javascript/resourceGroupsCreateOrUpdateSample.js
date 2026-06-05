// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a resource group.
 *
 * @summary Creates or updates a resource group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/CreateResourceGroup.json
 */

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function createOrUpdateAResourceGroup() {
  const subscriptionId =
    process.env["RESOURCES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["RESOURCES_RESOURCE_GROUP"] || "my-resource-group";
  const parameters = { location: "eastus" };
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.resourceGroups.createOrUpdate(resourceGroupName, parameters);
  console.log(result);
}

async function main() {
  await createOrUpdateAResourceGroup();
}

main().catch(console.error);
