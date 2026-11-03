// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the tags for this Virtual Machine Image Template
 *
 * @summary update the tags for this Virtual Machine Image Template
 * x-ms-original-file: 2025-10-01/UpdateImageTemplateTags.json
 */
async function updateTheTagsForAnImageTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.update(
    "myResourceGroup",
    "myImageTemplate",
    { tags: { "new-tag": "new-value" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update the tags for this Virtual Machine Image Template
 *
 * @summary update the tags for this Virtual Machine Image Template
 * x-ms-original-file: 2025-10-01/UpdateImageTemplateToRemoveIdentities.json
 */
async function removeIdentitiesForAnImageTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.update(
    "myResourceGroup",
    "myImageTemplate",
    { identity: { type: "None" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update the tags for this Virtual Machine Image Template
 *
 * @summary update the tags for this Virtual Machine Image Template
 * x-ms-original-file: 2025-10-01/UpdateImageTemplateVmProfile.json
 */
async function updateParametersForVmProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.update(
    "myResourceGroup",
    "myImageTemplate",
    {
      properties: {
        vmProfile: {
          osDiskSizeGB: 127,
          vmSize: "{updated_vmsize}",
          vnetConfig: {
            containerInstanceSubnetId:
              "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/vnetname/subnets/subnetname",
            subnetId: "{updated_aci_subnet}",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateTheTagsForAnImageTemplate();
  await removeIdentitiesForAnImageTemplate();
  await updateParametersForVmProfile();
}

main().catch(console.error);
