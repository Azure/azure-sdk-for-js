// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates the specified Firewall Policy.
 *
 * @summary Creates or updates the specified Firewall Policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyPut.json
 */

import type { FirewallPoliciesCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createFirewallPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const options: FirewallPoliciesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        dnsSettings: {
          enableProxy: true,
          requireProxyForNetworkRules: false,
          servers: ["30.3.4.5"],
        },
        explicitProxy: {
          enableExplicitProxy: true,
          enablePacFile: true,
          httpPort: 8087,
          httpsPort: 8087,
          pacFile:
            "https://tinawstorage.file.core.windows.net/?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2021-06-04T07:01:12Z&st=2021-06-03T23:01:12Z&sip=68.65.171.11&spr=https&sig=Plsa0RRVpGbY0IETZZOT6znOHcSro71LLTTbzquYPgs%3D",
          pacFilePort: 8087,
        },
        insights: {
          isEnabled: true,
          logAnalyticsResources: {
            defaultWorkspaceId: {
              id: "/subscriptions/subid/resourcegroups/rg1/providers/microsoft.operationalinsights/workspaces/defaultWorkspace",
            },
            workspaces: [
              {
                region: "westus",
                workspaceId: {
                  id: "/subscriptions/subid/resourcegroups/rg1/providers/microsoft.operationalinsights/workspaces/workspace1",
                },
              },
              {
                region: "eastus",
                workspaceId: {
                  id: "/subscriptions/subid/resourcegroups/rg1/providers/microsoft.operationalinsights/workspaces/workspace2",
                },
              },
            ],
          },
          retentionDays: 100,
        },
        intrusionDetection: {
          configuration: {
            bypassTrafficSettings: [
              {
                name: "bypassRule1",
                description: "Rule 1",
                destinationAddresses: ["5.6.7.8"],
                destinationPorts: ["*"],
                sourceAddresses: ["1.2.3.4"],
                protocol: "TCP",
              },
            ],
            signatureOverrides: [{ id: "2525004", mode: "Deny" }],
          },
          mode: "Alert",
        },
        sku: { tier: "Premium" },
        snat: { privateRanges: ["IANAPrivateRanges"] },
        sql: { allowSqlRedirect: true },
        threatIntelMode: "Alert",
        threatIntelWhitelist: {
          fqdns: ["*.microsoft.com"],
          ipAddresses: ["20.3.4.5"],
        },
        transportSecurity: {
          certificateAuthority: {
            name: "clientcert",
            keyVaultSecretId: "https://kv/secret",
          },
        },
      },
      tags: { key1: "value1" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createFirewallPolicy().catch(console.error);
