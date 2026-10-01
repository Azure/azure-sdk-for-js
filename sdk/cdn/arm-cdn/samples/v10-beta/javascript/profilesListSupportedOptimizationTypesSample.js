// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the supported optimization types for the current profile. A user can create an endpoint with an optimization type from the listed values.
 *
 * @summary gets the supported optimization types for the current profile. A user can create an endpoint with an optimization type from the listed values.
 * x-ms-original-file: 2025-12-01/Profiles_ListSupportedOptimizationTypes.json
 */
async function profilesListSupportedOptimizationTypes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.listSupportedOptimizationTypes("RG", "profile1");
  console.log(result);
}

async function main() {
  await profilesListSupportedOptimizationTypes();
}

main().catch(console.error);
