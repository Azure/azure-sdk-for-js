// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint.
 *
 * @summary check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint.
 * x-ms-original-file: 2025-12-01/CheckNameAvailabilityWithSubscription.json
 */
async function checkNameAvailabilityWithSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.checkNameAvailabilityWithSubscription({
    name: "sampleName",
    type: "Microsoft.Cdn/Profiles/Endpoints",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailabilityWithSubscription();
}

main().catch(console.error);
