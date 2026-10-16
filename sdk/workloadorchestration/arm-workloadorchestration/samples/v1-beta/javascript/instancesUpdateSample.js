// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an Instance Resource
 *
 * @summary update an Instance Resource
 * x-ms-original-file: 2026-05-01-preview/Instances_Update_MaximumSet_Gen.json
 */
async function instancesUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.instances.update(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
    {
      properties: {
        solutionVersionId: "ttjgk",
        targetId: "bebahvhrwsnxkxlignvhxivicdyzvc",
        activeState: "active",
        reconciliationPolicy: { state: "inactive", interval: "otpsmjex" },
        solutionScope: "testname",
      },
    },
  );
  console.log(result);
}

async function main() {
  await instancesUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
