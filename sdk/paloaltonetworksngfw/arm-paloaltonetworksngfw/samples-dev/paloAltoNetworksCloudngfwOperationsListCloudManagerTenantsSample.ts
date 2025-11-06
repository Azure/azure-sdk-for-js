// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PaloAltoNetworksCloudngfwOperations_listCloudManagerTenants_MaximumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListCloudManagerTenantsMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] ||
    "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result =
    await client.paloAltoNetworksCloudngfwOperations.listCloudManagerTenants();
  console.log(result);
}

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PaloAltoNetworksCloudngfwOperations_listCloudManagerTenants_MinimumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListCloudManagerTenantsMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] ||
    "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result =
    await client.paloAltoNetworksCloudngfwOperations.listCloudManagerTenants();
  console.log(result);
}

async function main(): Promise<void> {
  await paloAltoNetworksCloudngfwOperationsListCloudManagerTenantsMaximumSetGen();
  await paloAltoNetworksCloudngfwOperationsListCloudManagerTenantsMinimumSetGen();
}

main().catch(console.error);
