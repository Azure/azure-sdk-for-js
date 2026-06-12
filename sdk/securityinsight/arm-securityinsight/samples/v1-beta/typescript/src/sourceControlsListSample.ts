// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all source controls, without source control items.
 *
 * @summary gets all source controls, without source control items.
 * x-ms-original-file: 2025-07-01-preview/sourcecontrols/GetSourceControls.json
 */
async function getAllSourceControls(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b28fbe4a-0bb1-4593-960b-061c8655a550";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sourceControls.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllSourceControls();
}

main().catch(console.error);
