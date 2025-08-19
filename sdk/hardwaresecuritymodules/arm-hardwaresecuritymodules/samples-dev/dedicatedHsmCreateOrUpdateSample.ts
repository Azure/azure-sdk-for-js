// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update a dedicated HSM in the specified subscription.
 *
 * @summary create or Update a dedicated HSM in the specified subscription.
 * x-ms-original-file: 2025-03-31/DedicatedHsm_CreateOrUpdate.json
 */
async function createANewOrUpdateAnExistingDedicatedHSM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(
    credential,
    subscriptionId,
  );
  const result = await client.dedicatedHsm.createOrUpdate("hsm-group", "hsm1", {
    location: "westus",
    properties: {
      networkProfile: {
        networkInterfaces: [{ privateIpAddress: "1.0.0.1" }],
        subnet: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.Network/virtualNetworks/stamp01/subnets/stamp01",
        },
      },
      stampId: "stamp01",
    },
    sku: { name: "SafeNet Luna Network HSM A790" },
    tags: { Dept: "hsm", Environment: "dogfood" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or Update a dedicated HSM in the specified subscription.
 *
 * @summary create or Update a dedicated HSM in the specified subscription.
 * x-ms-original-file: 2025-03-31/PaymentHsm_CreateOrUpdate.json
 */
async function createANewOrUpdateAnExistingPaymentHSM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(
    credential,
    subscriptionId,
  );
  const result = await client.dedicatedHsm.createOrUpdate("hsm-group", "hsm1", {
    location: "westus",
    properties: {
      networkProfile: {
        networkInterfaces: [{ privateIpAddress: "1.0.0.1" }],
        subnet: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.Network/virtualNetworks/stamp01/subnets/stamp01",
        },
      },
      stampId: "stamp01",
    },
    sku: { name: "payShield10K_LMK1_CPS60" },
    tags: { Dept: "hsm", Environment: "dogfood" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or Update a dedicated HSM in the specified subscription.
 *
 * @summary create or Update a dedicated HSM in the specified subscription.
 * x-ms-original-file: 2025-03-31/PaymentHsm_CreateOrUpdate_WithManagementProfile.json
 */
async function createANewOrUpdateAnExistingPaymentHSMWithManagementProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(
    credential,
    subscriptionId,
  );
  const result = await client.dedicatedHsm.createOrUpdate("hsm-group", "hsm1", {
    location: "westus",
    properties: {
      managementNetworkProfile: {
        networkInterfaces: [{ privateIpAddress: "1.0.0.2" }],
        subnet: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.Network/virtualNetworks/stamp01/subnets/stamp01",
        },
      },
      networkProfile: {
        networkInterfaces: [{ privateIpAddress: "1.0.0.1" }],
        subnet: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/hsm-group/providers/Microsoft.Network/virtualNetworks/stamp01/subnets/stamp01",
        },
      },
      stampId: "stamp01",
    },
    sku: { name: "payShield10K_LMK1_CPS60" },
    tags: { Dept: "hsm", Environment: "dogfood" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createANewOrUpdateAnExistingDedicatedHSM();
  await createANewOrUpdateAnExistingPaymentHSM();
  await createANewOrUpdateAnExistingPaymentHSMWithManagementProfile();
}

main().catch(console.error);
