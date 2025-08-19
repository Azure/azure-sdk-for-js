// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns virtual machine templates by its name
 *
 * @summary Returns virtual machine templates by its name
 * x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetVirtualMachineTemplate.json
 */

import { VMwareCloudSimple } from "@azure/arm-vmwarecloudsimple";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getVirtualMachineTemplate(): Promise<void> {
  const subscriptionId = process.env["VMWARECLOUDSIMPLE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const regionId = "westus2";
  const pcName = "myPrivateCloud";
  const virtualMachineTemplateName = "vm-34";
  const credential = new DefaultAzureCredential();
  const client = new VMwareCloudSimple(credential, subscriptionId);
  const result = await client.virtualMachineTemplates.get(
    regionId,
    pcName,
    virtualMachineTemplateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualMachineTemplate();
}

main().catch(console.error);
