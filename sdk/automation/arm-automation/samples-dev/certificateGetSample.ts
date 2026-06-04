// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the certificate identified by certificate name.
 *
 * @summary retrieve the certificate identified by certificate name.
 * x-ms-original-file: 2024-10-23/getCertificate.json
 */
async function getACertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.certificate.get("rg", "myAutomationAccount33", "testCert");
  console.log(result);
}

async function main(): Promise<void> {
  await getACertificate();
}

main().catch(console.error);
