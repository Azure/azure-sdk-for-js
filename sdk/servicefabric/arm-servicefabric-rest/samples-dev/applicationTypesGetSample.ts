// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource.
 *
 * @summary Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource.
 * x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ApplicationTypeNameGetOperation_example.json
 */

import ServiceFabricManagementClient from "@azure-rest/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";

async function getAnApplicationType(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "resRg";
  const clusterName = "myCluster";
  const applicationTypeName = "myAppType";
  const credential = new DefaultAzureCredential();
  const client = ServiceFabricManagementClient(credential);
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}",
      subscriptionId,
      resourceGroupName,
      clusterName,
      applicationTypeName,
    )
    .get();
  console.log(result);
}

getAnApplicationType().catch(console.error);
