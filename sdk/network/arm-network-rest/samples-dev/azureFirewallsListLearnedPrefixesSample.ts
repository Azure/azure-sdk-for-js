// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { AzureFirewallsListLearnedPrefixesParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT.
 *
 * @summary Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallListLearnedIPPrefixes.json
 */
async function azureFirewallListLearnedPrefixes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azureFirewall1";
  const options: AzureFirewallsListLearnedPrefixesParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}/learnedIPPrefixes",
      subscriptionId,
      resourceGroupName,
      azureFirewallName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

azureFirewallListLearnedPrefixes().catch(console.error);
