// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation creates or updates a variable with the given  management group and name. Policy variables can only be used by a policy definition at the scope they are created or below.
 *
 * @summary this operation creates or updates a variable with the given  management group and name. Policy variables can only be used by a policy definition at the scope they are created or below.
 * x-ms-original-file: 2026-01-01-preview/createOrUpdateVariableAtManagementGroup.json
 */
async function createOrUpdateAVariableAtManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.variables.createOrUpdateAtManagementGroup(
    "DevOrg",
    "DemoTestVariable",
    { columns: [{ columnName: "TestColumn" }] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAVariableAtManagementGroup();
}

main().catch(console.error);
