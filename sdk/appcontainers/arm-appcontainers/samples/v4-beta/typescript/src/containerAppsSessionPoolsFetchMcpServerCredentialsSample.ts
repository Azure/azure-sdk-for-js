// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetch the MCP server credentials of a session pool.
 *
 * @summary fetch the MCP server credentials of a session pool.
 * x-ms-original-file: 2025-10-02-preview/SessionPools_FetchMcpServerCredentials.json
 */
async function fetchSessionPoolMCPServerCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.fetchMcpServerCredentials(
    "rg",
    "testsessionpool",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await fetchSessionPoolMCPServerCredentials();
}

main().catch(console.error);
