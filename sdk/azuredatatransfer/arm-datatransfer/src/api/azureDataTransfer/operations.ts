// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext as Client } from "../index.js";
import type {
  Schema,
  SchemasListResult,
  ListApprovedSchemasRequest,
  ListFlowProfilesRequest,
  FlowProfilesListResult,
  ValidateSchemaResult,
  ListPipelineMetadataRequest,
  ListPipelineMetadataResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  schemaSerializer,
  schemasListResultDeserializer,
  listApprovedSchemasRequestSerializer,
  listFlowProfilesRequestSerializer,
  flowProfilesListResultDeserializer,
  validateSchemaResultDeserializer,
  listPipelineMetadataRequestSerializer,
  listPipelineMetadataResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AzureDataTransferListPipelineMetadataOptionalParams,
  AzureDataTransferValidateSchemaOptionalParams,
  AzureDataTransferListFlowProfilesOptionalParams,
  AzureDataTransferListApprovedSchemasOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listPipelineMetadataSend(
  context: Client,
  body: ListPipelineMetadataRequest,
  options: AzureDataTransferListPipelineMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AzureDataTransfer/listPipelineMetadata{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: listPipelineMetadataRequestSerializer(body),
  });
}

export async function _listPipelineMetadataDeserialize(
  result: PathUncheckedResponse,
): Promise<ListPipelineMetadataResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return listPipelineMetadataResultDeserializer(result.body);
}

/** Retrieves the pipeline metadata associated with a specified pipeline. */
export async function listPipelineMetadata(
  context: Client,
  body: ListPipelineMetadataRequest,
  options: AzureDataTransferListPipelineMetadataOptionalParams = { requestOptions: {} },
): Promise<ListPipelineMetadataResult> {
  const result = await _listPipelineMetadataSend(context, body, options);
  return _listPipelineMetadataDeserialize(result);
}

export function _validateSchemaSend(
  context: Client,
  schema: Schema,
  options: AzureDataTransferValidateSchemaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AzureDataTransfer/validateSchema{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: schemaSerializer(schema),
  });
}

export async function _validateSchemaDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateSchemaResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validateSchemaResultDeserializer(result.body);
}

/** Validates the structure and content of a schema for use in Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource. */
export async function validateSchema(
  context: Client,
  schema: Schema,
  options: AzureDataTransferValidateSchemaOptionalParams = { requestOptions: {} },
): Promise<ValidateSchemaResult> {
  const result = await _validateSchemaSend(context, schema, options);
  return _validateSchemaDeserialize(result);
}

export function _listFlowProfilesSend(
  context: Client,
  body: ListFlowProfilesRequest,
  options: AzureDataTransferListFlowProfilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AzureDataTransfer/listFlowProfiles{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: listFlowProfilesRequestSerializer(body),
  });
}

export async function _listFlowProfilesDeserialize(
  result: PathUncheckedResponse,
): Promise<FlowProfilesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowProfilesListResultDeserializer(result.body);
}

/** Retrieves a list of FlowProfile resources associated with a specified pipeline. */
export async function listFlowProfiles(
  context: Client,
  body: ListFlowProfilesRequest,
  options: AzureDataTransferListFlowProfilesOptionalParams = { requestOptions: {} },
): Promise<FlowProfilesListResult> {
  const result = await _listFlowProfilesSend(context, body, options);
  return _listFlowProfilesDeserialize(result);
}

export function _listApprovedSchemasSend(
  context: Client,
  pipeline: ListApprovedSchemasRequest,
  options: AzureDataTransferListApprovedSchemasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AzureDataTransfer/listApprovedSchemas{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: listApprovedSchemasRequestSerializer(pipeline),
  });
}

export async function _listApprovedSchemasDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemasListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return schemasListResultDeserializer(result.body);
}

/** Retrieves the list of approved schemas available for Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource. */
export async function listApprovedSchemas(
  context: Client,
  pipeline: ListApprovedSchemasRequest,
  options: AzureDataTransferListApprovedSchemasOptionalParams = { requestOptions: {} },
): Promise<SchemasListResult> {
  const result = await _listApprovedSchemasSend(context, pipeline, options);
  return _listApprovedSchemasDeserialize(result);
}
