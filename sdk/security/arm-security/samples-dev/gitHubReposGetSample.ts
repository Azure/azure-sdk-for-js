// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a monitored GitHub repository.
 *
 * @summary Returns a monitored GitHub repository.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-09-01-preview/examples/SecurityConnectorsDevOps/GetGitHubRepos_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getGitHubRepos(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "myRg";
  const securityConnectorName = "mySecurityConnectorName";
  const ownerName = "myGitHubOwner";
  const repoName = "myGitHubRepo";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.gitHubRepos.get(
    resourceGroupName,
    securityConnectorName,
    ownerName,
    repoName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getGitHubRepos();
}

main().catch(console.error);
