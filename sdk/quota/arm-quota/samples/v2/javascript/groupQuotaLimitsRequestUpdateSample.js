// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create the GroupQuota requests for a specific ResourceProvider/Location/Resource. The resourceName properties are specified in the request body. Only 1 resource quota can be requested. Please note that patch request creates a new groupQuota request.
 * Use the polling API - OperationsStatus URI specified in Azure-AsyncOperation header field, with retry-after duration in seconds to check the intermediate status. This API provides the finals status with the request details and status.
 *
 * @summary create the GroupQuota requests for a specific ResourceProvider/Location/Resource. The resourceName properties are specified in the request body. Only 1 resource quota can be requested. Please note that patch request creates a new groupQuota request.
 * Use the polling API - OperationsStatus URI specified in Azure-AsyncOperation header field, with retry-after duration in seconds to check the intermediate status. This API provides the finals status with the request details and status.
 * x-ms-original-file: 2025-09-01/GroupQuotaLimitsRequests/PatchGroupQuotaLimitsRequests-Compute.json
 */
async function groupQuotaLimitsRequestsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.groupQuotaLimitsRequest.update(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
    "Microsoft.Compute",
    "westus",
    {
      groupQuotaRequest: {
        properties: {
          value: [
            {
              properties: {
                comment: "Contoso requires more quota.",
                limit: 110,
                resourceName: "standardddv4family",
              },
            },
            {
              properties: {
                comment: "Contoso requires more quota.",
                limit: 110,
                resourceName: "standardav2family",
              },
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await groupQuotaLimitsRequestsUpdate();
}

main().catch(console.error);
