// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates policy configuration for the Product.
 *
 * @summary creates or updates policy configuration for the Product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceProductPolicy.json
 */
async function apiManagementCreateWorkspaceProductPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceProductPolicy.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "5702e97e5157a50f48dce801",
    "policy",
    {
      format: "xml",
      value:
        '<policies>\r\n  <inbound>\r\n    <rate-limit calls="{{call-count}}" renewal-period="15"></rate-limit>\r\n    <log-to-eventhub logger-id="16">\r\n                      @( string.Join(",", DateTime.UtcNow, context.Deployment.ServiceName, context.RequestId, context.Request.IpAddress, context.Operation.Name) ) \r\n                  </log-to-eventhub>\r\n    <quota-by-key calls="40" counter-key="cc" renewal-period="3600" increment-count="@(context.Request.Method == &quot;POST&quot; ? 1:2)" />\r\n    <base />\r\n  </inbound>\r\n  <backend>\r\n    <base />\r\n  </backend>\r\n  <outbound>\r\n    <base />\r\n  </outbound>\r\n</policies>',
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceProductPolicy();
}

main().catch(console.error);
