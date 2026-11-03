// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a variable.
 *
 * @summary create a variable.
 * x-ms-original-file: 2024-10-23/createOrUpdateVariable.json
 */
async function createOrUpdateAVariable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.variableOperations.createOrUpdate(
    "rg",
    "sampleAccount9",
    "sampleVariable",
    {
      name: "sampleVariable",
      description: "my description",
      isEncrypted: false,
      value: '"ComputerName.domain.com"',
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAVariable();
}

main().catch(console.error);
