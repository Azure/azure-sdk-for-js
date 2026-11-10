// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import { apiErrorResponseDeserializer, pendingUploadRequestSerializer, pendingUploadResponseDeserializer, datasetCredentialDeserializer, evaluatorCredentialRequestSerializer, _completedEvaluatorDiagnosticsPageDeserializer } from "../../../models/models.js";
import type { PendingUploadRequest, PendingUploadResponse, DatasetCredential, EvaluatorCredentialRequest, _CompletedEvaluatorDiagnosticsPage, EvaluatorDiagnosticUnion } from "../../../models/models.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type { BetaEvaluatorsGetCredentialsOptionalParams, BetaEvaluatorsPendingUploadOptionalParams, BetaEvaluatorsListDiagnosticsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";

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

export function _listDiagnosticsSend(
  context: Client, name: string, options: BetaEvaluatorsListDiagnosticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
const foundryFeatures = "Evaluations=V1Preview";

  const path = expandUrlTemplate(
    "/evaluators/{name}/diagnostics{?after,api-version,before,dimension_id,end_time,evaluator_version,limit,order,start_time,type*}",
    {
      name: name,
      after: options?.after,
      before: options?.before,
      limit: options?.limit,
      order: options?.order,
      start_time: !options?.startTime
        ? options?.startTime
        : (options?.startTime.getTime() / 1000) | 0,
      end_time: !options?.endTime ? options?.endTime : (options?.endTime.getTime() / 1000) | 0,
      evaluator_version: options?.evaluatorVersion,
      dimension_id: options?.dimensionId,
      type: !options?.typeParam
        ? options?.typeParam
        : options?.typeParam.map((p: any) => {
            return p;
          }),
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listDiagnosticsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CompletedEvaluatorDiagnosticsPage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _completedEvaluatorDiagnosticsPageDeserializer(result.body);
}

/**
 * Returns immutable publication lineage for the specified evaluator.
 *
 * Time, evaluator-version, dimension, and type filters are intersected.
 * Returns recorded changes from completed evaluator version writes.
 * Historical backfill and diagnostic calculation jobs are not included.
 */
export function listDiagnostics(
  context: Client, name: string, options: BetaEvaluatorsListDiagnosticsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorDiagnosticUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listDiagnosticsSend(context, name, options),
    _listDiagnosticsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1", cursorFieldName: "last_id", hasMoreFieldName: "has_more", nextPageRequestOptions: { ...operationOptionsToRequestParameters(options), headers: {
        "foundry-features": "Evaluations=V1Preview",
        accept: "application/json",
        ...options.requestOptions?.headers,
      } } },
  );
}
