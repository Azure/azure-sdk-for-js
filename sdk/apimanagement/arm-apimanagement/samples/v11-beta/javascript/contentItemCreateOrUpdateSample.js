// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new developer portal's content item specified by the provided content type.
 *
 * @summary creates a new developer portal's content item specified by the provided content type.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateContentTypeContentItem.json
 */
async function apiManagementCreateContentTypeContentItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.contentItem.createOrUpdate(
    "rg1",
    "apimService1",
    "page",
    "4e3cf6a5-574a-ba08-1f23-2e7a38faa6d8",
    {
      properties: {
        en_us: {
          description: "Short story about the company.",
          documentId: "contentTypes/document/contentItems/4e3cf6a5-574a-ba08-1f23-2e7a38faa6d8",
          keywords: "company, about",
          permalink: "/about",
          title: "About",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateContentTypeContentItem();
}

main().catch(console.error);
