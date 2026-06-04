// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a certificate.
 *
 * @summary create a certificate.
 * x-ms-original-file: 2024-10-23/createOrUpdateCertificate.json
 */
async function createOrUpdateACertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.certificate.createOrUpdate(
    "rg",
    "myAutomationAccount18",
    "testCert",
    {
      name: "testCert",
      description: "Sample Cert",
      base64Value: "base 64 value of cert",
      isExportable: false,
      thumbprint: "thumbprint of cert",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateACertificate();
}

main().catch(console.error);
