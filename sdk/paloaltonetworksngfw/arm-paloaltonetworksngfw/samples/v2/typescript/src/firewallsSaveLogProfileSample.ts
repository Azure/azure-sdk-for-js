// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to log Profile for Firewall
 *
 * @summary log Profile for Firewall
 * x-ms-original-file: 2025-10-08/Firewalls_saveLogProfile_MaximumSet_Gen.json
 */
async function firewallsSaveLogProfileMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.firewalls.saveLogProfile("firewall-rg", "firewall1", {
    logSettings: {
      applicationInsights: { id: "aaaaaaaaaaaaaaaa", key: "aaaaaaaaaaaaa" },
      commonDestination: {
        eventHubConfigurations: {
          name: "aaaaaaaa",
          id: "aaaaaaaaaa",
          nameSpace: "aaaaaaaaaaaaaaaaaaaaa",
          policyName: "aaaaaaaaaaaa",
          subscriptionId: "aaaaaaaaaa",
        },
        monitorConfigurations: {
          id: "aaaaaaaaaaaaaaaaaaa",
          primaryKey: "aaaaaaaaaaaaa",
          secondaryKey: "a",
          subscriptionId: "aaaaaaaaaaaaa",
          workspace: "aaaaaaaaaaa",
        },
        storageConfigurations: {
          accountName: "aaaaaaaaaaaaaaaaaaaaaaa",
          id: "aaaaaaaaaaaaaaa",
          subscriptionId: "aaaaaaaaa",
        },
      },
      decryptLogDestination: {
        eventHubConfigurations: {
          name: "aaaaaaaa",
          id: "aaaaaaaaaa",
          nameSpace: "aaaaaaaaaaaaaaaaaaaaa",
          policyName: "aaaaaaaaaaaa",
          subscriptionId: "aaaaaaaaaa",
        },
        monitorConfigurations: {
          id: "aaaaaaaaaaaaaaaaaaa",
          primaryKey: "aaaaaaaaaaaaa",
          secondaryKey: "a",
          subscriptionId: "aaaaaaaaaaaaa",
          workspace: "aaaaaaaaaaa",
        },
        storageConfigurations: {
          accountName: "aaaaaaaaaaaaaaaaaaaaaaa",
          id: "aaaaaaaaaaaaaaa",
          subscriptionId: "aaaaaaaaa",
        },
      },
      logOption: "SAME_DESTINATION",
      logType: "TRAFFIC",
      threatLogDestination: {
        eventHubConfigurations: {
          name: "aaaaaaaa",
          id: "aaaaaaaaaa",
          nameSpace: "aaaaaaaaaaaaaaaaaaaaa",
          policyName: "aaaaaaaaaaaa",
          subscriptionId: "aaaaaaaaaa",
        },
        monitorConfigurations: {
          id: "aaaaaaaaaaaaaaaaaaa",
          primaryKey: "aaaaaaaaaaaaa",
          secondaryKey: "a",
          subscriptionId: "aaaaaaaaaaaaa",
          workspace: "aaaaaaaaaaa",
        },
        storageConfigurations: {
          accountName: "aaaaaaaaaaaaaaaaaaaaaaa",
          id: "aaaaaaaaaaaaaaa",
          subscriptionId: "aaaaaaaaa",
        },
      },
      trafficLogDestination: {
        eventHubConfigurations: {
          name: "aaaaaaaa",
          id: "aaaaaaaaaa",
          nameSpace: "aaaaaaaaaaaaaaaaaaaaa",
          policyName: "aaaaaaaaaaaa",
          subscriptionId: "aaaaaaaaaa",
        },
        monitorConfigurations: {
          id: "aaaaaaaaaaaaaaaaaaa",
          primaryKey: "aaaaaaaaaaaaa",
          secondaryKey: "a",
          subscriptionId: "aaaaaaaaaaaaa",
          workspace: "aaaaaaaaaaa",
        },
        storageConfigurations: {
          accountName: "aaaaaaaaaaaaaaaaaaaaaaa",
          id: "aaaaaaaaaaaaaaa",
          subscriptionId: "aaaaaaaaa",
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to log Profile for Firewall
 *
 * @summary log Profile for Firewall
 * x-ms-original-file: 2025-10-08/Firewalls_saveLogProfile_MinimumSet_Gen.json
 */
async function firewallsSaveLogProfileMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.firewalls.saveLogProfile("firewall-rg", "firewall1");
}

async function main(): Promise<void> {
  await firewallsSaveLogProfileMaximumSetGen();
  await firewallsSaveLogProfileMinimumSetGen();
}

main().catch(console.error);
