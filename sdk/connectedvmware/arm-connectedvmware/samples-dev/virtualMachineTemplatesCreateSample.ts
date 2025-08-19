// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create Or Update virtual machine template.
 *
 * @summary Create Or Update virtual machine template.
 * x-ms-original-file: specification/connectedvmware/resource-manager/Microsoft.ConnectedVMwarevSphere/stable/2023-10-01/examples/CreateVirtualMachineTemplate.json
 */

import type {
  VirtualMachineTemplate,
  VirtualMachineTemplatesCreateOptionalParams,
} from "@azure/arm-connectedvmware";
import { AzureArcVMwareManagementServiceAPI } from "@azure/arm-connectedvmware";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createVirtualMachineTemplate(): Promise<void> {
  const subscriptionId =
    process.env["CONNECTEDVMWARE_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["CONNECTEDVMWARE_RESOURCE_GROUP"] || "testrg";
  const virtualMachineTemplateName = "WebFrontEndTemplate";
  const body: VirtualMachineTemplate = {
    extendedLocation: {
      name: "/subscriptions/a5015e1c-867f-4533-8541-85cd470d0cfb/resourceGroups/demoRG/providers/Microsoft.ExtendedLocation/customLocations/contoso",
      type: "customLocation",
    },
    location: "East US",
    moRefId: "aaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    vCenterId:
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.ConnectedVMwarevSphere/VCenters/ContosoVCenter",
  };
  const options: VirtualMachineTemplatesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new AzureArcVMwareManagementServiceAPI(credential, subscriptionId);
  const result = await client.virtualMachineTemplates.beginCreateAndWait(
    resourceGroupName,
    virtualMachineTemplateName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createVirtualMachineTemplate();
}

main().catch(console.error);
