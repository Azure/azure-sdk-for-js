// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-trustedsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revoke a certificate under a certificate profile.
 *
 * @summary revoke a certificate under a certificate profile.
 * x-ms-original-file: 2024-02-05-preview/CertificateProfiles_RevokeCertificate.json
 */
async function revokeACertificateUnderACertificateProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  await client.certificateProfiles.revokeCertificate("MyResourceGroup", "MyAccount", "profileA", {
    effectiveAt: new Date("2023-11-12T23:40:25+00:00"),
    reason: "KeyCompromised",
    remarks: "test",
    serialNumber: "xxxxxxxxxxxxxxxxxx",
    thumbprint: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  });
}

async function main() {
  revokeACertificateUnderACertificateProfile();
}

main().catch(console.error);
