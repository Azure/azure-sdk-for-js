// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-artifactsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get details of a certificate profile.
 *
 * @summary get details of a certificate profile.
 * x-ms-original-file: 2025-10-13/CertificateProfiles_Get.json
 */
async function getDetailsOfACertificateProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.certificateProfiles.get("MyResourceGroup", "MyAccount", "profileA");
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfACertificateProfile();
}

main().catch(console.error);
