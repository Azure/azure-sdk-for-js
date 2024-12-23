// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineSizesListParameters,
  paginate,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to This API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list)
 *
 * @summary This API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list)
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/computeRPCommonExamples/VirtualMachineSizes_List_MaximumSet_Gen.json
 */
async function virtualMachineSizesListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "-e";
  const options: VirtualMachineSizesListParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/vmSizes",
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

virtualMachineSizesListMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to This API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list)
 *
 * @summary This API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list)
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/computeRPCommonExamples/VirtualMachineSizes_List_MinimumSet_Gen.json
 */
async function virtualMachineSizesListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "._..";
  const options: VirtualMachineSizesListParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/vmSizes",
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

virtualMachineSizesListMinimumSetGen().catch(console.error);
