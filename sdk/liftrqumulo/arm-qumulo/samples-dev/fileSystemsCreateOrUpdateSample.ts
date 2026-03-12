// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a FileSystemResource
 *
 * @summary Create a FileSystemResource
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_CreateOrUpdate_MaximumSet_Gen.json
 */

import type { FileSystemResource } from "@azure/arm-qumulo";
import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function fileSystemsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "382E8C7A-AC80-4D70-8580-EFE99537B9B7";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const fileSystemName = "hfcmtgaes";
  const resource: FileSystemResource = {
    adminPassword: "fakeTestSecretPlaceholder",
    availabilityZone: "eqdvbdiuwmhhzqzmksmwllpddqquwt",
    clusterLoginUrl: "ykaynsjvhihdthkkvvodjrgc",
    delegatedSubnetId: "jykmxrf",
    identity: { type: "None", userAssignedIdentities: { key7679: {} } },
    location: "pnb",
    marketplaceDetails: {
      marketplaceSubscriptionId: "xaqtkloiyovmexqhn",
      marketplaceSubscriptionStatus: "PendingFulfillmentStart",
      offerId: "s",
      planId: "fwtpz",
      publisherId: "czxcfrwodazyaft",
      termUnit: "cfwwczmygsimcyvoclcw",
    },
    privateIPs: ["gzken"],
    storageSku: "yhyzby",
    tags: { key7090: "rurrdiaqp" },
    userDetails: { email: "aqsnzyroo" },
  };
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.beginCreateOrUpdateAndWait(
    resourceGroupName,
    fileSystemName,
    resource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a FileSystemResource
 *
 * @summary Create a FileSystemResource
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_CreateOrUpdate_MinimumSet_Gen.json
 */
async function fileSystemsCreateOrUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId = process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "aaaaaaaaaaaaaaaaaaaaaaaa";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgopenapi";
  const fileSystemName = "aaaaaaaa";
  const resource: FileSystemResource = {
    adminPassword: "fakeTestSecretPlaceholder",
    delegatedSubnetId: "aaaaaaaaaa",
    location: "aaaaaaaaaaaaaaaaaaaaaaaaa",
    marketplaceDetails: {
      marketplaceSubscriptionId: "aaaaaaaaaaaaa",
      marketplaceSubscriptionStatus: "PendingFulfillmentStart",
      offerId: "aaaaaaaaaaaaaaaaaaaaaaaaa",
      planId: "aaaaaa",
    },
    storageSku: "Standard",
    userDetails: { email: "viptslwulnpaupfljvnjeq" },
  };
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.beginCreateOrUpdateAndWait(
    resourceGroupName,
    fileSystemName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await fileSystemsCreateOrUpdate();
  await fileSystemsCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
