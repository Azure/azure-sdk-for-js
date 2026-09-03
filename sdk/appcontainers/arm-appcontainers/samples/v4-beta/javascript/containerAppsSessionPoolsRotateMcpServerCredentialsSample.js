// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to rotate and fetch the rotated MCP server credentials of a session pool.
 *
 * @summary rotate and fetch the rotated MCP server credentials of a session pool.
 * x-ms-original-file: 2025-10-02-preview/SessionPools_RotateMcpServerCredentials.json
 */
async function rotateSessionPoolMCPServerCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.rotateMcpServerCredentials(
    "rg",
    "testsessionpool",
  );
  console.log(result);
}

async function main() {
  await rotateSessionPoolMCPServerCredentials();
}

main().catch(console.error);
