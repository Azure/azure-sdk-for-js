// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create/Update tag description in scope of the Api.
 *
 * @summary create/Update tag description in scope of the Api.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiTagDescription.json
 */
async function apiManagementCreateApiTagDescription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiTagDescription.createOrUpdate(
    "rg1",
    "apimService1",
    "5931a75ae4bbd512a88c680b",
    "tagId1",
    {
      description:
        "Some description that will be displayed for operation's tag if the tag is assigned to operation of the API",
      externalDocsDescription: "Description of the external docs resource",
      externalDocsUrl: "http://some.url/additionaldoc",
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateApiTagDescription();
}

main().catch(console.error);
