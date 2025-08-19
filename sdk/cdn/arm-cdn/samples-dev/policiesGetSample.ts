// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve protection policy with specified name within a resource group.
 *
 * @summary Retrieve protection policy with specified name within a resource group.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/WafPolicyGet.json
 */
async function getPolicy(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "rg1";
  const policyName = "MicrosoftCdnWafPolicy";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.policies.get(resourceGroupName, policyName);
  console.log(result);
}

async function main(): Promise<void> {
  await getPolicy();
}

main().catch(console.error);
