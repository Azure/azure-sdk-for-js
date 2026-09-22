// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel a pipeline run by its run ID.
 *
 * @summary cancel a pipeline run by its run ID.
 * x-ms-original-file: 2018-06-01/PipelineRuns_Cancel.json
 */
async function pipelineRunsCancel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.pipelineRuns.cancel(
    "exampleResourceGroup",
    "exampleFactoryName",
    "16ac5348-ff82-4f95-a80d-638c1d47b721",
  );
}

async function main() {
  await pipelineRunsCancel();
}

main().catch(console.error);
