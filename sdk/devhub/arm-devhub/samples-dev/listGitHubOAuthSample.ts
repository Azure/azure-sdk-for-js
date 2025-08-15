// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token.
 *
 * @summary Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token.
 * x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/GitHubOAuth_List.json
 */
async function listGitHubOAuth(): Promise<void> {
  const subscriptionId = process.env["DEVHUB_SUBSCRIPTION_ID"] || "subscriptionId1";
  const location = "eastus2euap";
  const credential = new DefaultAzureCredential();
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.listGitHubOAuth(location);
  console.log(result);
}

async function main(): Promise<void> {
  await listGitHubOAuth();
}

main().catch(console.error);
