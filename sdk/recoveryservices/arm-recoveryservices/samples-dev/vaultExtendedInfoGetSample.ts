// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the vault extended info.
 *
 * @summary Get the vault extended info.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/GETVaultExtendedInfo.json
 */

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getExtendedInfoOfResource(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] ||
    "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] ||
    "Default-RecoveryServices-ResourceGroup";
  const vaultName = "swaggerExample";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaultExtendedInfo.get(
    resourceGroupName,
    vaultName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExtendedInfoOfResource();
}

main().catch(console.error);
