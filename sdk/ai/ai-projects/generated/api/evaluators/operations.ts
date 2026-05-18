// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  apiErrorResponseDeserializer,
  PendingUploadRequest,
  pendingUploadRequestSerializer,
  PendingUploadResponse,
  pendingUploadResponseDeserializer,
  DatasetCredential,
  datasetCredentialDeserializer,
  EvaluatorCredentialRequest,
  evaluatorCredentialRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EvaluatorsGetCredentialsOptionalParams,
  EvaluatorsStartPendingUploadOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getCredentialsSend(
  context: Client,
  name: string,
  credentialRequest: EvaluatorCredentialRequest,
  version: string,
  options: EvaluatorsGetCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}/credentials{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: evaluatorCredentialRequestSerializer(credentialRequest),
    });
}

export async function _getCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<DatasetCredential> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return datasetCredentialDeserializer(result.body);
}

/** Get the SAS credential to access the storage account associated with an Evaluator version. */
export async function getCredentials(
  context: Client,
  name: string,
  credentialRequest: EvaluatorCredentialRequest,
  version: string,
  options: EvaluatorsGetCredentialsOptionalParams = { requestOptions: {} },
): Promise<DatasetCredential> {
  const result = await _getCredentialsSend(context, name, credentialRequest, version, options);
  return _getCredentialsDeserialize(result);
}

export function _startPendingUploadSend(
  context: Client,
  name: string,
  version: string,
  pendingUploadRequest: PendingUploadRequest,
  options: EvaluatorsStartPendingUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}/startPendingUpload{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: pendingUploadRequestSerializer(pendingUploadRequest),
    });
}

export async function _startPendingUploadDeserialize(
  result: PathUncheckedResponse,
): Promise<PendingUploadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return pendingUploadResponseDeserializer(result.body);
}

/** Start a new or get an existing pending upload of an evaluator for a specific version. */
export async function startPendingUpload(
  context: Client,
  name: string,
  version: string,
  pendingUploadRequest: PendingUploadRequest,
  options: EvaluatorsStartPendingUploadOptionalParams = { requestOptions: {} },
): Promise<PendingUploadResponse> {
  const result = await _startPendingUploadSend(
    context,
    name,
    version,
    pendingUploadRequest,
    options,
  );
  return _startPendingUploadDeserialize(result);
}
