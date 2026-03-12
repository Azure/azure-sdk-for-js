// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a monitored GitHub repository.
 *
 * @summary Returns a monitored GitHub repository.
 * x-ms-original-file: specification/securitydevops/resource-manager/Microsoft.SecurityDevOps/preview/2022-09-01-preview/examples/GitHubRepoGet.json
 */

import { MicrosoftSecurityDevOps } from "@azure/arm-securitydevops";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function gitHubRepoGet(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYDEVOPS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SECURITYDEVOPS_RESOURCE_GROUP"] || "westusrg";
  const gitHubConnectorName = "testconnector";
  const gitHubOwnerName = "Azure";
  const gitHubRepoName = "39093389";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSecurityDevOps(credential, subscriptionId);
  const result = await client.gitHubRepoOperations.get(
    resourceGroupName,
    gitHubConnectorName,
    gitHubOwnerName,
    gitHubRepoName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await gitHubRepoGet();
}

main().catch(console.error);
