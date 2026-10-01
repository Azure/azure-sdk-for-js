// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-artifactsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revokes certificates under a certificate profile.
 *
 * @summary revokes certificates under a certificate profile.
 * x-ms-original-file: 2026-05-15-preview/CertificateProfiles_RevokeCertificates.json
 */
async function revokeCertificatesUnderACertificateProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  await client.certificateProfiles.revokeCertificates("MyResourceGroup", "MyAccount", "profileA", {
    revokeCertificates: [
      {
        effectiveAt: new Date("2023-11-12T23:40:25+00:00"),
        reason: "KeyCompromised",
        remarks: "test",
        serialNumber: "xxxxxxxxxxxxxxxxxx",
        thumbprint: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      },
      {
        effectiveAt: new Date("2023-11-12T23:40:25+00:00"),
        reason: "KeyCompromised",
        remarks: "test",
        serialNumber: "yyyyyyyyyyyyyyyyyy",
        thumbprint: "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      },
    ],
  });
}

async function main(): Promise<void> {
  await revokeCertificatesUnderACertificateProfile();
}

main().catch(console.error);
