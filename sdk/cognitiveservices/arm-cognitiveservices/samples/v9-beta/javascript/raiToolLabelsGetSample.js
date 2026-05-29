// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified RAI Tool Label associated with the Azure OpenAI account.
 *
 * @summary gets the specified RAI Tool Label associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/GetRaiToolLabel.json
 */
async function getRaiToolLabel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiToolLabels.get(
    "resourceGroupName",
    "accountName",
    "ToolLabelName",
  );
  console.log(result);
}

async function main() {
  await getRaiToolLabel();
}

main().catch(console.error);
