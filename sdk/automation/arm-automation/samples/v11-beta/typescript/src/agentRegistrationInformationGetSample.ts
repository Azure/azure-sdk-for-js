// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the automation agent registration information.
 *
 * @summary retrieve the automation agent registration information.
 * x-ms-original-file: 2024-10-23/getAgentRegistration.json
 */
async function getTheAgentRegistrationInformation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.agentRegistrationInformation.get("rg", "myAutomationAccount18");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheAgentRegistrationInformation();
}

main().catch(console.error);
