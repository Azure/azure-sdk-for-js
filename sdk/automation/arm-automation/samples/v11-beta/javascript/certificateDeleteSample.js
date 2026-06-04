// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the certificate.
 *
 * @summary delete the certificate.
 * x-ms-original-file: 2024-10-23/deleteCertificate.json
 */
async function deleteACertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.certificate.delete("rg", "myAutomationAccount33", "testCert");
}

async function main() {
  await deleteACertificate();
}

main().catch(console.error);
