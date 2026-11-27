// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks whether an AI Gateway name is valid and available in a location.
 *
 * @summary checks whether an AI Gateway name is valid and available in a location.
 * x-ms-original-file: 2026-11-01/AiGatewayCheckNameAvailability.json
 */
async function checkAnAIGatewayNameInALocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayNameAvailabilityOperations.checkNameAvailability("westus2", {
    name: "example-gateway",
    type: "Microsoft.ApiManagement/aigateways",
  });
  console.log(result);
}

async function main() {
  await checkAnAIGatewayNameInALocation();
}

main().catch(console.error);
