// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates ownership vouchers.
 *
 * @summary validates ownership vouchers.
 * x-ms-original-file: 2025-12-01-preview/ValidateOwnershipVouchers_ByResourceGroup.json
 */
async function validateOwnershipVouchersInAGivenResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.ownershipVouchers.validate("ArcInstance-rg", "westus", {
    ownershipVoucherDetails: [
      { ownershipVoucher: "Device Model Ownership content", ownerKeyType: "MicrosoftManaged" },
    ],
  });
  console.log(result);
}

async function main() {
  await validateOwnershipVouchersInAGivenResourceGroup();
}

main().catch(console.error);
