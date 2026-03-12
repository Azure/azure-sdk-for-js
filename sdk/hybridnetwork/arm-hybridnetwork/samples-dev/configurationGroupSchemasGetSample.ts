// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about the specified configuration group schema.
 *
 * @summary Gets information about the specified configuration group schema.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ConfigurationGroupSchemaGet.json
 */

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getANetworkFunctionDefinitionGroupResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg1";
  const publisherName = "testPublisher";
  const configurationGroupSchemaName = "testConfigurationGroupSchema";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.configurationGroupSchemas.get(
    resourceGroupName,
    publisherName,
    configurationGroupSchemaName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getANetworkFunctionDefinitionGroupResource();
}

main().catch(console.error);
