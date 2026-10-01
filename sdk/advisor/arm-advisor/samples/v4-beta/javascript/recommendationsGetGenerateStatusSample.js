// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header.
 *
 * @summary retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header.
 * x-ms-original-file: 2026-02-01-preview/EmptyResponse.json
 */
async function getGenerateStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  await client.recommendations.getGenerateStatus("123e4567-e89b-12d3-a456-426614174000");
}

async function main() {
  await getGenerateStatus();
}

main().catch(console.error);
