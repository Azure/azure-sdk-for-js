// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP address.
 *
 * @summary creates or updates a static or dynamic public IP address.
 * x-ms-original-file: 2025-05-01/PublicIpAddressCreateCustomizedValues.json
 */
async function createPublicIPAddressAllocationMethod(): Promise<void> {
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
 * x-ms-original-file: 2025-05-01/PublicIpAddressCreateDefaults.json
 */
async function createPublicIPAddressDefaults(): Promise<void> {
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
 * x-ms-original-file: 2025-05-01/PublicIpAddressCreateDefaultsStandardV2Sku.json
 */
async function createPublicIPAddressDefaultsWithStandardV2Sku(): Promise<void> {
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
 * x-ms-original-file: 2025-05-01/PublicIpAddressCreateDns.json
 */
async function createPublicIPAddressDNS(): Promise<void> {
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
 * x-ms-original-file: 2025-05-01/PublicIpAddressCreateDnsWithDomainNameLabelScope.json
 */
async function createPublicIPAddressDNSWithDomainNameLabelScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.createOrUpdate("rg1", "test-ip", {
    location: "eastus",
    dnsSettings: { domainNameLabel: "dnslbl", domainNameLabelScope: "TenantReuse" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createPublicIPAddressAllocationMethod();
  await createPublicIPAddressDefaults();
  await createPublicIPAddressDefaultsWithStandardV2Sku();
  await createPublicIPAddressDNS();
  await createPublicIPAddressDNSWithDomainNameLabelScope();
}

main().catch(console.error);
