// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-trustedsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list certificate profiles under a trusted signing account.
 *
 * @summary list certificate profiles under a trusted signing account.
 * x-ms-original-file: 2024-02-05-preview/CertificateProfiles_ListByCodeSigningAccount.json
 */
async function listCertificateProfilesUnderATrustedSigningAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.certificateProfiles.listByCodeSigningAccount(
    "MyResourceGroup",
    "MyAccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  listCertificateProfilesUnderATrustedSigningAccount();
}

main().catch(console.error);
