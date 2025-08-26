// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a transformation or replaces an already existing transformation under an existing streaming job.
 *
 * @summary Creates a transformation or replaces an already existing transformation under an existing streaming job.
 * x-ms-original-file: specification/streamanalytics/resource-manager/Microsoft.StreamAnalytics/preview/2021-10-01-preview/examples/Transformation_Create.json
 */

import type { Transformation } from "@azure/arm-streamanalytics";
import { StreamAnalyticsManagementClient } from "@azure/arm-streamanalytics";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createATransformation(): Promise<void> {
  const subscriptionId =
    process.env["STREAMANALYTICS_SUBSCRIPTION_ID"] || "56b5e0a9-b645-407d-99b0-c64f86013e3d";
  const resourceGroupName = process.env["STREAMANALYTICS_RESOURCE_GROUP"] || "sjrg4423";
  const jobName = "sj8374";
  const transformationName = "transformation952";
  const transformation: Transformation = {
    query: "Select Id, Name from inputtest",
    streamingUnits: 6,
  };
  const credential = new DefaultAzureCredential();
  const client = new StreamAnalyticsManagementClient(credential, subscriptionId);
  const result = await client.transformations.createOrReplace(
    resourceGroupName,
    jobName,
    transformationName,
    transformation,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createATransformation();
}

main().catch(console.error);
