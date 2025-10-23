// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create vault extended info.
 *
 * @summary create vault extended info.
 * x-ms-original-file: 2025-08-01/UpdateVaultExtendedInfo_Put.json
 */
async function putExtendedInfoOfResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaultExtendedInfo.createOrUpdate(
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

async function main() {
  await putExtendedInfoOfResource();
}

main().catch(console.error);
