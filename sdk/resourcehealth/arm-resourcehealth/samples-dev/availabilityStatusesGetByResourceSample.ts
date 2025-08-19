// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets current availability status for a single resource
 *
 * @summary Gets current availability status for a single resource
 * x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/AvailabilityStatus_GetByResource.json
 */

import type { AvailabilityStatusesGetByResourceOptionalParams } from "@azure/arm-resourcehealth";
import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCurrentHealthByResource(): Promise<void> {
  const resourceUri = "resourceUri";
  const expand = "recommendedactions";
  const options: AvailabilityStatusesGetByResourceOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.availabilityStatuses.getByResource(resourceUri, options);
  console.log(result);
}

async function main(): Promise<void> {
  await getCurrentHealthByResource();
}

main().catch(console.error);
