// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  SkillObject,
  _AgentsPagedResultSkillObject,
  DeleteSkillResponse,
  BetaSkillsDownloadResponse,
} from "../../../models/models.js";
import {
  apiErrorResponseDeserializer,
  skillObjectDeserializer,
  _agentsPagedResultSkillObjectDeserializer,
  deleteSkillResponseDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { getBinaryStreamResponse } from "../../../static-helpers/serialization/get-binary-stream-response.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaSkillsDeleteOptionalParams,
  BetaSkillsUpdateOptionalParams,
  BetaSkillsListOptionalParams,
  BetaSkillsDownloadOptionalParams,
  BetaSkillsGetOptionalParams,
  CreateFromPackageOptionalParams,
  BetaSkillsCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  skillName: string,
  options: BetaSkillsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{skill_name}{?api-version}",
    {
      skill_name: skillName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteSkillResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return deleteSkillResponseDeserializer(result.body);
}

/** Deletes a skill. */
export async function $delete(
  context: Client,
  skillName: string,
  options: BetaSkillsDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteSkillResponse> {
  const result = await _$deleteSend(context, skillName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  skillName: string,
  options: BetaSkillsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{skill_name}{?api-version}",
    {
      skill_name: skillName,
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
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      description: options?.description,
      instructions: options?.instructions,
      metadata: options?.metadata,
    },
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SkillObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return skillObjectDeserializer(result.body);
}

/** Updates an existing skill. */
export async function update(
  context: Client,
  skillName: string,
  options: BetaSkillsUpdateOptionalParams = { requestOptions: {} },
): Promise<SkillObject> {
  const result = await _updateSend(context, skillName, options);
  return _updateDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaSkillsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills{?limit,order,after,before,api-version}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultSkillObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultSkillObjectDeserializer(result.body);
}

/** Returns the list of all skills. */
export function list(
  context: Client,
  options: BetaSkillsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SkillObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion },
  );
}

export function _downloadSend(
  context: Client,
  skillName: string,
  options: BetaSkillsDownloadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{skill_name}:download{?api-version}",
    {
      skill_name: skillName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/zip",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _downloadDeserialize(
  result: PathUncheckedResponse & BetaSkillsDownloadResponse,
): Promise<BetaSkillsDownloadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Downloads a skill package. */
export async function download(
  context: Client,
  skillName: string,
  options: BetaSkillsDownloadOptionalParams = { requestOptions: {} },
): Promise<BetaSkillsDownloadResponse> {
  const streamableMethod = _downloadSend(context, skillName, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadDeserialize(result);
}

export function _getSend(
  context: Client,
  skillName: string,
  options: BetaSkillsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{skill_name}{?api-version}",
    {
      skill_name: skillName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SkillObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return skillObjectDeserializer(result.body);
}

/** Retrieves a skill. */
export async function get(
  context: Client,
  skillName: string,
  options: BetaSkillsGetOptionalParams = { requestOptions: {} },
): Promise<SkillObject> {
  const result = await _getSend(context, skillName, options);
  return _getDeserialize(result);
}

export function _createFromPackageSend(
  context: Client,
  body: Uint8Array,
  options: CreateFromPackageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills:import{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/zip",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: body,
  });
}

export async function _createFromPackageDeserialize(
  result: PathUncheckedResponse,
): Promise<SkillObject> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return skillObjectDeserializer(result.body);
}

/** Creates a skill from a zip package. */
export async function createFromPackage(
  context: Client,
  body: Uint8Array,
  options: CreateFromPackageOptionalParams = { requestOptions: {} },
): Promise<SkillObject> {
  const result = await _createFromPackageSend(context, body, options);
  return _createFromPackageDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  options: BetaSkillsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills{?api-version}",
    {
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
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      name: name,
      description: options?.description,
      instructions: options?.instructions,
      metadata: options?.metadata,
    },
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SkillObject> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return skillObjectDeserializer(result.body);
}

/** Creates a skill. */
export async function create(
  context: Client,
  name: string,
  options: BetaSkillsCreateOptionalParams = { requestOptions: {} },
): Promise<SkillObject> {
  const result = await _createSend(context, name, options);
  return _createDeserialize(result);
}
