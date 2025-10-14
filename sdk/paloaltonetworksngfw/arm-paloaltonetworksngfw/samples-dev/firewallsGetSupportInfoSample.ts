// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FirewallsGetSupportInfoOptionalParams,
  PaloAltoNetworksCloudngfw,
} from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to support info for firewall.
 *
 * @summary support info for firewall.
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/Firewalls_getSupportInfo_MaximumSet_Gen.json
 */
async function firewallsGetSupportInfoMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] ||
    "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName =
    process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "firewall1";
  const email = "user1@domain.com";
  const options: FirewallsGetSupportInfoOptionalParams = { email };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.getSupportInfo(
    resourceGroupName,
    firewallName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to support info for firewall.
 *
 * @summary support info for firewall.
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/Firewalls_getSupportInfo_MinimumSet_Gen.json
 */
async function firewallsGetSupportInfoMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] ||
    "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const resourceGroupName =
    process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "firewall1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.getSupportInfo(
    resourceGroupName,
    firewallName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await firewallsGetSupportInfoMaximumSetGen();
  await firewallsGetSupportInfoMinimumSetGen();
}

main().catch(console.error);
