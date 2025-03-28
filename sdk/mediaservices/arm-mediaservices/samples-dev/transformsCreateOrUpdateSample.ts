/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { Transform } from "@azure/arm-mediaservices";
import { AzureMediaServices } from "@azure/arm-mediaservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a new Transform.
 *
 * @summary Creates or updates a new Transform.
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Encoding/stable/2022-07-01/examples/transforms-create.json
 */
async function createOrUpdateATransform(): Promise<void> {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MEDIASERVICES_RESOURCE_GROUP"] || "contosoresources";
  const accountName = "contosomedia";
  const transformName = "createdTransform";
  const parameters: Transform = {
    description: "Example Transform to illustrate create and update.",
    outputs: [
      {
        preset: {
          odataType: "#Microsoft.Media.BuiltInStandardEncoderPreset",
          presetName: "AdaptiveStreaming",
        },
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.transforms.createOrUpdate(
    resourceGroupName,
    accountName,
    transformName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateATransform();
}

main().catch(console.error);
