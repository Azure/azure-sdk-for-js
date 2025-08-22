// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete an Annotation of an Application Insights component.
 *
 * @summary Delete an Annotation of an Application Insights component.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2015-05-01/examples/AnnotationsDelete.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function annotationsDelete(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const resourceName = "my-component";
  const annotationId = "bb820f1b-3110-4a8b-ba2c-8c1129d7eb6a";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.annotations.delete(
    resourceGroupName,
    resourceName,
    annotationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await annotationsDelete();
}

main().catch(console.error);
