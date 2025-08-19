// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CheckNameAvailabilityInput } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint.
 *
 * @summary Check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/CheckNameAvailability.json
 */
async function checkNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["CDN_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const checkNameAvailabilityInput: CheckNameAvailabilityInput = {
    name: "sampleName",
    type: "Microsoft.Cdn/Profiles/Endpoints",
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.checkNameAvailability(checkNameAvailabilityInput);
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
