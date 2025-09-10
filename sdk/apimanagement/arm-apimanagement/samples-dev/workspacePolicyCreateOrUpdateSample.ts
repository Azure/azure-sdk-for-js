// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates policy configuration for the workspace.
 *
 * @summary Creates or updates policy configuration for the workspace.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspacePolicy.json
 */

import {
  PolicyContract,
  WorkspacePolicyCreateOrUpdateOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateWorkspacePolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const policyId = "policy";
  const ifMatch = "*";
  const parameters: PolicyContract = {
    format: "xml",
    value:
      "<policies> <inbound /> <backend>    <forward-request />  </backend>  <outbound /></policies>",
  };
  const options: WorkspacePolicyCreateOrUpdateOptionalParams = { ifMatch };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicy.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceId,
    policyId,
    parameters,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates policy configuration for the workspace.
 *
 * @summary Creates or updates policy configuration for the workspace.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspacePolicyNonXmlEncoded.json
 */
async function apiManagementCreateWorkspacePolicyNonXmlEncoded(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const policyId = "policy";
  const ifMatch = "*";
  const parameters: PolicyContract = {
    format: "rawxml",
    value:
      '<policies>\r\n     <inbound>\r\n     <base />\r\n  <set-header name="newvalue" exists-action="override">\r\n   <value>"@(context.Request.Headers.FirstOrDefault(h => h.Ke=="Via"))" </value>\r\n    </set-header>\r\n  </inbound>\r\n      </policies>',
  };
  const options: WorkspacePolicyCreateOrUpdateOptionalParams = { ifMatch };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicy.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceId,
    policyId,
    parameters,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspacePolicy();
  await apiManagementCreateWorkspacePolicyNonXmlEncoded();
}

main().catch(console.error);
