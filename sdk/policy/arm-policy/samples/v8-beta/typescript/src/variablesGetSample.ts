// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a single variable, given its name and the subscription it was created at.
 *
 * @summary this operation retrieves a single variable, given its name and the subscription it was created at.
 * x-ms-original-file: 2026-01-01-preview/getVariable.json
 */
async function retrieveAVariable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.variables.get("DemoTestVariable");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAVariable();
}

main().catch(console.error);
