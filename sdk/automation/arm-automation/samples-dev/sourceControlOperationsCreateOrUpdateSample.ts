// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a source control.
 *
 * @summary create a source control.
 * x-ms-original-file: 2024-10-23/sourceControl/createOrUpdateSourceControl.json
 */
async function createOrUpdateASourceControl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.sourceControlOperations.createOrUpdate(
    "rg",
    "sampleAccount9",
    "sampleSourceControl",
    {
      description: "my description",
      autoSync: true,
      branch: "master",
      folderPath: "/folderOne/folderTwo",
      publishRunbook: true,
      repoUrl: "https://sampleUser.visualstudio.com/myProject/_git/myRepository",
      securityToken: { accessToken: "******", tokenType: "PersonalAccessToken" },
      sourceType: "VsoGit",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASourceControl();
}

main().catch(console.error);
