// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the certificate.
 *
 * @summary delete the certificate.
 * x-ms-original-file: 2024-10-23/deleteCertificate.json
 */
async function deleteACertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.certificateOperations.delete("rg", "myAutomationAccount33", "testCert");
}

async function main(): Promise<void> {
  await deleteACertificate();
}

main().catch(console.error);
