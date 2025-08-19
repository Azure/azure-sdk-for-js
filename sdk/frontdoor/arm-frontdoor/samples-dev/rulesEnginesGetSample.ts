// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Rules Engine Configuration with the specified name within the specified Front Door.
 *
 * @summary Gets a Rules Engine Configuration with the specified name within the specified Front Door.
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2021-06-01/examples/FrontdoorRulesEngineGet.json
 */

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getRulesEngineConfiguration(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "rg1";
  const frontDoorName = "frontDoor1";
  const rulesEngineName = "rulesEngine1";
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.rulesEngines.get(resourceGroupName, frontDoorName, rulesEngineName);
  console.log(result);
}

async function main(): Promise<void> {
  await getRulesEngineConfiguration();
}

main().catch(console.error);
