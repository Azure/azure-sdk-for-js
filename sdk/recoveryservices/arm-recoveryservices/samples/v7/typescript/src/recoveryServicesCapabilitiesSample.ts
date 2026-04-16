// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to get details about capabilities provided by Microsoft.RecoveryServices RP
 *
 * @summary aPI to get details about capabilities provided by Microsoft.RecoveryServices RP
 * x-ms-original-file: 2025-08-01/Capabilities.json
 */
async function capabilitiesForMicrosoftRecoveryServicesOrVaults(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.recoveryServices.capabilities("westus", {
    type: "Microsoft.RecoveryServices/Vaults",
    properties: {
      dnsZones: [{ subResource: "AzureBackup" }, { subResource: "AzureSiteRecovery" }],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await capabilitiesForMicrosoftRecoveryServicesOrVaults();
}

main().catch(console.error);
