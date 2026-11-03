// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of fields of a given type identified by module name.
 *
 * @summary retrieve a list of fields of a given type identified by module name.
 * x-ms-original-file: 2024-10-23/listFieldsByModuleAndType.json
 */
async function getAListOfFieldsOfAGivenType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fields.listByType(
    "rg",
    "MyAutomationAccount",
    "MyModule",
    "MyCustomType",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfFieldsOfAGivenType();
}

main().catch(console.error);
