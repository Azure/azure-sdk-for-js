// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Rules Engine Configuration with the specified parameters.
 *
 * @summary deletes an existing Rules Engine Configuration with the specified parameters.
 * x-ms-original-file: 2025-10-01/FrontdoorRulesEngineDelete.json
 */
async function deleteRulesEngineConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.rulesEngines.delete("rg1", "frontDoor1", "rulesEngine1");
}

async function main(): Promise<void> {
  await deleteRulesEngineConfiguration();
}

main().catch(console.error);
