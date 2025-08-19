// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TimeSeriesDatabaseConnection } from "@azure/arm-digitaltwins";
import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a time series database connection.
 *
 * @summary Create or update a time series database connection.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/TimeSeriesDatabaseConnectionsPut_WithUserIdentity_example.json
 */
async function createOrReplaceATimeSeriesDatabaseConnectionForADigitalTwinsInstanceWithUserAssignedIdentity(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const timeSeriesDatabaseConnectionName = "myConnection";
  const timeSeriesDatabaseConnectionDescription: TimeSeriesDatabaseConnection = {
    properties: {
      adxDatabaseName: "myDatabase",
      adxEndpointUri: "https://mycluster.kusto.windows.net",
      adxResourceId:
        "/subscriptions/c493073e-2460-45ba-a403-f3e0df1e9feg/resourceGroups/testrg/providers/Microsoft.Kusto/clusters/mycluster",
      adxTableName: "myTable",
      connectionType: "AzureDataExplorer",
      eventHubEndpointUri: "sb://myeh.servicebus.windows.net/",
      eventHubEntityPath: "myeh",
      eventHubNamespaceResourceId:
        "/subscriptions/c493073e-2460-45ba-a403-f3e0df1e9feg/resourceGroups/testrg/providers/Microsoft.EventHub/namespaces/myeh",
      identity: {
        type: "UserAssigned",
        userAssignedIdentity:
          "/subscriptions/50016170-c839-41ba-a724-51e9df440b9e/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.timeSeriesDatabaseConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    timeSeriesDatabaseConnectionName,
    timeSeriesDatabaseConnectionDescription,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update a time series database connection.
 *
 * @summary Create or update a time series database connection.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/TimeSeriesDatabaseConnectionsPut_example.json
 */
async function createOrReplaceATimeSeriesDatabaseConnectionForADigitalTwinsInstance(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const timeSeriesDatabaseConnectionName = "myConnection";
  const timeSeriesDatabaseConnectionDescription: TimeSeriesDatabaseConnection = {
    properties: {
      adxDatabaseName: "myDatabase",
      adxEndpointUri: "https://mycluster.kusto.windows.net",
      adxRelationshipLifecycleEventsTableName: "myRelationshipLifecycleEventsTable",
      adxResourceId:
        "/subscriptions/c493073e-2460-45ba-a403-f3e0df1e9feg/resourceGroups/testrg/providers/Microsoft.Kusto/clusters/mycluster",
      adxTableName: "myPropertyUpdatesTable",
      adxTwinLifecycleEventsTableName: "myTwinLifecycleEventsTable",
      connectionType: "AzureDataExplorer",
      eventHubEndpointUri: "sb://myeh.servicebus.windows.net/",
      eventHubEntityPath: "myeh",
      eventHubNamespaceResourceId:
        "/subscriptions/c493073e-2460-45ba-a403-f3e0df1e9feg/resourceGroups/testrg/providers/Microsoft.EventHub/namespaces/myeh",
      recordPropertyAndItemRemovals: "true",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.timeSeriesDatabaseConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    timeSeriesDatabaseConnectionName,
    timeSeriesDatabaseConnectionDescription,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceATimeSeriesDatabaseConnectionForADigitalTwinsInstanceWithUserAssignedIdentity();
  await createOrReplaceATimeSeriesDatabaseConnectionForADigitalTwinsInstance();
}

main().catch(console.error);
