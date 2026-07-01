// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the credential identified by credential name.
 *
 * @summary retrieve the credential identified by credential name.
 * x-ms-original-file: 2024-10-23/getCredential.json
 */
async function getACredential(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.credentialOperations.get(
    "rg",
    "myAutomationAccount18",
    "myCredential",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getACredential();
}

main().catch(console.error);
