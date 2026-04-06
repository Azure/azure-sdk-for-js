// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  toolUnionArraySerializer,
  ToolUnion,
  apiErrorResponseDeserializer,
  ToolboxVersionObject,
  toolboxVersionObjectDeserializer,
  toolboxPoliciesSerializer,
  ToolboxObject,
  toolboxObjectDeserializer,
  _AgentsPagedResultToolboxObject,
  _agentsPagedResultToolboxObjectDeserializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaToolboxesDeleteOptionalParams,
  BetaToolboxesUpdateOptionalParams,
  BetaToolboxesListOptionalParams,
  BetaToolboxesGetOptionalParams,
  BetaToolboxesCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}{?api%2Dversion}",
    {
      toolbox_name: toolboxName,
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
      headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a toolbox and all its versions. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, toolboxName, foundryFeatures, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  toolboxName: string,
  defaultVersion: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}{?api%2Dversion}",
    {
      toolbox_name: toolboxName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
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

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolboxObjectDeserializer(result.body);
}

/** Update a toolbox to point to a specific version. */
export async function update(
  context: Client,
  toolboxName: string,
  defaultVersion: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesUpdateOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _updateSend(context, toolboxName, defaultVersion, foundryFeatures, options);
  return _updateDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes{?limit,order,after,before,api%2Dversion}",
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
): Promise<_AgentsPagedResultToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultToolboxObjectDeserializer(result.body);
}

/** List all toolboxes. */
export function list(
  context: Client,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolboxObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getSend(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}{?api%2Dversion}",
    {
      toolbox_name: toolboxName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolboxObjectDeserializer(result.body);
}

/** Retrieve a toolbox. */
export async function get(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesGetOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _getSend(context, toolboxName, foundryFeatures, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  toolboxName: string,
  tools: ToolUnion[],
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}/versions{?api%2Dversion}",
    {
      toolbox_name: toolboxName,
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
        metadata: options?.metadata,
        tools: toolUnionArraySerializer(tools),
        policies: !options?.policies
          ? options?.policies
          : toolboxPoliciesSerializer(options?.policies),
      },
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ToolboxVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolboxVersionObjectDeserializer(result.body);
}

/** Create a new version of a toolbox. If the toolbox does not exist, it will be created. */
export async function create(
  context: Client,
  toolboxName: string,
  tools: ToolUnion[],
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesCreateOptionalParams = { requestOptions: {} },
): Promise<ToolboxVersionObject> {
  const result = await _createSend(context, toolboxName, tools, foundryFeatures, options);
  return _createDeserialize(result);
}
