// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a FirewallResource
 *
 * @summary create a FirewallResource
 * x-ms-original-file: 2025-10-08/Firewalls_CreateOrUpdate_MaximumSet_Gen.json
 */
async function firewallsCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.createOrUpdate("firewall-rg", "firewall1", {
    identity: {
      type: "None",
      userAssignedIdentities: {
        key16: { clientId: "aaaa", principalId: "aaaaaaaaaaaaaaa" },
      },
    },
    location: "eastus",
    properties: {
      associatedRulestack: {
        location: "eastus",
        resourceId: "lrs1",
        rulestackId: "PANRSID",
      },
      dnsSettings: {
        dnsServers: [
          {
            address: "20.22.92.111",
            resourceId:
              "/subscriptions/01c7d41f-afaf-464e-8a8b-5c6f9f98cee8/resourceGroups/mj-liftr-integration/providers/Microsoft.Network/publicIPAddresses/mj-liftr-integration-egressNatIp1",
          },
        ],
        enableDnsProxy: "DISABLED",
        enabledDnsType: "CUSTOM",
      },
      frontEndSettings: [
        {
          name: "frontendsetting11",
          backendConfiguration: {
            address: {
              address: "20.22.32.136",
              resourceId:
                "/subscriptions/01c7d41f-afaf-464e-8a8b-5c6f9f98cee8/resourceGroups/mj-liftr-integration/providers/Microsoft.Network/publicIPAddresses/mj-liftr-integration-frontendSettingIp2",
            },
            port: "80",
          },
          frontendConfiguration: {
            address: {
              address: "20.22.91.251",
              resourceId:
                "/subscriptions/01c7d41f-afaf-464e-8a8b-5c6f9f98cee8/resourceGroups/mj-liftr-integration/providers/Microsoft.Network/publicIPAddresses/mj-liftr-integration-frontendSettingIp1",
            },
            port: "80",
          },
          protocol: "TCP",
        },
      ],
      isPanoramaManaged: "TRUE",
      marketplaceDetails: {
        marketplaceSubscriptionStatus: "PendingFulfillmentStart",
        offerId: "liftr-pan-ame-test",
        publisherId: "isvtestuklegacy",
      },
      networkProfile: {
        egressNatIp: [
          {
            address: "20.22.92.111",
            resourceId:
              "/subscriptions/01c7d41f-afaf-464e-8a8b-5c6f9f98cee8/resourceGroups/mj-liftr-integration/providers/Microsoft.Network/publicIPAddresses/mj-liftr-integration-egressNatIp1",
          },
        ],
        enableEgressNat: "ENABLED",
        networkType: "VNET",
        privateSourceNatRulesDestination: ["20.22.92.11"],
        publicIps: [
          {
            address: "20.22.92.11",
            resourceId:
              "/subscriptions/01c7d41f-afaf-464e-8a8b-5c6f9f98cee8/resourceGroups/mj-liftr-integration/providers/Microsoft.Network/publicIPAddresses/mj-liftr-integration-PublicIp1",
          },
        ],
        trustedRanges: ["20.22.92.11"],
        vnetConfiguration: {
          ipOfTrustSubnetForUdr: {
            address: "10.1.1.0/24",
            resourceId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/os-liftr-integration/providers/Microsoft.Network/virtualNetworks/os-liftr-integration-vnet/subnets/os-liftr-integration-untrust-subnet",
          },
          trustSubnet: {
            addressSpace: "10.1.1.0/24",
            resourceId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/os-liftr-integration/providers/Microsoft.Network/virtualNetworks/os-liftr-integration-vnet/subnets/os-liftr-integration-trust-subnet",
          },
          unTrustSubnet: {
            addressSpace: "10.1.1.0/24",
            resourceId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/os-liftr-integration/providers/Microsoft.Network/virtualNetworks/os-liftr-integration-vnet/subnets/os-liftr-integration-untrust-subnet",
          },
          vnet: {
            addressSpace: "10.1.0.0/16",
            resourceId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/os-liftr-integration/providers/Microsoft.Network/virtualNetworks/os-liftr-integration-vnet",
          },
        },
        vwanConfiguration: {
          ipOfTrustSubnetForUdr: {
            address: "10.1.1.0/24",
            resourceId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/os-liftr-integration/providers/Microsoft.Network/virtualNetworks/os-liftr-integration-vnet/subnets/os-liftr-integration-untrust-subnet",
          },
          networkVirtualApplianceId: "2bf4a339-294d-4c25-b0b2-ef649e9f5c12",
          trustSubnet: {
            addressSpace: "10.1.1.0/24",
            resourceId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/os-liftr-integration/providers/Microsoft.Network/virtualNetworks/os-liftr-integration-vnet/subnets/os-liftr-integration-trust-subnet",
          },
          unTrustSubnet: {
            addressSpace: "10.1.1.0/24",
            resourceId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/os-liftr-integration/providers/Microsoft.Network/virtualNetworks/os-liftr-integration-vnet/subnets/os-liftr-integration-untrust-subnet",
          },
          vHub: {
            addressSpace: "10.1.1.0/24",
            resourceId:
              "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/os-liftr-integration/providers/Microsoft.Network/virtualNetworks/os-liftr-integration-vnet/subnets/os-liftr-integration-untrust-subnet",
          },
        },
      },
      panEtag: "2bf4a339-294d-4c25-b0b2-ef649e9f5c12",
      panoramaConfig: { configString: "bas64EncodedString" },
      planData: {
        billingCycle: "MONTHLY",
        planId: "liftrpantestplan",
        usageType: "PAYG",
      },
      provisioningState: "Accepted",
    },
    tags: { tagName: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a FirewallResource
 *
 * @summary create a FirewallResource
 * x-ms-original-file: 2025-10-08/Firewalls_CreateOrUpdate_MinimumSet_Gen.json
 */
async function firewallsCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.createOrUpdate("firewall-rg", "firewall1", {
    location: "eastus",
    properties: {
      dnsSettings: {},
      marketplaceDetails: {
        offerId: "liftr-pan-ame-test",
        publisherId: "isvtestuklegacy",
      },
      networkProfile: {
        enableEgressNat: "ENABLED",
        networkType: "VNET",
        publicIps: [
          {
            address: "20.22.92.11",
            resourceId:
              "/subscriptions/01c7d41f-afaf-464e-8a8b-5c6f9f98cee8/resourceGroups/mj-liftr-integration/providers/Microsoft.Network/publicIPAddresses/mj-liftr-integration-PublicIp1",
          },
        ],
      },
      planData: { billingCycle: "MONTHLY", planId: "liftrpantestplan" },
    },
  });
  console.log(result);
}

async function main() {
  await firewallsCreateOrUpdateMaximumSetGen();
  await firewallsCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
