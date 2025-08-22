// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets GitHubOAuth info used to authenticate users with the Developer Hub GitHub App.
 *
 * @summary Gets GitHubOAuth info used to authenticate users with the Developer Hub GitHub App.
 * x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GitHubOAuth.json
 */

import type { GitHubOAuthCallRequest, GitHubOAuthOptionalParams } from "@azure/arm-devhub";
import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function gitHubOAuth(): Promise<void> {
  const subscriptionId = process.env["DEVHUB_SUBSCRIPTION_ID"] || "subscriptionId1";
  const location = "eastus2euap";
  const parameters: GitHubOAuthCallRequest = {
    redirectUrl: "https://ms.portal.azure.com/aks",
  };
  const options: GitHubOAuthOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.gitHubOAuth(location, options);
  console.log(result);
}

async function main(): Promise<void> {
  await gitHubOAuth();
}

main().catch(console.error);
