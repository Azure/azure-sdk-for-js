// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  CloudServiceOperatingSystemsListOSVersionsParameters,
  paginate,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a list of all guest operating system versions available to be specified in the XML service configuration (.cscfg) for a cloud service. Use nextLink property in the response to get the next page of OS versions. Do this till nextLink is null to fetch all the OS versions.
 *
 * @summary Gets a list of all guest operating system versions available to be specified in the XML service configuration (.cscfg) for a cloud service. Use nextLink property in the response to get the next page of OS versions. Do this till nextLink is null to fetch all the OS versions.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceOSVersion_List.json
 */
async function listCloudServiceOSVersionsInASubscription() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "westus2";
  const options: CloudServiceOperatingSystemsListOSVersionsParameters = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsVersions",
      subscriptionId,
      location,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listCloudServiceOSVersionsInASubscription().catch(console.error);
