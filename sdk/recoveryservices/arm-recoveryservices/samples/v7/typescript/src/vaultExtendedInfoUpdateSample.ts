// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update vault extended info.
 *
 * @summary update vault extended info.
 * x-ms-original-file: 2025-08-01/UpdateVaultExtendedInfo.json
 */
async function patchExtendedInfoOfResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaultExtendedInfo.update(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
    {
      properties: {
        algorithm: "None",
        integrityKey: "J99wzS27fmJ+Wjot7xO5wA==",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchExtendedInfoOfResource();
}

main().catch(console.error);
