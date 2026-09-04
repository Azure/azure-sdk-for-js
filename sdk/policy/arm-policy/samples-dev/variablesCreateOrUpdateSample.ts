// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation creates or updates a variable with the given subscription and name. Policy variables can only be used by a policy definition at the scope they are created or below.
 *
 * @summary this operation creates or updates a variable with the given subscription and name. Policy variables can only be used by a policy definition at the scope they are created or below.
 * x-ms-original-file: 2026-01-01-preview/createOrUpdateVariable.json
 */
async function createOrUpdateAVariable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.variables.createOrUpdate("DemoTestVariable", {
    columns: [{ columnName: "TestColumn" }],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAVariable();
}

main().catch(console.error);
