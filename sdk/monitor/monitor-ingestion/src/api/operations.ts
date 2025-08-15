// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LogsIngestionContext as Client } from "./index.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import { UploadOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _uploadSend(
  context: Client,
  ruleId: string,
  streamName: string,
  body: Record<string, any>[],
  options: UploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/dataCollectionRules/{ruleId}/streams/{stream}{?api%2Dversion}",
    {
      ruleId: ruleId,
      stream: streamName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.contentEncoding !== undefined
        ? { "Content-Encoding": options?.contentEncoding }
        : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: body.map((p: any) => {
      return p;
    }),
  });
}

export async function _uploadDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Ingestion API used to directly ingest data using Data Collection Rules. */
export async function upload(
  context: Client,
  ruleId: string,
  streamName: string,
  body: Record<string, any>[],
  options: UploadOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _uploadSend(context, ruleId, streamName, body, options);
  return _uploadDeserialize(result);
}
