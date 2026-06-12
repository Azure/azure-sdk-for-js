// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  toolUnionArraySerializer,
  ToolUnion,
  apiErrorResponseDeserializer,
  toolboxSkillUnionArraySerializer,
  toolboxPoliciesSerializer,
  ToolboxVersionObject,
  toolboxVersionObjectDeserializer,
  ToolboxObject,
  toolboxObjectDeserializer,
  _AgentsPagedResultToolboxObject,
  _agentsPagedResultToolboxObjectDeserializer,
  _AgentsPagedResultToolboxVersionObject,
  _agentsPagedResultToolboxVersionObjectDeserializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  DeleteVersionOptionalParams,
  BetaToolboxesDeleteOptionalParams,
  BetaToolboxesUpdateOptionalParams,
  GetVersionOptionalParams,
  ListVersionsOptionalParams,
  BetaToolboxesListOptionalParams,
  BetaToolboxesGetOptionalParams,
  CreateVersionOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: DeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}/versions/{version}{?api%2Dversion}",
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
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
    });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return;
}

/** Removes the specified version of a toolbox. */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: DeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, foundryFeatures, options);
  return _deleteVersionDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}{?api%2Dversion}",
    {
      name: name,
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return;
}

/** Removes the specified toolbox along with all of its versions. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  name: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, foundryFeatures, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  name: string,
  defaultVersion: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}{?api%2Dversion}",
    {
      name: name,
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return toolboxObjectDeserializer(result.body);
}

/** Updates the toolbox's default version pointer to the specified version. */
export async function update(
  context: Client,
  name: string,
  defaultVersion: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesUpdateOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _updateSend(context, name, defaultVersion, foundryFeatures, options);
  return _updateDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: GetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}/versions/{version}{?api%2Dversion}",
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
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<ToolboxVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return toolboxVersionObjectDeserializer(result.body);
}

/** Retrieves the specified version of a toolbox by name and version identifier. */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: GetVersionOptionalParams = { requestOptions: {} },
): Promise<ToolboxVersionObject> {
  const result = await _getVersionSend(context, name, version, foundryFeatures, options);
  return _getVersionDeserialize(result);
}

export function _listVersionsSend(
  context: Client,
  name: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}/versions{?limit,order,after,before,api%2Dversion}",
    {
      name: name,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultToolboxVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return _agentsPagedResultToolboxVersionObjectDeserializer(result.body);
}

/** Returns the available versions for the specified toolbox. */
export function listVersions(
  context: Client,
  name: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolboxVersionObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, foundryFeatures, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return _agentsPagedResultToolboxObjectDeserializer(result.body);
}

/** Returns the toolboxes available in the current project. */
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
  name: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}{?api%2Dversion}",
    {
      name: name,
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
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return toolboxObjectDeserializer(result.body);
}

/** Retrieves the specified toolbox and its current configuration. */
export async function get(
  context: Client,
  name: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesGetOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _getSend(context, name, foundryFeatures, options);
  return _getDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  tools: ToolUnion[],
  foundryFeatures: "Toolboxes=V1Preview",
  options: CreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}/versions{?api%2Dversion}",
    {
      name: name,
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
        skills: !options?.skills
          ? options?.skills
          : toolboxSkillUnionArraySerializer(options?.skills),
        policies: !options?.policies
          ? options?.policies
          : toolboxPoliciesSerializer(options?.policies),
      },
    });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<ToolboxVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode >= 400 && statusCode <= 499) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (result.body) {
        error.details = apiErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return toolboxVersionObjectDeserializer(result.body);
}

/** Creates a new toolbox version, provisioning the toolbox itself if it does not already exist. */
export async function createVersion(
  context: Client,
  name: string,
  tools: ToolUnion[],
  foundryFeatures: "Toolboxes=V1Preview",
  options: CreateVersionOptionalParams = { requestOptions: {} },
): Promise<ToolboxVersionObject> {
  const result = await _createVersionSend(context, name, tools, foundryFeatures, options);
  return _createVersionDeserialize(result);
}
