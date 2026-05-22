// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to backfill.
 *
 * @summary backfill.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturesetVersion/backfill.json
 */
async function backfillWorkspaceFeaturesetVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.featuresetVersions.backfill(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      description: "string",
      dataAvailabilityStatus: ["None"],
      displayName: "string",
      featureWindow: {
        featureWindowEnd: new Date("2020-01-01T12:34:56.999+00:51"),
        featureWindowStart: new Date("2020-01-01T12:34:56.999+00:51"),
      },
      jobId: "string",
      resource: { instanceType: "string" },
      sparkConfiguration: { string: "string" },
      tags: { string: "string" },
    },
  );
  console.log(result);
}

async function main() {
  await backfillWorkspaceFeaturesetVersion();
}

main().catch(console.error);
