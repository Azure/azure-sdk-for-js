// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a certificate.
 *
 * @summary update a certificate.
 * x-ms-original-file: 2024-10-23/updateCertificate.json
 */
async function updateACertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.certificate.update("rg", "myAutomationAccount33", "testCert", {
    name: "testCert",
    description: "sample certificate. Description updated",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateACertificate();
}

main().catch(console.error);
