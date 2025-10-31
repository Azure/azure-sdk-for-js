// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to log Profile for Firewall
 *
 * @summary log Profile for Firewall
 * x-ms-original-file: 2025-10-08/Firewalls_saveLogProfile_MaximumSet_Gen.json
 */
async function firewallsSaveLogProfileMaximumSetGen() {
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
async function firewallsSaveLogProfileMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.firewalls.saveLogProfile("firewall-rg", "firewall1");
}

async function main() {
  await firewallsSaveLogProfileMaximumSetGen();
  await firewallsSaveLogProfileMinimumSetGen();
}

main().catch(console.error);
