// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-trustedsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a certificate profile.
 *
 * @summary create a certificate profile.
 * x-ms-original-file: 2024-02-05-preview/CertificateProfiles_Create.json
 */
async function createACertificateProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.certificateProfiles.create(
    "MyResourceGroup",
    "MyAccount",
    "profileA",
    {
      properties: {
        profileType: "PublicTrust",
        identityValidationId: "00000000-1234-5678-3333-444444444444",
        includePostalCode: true,
        includeStreetAddress: false,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  createACertificateProfile();
}

main().catch(console.error);
