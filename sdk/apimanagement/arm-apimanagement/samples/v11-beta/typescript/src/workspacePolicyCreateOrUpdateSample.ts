// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates policy configuration for the workspace.
 *
 * @summary creates or updates policy configuration for the workspace.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspacePolicy.json
 */
async function apiManagementCreateWorkspacePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicy.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "policy",
    {
      format: "xml",
      value:
        "<policies> <inbound /> <backend>    <forward-request />  </backend>  <outbound /></policies>",
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates policy configuration for the workspace.
 *
 * @summary creates or updates policy configuration for the workspace.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspacePolicyNonXmlEncoded.json
 */
async function apiManagementCreateWorkspacePolicyNonXmlEncoded(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicy.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "policy",
    {
      format: "rawxml",
      value:
        '<policies>\r\n     <inbound>\r\n     <base />\r\n  <set-header name="newvalue" exists-action="override">\r\n   <value>"@(context.Request.Headers.FirstOrDefault(h => h.Ke=="Via"))" </value>\r\n    </set-header>\r\n  </inbound>\r\n      </policies>',
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspacePolicy();
  await apiManagementCreateWorkspacePolicyNonXmlEncoded();
}

main().catch(console.error);
