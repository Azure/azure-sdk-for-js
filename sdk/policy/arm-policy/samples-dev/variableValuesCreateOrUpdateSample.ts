// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation creates or updates a variable value with the given subscription and name for a given variable. Variable values are scoped to the variable for which they are created for.
 *
 * @summary this operation creates or updates a variable value with the given subscription and name for a given variable. Variable values are scoped to the variable for which they are created for.
 * x-ms-original-file: 2026-01-01-preview/createOrUpdateVariableValue.json
 */
async function createOrUpdateAVariableValue(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.variableValues.createOrUpdate("DemoTestVariable", "TestValue", {
    values: [
      { columnName: "StringColumn", columnValue: "SampleValue" },
      { columnName: "IntegerColumn", columnValue: 10 },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAVariableValue();
}

main().catch(console.error);
