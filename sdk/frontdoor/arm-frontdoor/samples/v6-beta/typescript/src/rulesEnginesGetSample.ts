// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Rules Engine Configuration with the specified name within the specified Front Door.
 *
 * @summary gets a Rules Engine Configuration with the specified name within the specified Front Door.
 * x-ms-original-file: 2025-11-01/FrontdoorRulesEngineGet.json
 */
async function getRulesEngineConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.rulesEngines.get("rg1", "frontDoor1", "rulesEngine1");
  console.log(result);
}

async function main(): Promise<void> {
  await getRulesEngineConfiguration();
}

main().catch(console.error);
