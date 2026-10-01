// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a specific lab associated with the provided billing account name, billing profile name, and invoice section name. Note all students must be removed from the lab in order to delete the lab.
 *
 * @summary delete a specific lab associated with the provided billing account name, billing profile name, and invoice section name. Note all students must be removed from the lab in order to delete the lab.
 * x-ms-original-file: 2021-12-01-preview/DeleteLab.json
 */
async function deleteLab(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  await client.labs.delete("{billingAccountName}", "{billingProfileName}", "{invoiceSectionName}");
}

async function main(): Promise<void> {
  await deleteLab();
}

main().catch(console.error);
