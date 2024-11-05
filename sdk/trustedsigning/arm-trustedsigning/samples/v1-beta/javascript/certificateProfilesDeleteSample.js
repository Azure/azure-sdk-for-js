// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-trustedsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a certificate profile.
 *
 * @summary delete a certificate profile.
 * x-ms-original-file: 2024-02-05-preview/CertificateProfiles_Delete.json
 */
async function deleteACertificateProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  await client.certificateProfiles.delete("MyResourceGroup", "MyAccount", "profileA");
}

async function main() {
  deleteACertificateProfile();
}

main().catch(console.error);
