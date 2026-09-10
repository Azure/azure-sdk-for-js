// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation creates or updates a variable value with the given management group and name for a given variable. Variable values are scoped to the variable for which they are created for.
 *
 * @summary this operation creates or updates a variable value with the given management group and name for a given variable. Variable values are scoped to the variable for which they are created for.
 * x-ms-original-file: 2026-01-01-preview/createOrUpdateVariableValueAtManagementGroup.json
 */
async function createOrUpdateAVariableValueAtManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.variableValues.createOrUpdateAtManagementGroup(
    "DevOrg",
    "DemoTestVariable",
    "TestValue",
    {
      values: [
        { columnName: "StringColumn", columnValue: "SampleValue" },
        { columnName: "IntegerColumn", columnValue: 10 },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAVariableValueAtManagementGroup();
}

main().catch(console.error);
