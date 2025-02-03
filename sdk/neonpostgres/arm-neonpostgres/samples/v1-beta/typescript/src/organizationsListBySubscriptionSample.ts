// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list OrganizationResource resources by subscription ID
 *
 * @summary list OrganizationResource resources by subscription ID
 * x-ms-original-file: 2024-08-01-preview/Organizations_ListBySubscription_MaximumSet_Gen.json
 */
async function organizationsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1178323D-8270-4757-B639-D528B6266487";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  organizationsListBySubscription();
}

main().catch(console.error);
