// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a cloud resource
 *
 * @summary create or update a cloud resource
 * x-ms-original-file: 2026-09-01/CloudResources_CreateOrUpdate.json
 */
async function cloudResourcesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.cloudResources.createOrUpdate(
    "rganyscale",
    "AnyscaleCloud",
    "AnyscaleCloudResource",
    {
      properties: {
        provider: "AWS",
        computeStack: "K8S",
        cloudStorageBucketName: "s3://anyscale-storage",
        cloudStorageBucketEndpoint: "https://anyscale-storage.s3.us-west-2.amazonaws.com",
        region: "us-west-2",
        cloudStorageBucketRegion: "us-west-2",
        anyscaleOperatorIamIdentity: "arn:aws:iam::123456789012:role/anyscale-operator",
      },
      tags: { environment: "production", team: "ml-platform" },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cloudResourcesCreateOrUpdate();
}

main().catch(console.error);
