// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an Annotation of an Application Insights component.
 *
 * @summary delete an Annotation of an Application Insights component.
 * x-ms-original-file: 2015-05-01/AnnotationsDelete.json
 */
async function annotationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.annotations.delete(
    "my-resource-group",
    "my-component",
    "bb820f1b-3110-4a8b-ba2c-8c1129d7eb6a",
  );
}

async function main() {
  await annotationsDelete();
}

main().catch(console.error);
