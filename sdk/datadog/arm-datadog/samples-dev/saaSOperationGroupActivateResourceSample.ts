// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resolve the token to get the SaaS resource ID and activate the SaaS resource
 *
 * @summary resolve the token to get the SaaS resource ID and activate the SaaS resource
 * x-ms-original-file: 2025-12-26-preview/ActivateSaaS.json
 */
async function saaSActivateResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.saaSOperationGroup.activateResource({
    saaSResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.SaaS/resources/mySaaSResource",
    userInfo: { name: "Alice", emailAddress: "alice@example.com", phoneNumber: "+1234567890" },
    datadogOrganizationProperties: { name: "myOrganization", id: "org123456" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await saaSActivateResource();
}

main().catch(console.error);
