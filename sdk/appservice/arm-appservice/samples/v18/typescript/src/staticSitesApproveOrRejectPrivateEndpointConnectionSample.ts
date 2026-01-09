// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RemotePrivateEndpointConnectionARMResource} from "@azure/arm-appservice";
import {
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Approves or rejects a private endpoint connection
 *
 * @summary Description for Approves or rejects a private endpoint connection
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/ApproveRejectSitePrivateEndpointConnection.json
 */
async function approvesOrRejectsAPrivateEndpointConnectionForASite(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testSite";
  const privateEndpointConnectionName = "connection";
  const privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource = {
    privateLinkServiceConnectionState: {
      description: "Approved by admin.",
      actionsRequired: "",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result =
    await client.staticSites.beginApproveOrRejectPrivateEndpointConnectionAndWait(
      resourceGroupName,
      name,
      privateEndpointConnectionName,
      privateEndpointWrapper,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await approvesOrRejectsAPrivateEndpointConnectionForASite();
}

main().catch(console.error);
