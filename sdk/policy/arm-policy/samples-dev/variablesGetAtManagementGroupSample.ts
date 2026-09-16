// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a single variable, given its name and the  management group it was created at.
 *
 * @summary this operation retrieves a single variable, given its name and the  management group it was created at.
 * x-ms-original-file: 2026-01-01-preview/getVariableAtManagementGroup.json
 */
async function retrieveAVariableAtManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.variables.getAtManagementGroup("DevOrg", "DemoTestVariable");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAVariableAtManagementGroup();
}

main().catch(console.error);
