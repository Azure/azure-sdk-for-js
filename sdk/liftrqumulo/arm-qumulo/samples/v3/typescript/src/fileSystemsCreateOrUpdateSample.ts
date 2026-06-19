// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a FileSystemResource
 *
 * @summary create a FileSystemResource
 * x-ms-original-file: 2026-04-16/FileSystems_CreateOrUpdate_MaximumSet_Gen.json
 */
async function fileSystemsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C9CC2D2A-5AA0-4839-A85F-18491F2D244A";
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.createOrUpdate("rgQumulo", "qumulo-fs-01", {
    properties: {
      marketplaceDetails: {
        marketplaceSubscriptionId: "vwjzkiurjihwxrhoicenkbxacokvep",
        planId: "vxnyxa",
        offerId: "itiocfnteqyuavgmdtnvwvbpectyr",
        publisherId: "zfevjvhjiifwxbazta",
        termUnit: "lkbiqoqdyqbua",
      },
      storageSku: "myzqnfqelxo",
      userDetails: { email: "rlqqzevfgtqpynvifqp" },
      delegatedSubnetId: "kmjaqsfflkjpke",
      performanceTier: "fjgqmkcvjtygcavpbo",
      clusterLoginUrl: "uzpvkgxrbgtthyxgavsjr",
      privateIPs: ["qrhvbdfbfdgqqe"],
      adminPassword: "<a-password-goes-here>",
      availabilityZone: "luklrtwmngwnaerygykcbwljeso",
    },
    identity: { type: "None", userAssignedIdentities: { key8111: {} } },
    tags: { key7800: "izzovtmtunlwpglmglq" },
    location: "uiuztlexlmxsqcnsdpvzzygmi",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a FileSystemResource
 *
 * @summary create a FileSystemResource
 * x-ms-original-file: 2026-04-16/FileSystems_CreateOrUpdate_MinimumSet_Gen.json
 */
async function fileSystemsCreateOrUpdateMaximumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53BA951C-DA09-400A-AB3A-F8E98F317423";
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.createOrUpdate("rgQumulo", "qumulo-fs-01", {
    location: "ninyfyhmsedp",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await fileSystemsCreateOrUpdateMaximumSet();
  await fileSystemsCreateOrUpdateMaximumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
