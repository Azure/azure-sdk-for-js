// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  Skill,
  DeleteSkillResponse,
  BetaSkillsDownloadResponse,
  _AgentsPagedResultSkill,
  SkillVersion,
  CreateSkillVersionFromFilesBody,
  _AgentsPagedResultSkillVersion,
  DeleteSkillVersionResponse,
  DownloadVersionResponse,
} from "../../../models/models.js";
import {
  apiErrorResponseDeserializer,
  skillDeserializer,
  _agentsPagedResultSkillDeserializer,
  deleteSkillResponseDeserializer,
  skillInlineContentSerializer,
  skillVersionDeserializer,
  createSkillVersionFromFilesBodySerializer,
  _agentsPagedResultSkillVersionDeserializer,
  deleteSkillVersionResponseDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { getBinaryStreamResponse } from "../../../static-helpers/serialization/get-binary-stream-response.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  DeleteVersionOptionalParams,
  DownloadVersionOptionalParams,
  BetaSkillsDownloadOptionalParams,
  GetVersionOptionalParams,
  ListVersionsOptionalParams,
  CreateFromFilesOptionalParams,
  BetaSkillsCreateOptionalParams,
  BetaSkillsDeleteOptionalParams,
  BetaSkillsUpdateOptionalParams,
  BetaSkillsListOptionalParams,
  BetaSkillsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  name: string,
  options: BetaSkillsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}{?api-version}",
    {
      name: name,
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deleteSkillResponseDeserializer(result.body);
}

/** Removes the specified skill and its associated versions. */
export async function $delete(
  context: Client,
  name: string,
  options: BetaSkillsDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteSkillResponse> {
  const result = await _$deleteSend(context, name, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  name: string,
  defaultVersion: string,
  options: BetaSkillsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}{?api-version}",
    {
      name: name,
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
    body: { default_version: defaultVersion },
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Skill> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return skillDeserializer(result.body);
}

/** Modifies the specified skill's configuration. */
export async function update(
  context: Client,
  name: string,
  defaultVersion: string,
  options: BetaSkillsUpdateOptionalParams = { requestOptions: {} },
): Promise<Skill> {
  const result = await _updateSend(context, name, defaultVersion, options);
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
): Promise<_AgentsPagedResultSkill> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultSkillDeserializer(result.body);
}

/** Returns the skills available in the current project. */
export function list(
  context: Client,
  options: BetaSkillsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Skill> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: { headers: { "foundry-features": "Skills=V1Preview" } },
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

export function _downloadVersionSend(
  context: Client,
  name: string,
  version: string,
  options: DownloadVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}/versions/{version}/content{?api-version}",
    {
      name: name,
      version: version,
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

export async function _downloadVersionDeserialize(
  result: PathUncheckedResponse & DownloadVersionResponse,
): Promise<DownloadVersionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Downloads the zip content for a specific version of a skill. */
export async function downloadVersion(
  context: Client,
  name: string,
  version: string,
  options: DownloadVersionOptionalParams = { requestOptions: {} },
): Promise<DownloadVersionResponse> {
  const streamableMethod = _downloadVersionSend(context, name, version, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadVersionDeserialize(result);
}

export function _downloadSend(
  context: Client,
  name: string,
  options: BetaSkillsDownloadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}/content{?api-version}",
    {
      name: name,
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Downloads the zip content for the default version of a skill. */
export async function download(
  context: Client,
  name: string,
  options: BetaSkillsDownloadOptionalParams = { requestOptions: {} },
): Promise<BetaSkillsDownloadResponse> {
  const streamableMethod = _downloadSend(context, name, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadDeserialize(result);
}

export function _getSend(
  context: Client,
  name: string,
  options: BetaSkillsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}{?api-version}",
    {
      name: name,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Skill> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return skillDeserializer(result.body);
}

/** Retrieves the specified skill and its current configuration. */
export async function get(
  context: Client,
  name: string,
  options: BetaSkillsGetOptionalParams = { requestOptions: {} },
): Promise<Skill> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: GetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
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

export async function _getVersionDeserialize(result: PathUncheckedResponse): Promise<SkillVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return skillVersionDeserializer(result.body);
}

/** Retrieves the specified version of a skill by name and version identifier. */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: GetVersionOptionalParams = { requestOptions: {} },
): Promise<SkillVersion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: ListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}/versions{?limit,order,after,before,api-version}",
    {
      name: name,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultSkillVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultSkillVersionDeserializer(result.body);
}

/** Returns the available versions for the specified skill. */
export function listVersions(
  context: Client,
  name: string,
  options: ListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SkillVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion },
  );
}

export function _createFromFilesSend(
  context: Client,
  name: string,
  content: CreateSkillVersionFromFilesBody,
  options: CreateFromFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}/versions{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "multipart/form-data",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createSkillVersionFromFilesBodySerializer(content),
  });
}

export async function _createFromFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<SkillVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return skillVersionDeserializer(result.body);
}

/** Creates a new version of a skill from uploaded files via multipart form data. */
export async function createFromFiles(
  context: Client,
  name: string,
  content: CreateSkillVersionFromFilesBody,
  options: CreateFromFilesOptionalParams = { requestOptions: {} },
): Promise<SkillVersion> {
  const result = await _createFromFilesSend(context, name, content, options);
  return _createFromFilesDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  options: BetaSkillsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}/versions{?api-version}",
    {
      name: name,
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
      inline_content: !options?.inlineContent
        ? options?.inlineContent
        : skillInlineContentSerializer(options?.inlineContent),
      default: options?.defaultParam,
    },
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SkillVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return skillVersionDeserializer(result.body);
}

/** Creates a new version of a skill. If the skill does not exist, it will be created. */
export async function create(
  context: Client,
  name: string,
  options: BetaSkillsCreateOptionalParams = { requestOptions: {} },
): Promise<SkillVersion> {
  const result = await _createSend(context, name, options);
  return _createDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: DeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Skills=V1Preview";
  const path = expandUrlTemplate(
    "/skills/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
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

export async function _deleteVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteSkillVersionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deleteSkillVersionResponseDeserializer(result.body);
}

/** Removes the specified version of a skill. */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: DeleteVersionOptionalParams = { requestOptions: {} },
): Promise<DeleteSkillVersionResponse> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}
