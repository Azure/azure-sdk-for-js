// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the specified contact profile tags.
 *
 * @summary Updates the specified contact profile tags.
 * x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-11-01/examples/ContactProfileUpdateTag.json
 */

import type { TagsObject } from "@azure/arm-orbital";
import { AzureOrbital } from "@azure/arm-orbital";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateContactProfileTags(): Promise<void> {
  const subscriptionId =
    process.env["ORBITAL_SUBSCRIPTION_ID"] || "c1be1141-a7c9-4aac-9608-3c2e2f1152c3";
  const resourceGroupName = process.env["ORBITAL_RESOURCE_GROUP"] || "contoso-Rgp";
  const contactProfileName = "CONTOSO-CP";
  const parameters: TagsObject = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new AzureOrbital(credential, subscriptionId);
  const result = await client.contactProfiles.beginUpdateTagsAndWait(
    resourceGroupName,
    contactProfileName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateContactProfileTags();
}

main().catch(console.error);
