// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a credential.
 *
 * @summary create a credential.
 * x-ms-original-file: 2024-10-23/createOrUpdateCredential.json
 */
async function createACredential(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.credentialOperations.createOrUpdate(
    "rg",
    "myAutomationAccount18",
    "myCredential",
    {
      name: "myCredential",
      description: "my description goes here",
      password: "<password>",
      userName: "mylingaiah",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createACredential();
}

main().catch(console.error);
