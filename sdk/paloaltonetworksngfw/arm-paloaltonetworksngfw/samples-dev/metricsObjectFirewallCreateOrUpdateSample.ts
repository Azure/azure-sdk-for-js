// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MetricsObjectFirewallResource,
  PaloAltoNetworksCloudngfw,
} from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a MetricsObjectFirewallResource
 *
 * @summary Create a MetricsObjectFirewallResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_CreateOrUpdate_MaximumSet_Gen.json
 */
async function metricsObjectFirewallCreateOrUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName =
    process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const resource: MetricsObjectFirewallResource = {
    applicationInsightsConnectionString: "aaa",
    applicationInsightsResourceId: "aaaaaaaaaaaaaaa",
    panEtag: "aaaaaaaaaa",
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.beginCreateOrUpdateAndWait(
    resourceGroupName,
    firewallName,
    resource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a MetricsObjectFirewallResource
 *
 * @summary Create a MetricsObjectFirewallResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_CreateOrUpdate_MinimumSet_Gen.json
 */
async function metricsObjectFirewallCreateOrUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName =
    process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const resource: MetricsObjectFirewallResource = {
    applicationInsightsConnectionString: "aaa",
    applicationInsightsResourceId: "aaaaaaaaaaaaaaa",
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.beginCreateOrUpdateAndWait(
    resourceGroupName,
    firewallName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await metricsObjectFirewallCreateOrUpdateMaximumSetGen();
  await metricsObjectFirewallCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
