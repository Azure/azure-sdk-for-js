// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP address.
 *
 * @summary creates or updates a static or dynamic public IP address.
 * x-ms-original-file: 2025-09-01/PublicIpAddressCreateCustomizedValues.json
 */
async function createPublicIPAddressAllocationMethod() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.createOrUpdate("rg1", "test-ip", {
    location: "eastus",
    idleTimeoutInMinutes: 10,
    publicIPAddressVersion: "IPv4",
    publicIPAllocationMethod: "Static",
    sku: { name: "Standard", tier: "Global" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP address.
 *
 * @summary creates or updates a static or dynamic public IP address.
 * x-ms-original-file: 2025-09-01/PublicIpAddressCreateDefaults.json
 */
async function createPublicIPAddressDefaults() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.createOrUpdate("rg1", "test-ip", {
    location: "eastus",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP address.
 *
 * @summary creates or updates a static or dynamic public IP address.
 * x-ms-original-file: 2025-09-01/PublicIpAddressCreateDefaultsStandardV2Sku.json
 */
async function createPublicIPAddressDefaultsWithStandardV2Sku() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.createOrUpdate("rg1", "test-ip", {
    location: "eastus",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP address.
 *
 * @summary creates or updates a static or dynamic public IP address.
 * x-ms-original-file: 2025-09-01/PublicIpAddressCreateDns.json
 */
async function createPublicIPAddressDNS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.createOrUpdate("rg1", "test-ip", {
    location: "eastus",
    dnsSettings: { domainNameLabel: "dnslbl" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP address.
 *
 * @summary creates or updates a static or dynamic public IP address.
 * x-ms-original-file: 2025-09-01/PublicIpAddressCreateDnsWithDomainNameLabelScope.json
 */
async function createPublicIPAddressDNSWithDomainNameLabelScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.createOrUpdate("rg1", "test-ip", {
    location: "eastus",
    dnsSettings: { domainNameLabel: "dnslbl", domainNameLabelScope: "TenantReuse" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP address.
 *
 * @summary creates or updates a static or dynamic public IP address.
 * x-ms-original-file: 2025-09-01/PublicIpAddressCreateWithFirstPartyServiceTag.json
 */
async function createPublicIPAddressWithFirstPartyServiceTag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.createOrUpdate("rg1", "test-ip", {
    location: "eastus",
    idleTimeoutInMinutes: 10,
    ipTags: [
      {
        ipTagType: "FirstPartyUsage",
        tag: "SQL",
        firstPartyServiceTagId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/firstPartyServiceTags/myServiceTag",
      },
    ],
    publicIPAddressVersion: "IPv4",
    publicIPAllocationMethod: "Static",
    sku: { name: "Standard", tier: "Global" },
  });
  console.log(result);
}

async function main() {
  await createPublicIPAddressAllocationMethod();
  await createPublicIPAddressDefaults();
  await createPublicIPAddressDefaultsWithStandardV2Sku();
  await createPublicIPAddressDNS();
  await createPublicIPAddressDNSWithDomainNameLabelScope();
  await createPublicIPAddressWithFirstPartyServiceTag();
}

main().catch(console.error);
