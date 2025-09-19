// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Check available SKUs.
 *
 * @summary Check available SKUs.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/CheckSkuAvailability.json
 */
async function checkSkuAvailability() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const location = "westus";
  const skus = ["S0"];
  const kind = "Face";
  const typeParam = "Microsoft.CognitiveServices/accounts";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.checkSkuAvailability(location, skus, kind, typeParam);
  console.log(result);
}

async function main() {
  await checkSkuAvailability();
}

main().catch(console.error);
