// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new developer portal's content item specified by the provided content type.
 *
 * @summary Creates a new developer portal's content item specified by the provided content type.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateContentTypeContentItem.json
 */

import {
  ContentItemContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateContentTypeContentItem(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const contentTypeId = "page";
  const contentItemId = "4e3cf6a5-574a-ba08-1f23-2e7a38faa6d8";
  const parameters: ContentItemContract = {
    properties: {
      enUs: {
        description: "Short story about the company.",
        documentId:
          "contentTypes/document/contentItems/4e3cf6a5-574a-ba08-1f23-2e7a38faa6d8",
        keywords: "company, about",
        permalink: "/about",
        title: "About",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.contentItem.createOrUpdate(
    resourceGroupName,
    serviceName,
    contentTypeId,
    contentItemId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateContentTypeContentItem();
}

main().catch(console.error);
