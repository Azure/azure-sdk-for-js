// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a monitored GitLab Group resource for a given fully-qualified name.
 *
 * @summary returns a monitored GitLab Group resource for a given fully-qualified name.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/GetGitLabGroups_example.json
 */
async function getGitLabGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.gitLabGroups.get(
    "myRg",
    "mySecurityConnectorName",
    "myGitLabGroup$mySubGroup",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getGitLabGroups();
}

main().catch(console.error);
