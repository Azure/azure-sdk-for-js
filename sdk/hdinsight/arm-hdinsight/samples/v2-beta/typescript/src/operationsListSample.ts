// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available HDInsight REST API operations.
 *
 * @summary lists all of the available HDInsight REST API operations.
 * x-ms-original-file: 2025-01-15-preview/ListHDInsightOperations.json
 */
async function listsAllOfTheAvailableOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailableOperations();
}

main().catch(console.error);
