// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheCreate.json
 */

import type { RedisCreateParameters } from "@azure/arm-rediscache";
import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisCacheCreate(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const parameters: RedisCreateParameters = {
    enableNonSslPort: true,
    location: "East US",
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    redisVersion: "4",
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.beginCreateAndWait(resourceGroupName, name, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheCreateAutomaticZonalAllocationPolicy.json
 */
async function redisCacheCreateAutomaticZonalAllocationPolicy(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const parameters: RedisCreateParameters = {
    enableNonSslPort: true,
    location: "East US",
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zonalAllocationPolicy: "Automatic",
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.beginCreateAndWait(resourceGroupName, name, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheCreateDefaultVersion.json
 */
async function redisCacheCreateDefaultVersion(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const parameters: RedisCreateParameters = {
    enableNonSslPort: true,
    location: "East US",
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.beginCreateAndWait(resourceGroupName, name, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheCreateLatestVersion.json
 */
async function redisCacheCreateLatestVersion(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const parameters: RedisCreateParameters = {
    enableNonSslPort: true,
    location: "East US",
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    redisVersion: "Latest",
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.beginCreateAndWait(resourceGroupName, name, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheCreateNoZonesZonalAllocationPolicy.json
 */
async function redisCacheCreateNoZonesZonalAllocationPolicy(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const parameters: RedisCreateParameters = {
    enableNonSslPort: true,
    location: "East US",
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zonalAllocationPolicy: "NoZones",
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.beginCreateAndWait(resourceGroupName, name, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 *
 * @summary Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheCreateUserDefinedZonalAllocationPolicy.json
 */
async function redisCacheCreateUserDefinedZonalAllocationPolicy(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const parameters: RedisCreateParameters = {
    enableNonSslPort: true,
    location: "East US",
    minimumTlsVersion: "1.2",
    redisConfiguration: { maxmemoryPolicy: "allkeys-lru" },
    redisVersion: "Latest",
    replicasPerPrimary: 2,
    shardCount: 2,
    sku: { name: "Premium", capacity: 1, family: "P" },
    staticIP: "192.168.0.5",
    subnetId:
      "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/network1/subnets/subnet1",
    zonalAllocationPolicy: "UserDefined",
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.beginCreateAndWait(resourceGroupName, name, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheCreate();
  await redisCacheCreateAutomaticZonalAllocationPolicy();
  await redisCacheCreateDefaultVersion();
  await redisCacheCreateLatestVersion();
  await redisCacheCreateNoZonesZonalAllocationPolicy();
  await redisCacheCreateUserDefinedZonalAllocationPolicy();
}

main().catch(console.error);
