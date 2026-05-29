// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new workbook.
 *
 * @summary create a new workbook.
 * x-ms-original-file: 2023-06-01/WorkbookAdd.json
 */
async function workbookAdd() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbooks.createOrUpdate(
    "my-resource-group",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
    {
      kind: "shared",
      location: "westus",
      description: "Sample workbook",
      category: "workbook",
      displayName: "Sample workbook",
      serializedData:
        '{"version":"Notebook/1.0","items":[{"type":1,"content":"{"json":"## New workbook\\r\\n---\\r\\n\\r\\nWelcome to your new workbook.  This area will display text formatted as markdown.\\r\\n\\r\\n\\r\\nWe\'ve included a basic analytics query to get you started. Use the `Edit` button below each section to configure it or add more sections."}","halfWidth":null,"conditionalVisibility":null},{"type":3,"content":"{"version":"KqlItem/1.0","query":"union withsource=TableName *\\n| summarize Count=count() by TableName\\n| render barchart","showQuery":false,"size":1,"aggregation":0,"showAnnotations":false}","halfWidth":null,"conditionalVisibility":null}],"isLocked":false}',
      tags: { TagSample01: "sample01", TagSample02: "sample02" },
    },
    {
      sourceId:
        "/subscriptions/6b643656-33eb-422f-aee8-3ac145d124af/resourcegroups/my-resource-group",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new workbook.
 *
 * @summary create a new workbook.
 * x-ms-original-file: 2023-06-01/WorkbookManagedAdd.json
 */
async function workbookManagedAdd() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbooks.createOrUpdate(
    "my-resource-group",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/my-resource-group/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myid":
            {},
        },
      },
      kind: "shared",
      location: "westus",
      description: "Sample workbook",
      category: "workbook",
      displayName: "Sample workbook",
      serializedData:
        '{"version":"Notebook/1.0","items":[{"type":1,"content":{"json":"test"},"name":"text - 0"}],"isLocked":false,"fallbackResourceIds":["/subscriptions/00000000-0000-0000-0000-00000000/resourceGroups/my-resource-group"]}',
      storageUri:
        "/subscriptions/6b643656-33eb-422f-aee8-3ac145d124af/resourceGroups/my-resource-group/providers/Microsoft.Storage/storageAccounts/mystorage/blobServices/default/containers/mycontainer",
      version: "Notebook/1.0",
    },
    {
      sourceId:
        "/subscriptions/6b643656-33eb-422f-aee8-3ac145d124af/resourcegroups/my-resource-group",
    },
  );
  console.log(result);
}

async function main() {
  await workbookAdd();
  await workbookManagedAdd();
}

main().catch(console.error);
