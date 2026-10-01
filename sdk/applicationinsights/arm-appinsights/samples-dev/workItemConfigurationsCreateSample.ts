// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a work item configuration for an Application Insights component.
 *
 * @summary create a work item configuration for an Application Insights component.
 * x-ms-original-file: 2015-05-01/WorkItemConfigCreate.json
 */
async function workItemConfigurationsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workItemConfigurations.create("my-resource-group", "my-component", {
    connectorDataConfiguration:
      '{"VSOAccountBaseUrl":"https://testtodelete.visualstudio.com","ProjectCollection":"DefaultCollection","Project":"todeletefirst","ResourceId":"d0662b05-439a-4a1b-840b-33a7f8b42ebf","Custom":"{\\"/fields/System.WorkItemType\\":\\"Bug\\",\\"/fields/System.AreaPath\\":\\"todeletefirst\\",\\"/fields/System.AssignedTo\\":\\"\\"}"}',
    connectorId: "d334e2a4-6733-488e-8645-a9fdc1694f41",
    validateOnly: true,
    workItemProperties: { name: "Title", value: "Validate Only Title" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workItemConfigurationsCreate();
}

main().catch(console.error);
