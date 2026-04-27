// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to callback URL to hit once authenticated with GitHub App to have the service store the OAuth token.
 *
 * @summary callback URL to hit once authenticated with GitHub App to have the service store the OAuth token.
 * x-ms-original-file: 2025-03-01-preview/GitHubOAuth_List.json
 */
async function listGitHubOAuth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.listGitHubOAuth("eastus2euap")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGitHubOAuth();
}

main().catch(console.error);
