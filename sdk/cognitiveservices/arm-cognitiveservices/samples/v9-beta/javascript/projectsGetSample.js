// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a Cognitive Services project specified by the parameters.
 *
 * @summary returns a Cognitive Services project specified by the parameters.
 * x-ms-original-file: 2026-01-15-preview/GetProject.json
 */
async function getProject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projects.get("myResourceGroup", "myAccount", "myProject");
  console.log(result);
}

async function main() {
  await getProject();
}

main().catch(console.error);
