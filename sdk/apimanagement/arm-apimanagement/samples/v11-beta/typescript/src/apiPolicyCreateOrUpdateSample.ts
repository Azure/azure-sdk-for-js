// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates policy configuration for the API.
 *
 * @summary creates or updates policy configuration for the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiPolicy.json
 */
async function apiManagementCreateApiPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiPolicy.createOrUpdate(
    "rg1",
    "apimService1",
    "5600b57e7e8880006a040001",
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
 * This sample demonstrates how to creates or updates policy configuration for the API.
 *
 * @summary creates or updates policy configuration for the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiPolicyNonXmlEncoded.json
 */
async function apiManagementCreateApiPolicyNonXmlEncoded(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiPolicy.createOrUpdate(
    "rg1",
    "apimService1",
    "5600b57e7e8880006a040001",
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
  await apiManagementCreateApiPolicy();
  await apiManagementCreateApiPolicyNonXmlEncoded();
}

main().catch(console.error);
