// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about the model of a security automation.
 *
 * @summary retrieves information about the model of a security automation.
 * x-ms-original-file: 2023-12-01-preview/Automations/GetAutomationResourceGroup_example.json
 */
async function retrieveASecurityAutomation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.automations.get("exampleResourceGroup", "exampleAutomation");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveASecurityAutomation();
}

main().catch(console.error);
