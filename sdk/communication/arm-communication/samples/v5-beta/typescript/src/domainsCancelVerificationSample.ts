// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancel verification of DNS record.
 *
 * @summary cancel verification of DNS record.
 * x-ms-original-file: 2026-03-18/domains/cancelVerification.json
 */
async function cancelVerification(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.domains.cancelVerification(
    "MyResourceGroup",
    "MyEmailServiceResource",
    "mydomain.com",
    { verificationType: "SPF" },
  );
}

async function main(): Promise<void> {
  await cancelVerification();
}

main().catch(console.error);
