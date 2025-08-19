// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a specified contact.
 *
 * @summary Deletes a specified contact.
 * x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-11-01/examples/ContactDelete.json
 */

import { AzureOrbital } from "@azure/arm-orbital";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteContact(): Promise<void> {
  const subscriptionId =
    process.env["ORBITAL_SUBSCRIPTION_ID"] || "c1be1141-a7c9-4aac-9608-3c2e2f1152c3";
  const resourceGroupName = process.env["ORBITAL_RESOURCE_GROUP"] || "contoso-Rgp";
  const spacecraftName = "CONTOSO_SAT";
  const contactName = "contact1";
  const credential = new DefaultAzureCredential();
  const client = new AzureOrbital(credential, subscriptionId);
  const result = await client.contacts.beginDeleteAndWait(
    resourceGroupName,
    spacecraftName,
    contactName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteContact();
}

main().catch(console.error);
