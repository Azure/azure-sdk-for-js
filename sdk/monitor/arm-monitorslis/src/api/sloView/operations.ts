// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { SignalPreviewSliProperties, KqlmQueryResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  signalPreviewSliPropertiesSerializer,
  kqlmQueryResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SloViewSliSignalPreviewOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _sliSignalPreviewSend(
  context: Client,
  serviceGroupName: string,
  body: SignalPreviewSliProperties,
  options: SloViewSliSignalPreviewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.Monitor/sliSignalPreview{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: signalPreviewSliPropertiesSerializer(body),
  });
}

export async function _sliSignalPreviewDeserialize(
  result: PathUncheckedResponse,
): Promise<KqlmQueryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return kqlmQueryResultDeserializer(result.body);
}

/** Returns preview data for the signal. */
export async function sliSignalPreview(
  context: Client,
  serviceGroupName: string,
  body: SignalPreviewSliProperties,
  options: SloViewSliSignalPreviewOptionalParams = { requestOptions: {} },
): Promise<KqlmQueryResult> {
  const result = await _sliSignalPreviewSend(context, serviceGroupName, body, options);
  return _sliSignalPreviewDeserialize(result);
}
