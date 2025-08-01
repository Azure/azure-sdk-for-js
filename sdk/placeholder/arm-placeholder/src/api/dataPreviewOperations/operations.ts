// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DataPreviewRequest,
  dataPreviewRequestSerializer,
  DataPreviewResults,
  dataPreviewResultsDeserializer,
} from "../../models/azure/mgmt/placeholder/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { DataPreviewOperationsPreviewOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _previewSend(
  context: Client,
  location: string,
  body: DataPreviewRequest,
  options: DataPreviewOperationsPreviewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.MessagingConnectors/locations/{location}/dataPreview/default/preview{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: dataPreviewRequestSerializer(body),
    });
}

export async function _previewDeserialize(
  result: PathUncheckedResponse,
): Promise<DataPreviewResults> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dataPreviewResultsDeserializer(result.body);
}

/** create one dataPreview task */
export function preview(
  context: Client,
  location: string,
  body: DataPreviewRequest,
  options: DataPreviewOperationsPreviewOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataPreviewResults>, DataPreviewResults> {
  return getLongRunningPoller(context, _previewDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _previewSend(context, location, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DataPreviewResults>, DataPreviewResults>;
}
