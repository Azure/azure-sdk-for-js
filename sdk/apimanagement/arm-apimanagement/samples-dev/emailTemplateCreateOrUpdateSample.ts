// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EmailTemplateUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an Email Template.
 *
 * @summary Updates an Email Template.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateTemplate.json
 */
async function apiManagementCreateTemplate(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const templateName = "newIssueNotificationMessage";
  const parameters: EmailTemplateUpdateParameters = {
    subject: "Your request for $IssueName was successfully received.",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.emailTemplate.createOrUpdate(
    resourceGroupName,
    serviceName,
    templateName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateTemplate();
}

main().catch(console.error);
