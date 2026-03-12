// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post request to update external validation status
 *
 * @summary post request to update external validation status
 * x-ms-original-file: 2025-06-01/Targets_UpdateExternalValidationStatus_MaximumSet_Gen.json
 */
async function targetsUpdateExternalValidationStatusMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.updateExternalValidationStatus(
    "rgconfigurationmanager",
    "testname",
    {
      solutionVersionId: "shntcsuwlmpehmuqkrbf",
      errorDetails: {},
      externalValidationId: "ivsjzwy",
      validationStatus: "Valid",
    },
  );
  console.log(result);
}

async function main() {
  await targetsUpdateExternalValidationStatusMaximumSet();
}

main().catch(console.error);
