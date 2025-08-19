// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the tags for this Virtual Machine Image Template
 *
 * @summary Update the tags for this Virtual Machine Image Template
 * x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2024-02-01/examples/UpdateImageTemplateToRemoveIdentities.json
 */

import type { ImageTemplateUpdateParameters } from "@azure/arm-imagebuilder";
import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function removeIdentitiesForAnImageTemplate(): Promise<void> {
  const subscriptionId = process.env["IMAGEBUILDER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["IMAGEBUILDER_RESOURCE_GROUP"] || "myResourceGroup";
  const imageTemplateName = "myImageTemplate";
  const parameters: ImageTemplateUpdateParameters = {
    identity: { type: "None" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.beginUpdateAndWait(
    resourceGroupName,
    imageTemplateName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update the tags for this Virtual Machine Image Template
 *
 * @summary Update the tags for this Virtual Machine Image Template
 * x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2024-02-01/examples/UpdateImageTemplateVmProfile.json
 */
async function updateParametersForVMProfile(): Promise<void> {
  const subscriptionId = process.env["IMAGEBUILDER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["IMAGEBUILDER_RESOURCE_GROUP"] || "myResourceGroup";
  const imageTemplateName = "myImageTemplate";
  const parameters: ImageTemplateUpdateParameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.beginUpdateAndWait(
    resourceGroupName,
    imageTemplateName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update the tags for this Virtual Machine Image Template
 *
 * @summary Update the tags for this Virtual Machine Image Template
 * x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2024-02-01/examples/UpdateImageTemplateTags.json
 */
async function updateTheTagsForAnImageTemplate(): Promise<void> {
  const subscriptionId = process.env["IMAGEBUILDER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["IMAGEBUILDER_RESOURCE_GROUP"] || "myResourceGroup";
  const imageTemplateName = "myImageTemplate";
  const parameters: ImageTemplateUpdateParameters = {
    tags: { newTag: "new-value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.beginUpdateAndWait(
    resourceGroupName,
    imageTemplateName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await removeIdentitiesForAnImageTemplate();
  await updateParametersForVMProfile();
  await updateTheTagsForAnImageTemplate();
}

main().catch(console.error);
