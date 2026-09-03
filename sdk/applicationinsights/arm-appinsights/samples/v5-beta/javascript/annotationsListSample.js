// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of annotations for a component for given time range
 *
 * @summary gets the list of annotations for a component for given time range
 * x-ms-original-file: 2015-05-01/AnnotationsList.json
 */
async function annotationsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.annotations.list(
    "my-resource-group",
    "my-component",
    "2018-02-05T00%253A30%253A00.000Z",
    "2018-02-06T00%253A33A00.000Z",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await annotationsList();
}

main().catch(console.error);
