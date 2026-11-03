// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the source control identified by source control name.
 *
 * @summary retrieve the source control identified by source control name.
 * x-ms-original-file: 2024-10-23/sourceControl/getSourceControl.json
 */
async function getASourceControl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.sourceControlOperations.get(
    "rg",
    "sampleAccount9",
    "sampleSourceControl",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASourceControl();
}

main().catch(console.error);
