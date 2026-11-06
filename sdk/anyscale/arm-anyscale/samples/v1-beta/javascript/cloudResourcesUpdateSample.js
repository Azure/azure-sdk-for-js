// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a cloud resource
 *
 * @summary update a cloud resource
 * x-ms-original-file: 2026-09-01/CloudResources_Update.json
 */
async function cloudResourcesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.cloudResources.update(
    "rganyscale",
    "AnyscaleCloud",
    "AnyscaleCloudResource",
    {
      tags: { environment: "staging", team: "ml-platform" },
      properties: {
        provider: "AWS",
        computeStack: "K8S",
        cloudStorageBucketName: "s3://anyscale-storage",
        cloudStorageBucketEndpoint: "https://anyscale-storage.s3.us-west-2.amazonaws.com",
        anyscaleOperatorIamIdentity: "arn:aws:iam::123456789012:role/anyscale-operator",
      },
    },
  );
  console.log(result);
}

async function main() {
  await cloudResourcesUpdate();
}

main().catch(console.error);
