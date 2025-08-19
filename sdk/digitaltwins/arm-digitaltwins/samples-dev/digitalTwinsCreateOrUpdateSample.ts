// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update the metadata of a DigitalTwinsInstance. The usual pattern to modify a property is to retrieve the DigitalTwinsInstance and security metadata, and then combine them with the modified values in a new body to update the DigitalTwinsInstance.
 *
 * @summary Create or update the metadata of a DigitalTwinsInstance. The usual pattern to modify a property is to retrieve the DigitalTwinsInstance and security metadata, and then combine them with the modified values in a new body to update the DigitalTwinsInstance.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsPut_example.json
 */

import type { DigitalTwinsDescription } from "@azure/arm-digitaltwins";
import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putADigitalTwinsInstanceResource(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const digitalTwinsCreate: DigitalTwinsDescription = { location: "WestUS2" };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    digitalTwinsCreate,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update the metadata of a DigitalTwinsInstance. The usual pattern to modify a property is to retrieve the DigitalTwinsInstance and security metadata, and then combine them with the modified values in a new body to update the DigitalTwinsInstance.
 *
 * @summary Create or update the metadata of a DigitalTwinsInstance. The usual pattern to modify a property is to retrieve the DigitalTwinsInstance and security metadata, and then combine them with the modified values in a new body to update the DigitalTwinsInstance.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsPut_WithIdentity_example.json
 */
async function putADigitalTwinsInstanceResourceWithIdentity(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const digitalTwinsCreate: DigitalTwinsDescription = {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/50016170C83941baA72451e9df440b9e/resourceGroups/testrg/providers/MicrosoftManagedIdentity/userAssignedIdentities/testidentity":
          {},
      },
    },
    location: "WestUS2",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    digitalTwinsCreate,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update the metadata of a DigitalTwinsInstance. The usual pattern to modify a property is to retrieve the DigitalTwinsInstance and security metadata, and then combine them with the modified values in a new body to update the DigitalTwinsInstance.
 *
 * @summary Create or update the metadata of a DigitalTwinsInstance. The usual pattern to modify a property is to retrieve the DigitalTwinsInstance and security metadata, and then combine them with the modified values in a new body to update the DigitalTwinsInstance.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsPut_WithPublicNetworkAccess.json
 */
async function putADigitalTwinsInstanceResourceWithPublicNetworkAccessProperty(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const digitalTwinsCreate: DigitalTwinsDescription = {
    location: "WestUS2",
    publicNetworkAccess: "Enabled",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    digitalTwinsCreate,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putADigitalTwinsInstanceResource();
  await putADigitalTwinsInstanceResourceWithIdentity();
  await putADigitalTwinsInstanceResourceWithPublicNetworkAccessProperty();
}

main().catch(console.error);
