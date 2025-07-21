// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the operation result for a long running operation.
 *
 * @summary get the operation result for a long running operation.
 * x-ms-original-file: 2023-09-15-preview/OperationResultsGet.json
 */
async function getOperationResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.operationResults.get("exampleid");
  console.log(result);
}

async function main() {
  await getOperationResult();
}

main().catch(console.error);
