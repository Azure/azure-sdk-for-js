// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import {
  apiErrorResponseDeserializer,
  pendingUploadRequestSerializer,
  pendingUploadResponseDeserializer,
  datasetCredentialDeserializer,
  evaluatorCredentialRequestSerializer,
} from "../../../models/models.js";
import type {
  PendingUploadRequest,
  PendingUploadResponse,
  DatasetCredential,
  EvaluatorCredentialRequest,
} from "../../../models/models.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaEvaluatorsGetCredentialsOptionalParams,
  BetaEvaluatorsPendingUploadOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getCredentialsSend(
  context: Client,
  name: string,
  credentialRequest: EvaluatorCredentialRequest,
  version: string,
  options: BetaEvaluatorsGetCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}/credentials{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return datasetCredentialDeserializer(result.body);
}

/** Retrieves SAS credentials for accessing the storage account associated with the specified evaluator version. */
export async function getCredentials(
  context: Client,
  name: string,
  credentialRequest: EvaluatorCredentialRequest,
  version: string,
  options: BetaEvaluatorsGetCredentialsOptionalParams = { requestOptions: {} },
): Promise<DatasetCredential> {
  const result = await _getCredentialsSend(context, name, credentialRequest, version, options);
  return _getCredentialsDeserialize(result);
}

export function _pendingUploadSend(
  context: Client,
  name: string,
  version: string,
  pendingUploadRequest: PendingUploadRequest,
  options: BetaEvaluatorsPendingUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}/startPendingUpload{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: pendingUploadRequestSerializer(pendingUploadRequest),
  });
}

export async function _pendingUploadDeserialize(
  result: PathUncheckedResponse,
): Promise<PendingUploadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return pendingUploadResponseDeserializer(result.body);
}

/** Initiates a new pending upload or retrieves an existing one for the specified evaluator version. */
export async function pendingUpload(
  context: Client,
  name: string,
  version: string,
  pendingUploadRequest: PendingUploadRequest,
  options: BetaEvaluatorsPendingUploadOptionalParams = { requestOptions: {} },
): Promise<PendingUploadResponse> {
  const result = await _pendingUploadSend(context, name, version, pendingUploadRequest, options);
  return _pendingUploadDeserialize(result);
}
