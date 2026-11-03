// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a list of GitLab groups onboarded to the connector.
 *
 * @summary returns a list of GitLab groups onboarded to the connector.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/ListGitLabGroups_example.json
 */
async function listGitLabGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.gitLabGroups.list("myRg", "mySecurityConnectorName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGitLabGroups();
}

main().catch(console.error);
