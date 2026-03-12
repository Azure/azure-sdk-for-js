// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create/Update tag description in scope of the Api.
 *
 * @summary Create/Update tag description in scope of the Api.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateApiTagDescription.json
 */

import {
  TagDescriptionCreateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateApiTagDescription(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "5931a75ae4bbd512a88c680b";
  const tagDescriptionId = "tagId1";
  const parameters: TagDescriptionCreateParameters = {
    description:
      "Some description that will be displayed for operation's tag if the tag is assigned to operation of the API",
    externalDocsDescription: "Description of the external docs resource",
    externalDocsUrl: "http://some.url/additionaldoc",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiTagDescription.createOrUpdate(
    resourceGroupName,
    serviceName,
    apiId,
    tagDescriptionId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiTagDescription();
}

main().catch(console.error);
