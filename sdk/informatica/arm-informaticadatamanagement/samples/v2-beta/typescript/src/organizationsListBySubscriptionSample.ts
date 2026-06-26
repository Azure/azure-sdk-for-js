// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list InformaticaOrganizationResource resources by subscription ID
 *
 * @summary list InformaticaOrganizationResource resources by subscription ID
 * x-ms-original-file: 2025-11-27/Organizations_ListBySubscription_MaximumSet_Gen.json
 */
async function organizationsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list InformaticaOrganizationResource resources by subscription ID
 *
 * @summary list InformaticaOrganizationResource resources by subscription ID
 * x-ms-original-file: 2025-11-27/Organizations_ListBySubscription_MinimumSet_Gen.json
 */
async function organizationsListBySubscriptionMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationsListBySubscription();
  await organizationsListBySubscriptionMin();
}

main().catch(console.error);
