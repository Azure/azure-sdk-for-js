// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of fields of a given type across all accessible modules.
 *
 * @summary retrieve a list of fields of a given type across all accessible modules.
 * x-ms-original-file: 2024-10-23/listFieldsByType.json
 */
async function getAListOfFieldsOfAGivenTypeAcrossAllAccessibleModules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.objectDataTypes.listFieldsByType(
    "rg",
    "MyAutomationAccount",
    "MyCustomType",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfFieldsOfAGivenTypeAcrossAllAccessibleModules();
}

main().catch(console.error);
