// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to callback URL to hit once authenticated with GitHub App to have the service store the OAuth token.
 *
 * @summary callback URL to hit once authenticated with GitHub App to have the service store the OAuth token.
 * x-ms-original-file: 2025-03-01-preview/GitHubOAuthCallback.json
 */
async function gitHubOAuthCallback(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.gitHubOAuthCallback(
    "eastus2euap",
    "3584d83530557fdd1f46af8289938c8ef79f9dc5",
    "12345678-3456-7890-5678-012345678901",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await gitHubOAuthCallback();
}

main().catch(console.error);
