// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AiGatewayAliasResource resources by AiGatewayWorkspaceResource
 *
 * @summary list AiGatewayAliasResource resources by AiGatewayWorkspaceResource
 * x-ms-original-file: 2026-11-01/AiGatewayAliasList.json
 */
async function listAliasesInTheDefaultWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiGatewayAliasResources.listByWorkspace(
    "example-rg",
    "example-gateway",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAliasesInTheDefaultWorkspace();
}

main().catch(console.error);
