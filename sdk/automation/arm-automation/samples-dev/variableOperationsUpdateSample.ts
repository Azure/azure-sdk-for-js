// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a variable.
 *
 * @summary update a variable.
 * x-ms-original-file: 2024-10-23/updateVariable_patch.json
 */
async function updateAVariable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.variableOperations.update("rg", "sampleAccount9", "sampleVariable", {
    name: "sampleVariable",
    value: '"ComputerName3.domain.com"',
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAVariable();
}

main().catch(console.error);
