// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementContext as Client } from "./index.js";
import {
  MitigateJobRequest,
  mitigateJobRequestSerializer,
  apiErrorDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import { MitigateOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _mitigateSend(
  context: Client,
  jobName: string,
  resourceGroupName: string,
  mitigateJobRequest: MitigateJobRequest,
  options: MitigateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/mitigate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: mitigateJobRequestSerializer(mitigateJobRequest),
    });
}

export async function _mitigateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Request to mitigate for a given job */
export async function mitigate(
  context: Client,
  jobName: string,
  resourceGroupName: string,
  mitigateJobRequest: MitigateJobRequest,
  options: MitigateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _mitigateSend(
    context,
    jobName,
    resourceGroupName,
    mitigateJobRequest,
    options,
  );
  return _mitigateDeserialize(result);
}
