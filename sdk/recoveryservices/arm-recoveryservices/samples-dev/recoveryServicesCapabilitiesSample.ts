// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to API to get details about capabilities provided by Microsoft.RecoveryServices RP
 *
 * @summary API to get details about capabilities provided by Microsoft.RecoveryServices RP
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/Capabilities.json
 */

import {
  ResourceCapabilities,
  RecoveryServicesClient,
} from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function capabilitiesForMicrosoftRecoveryServicesOrVaults(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] ||
    "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const location = "westus";
  const input: ResourceCapabilities = {
    type: "Microsoft.RecoveryServices/Vaults",
    properties: {
      dnsZones: [
        { subResource: "AzureBackup" },
        { subResource: "AzureSiteRecovery" },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.recoveryServices.capabilities(location, input);
  console.log(result);
}

async function main(): Promise<void> {
  await capabilitiesForMicrosoftRecoveryServicesOrVaults();
}

main().catch(console.error);
