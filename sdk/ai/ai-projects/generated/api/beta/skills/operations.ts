// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  apiErrorResponseDeserializer,
  SkillObject,
  skillObjectDeserializer,
  _AgentsPagedResultSkillObject,
  _agentsPagedResultSkillObjectDeserializer,
  DeleteSkillResponse,
  deleteSkillResponseDeserializer,
  BetaSkillsDownloadResponse,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { getBinaryStreamResponse } from "../../../static-helpers/serialization/get-binary-stream-response.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaSkillsDeleteOptionalParams,
  BetaSkillsUpdateOptionalParams,
  BetaSkillsListOptionalParams,
  BetaSkillsDownloadOptionalParams,
  BetaSkillsGetOptionalParams,
  CreateFromPackageOptionalParams,
  BetaSkillsCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  skillName: string,
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skills/{skill_name}{?api%2Dversion}",
    {
      skill_name: skillName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  skillName: string,
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteSkillResponse> {
  const result = await _$deleteSend(context, skillName, foundryFeatures, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  skillName: string,
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skills/{skill_name}{?api%2Dversion}",
    {
      skill_name: skillName,
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
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsUpdateOptionalParams = { requestOptions: {} },
): Promise<SkillObject> {
  const result = await _updateSend(context, skillName, foundryFeatures, options);
  return _updateDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skills{?limit,order,after,before,api%2Dversion}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
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
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SkillObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _downloadSend(
  context: Client,
  skillName: string,
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsDownloadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skills/{skill_name}:download{?api%2Dversion}",
    {
      skill_name: skillName,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        accept: "application/gzip",
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
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsDownloadOptionalParams = { requestOptions: {} },
): Promise<BetaSkillsDownloadResponse> {
  const streamableMethod = _downloadSend(context, skillName, foundryFeatures, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadDeserialize(result);
}

export function _getSend(
  context: Client,
  skillName: string,
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skills/{skill_name}{?api%2Dversion}",
    {
      skill_name: skillName,
      "api%2Dversion": context.apiVersion ?? "v1",
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
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsGetOptionalParams = { requestOptions: {} },
): Promise<SkillObject> {
  const result = await _getSend(context, skillName, foundryFeatures, options);
  return _getDeserialize(result);
}

export function _createFromPackageSend(
  context: Client,
  body: Uint8Array,
  foundryFeatures: "Skills=V1Preview",
  options: CreateFromPackageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skills:import{?api%2Dversion}",
    {
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
      contentType: "application/gzip",
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

/** Creates a skill from a gzip package. */
export async function createFromPackage(
  context: Client,
  body: Uint8Array,
  foundryFeatures: "Skills=V1Preview",
  options: CreateFromPackageOptionalParams = { requestOptions: {} },
): Promise<SkillObject> {
  const result = await _createFromPackageSend(context, body, foundryFeatures, options);
  return _createFromPackageDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skills{?api%2Dversion}",
    {
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
  foundryFeatures: "Skills=V1Preview",
  options: BetaSkillsCreateOptionalParams = { requestOptions: {} },
): Promise<SkillObject> {
  const result = await _createSend(context, name, foundryFeatures, options);
  return _createDeserialize(result);
}
