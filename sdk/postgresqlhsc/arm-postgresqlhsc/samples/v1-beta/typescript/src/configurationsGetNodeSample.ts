// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information of a configuration for worker nodes.
 *
 * @summary gets information of a configuration for worker nodes.
 * x-ms-original-file: 2023-03-02-preview/ConfigurationGetNode.json
 */
async function getConfigurationDetailsForNode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.configurations.getNode(
    "TestResourceGroup",
    "testcluster",
    "array_nulls",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getConfigurationDetailsForNode();
}

main().catch(console.error);
