// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the annotation for given id.
 *
 * @summary get the annotation for given id.
 * x-ms-original-file: 2015-05-01/AnnotationsGet.json
 */
async function annotationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.annotations.get(
    "my-resource-group",
    "my-component",
    "444e2c08-274a-4bbb-a89e-d77bb720f44a",
  );
  console.log(result);
}

async function main() {
  await annotationsGet();
}

main().catch(console.error);
