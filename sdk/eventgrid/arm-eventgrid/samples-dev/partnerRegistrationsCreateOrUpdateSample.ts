// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new partner registration with the specified parameters.
 *
 * @summary Creates a new partner registration with the specified parameters.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/PartnerRegistrations_CreateOrUpdate.json
 */

import {
  PartnerRegistration,
  EventGridManagementClient,
} from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function partnerRegistrationsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const partnerRegistrationName = "examplePartnerRegistrationName1";
  const partnerRegistrationInfo: PartnerRegistration = {
    location: "global",
    tags: { key1: "value1", key2: "Value2", key3: "Value3" },
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerRegistrations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    partnerRegistrationName,
    partnerRegistrationInfo,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await partnerRegistrationsCreateOrUpdate();
}

main().catch(console.error);
