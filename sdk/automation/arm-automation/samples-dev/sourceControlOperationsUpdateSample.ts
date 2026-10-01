// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a source control.
 *
 * @summary update a source control.
 * x-ms-original-file: 2024-10-23/sourceControl/updateSourceControl_patch.json
 */
async function updateASourceControl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.sourceControlOperations.update(
    "rg",
    "sampleAccount9",
    "sampleSourceControl",
    {
      description: "my description",
      autoSync: true,
      branch: "master",
      folderPath: "/folderOne/folderTwo",
      publishRunbook: true,
      securityToken: { accessToken: "******", tokenType: "PersonalAccessToken" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateASourceControl();
}

main().catch(console.error);
