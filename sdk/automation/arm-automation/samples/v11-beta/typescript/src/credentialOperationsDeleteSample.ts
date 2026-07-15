// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the credential.
 *
 * @summary delete the credential.
 * x-ms-original-file: 2024-10-23/deleteCredentialExisting.json
 */
async function deleteACredential(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.credentialOperations.delete("rg", "myAutomationAccount20", "myCredential");
}

async function main(): Promise<void> {
  await deleteACredential();
}

main().catch(console.error);
