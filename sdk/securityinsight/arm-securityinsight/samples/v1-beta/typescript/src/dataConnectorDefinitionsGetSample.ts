// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a data connector definition.
 *
 * @summary gets a data connector definition.
 * x-ms-original-file: 2025-07-01-preview/dataConnectorDefinitions/GetCustomizableDataConnectorDefinitionById.json
 */
async function getCustomizeDataConnectorDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorDefinitions.get(
    "myRg",
    "myWorkspace",
    "763f9fa1-c2d3-4fa2-93e9-bccd4899aa12",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCustomizeDataConnectorDefinition();
}

main().catch(console.error);
