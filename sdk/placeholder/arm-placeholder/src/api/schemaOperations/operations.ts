// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SchemaRequestProperties,
  schemaRequestPropertiesSerializer,
  SchemaResult,
  schemaResultDeserializer,
} from "../../models/azure/mgmt/placeholder/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { SchemaOperationsFetchOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _fetchSend(
  context: Client,
  location: string,
  body: SchemaRequestProperties,
  options: SchemaOperationsFetchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.MessagingConnectors/locations/{location}/schema/default/fetch{?api%2Dversion}",
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
      body: schemaRequestPropertiesSerializer(body),
    });
}

export async function _fetchDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schemaResultDeserializer(result.body);
}

/** fetch Schema task */
export function fetch(
  context: Client,
  location: string,
  body: SchemaRequestProperties,
  options: SchemaOperationsFetchOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SchemaResult>, SchemaResult> {
  return getLongRunningPoller(context, _fetchDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _fetchSend(context, location, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SchemaResult>, SchemaResult>;
}
