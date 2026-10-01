// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get student join requests
 *
 * @summary get student join requests
 * x-ms-original-file: 2021-12-01-preview/JoinRequest.json
 */
async function joinRequest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.joinRequests.get(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    "{joinRequestName}",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await joinRequest();
}

main().catch(console.error);
