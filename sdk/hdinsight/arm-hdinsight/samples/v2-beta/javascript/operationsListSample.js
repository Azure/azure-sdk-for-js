// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available HDInsight REST API operations.
 *
 * @summary lists all of the available HDInsight REST API operations.
 * x-ms-original-file: 2025-01-15-preview/ListHDInsightOperations.json
 */
async function listsAllOfTheAvailableOperations() {
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllOfTheAvailableOperations();
}

main().catch(console.error);
