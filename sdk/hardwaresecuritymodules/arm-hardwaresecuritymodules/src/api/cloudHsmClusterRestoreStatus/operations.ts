// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDedicatedHSMResourceProviderContext as Client } from "../index.js";
import type { RestoreResult } from "../../models/models.js";
import { errorResponseDeserializer, restoreResultDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { CloudHsmClusterRestoreStatusGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  jobId: string,
  options: CloudHsmClusterRestoreStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/restoreOperationStatus/{jobId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreResult | void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (!result.body) {
    return;
  }

  return restoreResultDeserializer(result.body);
}
/** Gets the restore operation status of the specified Cloud HSM Cluster */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  jobId: string,
  options: CloudHsmClusterRestoreStatusGetOptionalParams = { requestOptions: {} },
): Promise<RestoreResult | void> {
  const result = await _getSend(context, resourceGroupName, cloudHsmClusterName, jobId, options);
  return _getDeserialize(result);
}
