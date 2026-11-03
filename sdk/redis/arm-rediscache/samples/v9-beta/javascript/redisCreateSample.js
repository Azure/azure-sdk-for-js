// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: 2025-08-01-preview/RedisCacheCreate.json
 */
async function redisCacheCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.create("rg1", "cache1", {
    location: "East US",
    enableNonSslPort: true,
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    redisVersion: "4",
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zones: ["1"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: 2025-08-01-preview/RedisCacheCreateAutomaticZonalAllocationPolicy.json
 */
async function redisCacheCreateAutomaticZonalAllocationPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.create("rg1", "cache1", {
    location: "East US",
    enableNonSslPort: true,
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zonalAllocationPolicy: "Automatic",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: 2025-08-01-preview/RedisCacheCreateDefaultVersion.json
 */
async function redisCacheCreateDefaultVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.create("rg1", "cache1", {
    location: "East US",
    enableNonSslPort: true,
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zones: ["1"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: 2025-08-01-preview/RedisCacheCreateLatestVersion.json
 */
async function redisCacheCreateLatestVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.create("rg1", "cache1", {
    location: "East US",
    enableNonSslPort: true,
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    redisVersion: "Latest",
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zones: ["1"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: 2025-08-01-preview/RedisCacheCreateNoZonesZonalAllocationPolicy.json
 */
async function redisCacheCreateNoZonesZonalAllocationPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.create("rg1", "cache1", {
    location: "East US",
    enableNonSslPort: true,
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zonalAllocationPolicy: "NoZones",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: 2025-08-01-preview/RedisCacheCreateUserDefinedZonalAllocationPolicy.json
 */
async function redisCacheCreateUserDefinedZonalAllocationPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.create("rg1", "cache1", {
    location: "East US",
    enableNonSslPort: true,
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    redisVersion: "Latest",
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zonalAllocationPolicy: "UserDefined",
    zones: ["1"],
  });
  console.log(result);
}

async function main() {
  await redisCacheCreate();
  await redisCacheCreateAutomaticZonalAllocationPolicy();
  await redisCacheCreateDefaultVersion();
  await redisCacheCreateLatestVersion();
  await redisCacheCreateNoZonesZonalAllocationPolicy();
  await redisCacheCreateUserDefinedZonalAllocationPolicy();
}

main().catch(console.error);
