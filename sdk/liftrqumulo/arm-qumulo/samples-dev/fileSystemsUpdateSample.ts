// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FileSystemResourceUpdate } from "@azure/arm-qumulo";
import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a FileSystemResource
 *
 * @summary Update a FileSystemResource
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_Update_MaximumSet_Gen.json
 */
async function fileSystemsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "382E8C7A-AC80-4D70-8580-EFE99537B9B7";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const fileSystemName = "ahpixnvykleksjlr";
  const properties: FileSystemResourceUpdate = {
    identity: { type: "None", userAssignedIdentities: { key7679: {} } },
    properties: {
      delegatedSubnetId: "bqaryqsjlackxphpmzffgoqsvm",
      marketplaceDetails: {
        marketplaceSubscriptionId: "xaqtkloiyovmexqhn",
        marketplaceSubscriptionStatus: "PendingFulfillmentStart",
        offerId: "s",
        planId: "fwtpz",
        publisherId: "czxcfrwodazyaft",
        termUnit: "cfwwczmygsimcyvoclcw",
      },
      userDetails: { email: "aqsnzyroo" },
    },
    tags: { key357: "ztkkvhfia" },
  };
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.update(resourceGroupName, fileSystemName, properties);
  console.log(result);
}

/**
 * This sample demonstrates how to Update a FileSystemResource
 *
 * @summary Update a FileSystemResource
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_Update_MinimumSet_Gen.json
 */
async function fileSystemsUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId = process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const fileSystemName = "aaaaaaaaaaaaaaaaa";
  const properties: FileSystemResourceUpdate = {};
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.update(resourceGroupName, fileSystemName, properties);
  console.log(result);
}

async function main(): Promise<void> {
  await fileSystemsUpdate();
  await fileSystemsUpdateMinimumSetGen();
}

main().catch(console.error);
