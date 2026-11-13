// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a Cognitive Services account
 *
 * @summary updates a Cognitive Services account
 * x-ms-original-file: 2026-11-01/UpdateAccount.json
 */
async function updateAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("bvttest", "bingSearch", {
    location: "global",
    properties: {},
    sku: { name: "S2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Cognitive Services account
 *
 * @summary updates a Cognitive Services account
 * x-ms-original-file: 2026-11-01/UpdateAccountClearTrustedCertificateSources.json
 */
async function clearAccountPrivateCATrustUsingAnEmptyArray(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("myResourceGroup", "myAccount", {
    properties: { trustedCertificateSources: [] },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Cognitive Services account
 *
 * @summary updates a Cognitive Services account
 * x-ms-original-file: 2026-11-01/UpdateAccountPreserveTrustedCertificateSources.json
 */
async function updateAccountTagsWhilePreservingPrivateCATrustWithNull(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("myResourceGroup", "myAccount", {
    tags: { environment: "production" },
    properties: { trustedCertificateSources: [] },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Cognitive Services account
 *
 * @summary updates a Cognitive Services account
 * x-ms-original-file: 2026-11-01/UpdateAccountRotateTrustedCertificateSources.json
 */
async function rotateAPinnedCABundleWhileRetainingOtherReferences(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("myResourceGroup", "myAccount", {
    properties: {
      trustedCertificateSources: [
        {
          type: "AzureKeyVault",
          resourceId:
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/myKeyVault",
          certificateBundleReferences: [
            {
              secretName: "corporate-ca-bundle",
              secretVersion: "33333333333333333333333333333333",
            },
            { secretName: "partner-ca-bundle", secretVersion: "22222222222222222222222222222222" },
          ],
        },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAccount();
  await clearAccountPrivateCATrustUsingAnEmptyArray();
  await updateAccountTagsWhilePreservingPrivateCATrustWithNull();
  await rotateAPinnedCABundleWhileRetainingOtherReferences();
}

main().catch(console.error);
