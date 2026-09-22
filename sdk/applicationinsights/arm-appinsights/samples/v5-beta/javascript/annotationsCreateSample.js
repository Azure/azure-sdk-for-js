// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create an Annotation of an Application Insights component.
 *
 * @summary create an Annotation of an Application Insights component.
 * x-ms-original-file: 2015-05-01/AnnotationsCreate.json
 */
async function annotationsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.annotations.create("my-resource-group", "my-component", {
    annotationName: "TestAnnotation",
    category: "Text",
    eventTime: new Date("2018-01-31T13:41:38.657Z"),
    id: "444e2c08-274a-4bbb-a89e-d77bb720f44a",
    properties: '{"Comments":"Testing","Label":"Success"}',
  });
  console.log(result);
}

async function main() {
  await annotationsCreate();
}

main().catch(console.error);
