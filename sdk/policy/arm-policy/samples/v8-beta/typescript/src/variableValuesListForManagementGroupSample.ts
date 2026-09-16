// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the list of all variable values applicable the variable indicated at the management group scope.
 *
 * @summary this operation retrieves the list of all variable values applicable the variable indicated at the management group scope.
 * x-ms-original-file: 2026-01-01-preview/listVariableValuesForManagementGroup.json
 */
async function listVariableValuesAtAManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.variableValues.listForManagementGroup(
    "DevOrg",
    "DemoTestVariable",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVariableValuesAtAManagementGroupScope();
}

main().catch(console.error);
