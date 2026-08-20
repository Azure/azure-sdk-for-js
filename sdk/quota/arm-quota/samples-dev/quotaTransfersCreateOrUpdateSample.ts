// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to submit a quota transfer. Idempotent on the URI: a retry with the same body returns the
 * cached outcome and the same `transferId`; a retry with a different financial body
 * returns 409 BodyMismatch.
 *
 * @summary submit a quota transfer. Idempotent on the URI: a retry with the same body returns the
 * cached outcome and the same `transferId`; a retry with a different financial body
 * returns 409 BodyMismatch.
 * x-ms-original-file: 2026-09-01-preview/QuotaTransfers/QuotaTransfers_CreateOrUpdate.json
 */
async function quotaTransfersCreateOrUpdateDonorSubmit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000001";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quotaTransfers.createOrUpdate(
    "Microsoft.Compute",
    "eastus",
    "compute-stdDv5-uplift-101",
    {
      properties: {
        displayName: "Move 50 Dv5 vCPU to recipient",
        comment: "Backfill for new prod fleet rollout.",
        destinationSubscriptionId: "aaaaaaaa-bbbb-cccc-dddd-000000000002",
        billingAccountId: "1234567890",
        resourceName: "standardDv5Family",
        amount: 50,
        autoApprove: false,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to submit a quota transfer. Idempotent on the URI: a retry with the same body returns the
 * cached outcome and the same `transferId`; a retry with a different financial body
 * returns 409 BodyMismatch.
 *
 * @summary submit a quota transfer. Idempotent on the URI: a retry with the same body returns the
 * cached outcome and the same `transferId`; a retry with a different financial body
 * returns 409 BodyMismatch.
 * x-ms-original-file: 2026-09-01-preview/QuotaTransfers/QuotaTransfers_CreateOrUpdate_AutoApprove.json
 */
async function quotaTransfersCreateOrUpdateAutoApproveSameTenant(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-000000000001";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quotaTransfers.createOrUpdate(
    "Microsoft.Compute",
    "eastus",
    "compute-stdDv5-autoapprove-202",
    {
      properties: {
        displayName: "Move 25 Dv5 vCPU - auto approved",
        destinationSubscriptionId: "aaaaaaaa-bbbb-cccc-dddd-000000000002",
        billingAccountId: "1234567890",
        resourceName: "standardDv5Family",
        amount: 25,
        autoApprove: true,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await quotaTransfersCreateOrUpdateDonorSubmit();
  await quotaTransfersCreateOrUpdateAutoApproveSameTenant();
}

main().catch(console.error);
