// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to revoke the subscription's acceptance of the agreement. Refused (rejected at validation, before begin) while the subscription still has active Anyscale clouds, since those clouds depend on the accepted agreement -- delete the clouds first. Once permitted, the catalog entry persists (a subsequent GET returns status "Pending") and only the signed record is removed; idempotent.
 *
 * @summary revoke the subscription's acceptance of the agreement. Refused (rejected at validation, before begin) while the subscription still has active Anyscale clouds, since those clouds depend on the accepted agreement -- delete the clouds first. Once permitted, the catalog entry persists (a subsequent GET returns status "Pending") and only the signed record is removed; idempotent.
 * x-ms-original-file: 2026-09-01/Agreements_Delete.json
 */
async function revokeAcceptanceOfAnAgreement() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformClient(credential, subscriptionId);
  await client.agreements.delete("default");
}

async function main() {
  await revokeAcceptanceOfAnAgreement();
}

main().catch(console.error);
