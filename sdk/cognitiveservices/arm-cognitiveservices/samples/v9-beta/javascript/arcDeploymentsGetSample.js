// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Arc deployment associated with the Cognitive Services account.
 *
 * @summary gets the specified Arc deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-07-15-preview/GetArcDeployment.json
 */
async function getArcDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.arcDeployments.get(
    "resourceGroupName",
    "accountName",
    "qwen-template-arc",
  );
  console.log(result);
}

async function main() {
  await getArcDeployment();
}

main().catch(console.error);
