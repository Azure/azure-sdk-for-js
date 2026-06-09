// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates configuration of worker nodes in a cluster
 *
 * @summary updates configuration of worker nodes in a cluster
 * x-ms-original-file: 2023-03-02-preview/ConfigurationUpdateNode.json
 */
async function updateSingleConfigurationOfNodes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.configurations.updateOnNode(
    "TestResourceGroup",
    "testcluster",
    "array_nulls",
    { value: "off" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateSingleConfigurationOfNodes();
}

main().catch(console.error);
