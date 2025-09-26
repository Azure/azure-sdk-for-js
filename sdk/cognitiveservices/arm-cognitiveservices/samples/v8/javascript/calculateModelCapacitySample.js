// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Model capacity calculator.
 *
 * @summary Model capacity calculator.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/CalculateModelCapacity.json
 */
async function calculateModelCapacity() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const model = { name: "gpt-4", format: "OpenAI", version: "0613" };
  const skuName = "ProvisionedManaged";
  const workloads = [
    {
      requestParameters: { avgGeneratedTokens: 50, avgPromptTokens: 30 },
      requestPerMinute: 10,
    },
    {
      requestParameters: { avgGeneratedTokens: 20, avgPromptTokens: 60 },
      requestPerMinute: 20,
    },
  ];
  const options = {
    model,
    skuName,
    workloads,
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.calculateModelCapacity(options);
  console.log(result);
}

async function main() {
  await calculateModelCapacity();
}

main().catch(console.error);
