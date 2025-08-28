// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update metadata of DigitalTwinsInstance.
 *
 * @summary Update metadata of DigitalTwinsInstance.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsPatch_example.json
 */

import type { DigitalTwinsPatchDescription } from "@azure/arm-digitaltwins";
import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchADigitalTwinsInstanceResource(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const digitalTwinsPatchDescription: DigitalTwinsPatchDescription = {
    tags: { purpose: "dev" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    digitalTwinsPatchDescription,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update metadata of DigitalTwinsInstance.
 *
 * @summary Update metadata of DigitalTwinsInstance.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsPatch_WithIdentity_example.json
 */
async function patchADigitalTwinsInstanceResourceWithIdentity(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const digitalTwinsPatchDescription: DigitalTwinsPatchDescription = {
    identity: { type: "None" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    digitalTwinsPatchDescription,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update metadata of DigitalTwinsInstance.
 *
 * @summary Update metadata of DigitalTwinsInstance.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsPatch_WithPublicNetworkAccess.json
 */
async function patchADigitalTwinsInstanceResourceWithPublicNetworkAccessProperty(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const digitalTwinsPatchDescription: DigitalTwinsPatchDescription = {
    properties: { publicNetworkAccess: "Disabled" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    digitalTwinsPatchDescription,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchADigitalTwinsInstanceResource();
  await patchADigitalTwinsInstanceResourceWithIdentity();
  await patchADigitalTwinsInstanceResourceWithPublicNetworkAccessProperty();
}

main().catch(console.error);
