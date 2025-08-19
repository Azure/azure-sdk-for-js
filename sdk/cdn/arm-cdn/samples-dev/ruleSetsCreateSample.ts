// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new rule set within the specified profile.
 *
 * @summary Creates a new rule set within the specified profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/RuleSets_Create.json
 */
async function ruleSetsCreate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const ruleSetName = "ruleSet1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.ruleSets.create(resourceGroupName, profileName, ruleSetName);
  console.log(result);
}

async function main(): Promise<void> {
  await ruleSetsCreate();
}

main().catch(console.error);
