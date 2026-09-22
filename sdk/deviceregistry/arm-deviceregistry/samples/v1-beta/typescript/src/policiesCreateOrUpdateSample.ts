// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Policy
 *
 * @summary create a Policy
 * x-ms-original-file: 2026-03-01-preview/CreateOrReplace_Policies.json
 */
async function createOrReplacePolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.policies.createOrUpdate(
    "rgdeviceregistry",
    "mynamespace",
    "mypolicy",
    {
      properties: {
        certificate: {
          certificateAuthorityConfiguration: {
            keyType: "ECC",
            bringYourOwnRoot: { enabled: true },
          },
          leafCertificateConfiguration: { validityPeriodInDays: 10 },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplacePolicies();
}

main().catch(console.error);
