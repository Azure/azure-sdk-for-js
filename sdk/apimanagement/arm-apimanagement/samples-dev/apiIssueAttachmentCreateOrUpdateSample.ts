// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  IssueAttachmentContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new Attachment for the Issue in an API or updates an existing one.
 *
 * @summary Creates a new Attachment for the Issue in an API or updates an existing one.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateApiIssueAttachment.json
 */
async function apiManagementCreateApiIssueAttachment(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "57d1f7558aa04f15146d9d8a";
  const issueId = "57d2ef278aa04f0ad01d6cdc";
  const attachmentId = "57d2ef278aa04f0888cba3f3";
  const parameters: IssueAttachmentContract = {
    content: "IEJhc2U2NA==",
    contentFormat: "image/jpeg",
    title: "Issue attachment.",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiIssueAttachment.createOrUpdate(
    resourceGroupName,
    serviceName,
    apiId,
    issueId,
    attachmentId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiIssueAttachment();
}

main().catch(console.error);
