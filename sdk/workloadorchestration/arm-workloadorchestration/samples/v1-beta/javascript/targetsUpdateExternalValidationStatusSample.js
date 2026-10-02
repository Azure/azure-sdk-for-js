// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post request to update external validation status
 *
 * @summary post request to update external validation status
 * x-ms-original-file: 2026-05-01-preview/Targets_UpdateExternalValidationStatus_MaximumSet_Gen.json
 */
async function targetsUpdateExternalValidationStatusMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.updateExternalValidationStatus(
    "rgconfigurationmanager",
    "testname",
    {
      solutionVersionId: "foxslnpcddxwvbatisyxhbsusmnqk",
      errorDetails: {},
      externalValidationId: "cds",
      validationStatus: "Valid",
    },
  );
  console.log(result);
}

async function main() {
  await targetsUpdateExternalValidationStatusMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
