// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new workbook template.
 *
 * @summary create a new workbook template.
 * x-ms-original-file: 2020-11-20/WorkbookTemplateAdd.json
 */
async function workbookTemplateAdd() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbookTemplates.createOrUpdate(
    "my-resource-group",
    "testtemplate2",
    {
      location: "west us",
      author: "Contoso",
      galleries: [
        {
          name: "Simple Template",
          type: "tsg",
          category: "Failures",
          order: 100,
          resourceType: "microsoft.insights/components",
        },
      ],
      priority: 1,
      templateData: {
        $schema:
          "https://github.com/Microsoft/Application-Insights-Workbooks/blob/master/schema/workbook.json",
        items: [
          {
            name: "text - 2",
            type: 1,
            content: {
              json: "## New workbook\n---\n\nWelcome to your new workbook.  This area will display text formatted as markdown.\n\n\nWe've included a basic analytics query to get you started. Use the `Edit` button below each section to configure it or add more sections.",
            },
          },
          {
            name: "query - 2",
            type: 3,
            content: {
              exportToExcelOptions: "visible",
              query:
                "union withsource=TableName *\n| summarize Count=count() by TableName\n| render barchart",
              queryType: 0,
              resourceType: "microsoft.operationalinsights/workspaces",
              size: 1,
              version: "KqlItem/1.0",
            },
          },
        ],
        styleSettings: {},
        version: "Notebook/1.0",
      },
    },
  );
  console.log(result);
}

async function main() {
  await workbookTemplateAdd();
}

main().catch(console.error);
