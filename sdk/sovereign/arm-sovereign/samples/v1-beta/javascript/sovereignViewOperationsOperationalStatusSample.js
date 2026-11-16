// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SovereignClient } = require("@azure/arm-sovereign");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the operational status for the Sovereign View resource.
 *
 * @summary gets the operational status for the Sovereign View resource.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_OperationalStatus.json
 */
async function sovereignViewOperationsOperationalStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.sovereignViewOperations.operationalStatus(
    "ExampleResourceGroup",
    "ExampleSV",
    {
      mode: "Detailed",
      evaluationParameters: ["PermissionsEvaluation", "PolicyAssignmentEvaluation"],
    },
  );
  console.log(result);
}

async function main() {
  await sovereignViewOperationsOperationalStatus();
}

main().catch(console.error);
