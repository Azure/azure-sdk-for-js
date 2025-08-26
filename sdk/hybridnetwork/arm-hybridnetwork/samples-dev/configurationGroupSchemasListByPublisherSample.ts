// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information of the configuration group schemas under a publisher.
 *
 * @summary Gets information of the configuration group schemas under a publisher.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ConfigurationGroupSchemaListByPublisherName.json
 */

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getNetworkFunctionDefinitionGroupsUnderPublisherResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg1";
  const publisherName = "testPublisher";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationGroupSchemas.listByPublisher(
    resourceGroupName,
    publisherName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getNetworkFunctionDefinitionGroupsUnderPublisherResource();
}

main().catch(console.error);
