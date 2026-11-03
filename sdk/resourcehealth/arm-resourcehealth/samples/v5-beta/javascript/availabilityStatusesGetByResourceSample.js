// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets current availability status for a single resource
 *
 * @summary gets current availability status for a single resource
 * x-ms-original-file: 2025-05-01/AvailabilityStatus_GetByResource.json
 */
async function getCurrentHealthByResource() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.availabilityStatuses.getByResource("resourceUri", {
    expand: "recommendedactions",
  });
  console.log(result);
}

async function main() {
  await getCurrentHealthByResource();
}

main().catch(console.error);
