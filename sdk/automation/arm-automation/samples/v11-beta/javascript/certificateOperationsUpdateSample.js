// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a certificate.
 *
 * @summary update a certificate.
 * x-ms-original-file: 2024-10-23/updateCertificate.json
 */
async function updateACertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.certificateOperations.update(
    "rg",
    "myAutomationAccount33",
    "testCert",
    { name: "testCert", description: "sample certificate. Description updated" },
  );
  console.log(result);
}

async function main() {
  await updateACertificate();
}

main().catch(console.error);
