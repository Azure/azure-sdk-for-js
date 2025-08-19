// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a monitored GitHub repository.
 *
 * @summary Create or update a monitored GitHub repository.
 * x-ms-original-file: specification/securitydevops/resource-manager/Microsoft.SecurityDevOps/preview/2022-09-01-preview/examples/GitHubRepoCreateOrUpdate.json
 */

import type { GitHubRepo } from "@azure/arm-securitydevops";
import { MicrosoftSecurityDevOps } from "@azure/arm-securitydevops";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function gitHubRepoCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYDEVOPS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SECURITYDEVOPS_RESOURCE_GROUP"] || "westusrg";
  const gitHubConnectorName = "testconnector";
  const gitHubOwnerName = "Azure";
  const gitHubRepoName = "azure-rest-api-specs";
  const gitHubRepo: GitHubRepo = {};
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSecurityDevOps(credential, subscriptionId);
  const result = await client.gitHubRepoOperations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    gitHubConnectorName,
    gitHubOwnerName,
    gitHubRepoName,
    gitHubRepo,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await gitHubRepoCreateOrUpdate();
}

main().catch(console.error);
